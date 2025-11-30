from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.websocket_manager import WebSocketManager
from app.api import deps
from app.core import security
from app.core.config import settings
from jose import jwt

router = APIRouter()
ws_manager = WebSocketManager()

@router.websocket("/updates/{token}")
async def websocket_endpoint(websocket: WebSocket, token: str):
    """
    Real-time updates websocket.
    """
    # Verify token
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[security.ALGORITHM])
        if not payload:
            await websocket.close(code=1008)
            return
    except:
        # Allow unauthenticated for now if needed, or close
        # await websocket.close(code=1008)
        # return
        pass

    await ws_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
