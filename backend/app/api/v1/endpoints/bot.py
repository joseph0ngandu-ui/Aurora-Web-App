from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from app.api import deps
from app.schemas.common import APIResponse
from app.models import BotStatus
from app.db_models import User
# We need to access the global trading_service instance from main or a dependency
# For now, we'll import it from main, but ideally it should be a dependency override
# To avoid circular imports, we might need to move the initialization to a separate file
# But for now, let's assume we can get it or re-instantiate it (it's a singleton-ish service)
from app.trading_service import TradingService

router = APIRouter()
trading_service = TradingService() # It uses local state, so new instance might be okay if state is file-based

@router.get("/status", response_model=APIResponse[BotStatus])
def get_bot_status() -> Any:
    """
    Get current bot status.
    """
    try:
        status_data = trading_service.get_bot_status()
        return APIResponse(data=status_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/start", response_model=APIResponse[str])
def start_bot(current_user: User = Depends(deps.get_current_user)) -> Any:
    """
    Start the trading bot.
    """
    try:
        trading_service.start_bot()
        return APIResponse(message="Trading bot started")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/stop", response_model=APIResponse[str])
def stop_bot(current_user: User = Depends(deps.get_current_user)) -> Any:
    """
    Stop the trading bot.
    """
    try:
        trading_service.stop_bot()
        return APIResponse(message="Trading bot stopped")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/pause", response_model=APIResponse[str])
def pause_bot(current_user: User = Depends(deps.get_current_user)) -> Any:
    """
    Pause the trading bot.
    """
    try:
        trading_service.pause_bot()
        return APIResponse(message="Trading bot paused")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
