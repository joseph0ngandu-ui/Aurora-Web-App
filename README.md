# Aurora Web App

A modern web application with a FastAPI backend, providing real-time monitoring and management capabilities.

## 🚀 Features

- **Web Application (Next.js)**
  - Modern, responsive UI built with Next.js
  - Real-time data visualization
  - Interactive dashboard
  - TailwindCSS for styling
  
- **Backend API (FastAPI)**
  - RESTful API with comprehensive endpoints
  - WebSocket support for real-time updates
  - JWT authentication
  - Systematic status monitoring
  
## 📋 Prerequisites

- **For Web App:**
  - Node.js 16+ and npm
  
- **For Backend:**
  - Python 3.10+
  - Windows OS

## 🛠️ Installation

### Web App Setup

1. **Navigate to web app directory**
   ```bash
   cd aurora-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Copy `.env.example` to `.env.local`
   - Update with your backend API URL

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   The web app will be available at `http://localhost:3000`

### Backend Setup

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment**
   - Copy `.env.example` to `.env`
   - Update with your settings

3. **Start the backend**
   ```bash
   cd backend
   python main.py
   ```
   
   The API will be available at `https://localhost:8443`

## 📁 Project Structure

```
Aurora-Web-App/
├── aurora-web/          # Next.js web application
│   ├── app/            # Next.js app directory
│   ├── lib/            # Utility libraries
│   ├── package.json    # Node dependencies
│   └── ...
├── backend/            # FastAPI backend server
│   ├── api/           # API endpoints
│   ├── main.py        # API entry point
│   └── ...
├── API_ENDPOINTS.md    # API documentation
└── requirements.txt    # Python dependencies
```

## 🔌 API Documentation

See [API_ENDPOINTS.md](API_ENDPOINTS.md) for complete API documentation.

Key endpoints:
- `GET /health` - System health status
- `GET /strategies` - List all strategies
- `GET /trades` - Trade history
- `GET /performance` - Performance metrics
- `WebSocket /ws` - Real-time updates

## 🧪 Testing

### Web App
```bash
cd aurora-web
npm run build
```

### Backend
Test API endpoints using the provided documentation in `API_ENDPOINTS.md`.

## 🔐 Security

- JWT-based authentication for API access
- Environment variables for sensitive data
- SSL/HTTPS encryption for communications
- No hardcoded credentials

## 📝 License

This project is proprietary software. All rights reserved.

## ⚠️ Disclaimer

This software is provided as-is for educational and development purposes.

---

**Built with modern web technologies**
