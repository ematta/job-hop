from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from uuid import uuid4
from urllib.parse import urlparse
from playwright.async_api import async_playwright
from typing import Any

app = FastAPI(
    title="Job Hop API",
    description="Backend API for Job Hop application",
    version="0.1.0"
)

@app.get("/health")
async def health_check():
    """Simple health check endpoint that returns 200 status."""
    return {"status": "ok"}

# In-memory job store
type_alias = dict[str, dict]  # shorthand for store value
jobs: dict[str, dict] = {}

# Playwright globals
playwright: Any
browser: Any

@app.on_event("startup")
async def startup():
    global playwright, browser
    playwright = await async_playwright().start()
    browser = await playwright.chromium.launch(headless=True)

@app.on_event("shutdown")
async def shutdown():
    await browser.close()
    await playwright.stop()

class JobRequest(BaseModel):
    url: HttpUrl

class JobResponse(BaseModel):
    id: str
    source: str
    description: str

@app.post("/job", response_model=JobResponse)
async def create_job(request: JobRequest):
    # Identify source and selector
    parsed = urlparse(str(request.url))
    hostname = parsed.hostname or ""
    if "indeed.com" in hostname:
        source = "indeed"
        selector = "div.jobsearch-jobDescriptionText"
    elif "linkedin.com" in hostname:
        source = "linkedin"
        selector = "div.description__text, div.show-more-less-html__markup"
    elif "glassdoor.com" in hostname:
        source = "glassdoor"
        selector = "div.jobDescriptionContent"
    elif "ziprecruiter.com" in hostname:
        source = "ziprecruiter"
        selector = "div.job-description, div.job__description"
    elif "monster.com" in hostname:
        source = "monster"
        selector = "div.job-description, div.job__description"
    else:
        raise HTTPException(status_code=400, detail="Unsupported site")

    # Scrape with Playwright
    try:
        # Log the scraping attempt
        print(f"Scraping {request.url} from {source}")
        # Create a new browser context and page
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
        )
        page = await context.new_page()
        await page.goto(request.url, timeout=15000, wait_until="networkidle")
        await page.wait_for_selector(selector, timeout=10000)
        description = await page.eval_on_selector(selector, "el => el.innerText")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Scraping failed: {e}")
    finally:
        await page.close()
        await context.close()

    # Clean text
    cleaned = " ".join(description.split())
    job_id = str(uuid4())
    jobs[job_id] = {"id": job_id, "source": source, "url": str(request.url), "description": cleaned}

    return JobResponse(id=job_id, source=source, description=cleaned)

@app.get("/job/{job_id}", response_model=JobResponse)
async def get_job(job_id: str):
    """Retrieve a previously processed job by ID."""
    record = jobs.get(job_id)
    if not record:
        raise HTTPException(status_code=404, detail="Job not found")
    # Log the retrieval
    print(f"Job {job_id} retrieved")
    return JobResponse(**record)