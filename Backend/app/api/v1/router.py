from fastapi import APIRouter
from app.api.v1.endpoints import auth, interns, volunteers, supervisors, mentors

router = APIRouter(prefix="/api/v1")

# Include all endpoint routers
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(interns.router, prefix="/interns", tags=["interns"])
router.include_router(volunteers.router, prefix="/volunteers", tags=["volunteers"])
router.include_router(supervisors.router, prefix="/supervisors", tags=["supervisors"])
router.include_router(mentors.router, prefix="/mentors", tags=["mentors"])
