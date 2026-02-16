from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models import Volunteer
from app.schemas import VolunteerCreate, VolunteerUpdate, VolunteerResponse
from app.core.security import get_current_user

router = APIRouter()

@router.get("/", response_model=List[VolunteerResponse])
async def get_all_volunteers(db: Session = Depends(get_db)):
    """Get all volunteers"""
    volunteers = db.query(Volunteer).all()
    return volunteers

@router.get("/{volunteer_id}", response_model=VolunteerResponse)
async def get_volunteer(volunteer_id: int, db: Session = Depends(get_db)):
    """Get a specific volunteer by ID"""
    volunteer = db.query(Volunteer).filter(Volunteer.id == volunteer_id).first()
    
    if not volunteer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Volunteer with id {volunteer_id} not found"
        )
    
    return volunteer

@router.post("/", response_model=VolunteerResponse)
async def create_volunteer(
    volunteer_data: VolunteerCreate,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new volunteer"""
    new_volunteer = Volunteer(**volunteer_data.dict())
    db.add(new_volunteer)
    db.commit()
    db.refresh(new_volunteer)
    
    return new_volunteer

@router.put("/{volunteer_id}", response_model=VolunteerResponse)
async def update_volunteer(
    volunteer_id: int,
    volunteer_data: VolunteerUpdate,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a volunteer"""
    volunteer = db.query(Volunteer).filter(Volunteer.id == volunteer_id).first()
    
    if not volunteer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Volunteer with id {volunteer_id} not found"
        )
    
    # Update only provided fields
    update_data = volunteer_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(volunteer, field, value)
    
    db.commit()
    db.refresh(volunteer)
    
    return volunteer

@router.delete("/{volunteer_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_volunteer(
    volunteer_id: int,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a volunteer"""
    volunteer = db.query(Volunteer).filter(Volunteer.id == volunteer_id).first()
    
    if not volunteer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Volunteer with id {volunteer_id} not found"
        )
    
    db.delete(volunteer)
    db.commit()
    
    return None
