from supabase import create_client
from src.config import SUPABASE_URL, SUPABASE_KEY

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Missing Supabase URL or KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
