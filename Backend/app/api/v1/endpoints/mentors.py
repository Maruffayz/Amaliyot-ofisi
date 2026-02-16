from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models import Mentor
from app.schemas import MentorCreate, MentorUpdate, MentorResponse
from app.core.security import get_current_user

router = APIRouter()

@router.get("/", response_model=List[MentorResponse])
async def get_all_mentors(db: Session = Depends(get_db)):
    """Get all mentors"""
    mentors = db.query(Mentor).all()
    return mentors

@router.get("/{mentor_id}", response_model=MentorResponse)
async def get_mentor(mentor_id: int, db: Session = Depends(get_db)):
    """Get a specific mentor by ID"""
    mentor = db.query(Mentor).filter(Mentor.id == mentor_id).first()
    
    if not mentor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Mentor with id {mentor_id} not found"
        )
    
    return mentor

@router.post("/", response_model=MentorResponse)
async def create_mentor(
    mentor_data: MentorCreate,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new mentor"""
    new_mentor = Mentor(**mentor_data.dict())
    db.add(new_mentor)
    db.commit()
    db.refresh(new_mentor)
    
    return new_mentor

@router.put("/{mentor_id}", response_model=MentorResponse)
async def update_mentor(
    mentor_id: int,
    mentor_data: MentorUpdate,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a mentor"""
    mentor = db.query(Mentor).filter(Mentor.id == mentor_id).first()
    
    if not mentor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Mentor with id {mentor_id} not found"
        )
    
    # Update only provided fields
    update_data = mentor_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(mentor, field, value)
    
    db.commit()
    db.refresh(mentor)
    
    return mentor

@router.delete("/{mentor_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_mentor(
    mentor_id: int,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a mentor"""
    mentor = db.query(Mentor).filter(Mentor.id == mentor_id).first()
    
    if not mentor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Mentor with id {mentor_id} not found"
        )
    
    db.delete(mentor)
    db.commit()
    
    return None
