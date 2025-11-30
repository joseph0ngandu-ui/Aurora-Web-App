from typing import Any, List, Dict
from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from app.schemas.common import APIResponse
from app.models import PerformanceStats
from app.db_models import User
from app.trading_service import TradingService

router = APIRouter()
trading_service = TradingService()

@router.get("/stats", response_model=APIResponse[PerformanceStats])
def get_performance_stats() -> Any:
    """
    Get performance statistics.
    """
    try:
        stats = trading_service.calculate_performance_stats()
        return APIResponse(data=stats)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/equity-curve", response_model=APIResponse[List[Dict[str, Any]]])
def get_equity_curve(current_user: User = Depends(deps.get_current_user)) -> Any:
    """
    Get equity curve.
    """
    try:
        curve = trading_service.get_equity_curve()
        return APIResponse(data=curve)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/daily-summary", response_model=APIResponse[List[Dict[str, Any]]])
def get_daily_summary(current_user: User = Depends(deps.get_current_user)) -> Any:
    """
    Get daily summary.
    """
    try:
        summary = trading_service.get_daily_summary()
        return APIResponse(data=summary)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
