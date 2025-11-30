from typing import Any, List, Dict
from fastapi import APIRouter, Depends, HTTPException, Body
from app.api import deps
from app.schemas.common import APIResponse
from app.models import Trade, Position
from app.db_models import User
from app.trading_service import TradingService

router = APIRouter()
trading_service = TradingService()

@router.get("/history", response_model=APIResponse[List[Trade]])
def get_trade_history(
    limit: int = 100,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    """
    Get historical trade data.
    """
    try:
        trades = trading_service.get_trade_history(limit=limit)
        return APIResponse(data=trades)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/open", response_model=APIResponse[List[Position]])
def get_open_positions() -> Any:
    """
    Get current open positions.
    """
    try:
        positions = trading_service.get_open_positions()
        return APIResponse(data=positions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/recent", response_model=APIResponse[List[Trade]])
def get_recent_trades(
    days: int = 7,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    """
    Get recent trades.
    """
    try:
        trades = trading_service.get_recent_trades(days=days)
        return APIResponse(data=trades)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/close", response_model=APIResponse[str])
def close_position(
    symbol: str = Body(..., embed=True),
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    """
    Close a position.
    """
    try:
        trading_service.close_position(symbol)
        return APIResponse(message=f"Position {symbol} closed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
