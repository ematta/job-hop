from typing import TypedDict
from pydantic import BaseModel
from sqlmodel import SQLModel, Field

class Resume(SQLModel, table=True):
    id: str = Field(primary_key=True)
    url: str
    description: str
    uploaded_at: str
    updated_at: str

class ResumeRequest(BaseModel):
    url: str

class ResumeResponse(BaseModel):
    id: str
    description: str

class ResumeRecord(TypedDict):
    id: str
    url: str
    description: str
