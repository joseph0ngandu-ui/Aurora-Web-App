# Aurora Web App

A modern Next.js web application for real-time trading bot monitoring with ML-powered analytics.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss)

## ✨ Features

- **Real-time Dashboard** - Monitor bot status, trades, and performance metrics
- **120fps Animations** - Silky smooth UI with hardware-accelerated transitions
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- **Type-Safe API** - Full TypeScript integration with backend
- **Dark Mode** - Optimized for extended trading sessions

## 🚀 Deploy to Vercel

### Step 1: Fork/Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Aurora-Web-App.git
cd Aurora-Web-App
```

### Step 2: Push to Your GitHub

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/Aurora-Web-App.git
git push -u origin main
```

### Step 3: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your `Aurora-Web-App` repository
4. Vercel will auto-detect the Next.js framework ✅

### Step 4: Configure Environment Variables

Before deploying, add these environment variables in Vercel:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend-url.com` | Your deployed backend API URL |
| `NEXT_PUBLIC_ENABLE_WEBSOCKET` | `false` | Disable WebSocket on Vercel (serverless limitation) |

**To add variables:**
1. In Vercel import screen, click **"Environment Variables"**
2. Add both variables above
3. Set for **Production**, **Preview**, and **Development** environments

### Step 5: Deploy! 🎉

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your app will be live at `https://your-app.vercel.app`

## 🔧 Local Development

If you want to run the app locally:

```bash
# Navigate to web app directory
cd aurora-web

# Install dependencies
npm install

# Create local environment file
cp .env.local.example .env.local

# Edit .env.local and set your backend URL
# NEXT_PUBLIC_API_URL=https://your-backend-url.com

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
Aurora-Web-App/
├── aurora-web/              # Next.js application
│   ├── app/                # App router pages
│   │   ├── page.tsx       # Main dashboard
│   │   ├── layout.tsx     # Root layout
│   │   └── globals.css    # Global styles
│   ├── lib/               # Utilities
│   │   └── api.ts         # Backend API client
│   ├── package.json       # Dependencies
│   ├── next.config.js     # Next.js config
│   ├── tailwind.config.js # Tailwind config
│   └── tsconfig.json      # TypeScript config
├── API_ENDPOINTS.md       # Backend API documentation
├── vercel.json            # Vercel configuration
└── README.md              # This file
```

## 🔌 Backend API

This web app connects to a separately deployed FastAPI backend.

**Backend URL**: `https://desktop-p1p7892.taildbc5d3.ts.net`

**Important**: Set this URL as `NEXT_PUBLIC_API_URL` in your Vercel environment variables.

### Complete API Endpoints

#### Authentication (No Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register-local` | Register new user |
| POST | `/auth/login-local` | Login user |
| GET | `/health` | Health check |
| GET | `/info` | API information |

#### Bot Control (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/bot/status` | Get bot status and metrics |
| POST | `/bot/start` | Start trading bot |
| POST | `/bot/stop` | Stop trading bot |
| POST | `/bot/pause` | Pause trading bot |

#### Trading (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/trades/open` | Get open positions |
| GET | `/trades/history` | Get trade history |
| GET | `/trades/recent` | Get recent trades |
| GET | `/trades/logs` | Get trade logs |
| POST | `/trades/close` | Close a position |

#### Performance (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/performance/stats` | Performance statistics |
| GET | `/performance/equity-curve` | Equity curve data |
| GET | `/performance/daily-summary` | Daily summary |

#### Account Management (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/account/mt5` | List all MT5 accounts |
| GET | `/account/mt5/primary` | Get primary MT5 account |
| POST | `/account/mt5` | Create MT5 account |
| PUT | `/account/mt5/{id}` | Update MT5 account |
| DELETE | `/account/mt5/{id}` | Delete MT5 account |

#### Strategies (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/strategy/config` | Get strategy config |
| POST | `/strategy/config` | Update strategy config |
| GET | `/strategy/symbols` | Get available symbols |
| GET | `/strategies` | List all strategies |
| POST | `/strategies` | Upload new strategy |
| GET | `/strategies/validated` | List validated strategies |
| GET | `/strategies/active` | List active strategies |
| PUT | `/strategies/{id}/activate` | Activate a strategy |
| PUT | `/strategies/{id}/deactivate` | Deactivate a strategy |
| PUT | `/strategies/{id}/promote` | Promote strategy to LIVE mode |
| PATCH | `/strategies/{id}/policy` | Update strategy policy |

#### System (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/system/status` | System status |
| POST | `/device/register` | Register device for push notifications |
| POST | `/orders/test` | Place test order |

### Authentication

All authenticated endpoints require a JWT token in the header:

```
Authorization: Bearer {access_token}
```

Get your token by logging in via `/auth/login-local`.

### WebSocket Support

```
wss://desktop-p1p7892.taildbc5d3.ts.net/ws/notifications
```

**Note**: WebSocket is disabled on Vercel deployments (`NEXT_PUBLIC_ENABLE_WEBSOCKET=false`)

## 🌐 Deployed Website

Once deployed to Vercel, your website will be available at:

```
https://your-project-name.vercel.app
```

**Example**: `https://aurora-trading-dashboard.vercel.app`

You can customize the domain in Vercel's project settings or add a custom domain.

## ⚙️ Configuration

### Environment Variables

Create `.env.local` in the `aurora-web/` directory:

```env
# Backend API URL (required)
NEXT_PUBLIC_API_URL=https://your-backend-url.com

# Enable WebSocket for real-time updates (optional)
# Set to false on Vercel due to serverless limitations
NEXT_PUBLIC_ENABLE_WEBSOCKET=false
```

### Vercel Settings

The `vercel.json` file is pre-configured to:
- Build from the `aurora-web/` directory
- Use Next.js framework detection
- Output to `.next` directory

## 🎨 Customization

### Colors

Edit `aurora-web/app/globals.css` to customize the theme:

```css
:root {
  --aurora-blue: #4A90E2;
  --aurora-background: #0A0E27;
  --aurora-surface: #141B3D;
  /* ... more colors */
}
```

### API Client

Edit `aurora-web/lib/api.ts` to add new API endpoints or modify existing ones.

## 🐛 Troubleshooting

### "Failed to load data" Error
- Check that `NEXT_PUBLIC_API_URL` is correctly set in Vercel environment variables
- Verify your backend is deployed and accessible
- Check backend CORS settings allow requests from your Vercel domain

### Vercel Shows Wrong Framework
- Make sure `vercel.json` exists in repository root
- Check that root directory is not set in Vercel project settings
- Redeploy after adding `vercel.json`

### WebSocket Not Working
- WebSockets don't work on Vercel's serverless platform
- Set `NEXT_PUBLIC_ENABLE_WEBSOCKET=false`
- The app works perfectly with REST API polling instead

## 📝 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For issues or questions:
- Review the [API documentation](API_ENDPOINTS.md)
- Check Vercel deployment logs
- Verify backend connectivity

---

**Built with modern web technologies** ⚡
