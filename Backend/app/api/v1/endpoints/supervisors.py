from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models import Supervisor
from app.schemas import SupervisorCreate, SupervisorUpdate, SupervisorResponse
from app.core.security import get_current_user

router = APIRouter()

@router.get("/", response_model=List[SupervisorResponse])
async def get_all_supervisors(db: Session = Depends(get_db)):
    """Get all supervisors"""
    supervisors = db.query(Supervisor).all()
    return supervisors

@router.get("/{supervisor_id}", response_model=SupervisorResponse)
async def get_supervisor(supervisor_id: int, db: Session = Depends(get_db)):
    """Get a specific supervisor by ID"""
    supervisor = db.query(Supervisor).filter(Supervisor.id == supervisor_id).first()
    
    if not supervisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Supervisor with id {supervisor_id} not found"
        )
    
    return supervisor

@router.post("/", response_model=SupervisorResponse)
async def create_supervisor(
    supervisor_data: SupervisorCreate,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new supervisor"""
    new_supervisor = Supervisor(**supervisor_data.dict())
    db.add(new_supervisor)
    db.commit()
    db.refresh(new_supervisor)
    
    return new_supervisor

@router.put("/{supervisor_id}", response_model=SupervisorResponse)
async def update_supervisor(
    supervisor_id: int,
    supervisor_data: SupervisorUpdate,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a supervisor"""
    supervisor = db.query(Supervisor).filter(Supervisor.id == supervisor_id).first()
    
    if not supervisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Supervisor with id {supervisor_id} not found"
        )
    
    # Update only provided fields
    update_data = supervisor_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(supervisor, field, value)
    
    db.commit()
    db.refresh(supervisor)
    
    return supervisor

@router.delete("/{supervisor_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_supervisor(
    supervisor_id: int,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a supervisor"""
    supervisor = db.query(Supervisor).filter(Supervisor.id == supervisor_id).first()
    
    if not supervisor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Supervisor with id {supervisor_id} not found"
        )
    
    db.delete(supervisor)
    db.commit()
    
    return None
