import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//For Local Development, change the API_URL to your backend URL if different
const API_URL = 'https://localhost:7222/api/auth/login';
//For Production, use the relative path
//const API_URL = import.meta.env.VITE_API_URL + '/auth/login';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {

        e.preventDefault();

        try {
            setLoading(true);
            setError('');

            const res = await axios.post(API_URL, {
                email,
                password
            });

            localStorage.setItem(
                'user',
                JSON.stringify(res.data)
            );

            navigate('/');
        } catch (err) {

            console.error(err);

            setError('Invalid email or password');
        }
        finally {

            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

            <div className="bg-slate-800 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-slate-700">

                <h1 className="text-3xl font-bold text-white mb-2">
                    Login
                </h1>

                <p className="text-slate-400 mb-6 text-sm">
                    Welcome back to Task Manager
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 py-3 rounded-lg text-white font-semibold transition"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </form>

            </div>

        </div>
    );
}