from app.api.v1.endpoints import auth, bot, trading, performance, websockets

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(bot.router, prefix="/bot", tags=["bot"])
api_router.include_router(trading.router, prefix="/trades", tags=["trades"])
api_router.include_router(performance.router, prefix="/performance", tags=["performance"])
api_router.include_router(websockets.router, prefix="/ws", tags=["websockets"])
# Will add other routers here as we migrate them
