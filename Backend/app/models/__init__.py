from sqlalchemy import Column, Integer, String, DateTime, Enum, Float, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_oauth = Column(Boolean, default=False)  # Track if user registered via OAuth
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    interns = relationship("Intern", back_populates="supervisor")
    supervisors = relationship("Supervisor", back_populates="user")
    mentors = relationship("Mentor", back_populates="user")

class StatusEnum(str, enum.Enum):
    ACTIVE = "Active"
    REVIEWING = "Reviewing"
    PENDING = "Pending"
    COMPLETED = "Completed"
    INACTIVE = "Inactive"

class Intern(Base):
    __tablename__ = "interns"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    status = Column(Enum(StatusEnum), default=StatusEnum.PENDING)
    progress = Column(Float, default=0.0)
    avatar = Column(String, nullable=True)
    supervisor_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    supervisor = relationship("User", back_populates="interns")

class Volunteer(Base):
    __tablename__ = "volunteers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    project = Column(String, nullable=False)
    status = Column(Enum(StatusEnum), default=StatusEnum.ACTIVE)
    hours = Column(Float, default=0.0)
    avatar = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Supervisor(Base):
    __tablename__ = "supervisors"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    role = Column(String, nullable=False)
    department = Column(String, nullable=False)
    avatar = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="supervisors")

class Mentor(Base):
    __tablename__ = "mentors"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    role = Column(String, nullable=False)
    department = Column(String, nullable=False)
    avatar = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="mentors")
