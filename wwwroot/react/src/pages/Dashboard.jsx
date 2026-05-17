import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatCard from '../components/StatCard';
/*import TasksChart from '../components/TasksChart';*/

//For Local Development, change the API_URL to your backend URL if different
const API_URL = 'https://localhost:7222/api';
//For Production, use the relative path
//const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard({ currentUser }) {
    const [stats, setStats] = useState({
        totalTasks: 0,
        todoCount: 0,
        inProgressCount: 0,
        doneCount: 0,
        byPriority: { Low: 0, Medium: 0, High: 0 },
        byAssignee: {},
        completionPercentage: 0,
    });
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const tasksResponse = await axios.get(`${API_URL}/tasks`);
            const usersResponse = await axios.get(`${API_URL}/users`);

            setTasks(tasksResponse.data);
            setUsers(usersResponse.data);
            calculateStats(tasksResponse.data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            setLoading(false);
        }
    };

    const calculateStats = (tasksList) => {
        const todoCount = tasksList.filter(t => t.status === 'Todo').length;
        const inProgressCount = tasksList.filter(t => t.status === 'InProgress').length;
        const doneCount = tasksList.filter(t => t.status === 'Done').length;

        const byPriority = {
            Low: tasksList.filter(t => t.priority === 'Low').length,
            Medium: tasksList.filter(t => t.priority === 'Medium').length,
            High: tasksList.filter(t => t.priority === 'High').length,
        };

        const byAssignee = {};
        tasksList.forEach(task => {
            if (task.assignedUser) {
                byAssignee[task.assignedUser.name] = (byAssignee[task.assignedUser.name] || 0) + 1;
            }
        });

        const completionPercentage = tasksList.length > 0 
            ? Math.round((doneCount / tasksList.length) * 100) 
            : 0;

        setStats({
            totalTasks: tasksList.length,
            todoCount,
            inProgressCount,
            doneCount,
            byPriority,
            byAssignee,
            completionPercentage,
        });
    };

    if (loading) {
        return <div className="text-center py-10">Loading dashboard...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <StatCard
                    title="Total Tasks"
                    value={stats.totalTasks}
                    color="blue"
                    icon="📋"
                />
                <StatCard
                    title="To Do"
                    value={stats.todoCount}
                    color="slate"
                    icon="📝"
                />
                <StatCard
                    title="In Progress"
                    value={stats.inProgressCount}
                    color="yellow"
                    icon="⚙️"
                />
                <StatCard
                    title="Done"
                    value={stats.doneCount}
                    color="green"
                    icon="✅"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
                    <h3 className="text-xl font-bold mb-4">Completion Status</h3>
                    <div className="flex items-center justify-center">
                        <div className="relative w-40 h-40">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    fill="none"
                                    stroke="#334155"
                                    strokeWidth="8"
                                />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    fill="none"
                                    stroke="#22c55e"
                                    strokeWidth="8"
                                    strokeDasharray={`${(stats.completionPercentage / 100) * 440} 440`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-3xl font-bold">{stats.completionPercentage}%</div>
                                    <div className="text-sm text-slate-400">Complete</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
                    <h3 className="text-xl font-bold mb-4">Tasks by Priority</h3>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-green-400">Low</span>
                                <span>{stats.byPriority.Low}</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ width: `${(stats.byPriority.Low / stats.totalTasks) * 100 || 0}%` }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-yellow-400">Medium</span>
                                <span>{stats.byPriority.Medium}</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                                <div
                                    className="bg-yellow-500 h-2 rounded-full"
                                    style={{ width: `${(stats.byPriority.Medium / stats.totalTasks) * 100 || 0}%` }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-red-400">High</span>
                                <span>{stats.byPriority.High}</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                                <div
                                    className="bg-red-500 h-2 rounded-full"
                                    style={{ width: `${(stats.byPriority.High / stats.totalTasks) * 100 || 0}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
                <h3 className="text-xl font-bold mb-4">Tasks by Assignee</h3>
                <div className="space-y-3">
                    {Object.entries(stats.byAssignee).length > 0 ? (
                        Object.entries(stats.byAssignee).map(([assignee, count]) => (
                            <div key={assignee}>
                                <div className="flex justify-between mb-1">
                                    <span>{assignee}</span>
                                    <span className="text-slate-400">{count} tasks</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{
                                            width: `${stats.totalTasks > 0
                                                    ? (count / stats.totalTasks) * 100
                                                    : 0
                                                }%`
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-400">No tasks assigned</p>
                    )}
                </div>
            </div>
        </div>
    );
}
