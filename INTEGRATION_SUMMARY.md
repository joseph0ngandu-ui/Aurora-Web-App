# Aurora Web App - API Integration Summary

## Backend Endpoint
**Base URL**: `https://windowsserver.taildbc5d3.ts.net` (Tailscale Funnel on Oracle Cloud)

## ✅ Fully Integrated Endpoints

### Authentication (2 endpoints)
- ✅ `POST /auth/register-local` - Register new user
- ✅ `POST /auth/login-local` - Login user

### Bot Control (4 endpoints)
- ✅ `GET /bot/status` - Get bot status
- ✅ `POST /bot/start` - Start the bot
- ✅ `POST /bot/stop` - Stop the bot
- ✅ `POST /bot/pause` - Pause the bot

### Trading (5 endpoints)
- ✅ `GET /trades/open` - Get open positions
- ✅ `GET /trades/history` - Get trade history
- ✅ `GET /trades/recent` - Get recent trades
- ✅ `GET /trades/logs` - Get trade logs
- ✅ `POST /trades/close` - Close a position

### Performance (3 endpoints)
- ✅ `GET /performance/stats` - Get performance statistics
- ✅ `GET /performance/equity-curve` - Get equity curve data
- ✅ `GET /performance/daily-summary` - Get daily summary

### Account Management (5 endpoints)
- ✅ `GET /account/mt5` - List all MT5 accounts
- ✅ `GET /account/mt5/primary` - Get primary MT5 account
- ✅ `POST /account/mt5` - Create MT5 account
- ✅ `PUT /account/mt5/{id}` - Update MT5 account
- ✅ `DELETE /account/mt5/{id}` - Delete MT5 account

### Strategy Configuration (3 endpoints)
- ✅ `GET /strategy/config` - Get strategy config
- ✅ `POST /strategy/config` - Update strategy config
- ✅ `GET /strategy/symbols` - Get available symbols

### Strategy Management (8 endpoints)
- ✅ `GET /strategies` - List all strategies
- ✅ `POST /strategies` - Upload new strategy
- ✅ `GET /strategies/validated` - List validated strategies
- ✅ `GET /strategies/active` - List active strategies
- ✅ `PUT /strategies/{id}/activate` - Activate a strategy
- ✅ `PUT /strategies/{id}/deactivate` - Deactivate a strategy
- ✅ `PUT /strategies/{id}/promote` - Promote strategy to LIVE mode
- ✅ `PATCH /strategies/{id}/policy` - Update strategy policy

### System (3 endpoints)
- ✅ `GET /health` - Health check
- ✅ `GET /system/status` - System status
- ✅ `GET /info` - API info

### Device & Notifications (1 endpoint)
- ✅ `POST /device/register` - Register device for push notifications

### Test Orders (1 endpoint)
- ✅ `POST /orders/test` - Place test order

### WebSocket (1 endpoint)
- ✅ `WSS /ws/notifications` - Real-time notifications

## Total: 36 Endpoints Integrated ✅

## Usage Example

```typescript
import { api } from '@/lib/api';

// Login
await api.login('user@example.com', 'password123');

// Get bot status
const status = await api.getBotStatus();

// Start bot
await api.startBot();

// Get trade history
const trades = await api.getTradeHistory(50);

// Get performance stats
const stats = await api.getPerformanceStats();

// Get equity curve
const equityCurve = await api.getEquityCurve();

// Get all strategies
const strategies = await api.getAllStrategies();

// Activate a strategy
await api.activateStrategy('strategy-id');

// Create MT5 account
await api.createMT5Account({
  account_number: '12345678',
  account_name: 'My Trading Account',
  broker: 'Deriv',
  server: 'Deriv-Demo',
  password: 'mt5password',
  is_primary: true
});

// Place test order
await api.placeTestOrder({
  symbol: 'Volatility 75 Index',
  side: 'BUY',
  volume: 0.01
});

// Connect WebSocket
const ws = api.connectWebSocket((data) => {
  console.log('Received:', data);
});
```

## Environment Configuration

### Local Development (.env.local)
```env
NEXT_PUBLIC_API_URL=https://windowsserver.taildbc5d3.ts.net
NEXT_PUBLIC_ENABLE_WEBSOCKET=true
```

### Vercel Production
Set in Vercel dashboard:
- `NEXT_PUBLIC_API_URL=https://windowsserver.taildbc5d3.ts.net`
- `NEXT_PUBLIC_ENABLE_WEBSOCKET=false` (WebSockets don't work on Vercel)

## Updates Made

1. ✅ **Complete API Client** - All 36 endpoints from `API_ENDPOINTS.md` integrated
2. ✅ **Type Safety** - Full TypeScript interfaces for all requests/responses
3. ✅ **WebSocket Fixed** - Updated to use `/ws/notifications` endpoint
4. ✅ **Dependencies Updated** - Next.js 15, ESLint 9, latest packages
5. ✅ **Build Warnings Fixed** - No more deprecated package warnings
6. ✅ **Environment Configured** - `.env.local` created with correct endpoint
7. ✅ **Documentation Updated** - README reflects new versions and endpoint

## Next Steps

To test the integration locally:

```bash
cd aurora-web
npm install
npm run dev
```

Then open http://localhost:3000 and verify the connection to your Oracle Cloud backend.
