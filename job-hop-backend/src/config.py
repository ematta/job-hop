import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

# API configuration
API_ENV = os.getenv("API_ENV", "development")

# Database URL for SQLModel and migrations
DATABASE_URL = os.getenv("DATABASE_URL", "")