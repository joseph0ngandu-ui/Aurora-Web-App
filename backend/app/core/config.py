import os
from typing import List, Union
from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Eden Trading Bot"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "development_secret_key_change_in_production")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./eden_trading.db")

    # MT5 Configuration
    MT5_PATH: str = os.getenv("MT5_PATH", r"C:\Program Files\MetaTrader 5 Terminal\terminal64.exe")
    
    # Trading Defaults
    DEFAULT_SYMBOL: str = "Volatility 75 Index"
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
