import React from 'react';

export default function StatCard({ title, value, color, icon }) {
    const colorClasses = {
        blue: 'bg-blue-600/20 border-blue-600/50',
        slate: 'bg-slate-600/20 border-slate-600/50',
        yellow: 'bg-yellow-600/20 border-yellow-600/50',
        green: 'bg-green-600/20 border-green-600/50',
        red: 'bg-red-600/20 border-red-600/50',
    };

    const textColors = {
        blue: 'text-blue-400',
        slate: 'text-slate-400',
        yellow: 'text-yellow-400',
        green: 'text-green-400',
        red: 'text-red-400',
    };

    return (
        <div className={`rounded-2xl p-6 shadow-xl border ${colorClasses[color]}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-sm mb-1">{title}</p>
                    <p className={`text-3xl font-bold ${textColors[color]}`}>{value}</p>
                </div>
                <div className="text-4xl">{icon}</div>
            </div>
        </div>
    );
}
