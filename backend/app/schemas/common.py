from typing import Generic, TypeVar, Optional, Any
from datetime import datetime
from pydantic import BaseModel, Field

T = TypeVar("T")

class APIResponse(BaseModel, Generic[T]):
    """
    Standard API Response Wrapper.
    All API endpoints should return this format.
    """
    success: bool = Field(default=True, description="Whether the operation was successful")
    message: str = Field(default="Operation successful", description="Human-readable message")
    data: Optional[T] = Field(default=None, description="The actual response data")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Server timestamp")
    request_id: Optional[str] = Field(default=None, description="Request ID for tracing")

class ErrorResponse(BaseModel):
    """
    Standard Error Response.
    """
    success: bool = False
    message: str
    error_code: Optional[str] = None
    details: Optional[Any] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
