import requests
from requests.auth import HTTPBasicAuth
import os
from dotenv import load_dotenv
from typing import cast

load_dotenv()

# Leer variables de entorno
METEO_USER = cast(str, os.getenv("METEOMATICS_USER"))
METEO_PASS = cast(str, os.getenv("METEOMATICS_PASS"))

def get_air_quality():
    """
    Obtiene los datos de calidad del aire desde la API de Meteomatics
    y los retorna como una lista de diccionarios con lat, lon, pm2.5 y pm10.
    """
    url = (
        "https://api.meteomatics.com/"
        "2025-10-05T00:00:00Z/"
        "air_quality_pm2p5:idx,air_quality_pm10:idx/"
        "-12.00,-77.15_-12.40,-76.75:0.05,0.05/json"
    )

    # Autenticación básica sin warnings de Pylance
    res = requests.get(url, auth=HTTPBasicAuth(METEO_USER, METEO_PASS))
    res.raise_for_status()
    data = res.json()

    results = []
    for coord in data["data"][0]["coordinates"]:
        lat = coord["lat"]
        lon = coord["lon"]
        pm25_val = coord["dates"][0]["value"]

        pm10_val = next(
            (c["dates"][0]["value"] for c in data["data"][1]["coordinates"]
             if c["lat"] == lat and c["lon"] == lon),
            None
        )

        results.append({
            "timestamp": "2025-10-05T00:00:00Z",
            "latitud": lat,
            "longitud": lon,
            "pm25_index": pm25_val,
            "pm10_index": pm10_val
        })

    return results
