import React from 'react';
import TaskCard from './TaskCard';

export default function KanbanColumn({ title, columnId, tasks, onTaskClick, onDropTask, color }) {
    const [draggedTask, setDraggedTask] = React.useState(null);

    const colorClasses = {
        slate: 'text-slate-400',
        yellow: 'text-yellow-400',
        green: 'text-green-400',
    };

    const handleDragStart = (e, task) => {
        setDraggedTask(task);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (draggedTask) {
            onDropTask(draggedTask.id, columnId);
            setDraggedTask(null);
        }
    };

    return (
        <div className="bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-700">
            <div className="flex items-center justify-between mb-4">
                <h2 className={`font-bold text-lg ${colorClasses[color]}`}>
                    {title}
                </h2>
                <span className="bg-slate-700 px-2 py-1 rounded text-sm">
                    {tasks.length}
                </span>
            </div>

            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="column space-y-3"
            >
                {tasks.map(task => (
                    <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                    >
                        <TaskCard
                            task={task}
                            onClick={() => onTaskClick(task)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
