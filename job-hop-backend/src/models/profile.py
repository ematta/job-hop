from datetime import datetime
from typing import Optional, TypedDict
from sqlmodel import SQLModel, Field
from pydantic import BaseModel


class Profile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True, unique=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# Pydantic models for Profile API
class ProfileRequest(BaseModel):
    user_id: str

class ProfileResponse(BaseModel):
    id: int
    user_id: str
    created_at: datetime
    updated_at: datetime

class ProfileRecord(TypedDict):
    id: int
    user_id: str
    created_at: str
    updated_at: str
