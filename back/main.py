import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="NASA APOD API")

# Update CORS to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for simplicity in local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NASA_API_KEY = os.getenv("NASA_API_KEY", "DEMO_KEY")

@app.get("/api/apod")
def get_apod(date: str):
    """
    Fetch the Astronomy Picture of the Day for a given date.
    """
    url = f"https://api.nasa.gov/planetary/apod"
    params = {
        "api_key": NASA_API_KEY,
        "date": date
    }
    
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    
    try:
        response = requests.get(url, params=params, verify=False)
        response.raise_for_status()
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))
