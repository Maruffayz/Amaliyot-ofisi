from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum

class StatusEnum(str, Enum):
    ACTIVE = "Active"
    REVIEWING = "Reviewing"
    PENDING = "Pending"
    COMPLETED = "Completed"
    INACTIVE = "Inactive"

# ============== Auth Schemas ==============
class UserRegister(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class GoogleTokenRequest(BaseModel):
    token: str

# ============== Intern Schemas ==============
class InternCreate(BaseModel):
    name: str
    role: str
    status: Optional[StatusEnum] = StatusEnum.PENDING
    progress: Optional[float] = 0.0
    avatar: Optional[str] = None
    supervisor_id: Optional[int] = None

class InternUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    status: Optional[StatusEnum] = None
    progress: Optional[float] = None
    avatar: Optional[str] = None
    supervisor_id: Optional[int] = None

class InternResponse(BaseModel):
    id: int
    name: str
    role: str
    status: StatusEnum
    progress: float
    avatar: Optional[str] = None
    supervisor_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ============== Volunteer Schemas ==============
class VolunteerCreate(BaseModel):
    name: str
    role: str
    project: str
    status: Optional[StatusEnum] = StatusEnum.ACTIVE
    hours: Optional[float] = 0.0
    avatar: Optional[str] = None

class VolunteerUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    project: Optional[str] = None
    status: Optional[StatusEnum] = None
    hours: Optional[float] = None
    avatar: Optional[str] = None

class VolunteerResponse(BaseModel):
    id: int
    name: str
    role: str
    project: str
    status: StatusEnum
    hours: float
    avatar: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ============== Supervisor Schemas ==============
class SupervisorCreate(BaseModel):
    role: str
    department: str
    avatar: Optional[str] = None
    user_id: Optional[int] = None

class SupervisorUpdate(BaseModel):
    role: Optional[str] = None
    department: Optional[str] = None
    avatar: Optional[str] = None
    user_id: Optional[int] = None

class SupervisorResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    role: str
    department: str
    avatar: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ============== Mentor Schemas ==============
class MentorCreate(BaseModel):
    role: str
    department: str
    avatar: Optional[str] = None
    user_id: Optional[int] = None

class MentorUpdate(BaseModel):
    role: Optional[str] = None
    department: Optional[str] = None
    avatar: Optional[str] = None
    user_id: Optional[int] = None

class MentorResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    role: str
    department: str
    avatar: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
