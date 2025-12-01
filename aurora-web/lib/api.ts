<<<<<<< HEAD
// API Client for Eden Backend
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface APIResponse<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
=======
// API Client for Aurora Backend
// Use local API routes which proxy to the backend server
const API_BASE = '/api';
const ENABLE_WEBSOCKET = false; // WebSocket not supported through proxy

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface AuthResponse {
    access_token: string;
    token_type: string;
>>>>>>> 9852f12a9e977e586b48cae5816edbfa896cb009
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

export interface EquityCurvePoint {
    timestamp: string;
    equity: number;
}

export interface DailySummary {
    date: string;
    pnl: number;
    trades: number;
    win_rate: number;
}

export interface MT5Account {
    id: string;
    account_number: string;
    account_name: string;
    broker: string;
    server: string;
    is_primary: boolean;
    created_at: string;
}

export interface CreateMT5AccountRequest {
    account_number: string;
    account_name: string;
    broker: string;
    server: string;
    password: string;
    is_primary: boolean;
}

export interface StrategyConfig {
    symbols: string[];
    timeframe: string;
    risk_per_trade: number;
    max_positions: number;
}

export interface Strategy {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'validated';
    mode: 'DEMO' | 'LIVE';
    created_at: string;
}

export interface StrategyPolicy {
    max_daily_loss?: number;
    max_position_size?: number;
    allowed_symbols?: string[];
}

export interface SystemStatus {
    status: string;
    uptime: number;
    version: string;
}

export interface TestOrderRequest {
    symbol: string;
    side: 'BUY' | 'SELL';
    volume: number;
}

// ============================================================================
// MAIN API CLASS
// ============================================================================

class AuroraAPI {
    private token: string | null = null;

<<<<<<< HEAD
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
=======
    // ========================================================================
    // AUTHENTICATION ENDPOINTS
    // ========================================================================
>>>>>>> 9852f12a9e977e586b48cae5816edbfa896cb009

    async register(email: string, password: string, full_name: string): Promise<AuthResponse> {
        try {
            const res = await fetch(`${API_BASE}/auth/register-local`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, full_name }),
            });

            if (!res.ok) throw new Error('Registration failed');
            return res.json();
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

<<<<<<< HEAD
    private async authFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
=======
    async login(email: string, password: string): Promise<AuthResponse> {
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

    logout() {
        this.token = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
    }

    // ========================================================================
    // HELPER METHOD FOR AUTHENTICATED REQUESTS
    // ========================================================================

    private async authFetch(endpoint: string, options: RequestInit = {}) {
>>>>>>> 9852f12a9e977e586b48cae5816edbfa896cb009
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

<<<<<<< HEAD
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json: APIResponse<T> = await res.json();

        // Unwrap the standard response wrapper
        if (json.success === false) {
            throw new Error(json.message || 'API operation failed');
        }
        return json.data;
=======
            if (!res.ok) {
                console.error(`API error: ${res.status} for ${endpoint}`);
                throw new Error(`API error: ${res.status}`);
            }
            return res.json();
        } catch (error) {
            console.error(`Failed to fetch ${endpoint}:`, error);
            throw error;
        }
>>>>>>> 9852f12a9e977e586b48cae5816edbfa896cb009
    }

    // ========================================================================
    // BOT CONTROL ENDPOINTS
    // ========================================================================

    async getBotStatus(): Promise<BotStatus> {
        return this.authFetch<BotStatus>('/bot/status');
    }

<<<<<<< HEAD
    async getTradeHistory(limit = 100): Promise<Trade[]> {
        return this.authFetch<Trade[]>(`/trades/history?limit=${limit}`);
    }

    async getPerformanceStats(): Promise<PerformanceStats> {
        return this.authFetch<PerformanceStats>('/performance/stats');
    }

=======
>>>>>>> 9852f12a9e977e586b48cae5816edbfa896cb009
    async startBot() {
        return this.authFetch<string>('/bot/start', { method: 'POST' });
    }

    async stopBot() {
        return this.authFetch<string>('/bot/stop', { method: 'POST' });
    }

    async pauseBot() {
        return this.authFetch('/bot/pause', { method: 'POST' });
    }

    // ========================================================================
    // TRADING ENDPOINTS
    // ========================================================================

    async getOpenTrades(): Promise<Trade[]> {
        return this.authFetch('/trades/open');
    }

    async getTradeHistory(limit = 100): Promise<Trade[]> {
        return this.authFetch(`/trades/history?limit=${limit}`);
    }

    async getRecentTrades(): Promise<Trade[]> {
        return this.authFetch('/trades/recent');
    }

    async getTradeLogs() {
        return this.authFetch('/trades/logs');
    }

    async closeTrade(tradeId: string) {
        return this.authFetch('/trades/close', {
            method: 'POST',
            body: JSON.stringify({ trade_id: tradeId }),
        });
    }

    // ========================================================================
    // PERFORMANCE ENDPOINTS
    // ========================================================================

    async getPerformanceStats(): Promise<PerformanceStats> {
        return this.authFetch('/performance/stats');
    }

    async getEquityCurve(): Promise<EquityCurvePoint[]> {
        return this.authFetch('/performance/equity-curve');
    }

    async getDailySummary(): Promise<DailySummary[]> {
        return this.authFetch('/performance/daily-summary');
    }

    // ========================================================================
    // ACCOUNT MANAGEMENT ENDPOINTS
    // ========================================================================

    async getMT5Accounts(): Promise<MT5Account[]> {
        return this.authFetch('/account/mt5');
    }

    async getPrimaryMT5Account(): Promise<MT5Account> {
        return this.authFetch('/account/mt5/primary');
    }

    async createMT5Account(account: CreateMT5AccountRequest): Promise<MT5Account> {
        return this.authFetch('/account/mt5', {
            method: 'POST',
            body: JSON.stringify(account),
        });
    }

    async updateMT5Account(id: string, updates: Partial<CreateMT5AccountRequest>): Promise<MT5Account> {
        return this.authFetch(`/account/mt5/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }

    async deleteMT5Account(id: string) {
        return this.authFetch(`/account/mt5/${id}`, { method: 'DELETE' });
    }

    // ========================================================================
    // STRATEGY ENDPOINTS
    // ========================================================================

    async getStrategyConfig(): Promise<StrategyConfig> {
        return this.authFetch('/strategy/config');
    }

    async updateStrategyConfig(config: Partial<StrategyConfig>) {
        return this.authFetch('/strategy/config', {
            method: 'POST',
            body: JSON.stringify(config),
        });
    }

    async getAvailableSymbols(): Promise<string[]> {
        return this.authFetch('/strategy/symbols');
    }

    // ========================================================================
    // STRATEGY MANAGEMENT ENDPOINTS
    // ========================================================================

    async getAllStrategies(): Promise<Strategy[]> {
        return this.authFetch('/strategies');
    }

    async getValidatedStrategies(): Promise<Strategy[]> {
        return this.authFetch('/strategies/validated');
    }

    async getActiveStrategies(): Promise<Strategy[]> {
        return this.authFetch('/strategies/active');
    }

    async uploadStrategy(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        const token = this.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
<<<<<<< HEAD
        // Use ws:// for localhost:8000 (HTTP)
        const wsUrl = API_BASE.replace('http', 'ws').replace('/api/v1', '');
        const ws = new WebSocket(`${wsUrl}/api/v1/ws/updates/${token}`);
=======
>>>>>>> 9852f12a9e977e586b48cae5816edbfa896cb009

        const res = await fetch(`${API_BASE}/strategies`, {
            method: 'POST',
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            body: formData,
        });

        if (!res.ok) throw new Error('Strategy upload failed');
        return res.json();
    }

    async activateStrategy(id: string) {
        return this.authFetch(`/strategies/${id}/activate`, { method: 'PUT' });
    }

    async deactivateStrategy(id: string) {
        return this.authFetch(`/strategies/${id}/deactivate`, { method: 'PUT' });
    }

    async promoteStrategy(id: string) {
        return this.authFetch(`/strategies/${id}/promote`, { method: 'PUT' });
    }

    async updateStrategyPolicy(id: string, policy: StrategyPolicy) {
        return this.authFetch(`/strategies/${id}/policy`, {
            method: 'PATCH',
            body: JSON.stringify(policy),
        });
    }

    // ========================================================================
    // SYSTEM ENDPOINTS
    // ========================================================================

    async healthCheck() {
        const res = await fetch(`${API_BASE}/health`);
        if (!res.ok) throw new Error('Health check failed');
        return res.json();
    }

    async getSystemStatus(): Promise<SystemStatus> {
        return this.authFetch('/system/status');
    }

    async getAPIInfo() {
        const res = await fetch(`${API_BASE}/info`);
        if (!res.ok) throw new Error('API info fetch failed');
        return res.json();
    }

    // ========================================================================
    // DEVICE & NOTIFICATIONS
    // ========================================================================

    async registerDevice(token: string) {
        return this.authFetch('/device/register', {
            method: 'POST',
            body: JSON.stringify({ token }),
        });
    }

    // ========================================================================
    // TEST ORDERS
    // ========================================================================

    async placeTestOrder(order: TestOrderRequest) {
        return this.authFetch('/orders/test', {
            method: 'POST',
            body: JSON.stringify(order),
        });
    }

    // ========================================================================
    // WEBSOCKET CONNECTION
    // ========================================================================

    connectWebSocket(onMessage: (data: any) => void): WebSocket | null {
        if (!ENABLE_WEBSOCKET) {
            console.warn('WebSocket disabled in environment');
            return null;
        }

        try {
            const token = this.token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

            // Convert API_BASE to WebSocket URL and use /ws/notifications endpoint
            const wsUrl = API_BASE.replace(/^https?:\/\//, 'wss://').replace(/^http:\/\//, 'ws://');
            const ws = new WebSocket(`${wsUrl}/ws/notifications?token=${token}`);

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

            ws.onopen = () => {
                console.log('WebSocket connection established');
            };

            return ws;
        } catch (error) {
            console.error('WebSocket connection failed:', error);
            return null;
        }
    }
}

export const api = new AuroraAPI();
