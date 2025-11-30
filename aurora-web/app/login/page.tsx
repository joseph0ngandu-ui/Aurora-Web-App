'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await api.login(email, password)
            router.push('/')
        } catch (err) {
            console.error('Login failed:', err)
            setError('Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-aurora-background flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-aurora-surface border border-aurora-border rounded-xl p-8 shadow-2xl animate-scale-in">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-aurora-text mb-2">Welcome Back</h1>
                    <p className="text-aurora-textMuted">Sign in to your Aurora Dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-aurora-error/10 border border-aurora-error/20 text-aurora-error px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-aurora-textMuted mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-aurora-background border border-aurora-border rounded-lg px-4 py-3 text-aurora-text focus:outline-none focus:ring-2 focus:ring-aurora-primary transition-all duration-200"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-aurora-textMuted mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-aurora-background border border-aurora-border rounded-lg px-4 py-3 text-aurora-text focus:outline-none focus:ring-2 focus:ring-aurora-primary transition-all duration-200"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-aurora-primary text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'
                            }`}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )
}
