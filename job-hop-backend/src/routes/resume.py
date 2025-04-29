from fastapi import APIRouter, HTTPException, UploadFile, File
from uuid import uuid4
import boto3  # type: ignore
from botocore.exceptions import BotoCoreError, ClientError  # type: ignore

from src.config import (
    S3_ENDPOINT_URL,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    S3_BUCKET_NAME,
)
from src.models.resume import ResumeResponse
from src.database import supabase

router = APIRouter()

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
ALLOWED_CONTENT_TYPES = {
    "text/plain": "txt",
    "application/pdf": "pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
}

@router.post("/resume/{user_id}", response_model=ResumeResponse)
async def upload_resume(user_id: str, file: UploadFile = File(...)):
    content_type = file.content_type
    if content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type")
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large")
    ext = ALLOWED_CONTENT_TYPES[content_type]
    file_id = str(uuid4())
    key = f"{user_id}/{file_id}.{ext}"

    try:
        s3_client = boto3.client(
            "s3",
            endpoint_url=S3_ENDPOINT_URL or None,
            region_name=AWS_REGION,
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        )
        s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=key, Body=content)
    except (BotoCoreError, ClientError) as e:
        raise HTTPException(status_code=500, detail="Failed to upload file") from e

    url = (
        f"{S3_ENDPOINT_URL.rstrip('/')}/{S3_BUCKET_NAME}/{key}"
        if S3_ENDPOINT_URL
        else s3_client.generate_presigned_url(
            "get_object", Params={"Bucket": S3_BUCKET_NAME, "Key": key}, ExpiresIn=0
        )
    )

    # Store metadata in Supabase
    result = supabase.table("resume").insert({
        "id": file_id,
        "user_id": user_id,
        "url": url,
        "description": file.filename or ""
    }).execute()
    records = result.data or []
    if not records:
        raise HTTPException(status_code=500, detail="Failed to save resume record")

    return ResumeResponse(id=file_id, description=file.filename or "")
