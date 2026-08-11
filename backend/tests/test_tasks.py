"""Tests for the most important CRUD and validation behavior.

Uses an isolated in-memory SQLite database so tests never touch the
real taskflow.db file used by the running app.
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base, get_db
from app.main import app

TEST_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=__import__("sqlalchemy.pool", fromlist=["StaticPool"]).StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(autouse=True)
def reset_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


client = TestClient(app)


def test_create_task_success():
    response = client.post(
        "/api/tasks",
        json={"title": "Write report", "description": "Weekly report", "status": "To Do"},
    )
    assert response.status_code == 201
    body = response.json()
    assert body["title"] == "Write report"
    assert body["status"] == "To Do"
    assert "id" in body


def test_create_task_without_title_fails():
    response = client.post("/api/tasks", json={"description": "No title here"})
    assert response.status_code == 422


def test_create_task_with_blank_title_fails():
    response = client.post("/api/tasks", json={"title": "   "})
    assert response.status_code == 422


def test_create_task_with_invalid_status_fails():
    response = client.post("/api/tasks", json={"title": "Valid title", "status": "Bogus"})
    assert response.status_code == 422


def test_list_tasks_returns_created_task():
    client.post("/api/tasks", json={"title": "Task A"})
    client.post("/api/tasks", json={"title": "Task B"})
    response = client.get("/api/tasks")
    assert response.status_code == 200
    assert len(response.json()) == 2


def test_update_task_status():
    created = client.post("/api/tasks", json={"title": "Task to update"}).json()
    response = client.put(f"/api/tasks/{created['id']}", json={"status": "Done"})
    assert response.status_code == 200
    assert response.json()["status"] == "Done"


def test_delete_task():
    created = client.post("/api/tasks", json={"title": "Task to delete"}).json()
    delete_response = client.delete(f"/api/tasks/{created['id']}")
    assert delete_response.status_code == 204

    get_response = client.get(f"/api/tasks/{created['id']}")
    assert get_response.status_code == 404


def test_get_nonexistent_task_returns_404():
    response = client.get("/api/tasks/9999")
    assert response.status_code == 404


def test_update_nonexistent_task_returns_404():
    response = client.put("/api/tasks/9999", json={"title": "Nope"})
    assert response.status_code == 404
