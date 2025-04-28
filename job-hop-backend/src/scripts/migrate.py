import typer
from sqlmodel import SQLModel, create_engine, Session
from src.config import DATABASE_URL
from src.database import supabase

from src.models.job import Job
from src.models.resume import Resume
from src.models.profile import Profile

app = typer.Typer()

def get_engine():
    return create_engine(DATABASE_URL, echo=True)

@app.command()
def init():
    engine = get_engine()
    SQLModel.metadata.create_all(engine)
    typer.echo("Database initialized.")

@app.command()
def drop():
    engine = get_engine()
    SQLModel.metadata.drop_all(engine)
    typer.echo("Database dropped.")

@app.command()
def sync():
    engine = get_engine()
    with Session(engine) as session:
        # Sync Job table
        job_records = supabase.table("job").select("*").execute()
        for record in job_records.data:
            job = Job.from_orm(record)
            session.add(job)

        # Sync Resume table
        resume_records = supabase.table("resume").select("*").execute()
        for record in resume_records.data:
            resume = Resume.from_orm(record)
            session.add(resume)

        # Sync Profile table
        profile_records = supabase.table("profile").select("*").execute()
        for record in profile_records.data:
            profile = Profile.from_orm(record)
            session.add(profile)

        session.commit()
    typer.echo("Database synced with Supabase.")

if __name__ == "__main__":
    app()

