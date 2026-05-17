import React from 'react';
import { BarChart3, Grid3x3, ListTodo } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navigation() {
    const isAdmin = JSON.parse(localStorage.getItem('user'))?.role === 'Admin';
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="px-8 py-4 border-b border-slate-700 bg-slate-800">
            <div className="flex gap-4">
                <button
                    onClick={() => navigate('/kanban')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${location.pathname === '/kanban'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                >
                    <Grid3x3 size={18} />
                    Kanban Board
                </button>

                {isAdmin && (
                    <>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${location.pathname === '/dashboard'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }`}
                        >
                            <BarChart3 size={18} />
                            Dashboard
                        </button>
                        <button
                            onClick={() => navigate('/backlog')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${location.pathname === '/backlog'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }`}
                        >
                            <ListTodo size={18} />
                            Backlog
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
