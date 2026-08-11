"""Pydantic schemas used for request validation and response shaping."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, field_validator

from .models import TaskStatus


def _validate_status(value: str) -> str:
    if value not in TaskStatus.ALL:
        allowed = ", ".join(TaskStatus.ALL)
        raise ValueError(f"Status must be one of: {allowed}")
    return value


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    status: str = TaskStatus.TODO

    @field_validator("title")
    @classmethod
    def title_must_not_be_blank(cls, value: str) -> str:
        trimmed = value.strip()
        if not trimmed:
            raise ValueError("Title is required and cannot be blank")
        return trimmed

    @field_validator("status")
    @classmethod
    def status_must_be_valid(cls, value: str) -> str:
        return _validate_status(value)


class TaskUpdate(BaseModel):
    """All fields optional so callers can send a partial update."""

    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

    @field_validator("title")
    @classmethod
    def title_must_not_be_blank(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        trimmed = value.strip()
        if not trimmed:
            raise ValueError("Title cannot be blank")
        return trimmed

    @field_validator("status")
    @classmethod
    def status_must_be_valid(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        return _validate_status(value)


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = ""
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
