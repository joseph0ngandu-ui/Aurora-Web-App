# Eden Trading Bot - Backend V2 (Standardized)

We have redesigned the backend to follow industry standards, improving connectivity and ease of use.

## Key Changes
1.  **Standard API Structure**: Endpoints are now under `/api/v1/...`.
2.  **Simplified Connectivity**: The server runs on **HTTP port 8000** by default. No more self-signed SSL certificate errors.
3.  **Standard Auth**: Uses standard OAuth2 (Bearer Token) authentication.
4.  **Modular Code**: The codebase is now organized into `api`, `core`, `schemas`, and `services`.

## How to Start

### 1. Start the Backend
Double-click `start_backend_v2.bat` in the root folder.
This will start the server at `http://localhost:8000`.

### 2. Verify Connection
Run the verification script:
```bash
python verify_v2.py
```

### 3. API Documentation
Once the server is running, open your browser to:
[http://localhost:8000/docs](http://localhost:8000/docs)
You will see the interactive Swagger UI where you can test all endpoints.

## Frontend Updates
The `aurora-web` frontend has been updated to communicate with this new backend.
Ensure your `.env.local` or `.env` in `aurora-web` has:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```
