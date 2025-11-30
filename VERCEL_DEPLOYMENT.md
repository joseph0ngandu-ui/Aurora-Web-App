# Vercel Deployment Guide

## ✅ Configuration Complete

Your Aurora Web App is now configured to connect to the backend running on your server via Tailscale Funnel.

### Backend URL
- **Production URL**: `https://windowsserver.taildbc5d3.ts.net`
- **Status**: ✅ Verified working

---

## Deployment Steps

### 1. Push Changes to GitHub
```bash
cd aurora-web
git add .
git commit -m "Configure production API endpoint"
git push origin main
```

### 2. Configure Vercel Environment Variables

Go to your Vercel project dashboard:
1. Navigate to **Settings** → **Environment Variables**
2. Add the following variable:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://windowsserver.taildbc5d3.ts.net` | Production, Preview, Development |
| `NEXT_PUBLIC_ENABLE_WEBSOCKET` | `false` | Production, Preview |

> **Note**: WebSocket is disabled on Vercel because serverless functions don't support persistent connections. The app will fall back to polling.

### 3. Redeploy

After setting environment variables:
- Go to **Deployments** tab
- Click the **⋯** menu on the latest deployment
- Select **Redeploy**
- Check "Use existing Build Cache" (optional)
- Click **Redeploy**

---

## Verification

After deployment completes:

1. **Visit your Vercel URL** (e.g., `https://aurora-web.vercel.app`)
2. **Open Browser DevTools** (F12) → Console tab
3. **Check for API calls**:
   - You should see requests to `https://windowsserver.taildbc5d3.ts.net`
   - Login should work correctly
   - Dashboard should load bot status

### Expected Behavior
- ✅ Login page loads
- ✅ API calls go to `windowsserver.taildbc5d3.ts.net`
- ✅ Authentication works
- ✅ Dashboard displays real-time data
- ⚠️ WebSocket disabled (app uses polling instead)

---

## Troubleshooting

### Issue: "Failed to fetch" errors
**Solution**: Ensure your backend is running and Tailscale Funnel is active
```bash
# On your server, verify backend is running
netstat -ano | findstr 8443

# Verify Tailscale Funnel is active
tailscale status
# Should show: "Funnel on: https://windowsserver.taildbc5d3.ts.net"

# Test the endpoint
curl https://windowsserver.taildbc5d3.ts.net/health
# Should return: {"status":"ok"}
```

### Issue: CORS errors
**Solution**: Your backend should already have CORS enabled for all origins. If you see CORS errors, check your backend CORS configuration.

### Issue: 502 Bad Gateway
**Solution**: 
- Backend is not running on port 8443
- Tailscale Funnel is not properly configured
- Restart your backend service

---

## Backend Requirements

For the Vercel deployment to work, ensure:

1. ✅ **Backend is running** on your server
2. ✅ **Tailscale Funnel is active**:
   ```bash
   tailscale funnel 8443
   ```
3. ✅ **Port 8443 is listening**
4. ✅ **HTTPS endpoint is accessible** from the internet

---

## Local Development

To run locally with the production backend:

```bash
cd aurora-web
npm install
npm run dev
```

The app will connect to `https://windowsserver.taildbc5d3.ts.net` by default.

To use a different backend URL during development:
```bash
# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8443" > .env.local
npm run dev
```

---

## Security Notes

1. **Tailscale Funnel** exposes your backend to the public internet
2. **JWT Authentication** protects all sensitive endpoints
3. **HTTPS** encrypts all traffic
4. Consider implementing **rate limiting** on your backend
5. Monitor your backend logs for suspicious activity

---

## Next Steps

After successful deployment:
- [ ] Test login functionality
- [ ] Verify bot status updates
- [ ] Check trade history display
- [ ] Test bot start/stop controls
- [ ] Monitor backend logs for errors
- [ ] Set up monitoring/alerts for backend uptime

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify backend is running: `curl https://windowsserver.taildbc5d3.ts.net/health`
3. Check Vercel deployment logs
4. Verify environment variables are set correctly
