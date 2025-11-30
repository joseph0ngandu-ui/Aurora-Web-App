# Vercel Deployment Guide - Proxy Architecture

## ✅ New Architecture Implemented

Your Aurora Web App now uses a **proxy-based architecture** that solves all deployment issues:

- **Frontend** → Calls `/api/*` routes (local to Vercel)
- **Vercel Serverless Functions** → Proxy requests to your backend
- **Backend** → Running on your server via Tailscale

### Benefits:
✅ No client-side environment variables needed  
✅ No CORS issues  
✅ Backend URL hidden from browser  
✅ Works perfectly on Vercel  
✅ 100% free solution  

---

## Deployment Steps

### 1. Commit and Push Changes

```bash
cd c:\Users\opc\Desktop\Aurora-Web-App
git add .
git commit -m "Implement API proxy for Vercel deployment"
git push origin main
```

### 2. Configure Vercel (Optional)

The backend URL is now hardcoded in the proxy route, but you can override it:

**In Vercel Dashboard:**
- Go to Settings → Environment Variables
- Add (optional):
  - Key: `BACKEND_URL`
  - Value: `https://windowsserver.taildbc5d3.ts.net`
  - Environments: Production, Preview, Development

**Note**: This is optional because the URL is already set as the default in the code.

### 3. Deploy

Vercel will automatically deploy when you push to GitHub.

**Or manually trigger:**
1. Go to Vercel Dashboard → Your Project
2. Deployments tab
3. Click "Redeploy" on the latest deployment

---

## How It Works

### Request Flow:

```
Browser (Vercel)
    ↓
GET /api/bot/status
    ↓
Vercel Serverless Function (app/api/[...path]/route.ts)
    ↓
GET https://windowsserver.taildbc5d3.ts.net/bot/status
    ↓
Your Backend Server
    ↓
Response flows back through the same chain
```

### Example API Calls:

| Frontend Call | Proxied To |
|--------------|------------|
| `GET /api/bot/status` | `GET https://windowsserver.taildbc5d3.ts.net/bot/status` |
| `POST /api/auth/login-local` | `POST https://windowsserver.taildbc5d3.ts.net/auth/login-local` |
| `GET /api/trades/history?limit=100` | `GET https://windowsserver.taildbc5d3.ts.net/trades/history?limit=100` |

---

## Verification

After deployment:

### 1. Check the Deployed App
Visit: https://aurora-web-app-seven.vercel.app

### 2. Login
- The app will automatically redirect you to `/login` if you are not authenticated.
- Enter your email and password.
- Upon successful login, you will be redirected to the dashboard.

### 3. Open Browser DevTools (F12)
- Go to **Network** tab
- Refresh the page
- You should see requests to `/api/bot/status`, `/api/trades/recent`, etc.
- These should return **200 OK** (after login)

### 4. Check Console
- No more `localhost:8443` errors
- API calls go to `/api/*` routes

---

## Local Development

To run locally:

```bash
cd aurora-web
npm install
npm run dev
```

The app will run on `http://localhost:3000` and proxy API calls to your Tailscale backend.

**To use a local backend during development:**

Create `.env.local`:
```bash
BACKEND_URL=http://localhost:8443
```

Then restart the dev server.

---

## Troubleshooting

### Issue: API calls return 500 errors

**Check Vercel Function Logs:**
1. Go to Vercel Dashboard → Your Project
2. Click on the deployment
3. Go to "Functions" tab
4. Check logs for the `[...path]` function
5. Look for proxy errors

**Common causes:**
- Backend is not running
- Tailscale Funnel is not active
- Backend URL is incorrect

**Verify backend is accessible:**
```bash
curl https://windowsserver.taildbc5d3.ts.net/health
# Should return: {"status":"ok"}
```

### Issue: Vercel function timeout

Vercel free tier has a 10-second timeout for serverless functions. If your backend takes longer than 10 seconds to respond, the request will fail.

**Solution:**
- Optimize your backend response time
- Or upgrade to Vercel Pro ($20/month) for 60-second timeout

### Issue: CORS errors

The proxy handles CORS automatically. If you see CORS errors, check:
1. The request is going to `/api/*` (not directly to backend)
2. The proxy route is deployed correctly

---

## Backend Requirements

For the deployment to work:

1. ✅ **Backend running** on your server
2. ✅ **Tailscale Funnel active**:
   ```bash
   tailscale funnel 8443
   ```
3. ✅ **Port 8443 listening**
4. ✅ **HTTPS endpoint accessible** from internet

**Verify:**
```bash
# Check backend is running
netstat -ano | findstr 8443

# Check Tailscale status
tailscale status
# Should show: "Funnel on: https://windowsserver.taildbc5d3.ts.net"

# Test endpoint
curl https://windowsserver.taildbc5d3.ts.net/health
```

---

## Architecture Comparison

### Before (Direct API Calls):
```
Browser → https://windowsserver.taildbc5d3.ts.net/bot/status
❌ CORS issues
❌ Environment variables don't work on Vercel
❌ Backend URL exposed to browser
```

### After (Proxy):
```
Browser → /api/bot/status → Vercel Function → Backend
✅ No CORS issues
✅ Works perfectly on Vercel
✅ Backend URL hidden
✅ Professional architecture
```

---

## Cost

**Everything is FREE:**
- ✅ Vercel hosting: Free tier
- ✅ Vercel serverless functions: 100GB-hours/month free
- ✅ Tailscale Funnel: Free
- ✅ GitHub: Free

**Limits:**
- Vercel: 100GB bandwidth/month (plenty for personal use)
- Vercel Functions: 10-second timeout (usually enough)
- Tailscale: Unlimited bandwidth

---

## Next Steps

1. ✅ Push changes to GitHub
2. ✅ Wait for Vercel to deploy (1-2 minutes)
3. ✅ Test the deployed app
4. ✅ Verify API calls work correctly
5. ✅ Enjoy your deployed trading dashboard! 🚀

---

## Support

If you encounter issues:
1. Check Vercel function logs
2. Verify backend is running: `curl https://windowsserver.taildbc5d3.ts.net/health`
3. Check browser console for errors
4. Check network tab to see actual requests being made
