from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def health_check():
    """Simple health check endpoint that returns 200 status."""
    return {"status": "ok"}
