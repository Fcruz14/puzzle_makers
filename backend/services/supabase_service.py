from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

# Leer variables de entorno
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Validar que existan
if SUPABASE_URL is None or SUPABASE_KEY is None:
    raise ValueError("Las credenciales de Supabase no están definidas en el .env")

# Crear cliente Supabase
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def insert_air_quality_data(data: list[dict]):
    """Inserta una lista de diccionarios en la tabla air_quality_data"""
    response = supabase.table("air_quality_data").insert(data).execute()
    return response
