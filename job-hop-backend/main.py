from fastapi import FastAPI
from src.routes.health import router as health_router
from src.routes.jobs import router as jobs_router

app = FastAPI(
    title="Job Hop API",
    description="Backend API for Job Hop application",
    version="0.1.0"
)

app.include_router(health_router)
app.include_router(jobs_router)
