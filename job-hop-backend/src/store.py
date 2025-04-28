# In-memory job store
from typing import TypedDict, Optional
from src.models.job import JobRecord

jobs: dict[str, JobRecord] = {}

def save_job(record: JobRecord) -> None:
    jobs[record["id"]] = record


def get_job(job_id: str) -> Optional[JobRecord]:
    return jobs.get(job_id)
