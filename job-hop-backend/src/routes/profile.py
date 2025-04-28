from fastapi import APIRouter, HTTPException
from src.models.profile import ProfileRequest, ProfileResponse
from src.database import supabase

router = APIRouter()

@router.post("/profile", response_model=ProfileResponse)
async def create_profile(request: ProfileRequest):
    if supabase is None:
        raise HTTPException(status_code=500, detail="Supabase client not initialized")
    result = supabase.table("profile").insert({"user_id": request.user_id}).execute()
    data = result.data[0] if result.data and len(result.data) > 0 else None
    if not data:
        raise HTTPException(status_code=500, detail="Failed to create profile")
    return ProfileResponse(**data)

@router.get("/profile/{user_id}", response_model=ProfileResponse)
async def get_profile(user_id: str):
    if supabase is None:
        raise HTTPException(status_code=500, detail="Supabase client not initialized")
    result = supabase.table("profile").select("*").eq("user_id", user_id).execute()
    records = result.data or []
    if not records:
        raise HTTPException(status_code=404, detail="Profile not found")
    return ProfileResponse(**records[0])
