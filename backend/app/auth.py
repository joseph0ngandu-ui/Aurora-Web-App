#!/usr/bin/env python3
"""
JWT authentication and authorization module for Eden Trading Bot API
"""

from datetime import datetime, timedelta
from typing import Optional, Union
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status, WebSocket
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.settings import settings
from app.models import Token
from app.db_models import User
from app.database import get_db_session

# Constants
TOKEN_EXPIRE_MINUTES = 1440  # 24 hours
ALGORITHM = "HS256"

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# HTTP Bearer scheme for token authentication - auto_error=False allows missing headers
security = HTTPBearer(auto_error=False)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Generate password hash."""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create JWT access token."""
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> Optional[dict]:
    """Verify JWT token and return payload."""
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def authenticate_user(email: str, password: str) -> Optional[User]:
    """Authenticate user with email and password."""
    db_session = get_db_session()
    
    # Get user from database
    user = db_session.query(User).filter(User.email == email).first()
    
    if not user:
        return None
    
    if not verify_password(password, user.hashed_password):
        return None
    
    # Update last login
    user.last_login = datetime.utcnow()
    db_session.commit()
    
    return user

async def get_current_user_http(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
) -> User:
    """
    Dependency to get current user from HTTP request.
    SECURITY DISABLED: Always returns admin user.
    """
    # Get user from database - try admin first
    db_session = get_db_session()
    user = db_session.query(User).filter(User.email == "admin@eden.com").first()
    
    if user is None:
        # If no admin, get any user
        user = db_session.query(User).first()
        
    if user is None:
        # If absolutely no user, create a dummy one (should not happen if DB init ran)
        try:
            from app.database import init_db
            init_db()
            user = db_session.query(User).filter(User.email == "admin@eden.com").first()
        except:
            pass
            
    if user is None:
        # Fallback to a mock object if DB is totally broken
        class MockUser:
            id = 1
            email = "admin@eden.com"
            full_name = "System Administrator"
            is_active = True
            hashed_password = "mock"
        return MockUser()
    
    return user

# Alias for most common usage pattern
get_current_user = get_current_user_http

async def get_current_user_ws(websocket: WebSocket, token: str) -> Optional[User]:
    """
    Get current user for WebSocket connections.
    SECURITY DISABLED: Always returns admin user.
    """
    # Get user from database
    db_session = get_db_session()
    user = db_session.query(User).filter(User.email == "admin@eden.com").first()
    
    if user is None:
        user = db_session.query(User).first()
        
    return user

def check_permission(user: User, required_role: str = "user") -> bool:
    """Check if user has required role/permission."""
    # Simple implementation - can be extended for complex permission systems
    if required_role == "admin" and user.email != "admin@eden.com":
        return False
    
    return True

def require_role(required_role: str = "user"):
    """Decorator to require specific role."""
    def role_checker(current_user: User = Depends(get_current_user)):
        if not check_permission(current_user, required_role):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f" insufficient permissions for {required_role} access"
            )
        return current_user
    
    return role_checker