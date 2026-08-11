"""SQLAlchemy ORM models."""

from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, DateTime

from .database import Base


class TaskStatus:
    """Allowed values for a task's status column."""

    TODO = "To Do"
    IN_PROGRESS = "In Progress"
    DONE = "Done"

    ALL = (TODO, IN_PROGRESS, DONE)


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True, default="")
    status = Column(String, nullable=False, default=TaskStatus.TODO)
    created_at = Column(DateTime, default=_utcnow, nullable=False)
    updated_at = Column(DateTime, default=_utcnow, onupdate=_utcnow, nullable=False)
