import React from 'react';

export default function TaskCard({ task, onClick }) {
    const priorityColors = {
        Low: 'bg-green-500',
        Medium: 'bg-yellow-500',
        High: 'bg-red-500',
    };

    const getPriorityColor = () => priorityColors[task.priority] || 'bg-green-500';

    return (
        <div
            onClick={onClick}
            className="task-card bg-slate-700 rounded-xl p-4 shadow cursor-move hover:shadow-lg border border-slate-600"
        >
            <div className="flex justify-between items-start mb-3">
                <div className="font-semibold text-lg flex-1">{task.title}</div>
                <div className={`${getPriorityColor()} text-xs px-2 py-1 rounded-full text-white whitespace-nowrap ml-2`}>
                    {task.priority}
                </div>
            </div>

            {task.description && (
                <div className="text-sm text-slate-300 mb-3 line-clamp-2">
                    {task.description}
                </div>
            )}

            <div className="flex justify-between items-center text-xs text-slate-400">
                <div className="flex items-center gap-1">
                    👤 {task.assignedUser?.name || 'Unassigned'}
                </div>
                <div className="flex items-center gap-1">
                    ⏱ {task.estimatedHours || 0}h
                </div>
            </div>

            {task.dueDate && (
                <div className="text-xs text-slate-400 mt-2">
                    📅 {new Date(task.dueDate).toLocaleDateString()}
                </div>
            )}
        </div>
    );
}
