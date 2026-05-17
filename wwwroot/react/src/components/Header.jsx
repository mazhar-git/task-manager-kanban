import React from 'react';
import { LogOut } from 'lucide-react';

export default function Header({ currentUser, onLogout }) {
    return (
        <div className="flex justify-between items-center px-8 py-5 border-b border-slate-700 bg-slate-800">
            <div>
                <h1 className="text-3xl font-bold">Task Manager</h1>
                <p className="text-slate-400 text-sm mt-1">Kanban Board & Dashboard</p>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-sm text-slate-300">
                    Welcome, <span className="font-semibold">{currentUser?.name}</span>
                </div>

                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium shadow-lg transition"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </div>
    );
}
