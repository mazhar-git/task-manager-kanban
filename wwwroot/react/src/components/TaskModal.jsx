import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';

export default function TaskModal({ task, users, tasks, onSave, onDelete, onClose, currentUser }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Low',
        status: 'Todo',
        assignedTo: '',
        estimatedHours: 0,
        dueDate: '',
        isDuplicate: false,
        duplicateOfTaskId: '',
    });

    useEffect(() => {

        if (task) {

            setFormData({
                ...task,

                title: task.title || '',

                description: task.description || '',

                priority: task.priority || 'Low',

                status: task.status || 'Todo',

                assignedTo:
                    task.assignedTo ?? '',

                estimatedHours:
                    task.estimatedHours ?? 0,

                dueDate:
                    task.dueDate
                        ? task.dueDate.split('T')[0]
                        : '',

                duplicateOfTaskId:
                    task.duplicateOfTaskId ?? '',

                isDuplicate:
                    task.isDuplicate || false
            });

        } else {

            setFormData({
                title: '',
                description: '',
                priority: 'Low',
                status: 'Todo',
                assignedTo: '',
                estimatedHours: 0,
                dueDate: '',
                isDuplicate: false,
                duplicateOfTaskId: '',
            });
        }

    }, [task]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]:

                type === 'checkbox'
                    ? checked

                    : name === 'estimatedHours'
                        ? (value === '' ? 0 : parseFloat(value))

                        : name === 'assignedTo' ||
                            name === 'duplicateOfTaskId'

                            ? (value === '' ? '' : parseFloat(value))

                            : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,

            assignedTo:
                formData.assignedTo === ''
                    ? null
                    : formData.assignedTo,

            duplicateOfTaskId:
                formData.duplicateOfTaskId === ''
                    ? null
                    : formData.duplicateOfTaskId
        };
        onSave(payload);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-700">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold">
                        {task ? 'Edit Task' : 'Create Task'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Task Title"
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-blue-500 resize-none"
                            rows="3"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Priority</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                            >
                                <option value="Todo">To Do</option>
                                <option value="InProgress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Assigned To</label>
                        <select
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                        >
                            <option value="">Select Developer</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-3">

                        <label className="flex items-center gap-3 text-sm">

                            <input
                                type="checkbox"
                                name="isDuplicate"
                                checked={formData.isDuplicate}
                                onChange={handleChange}
                            />

                            Duplicate Task

                        </label>

                        {formData.isDuplicate && (

                            <div>

                                <label className="block text-sm font-medium mb-1">
                                    Original Task
                                </label>

                                <select
                                    name="duplicateOfTaskId"
                                    value={formData.duplicateOfTaskId}
                                    onChange={handleChange}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                                >

                                    <option value="">
                                        Select Original Task
                                    </option>

                                    {tasks?.map(t => (

                                        <option
                                            key={t.id}
                                            value={t.id}
                                        >
                                            #{t.id} - {t.title}
                                        </option>

                                    ))}

                                </select>

                            </div>

                        )}

                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Estimated Hours</label>
                            <input
                                type="number"
                                name="estimatedHours"
                                value={formData.estimatedHours}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Due Date</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
                        >
                            {task ? 'Update Task' : 'Create Task'}
                        </button>

                        {task && currentUser.role === 'Admin' && (
                            <button
                                type="button"
                                onClick={() => onDelete(task.id)}
                                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg font-semibold transition"
                            >
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full bg-slate-700 hover:bg-slate-600 py-2 rounded-lg font-medium transition"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}
