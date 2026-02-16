from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models import Intern
from app.schemas import InternCreate, InternUpdate, InternResponse
from app.core.security import get_current_user

router = APIRouter()

@router.get("/", response_model=List[InternResponse])
async def get_all_interns(db: Session = Depends(get_db)):
    """Get all interns"""
    interns = db.query(Intern).all()
    return interns

@router.get("/{intern_id}", response_model=InternResponse)
async def get_intern(intern_id: int, db: Session = Depends(get_db)):
    """Get a specific intern by ID"""
    intern = db.query(Intern).filter(Intern.id == intern_id).first()
    
    if not intern:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Intern with id {intern_id} not found"
        )
    
    return intern

@router.post("/", response_model=InternResponse)
async def create_intern(
    intern_data: InternCreate,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new intern"""
    new_intern = Intern(**intern_data.dict())
    db.add(new_intern)
    db.commit()
    db.refresh(new_intern)
    
    return new_intern

@router.put("/{intern_id}", response_model=InternResponse)
async def update_intern(
    intern_id: int,
    intern_data: InternUpdate,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update an intern"""
    intern = db.query(Intern).filter(Intern.id == intern_id).first()
    
    if not intern:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Intern with id {intern_id} not found"
        )
    
    # Update only provided fields
    update_data = intern_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(intern, field, value)
    
    db.commit()
    db.refresh(intern)
    
    return intern

@router.delete("/{intern_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_intern(
    intern_id: int,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete an intern"""
    intern = db.query(Intern).filter(Intern.id == intern_id).first()
    
    if not intern:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Intern with id {intern_id} not found"
        )
    
    db.delete(intern)
    db.commit()
    
    return None
