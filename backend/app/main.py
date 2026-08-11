"""TaskFlow API entrypoint."""

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from . import models
from .database import engine
from .routes import tasks

# Create tables automatically on startup if they don't already exist.
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TaskFlow API",
    description="REST API for the TaskFlow mini task tracker.",
    version="1.0.0",
)

# The frontend runs on a different port during development (Vite default
# is 5173), so CORS must be enabled for the browser to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Return a friendly, flat error message instead of FastAPI's default shape."""
    first_error = exc.errors()[0]
    message = first_error.get("msg", "Invalid request data")
    return JSONResponse(status_code=422, content={"detail": message})


app.include_router(tasks.router)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
