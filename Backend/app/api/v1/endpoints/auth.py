from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from pydantic import BaseModel
from google.auth.transport import requests
from google.oauth2 import id_token
import logging
from app.db.database import get_db
from app.models import User
from app.schemas import UserRegister, UserLogin, TokenResponse, UserResponse
from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user
)
from app.core.config import settings

logger = logging.getLogger(__name__)

router = APIRouter()

class GoogleToken(BaseModel):
    token: str

class LinkedInToken(BaseModel):
    token: str

class OAuthEmail(BaseModel):
    email: str
    name: str = "OAuth User"

@router.post("/register", response_model=TokenResponse)
async def register(user_data: UserRegister, db: Session = Depends(get_db)):
    """Register a new user"""
    
    # Check if user already exists
    existing_user = db.query(User).filter(
        (User.email == user_data.email) | (User.username == user_data.username)
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or username already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    new_user = User(
        email=user_data.email,
        username=user_data.username,
        full_name=user_data.full_name,
        hashed_password=hashed_password
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": new_user.id},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserResponse.from_orm(new_user)
    }

@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """Login user and return JWT token"""
    
    # Find user by email
    user = db.query(User).filter(User.email == credentials.email).first()
    
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserResponse.from_orm(user)
    }

@router.post("/google", response_model=TokenResponse)
async def google_auth(oauth_data: OAuthEmail, db: Session = Depends(get_db)):
    """Google OAuth authentication - simplified for development"""
    try:
        email = oauth_data.email
        name = oauth_data.name
        
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is required for OAuth"
            )
        
        # Check if user exists, if not create them
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            # Create new user from Google OAuth
            # Generate a random password for OAuth users (they won't use it)
            random_password = get_password_hash(email)
            user = User(
                email=email,
                username=email.split('@')[0],  # Use email prefix as username
                full_name=name,
                hashed_password=random_password,
                is_oauth=True  # Mark as OAuth user
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            logger.info(f"New user created via Google OAuth: {email}")
        
        # Create access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.id},
            expires_delta=access_token_expires
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": UserResponse.from_orm(user)
        }
    
    except Exception as e:
        logger.error(f"Google OAuth error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OAuth authentication failed"
        )

@router.post("/linkedin", response_model=TokenResponse)
async def linkedin_auth(oauth_data: OAuthEmail, db: Session = Depends(get_db)):
    """LinkedIn OAuth authentication - simplified for development"""
    try:
        email = oauth_data.email
        name = oauth_data.name
        
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is required for OAuth"
            )
        
        # Check if user exists, if not create them
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            # Create new user from LinkedIn OAuth
            random_password = get_password_hash(email)
            user = User(
                email=email,
                username=email.split('@')[0],  # Use email prefix as username
                full_name=name,
                hashed_password=random_password,
                is_oauth=True  # Mark as OAuth user
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            logger.info(f"New user created via LinkedIn OAuth: {email}")
        
        # Create access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.id},
            expires_delta=access_token_expires
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": UserResponse.from_orm(user)
        }
    
    except Exception as e:
        logger.error(f"LinkedIn OAuth error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OAuth authentication failed"
        )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current logged-in user information"""
    
    user = db.query(User).filter(User.id == current_user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserResponse.from_orm(user)
