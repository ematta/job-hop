# Plan of Attack

This document outlines the steps to diagnose and resolve the `Scraping failed: 502: Fetching failed: 403` error in the Job Hop backend.

## 1. Reproduce the issue
- Use a POST request to `/job` with a URL known to return HTTP 403.
- Inspect console logs for response status, headers, and snippet of response body.

## 2. Enhance error handling and logging
- Catch `requests.RequestException` for network errors separately.
- On non-200 status codes, log status, headers, and a short body snippet before raising.
- Separate HTML parsing errors into their own `try/except` block and log the exception.

## 3. Adjust scraping strategy
- Rotate or update the `User-Agent` header when blocked.
- Optionally implement retry with exponential backoff or proxy support.

## 4. Implement changes in `main.py`
- Refactor fetch and parse into distinct `try/except` blocks with detailed prints.
- Log any exceptions at each stage.

## 5. Test the fix
- Run manual tests with known good and failing URLs.
- Confirm debug logs appear and correct HTTPExceptions are returned.

## 6. Document and finalize
- Update README with troubleshooting steps and configuration for header rotation or proxies.
