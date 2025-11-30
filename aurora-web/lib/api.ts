// API Client for Eden Backend
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface APIResponse<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
}

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

class EdenAPI {
    private token: string | null = null;

    async login(username: string, password: string) {
        // OAuth2 standard form data
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const res = await fetch(`${API_BASE}/auth/login/access-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData,
        });

        if (!res.ok) throw new Error('Login failed');

        const data = await res.json();
        this.token = data.access_token;
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', data.access_token);
        }
        return data;
    }

    private async authFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const token = this.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

        const res = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                ...(token && { 'Authorization': `Bearer ${token}` }),
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json: APIResponse<T> = await res.json();

        // Unwrap the standard response wrapper
        if (json.success === false) {
            throw new Error(json.message || 'API operation failed');
        }
        return json.data;
    }

    async getBotStatus(): Promise<BotStatus> {
        return this.authFetch<BotStatus>('/bot/status');
    }

    async getTradeHistory(limit = 100): Promise<Trade[]> {
        return this.authFetch<Trade[]>(`/trades/history?limit=${limit}`);
    }

    async getPerformanceStats(): Promise<PerformanceStats> {
        return this.authFetch<PerformanceStats>('/performance/stats');
    }

    async startBot() {
        return this.authFetch<string>('/bot/start', { method: 'POST' });
    }

    async stopBot() {
        return this.authFetch<string>('/bot/stop', { method: 'POST' });
    }

    // WebSocket for real-time updates
    connectWebSocket(onMessage: (data: any) => void) {
        const token = this.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
        // Use ws:// for localhost:8000 (HTTP)
        const wsUrl = API_BASE.replace('http', 'ws').replace('/api/v1', '');
        const ws = new WebSocket(`${wsUrl}/api/v1/ws/updates/${token}`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessage(data);
        };

        return ws;
    }
}

export const api = new EdenAPI();
