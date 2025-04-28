from typing import TypedDict
from pydantic import BaseModel, HttpUrl

class JobRequest(BaseModel):
    url: HttpUrl

class JobResponse(BaseModel):
    id: str
    source: str
    description: str

class JobRecord(TypedDict):
    id: str
    source: str
    url: str
    description: str