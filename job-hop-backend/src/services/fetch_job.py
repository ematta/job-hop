from urllib.parse import urlparse
from urllib.robotparser import RobotFileParser
import time
import random
import asyncio
from playwright.async_api import async_playwright
from fastapi import HTTPException

# Retry and backoff settings
MAX_RETRIES = 3
BACKOFF_FACTOR = 1  # seconds

# Define rotating user agents
USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.0) Gecko/20100101 Firefox/115.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15'
]


async def fetch_job_data(url: str) -> dict[str, str]:
    """Fetches HTML, parses job description, and returns source & cleaned description."""
    parsed = urlparse(url)
    hostname = parsed.hostname or ""

    # Identify source and CSS selector
    if "indeed.com" in hostname:
        source = "indeed"
        selector = "div.jobsearch-jobDescriptionText"
    else:
        raise HTTPException(status_code=400, detail="Unsupported site")

    # Fetch and parse with Playwright using retry
    description: str | None = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            ua = random.choice(USER_AGENTS)
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=False)
                context = await browser.new_context(user_agent=ua)
                page = await context.new_page()
                await page.goto(url, timeout=10000)
                handle = await page.query_selector(selector)
                if not handle:
                    raise HTTPException(
                        status_code=502, detail="Selector not found")
                description = await handle.inner_text()
                await browser.close()
        except Exception as e:
            if attempt == MAX_RETRIES:
                raise HTTPException(
                    status_code=502, detail=f"Request failed after {MAX_RETRIES} attempts: {e}")
        else:
            break
        await asyncio.sleep(BACKOFF_FACTOR * attempt)

    if description is None:
        raise HTTPException(
            status_code=502, detail="Failed to fetch or parse HTML")

    # Clean whitespace
    cleaned = " ".join(description.split())
    return {"source": source, "description": cleaned}
