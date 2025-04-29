from fastapi import FastAPI
from src.routes.health import router as health_router
from src.routes.jobs import router as jobs_router
from src.routes.profile import router as profile_router
from src.routes.resume import router as resume_router

app = FastAPI(
    title="Job Hop API",
    description="Backend API for Job Hop application",
    version="0.1.0"
)

app.include_router(health_router)
app.include_router(jobs_router)
app.include_router(profile_router)
app.include_router(resume_router)
