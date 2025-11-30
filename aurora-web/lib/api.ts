// API Client for Aurora Backend
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://windowsserver.taildbc5d3.ts.net';
const ENABLE_WEBSOCKET = process.env.NEXT_PUBLIC_ENABLE_WEBSOCKET !== 'false';

export interface BotStatus {
    is_running: boolean;
    balance: number;
    equity: number;
    open_positions: number;
    daily_pnl: number;
    total_trades: number;
    win_rate: number;
}

export interface Trade {
    id: string;
    symbol: string;
    type: string;
    entry_price: number;
    exit_price: number | null;
    profit: number;
    timestamp: string;
}

export interface PerformanceStats {
    total_return: number;
    sharpe_ratio: number;
    max_drawdown: number;
    win_rate: number;
    total_trades: number;
}

class AuroraAPI {
    private token: string | null = null;

    async login(email: string, password: string) {
        try {
            const res = await fetch(`${API_BASE}/auth/login-local`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error('Login failed');

            const data = await res.json();
            this.token = data.access_token;
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.access_token);
            }
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    private async authFetch(endpoint: string, options: RequestInit = {}) {
        const token = this.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

        try {
            const res = await fetch(`${API_BASE}${endpoint}`, {
                ...options,
                headers: {
                    ...options.headers,
                    ...(token && { 'Authorization': `Bearer ${token}` }),
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                console.error(`API error: ${res.status} for ${endpoint}`);
                throw new Error(`API error: ${res.status}`);
            }
            return res.json();
        } catch (error) {
            console.error(`Failed to fetch ${endpoint}:`, error);
            throw error;
        }
    }

    async getBotStatus(): Promise<BotStatus> {
        return this.authFetch('/bot/status');
    }

    async getTradeHistory(limit = 100): Promise<Trade[]> {
        return this.authFetch(`/trades/history?limit=${limit}`);
    }

    async getPerformanceStats(): Promise<PerformanceStats> {
        return this.authFetch('/performance/stats');
    }

    async startBot() {
        return this.authFetch('/bot/start', { method: 'POST' });
    }

    async stopBot() {
        return this.authFetch('/bot/stop', { method: 'POST' });
    }

    // WebSocket for real-time updates
    // Note: WebSocket may not work on Vercel due to serverless limitations
    connectWebSocket(onMessage: (data: any) => void): WebSocket | null {
        if (!ENABLE_WEBSOCKET) {
            console.warn('WebSocket disabled in environment');
            return null;
        }

        try {
            const token = this.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
            
            // Convert API_BASE to WebSocket URL
            const wsUrl = API_BASE.replace(/^https?:\/\//, 'wss://').replace(/^http:\/\//, 'ws://');
            const ws = new WebSocket(`${wsUrl}/ws/updates/${token}`);

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    onMessage(data);
                } catch (error) {
                    console.error('WebSocket message parse error:', error);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            ws.onclose = () => {
                console.log('WebSocket connection closed');
            };

            return ws;
        } catch (error) {
            console.error('WebSocket connection failed:', error);
            return null;
        }
    }
}

export const api = new AuroraAPI();
