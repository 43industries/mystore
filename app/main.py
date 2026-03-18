from __future__ import annotations

import os
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from .supabase_client import get_supabase


load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))

app = FastAPI(title="mystoreke.com (Python)")

cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in cors_origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_class=HTMLResponse)
def home(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "app_name": "MyStoreke",
        },
    )


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/listings")
def list_listings(limit: int = 50) -> dict[str, Any]:
    try:
        sb = get_supabase()
        res = sb.table("listings").select("*").limit(limit).execute()
        return {"data": res.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/listings")
def create_listing(payload: dict[str, Any]) -> dict[str, Any]:
    try:
        sb = get_supabase()
        res = sb.table("listings").insert(payload).execute()
        return {"data": res.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/drivers")
def list_drivers(limit: int = 50) -> dict[str, Any]:
    try:
        sb = get_supabase()
        res = sb.table("drivers").select("*").limit(limit).execute()
        return {"data": res.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/drivers")
def create_driver(payload: dict[str, Any]) -> dict[str, Any]:
    try:
        sb = get_supabase()
        res = sb.table("drivers").insert(payload).execute()
        return {"data": res.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

