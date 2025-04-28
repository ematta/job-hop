from fastapi import APIRouter, HTTPException
from uuid import uuid4

from src.models.job import JobRequest, JobResponse
from src.services.fetch_job import fetch_job_data
from src.store import save_job, get_job

router = APIRouter()

@router.post("/job", response_model=JobResponse)
async def create_job(request: JobRequest):
    data = await fetch_job_data(str(request.url))
    job_id = str(uuid4())
    record = {
        "id": job_id,
        "source": data["source"],
        "url": str(request.url),
        "description": data["description"],
    }
    save_job(record)
    return JobResponse(id=job_id, source=data["source"], description=data["description"])

@router.get("/job/{job_id}", response_model=JobResponse)
async def get_job_endpoint(job_id: str):
    record = get_job(job_id)
    if not record:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobResponse(id=record["id"], source=record["source"], description=record["description"])
