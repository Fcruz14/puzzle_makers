from fastapi import FastAPI
from services.meteomatics_service import get_air_quality
from services.supabase_service import insert_air_quality_data

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Backend Meteomatics + Supabase activo 🚀"}

@app.get("/fetch-air-quality")
def fetch_air_quality():
    data = get_air_quality()
    insert_air_quality_data(data)
    return data
