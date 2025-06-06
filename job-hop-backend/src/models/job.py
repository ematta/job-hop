from typing import TypedDict
from pydantic import BaseModel
from sqlmodel import SQLModel, Field

# SQLModel table for migrations
class Job(SQLModel, table=True):
    id: str = Field(primary_key=True)
    source: str
    url: str
    description: str

class JobRequest(BaseModel):
    url: str

class JobResponse(BaseModel):
    id: str
    source: str
    description: str

class JobRecord(TypedDict):
    id: str
    source: str
    url: str
    description: str
