# Job Hop Backend

A FastAPI backend application for the Job Hop platform.

## Tech Stack

- [FastAPI](https://fastapi.tiangolo.com/)
- [Supabase](https://supabase.io/)
- [uv](https://github.com/astral-sh/uv) (Python package installer)

## Setup

1. Install uv if you haven't already:
```
pip install uv
```

2. Clone the repository and navigate to the backend directory:
```
cd job-hop-backend
```

3. Create a virtual environment and install dependencies using uv:
```
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv pip install -r requirements.txt
```

4. Copy the example environment file and update the values:
```
cp .env.example .env
```

5. Update the `.env` file with your Supabase credentials.

## Running the Server

To run the development server:

```
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

## API Documentation

Once the server is running, you can access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

- `GET /health` - Health check endpoint that returns status 200