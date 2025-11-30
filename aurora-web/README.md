# Aurora Trading Dashboard

Real-time ML-powered trading bot monitoring dashboard built with Next.js 14.

## Features

- **Real-time Updates**: WebSocket connection for live bot status (optional for Vercel)
- **120fps Performance**: Optimized animations using CSS transforms and hardware acceleration
- **ML Integration**: Monitors ML Risk Manager decisions
- **Responsive Design**: Works on desktop, tablet, and mobile

## Quick Start

```bash
# Install dependencies
npm install

# Create .env.local (copy from .env.local.example)
cp .env.local.example .env.local

# Update NEXT_PUBLIC_API_URL in .env.local if needed

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## Deploy to Vercel

### Prerequisites
- A [Vercel account](https://vercel.com)
- Your backend API deployed and accessible via HTTPS

### Deployment Steps

1. **Push to GitHub repository**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"  
   - Import your GitHub repository

3. **Configure Environment Variables**
   In Vercel dashboard, add:
   - `NEXT_PUBLIC_API_URL` - Your backend API URL (e.g., `https://your-backend.com`)
   - `NEXT_PUBLIC_ENABLE_WEBSOCKET` - Set to `false` (WebSockets don't work on Vercel)

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

> **Note:** WebSocket real-time updates are not supported on Vercel due to its serverless architecture. The app works perfectly without WebSockets.

## Architecture

- **Next.js 14**: App Router for optimal performance
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling with custom design system
- **WebSocket**: Real-time bot status updates (optional)
- **API Client**: Type-safe Aurora backend integration

## Performance Optimizations

- CSS containment for layout isolation
- `will-change` and `translateZ(0)` for hardware acceleration
- Optimized re-renders with React memoization
- Lazy loading for non-critical components
- SWC minification in production

## Design System

- **Aurora Blue**: Primary brand color
- **Dark Mode**: Optimized for long trading sessions
- **Smooth Animations**: 120fps-capable transitions
- **Glassmorphism**: Modern UI aesthetics

---

Built with ❤️ by Joseph Ngandu
