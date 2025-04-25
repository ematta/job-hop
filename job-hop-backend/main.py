from fastapi import FastAPI

app = FastAPI(
    title="Job Hop API",
    description="Backend API for Job Hop application",
    version="0.1.0"
)

@app.get("/health")
async def health_check():
    """Simple health check endpoint that returns 200 status."""
    return {"status": "ok"}