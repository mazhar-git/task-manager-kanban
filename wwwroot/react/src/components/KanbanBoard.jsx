import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import TaskFilter from './TaskFilter';
import TaskModal from './TaskModal';
import KanbanColumn from './KanbanColumn';

//For Local Development, change the API_URL to your backend URL if different
const API_URL = 'https://localhost:7222/api';
//For Production, use the relative path
//const API_URL = import.meta.env.VITE_API_URL;

export default function KanbanBoard({ currentUser }) {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState('highToLow');

    useEffect(() => {
        loadTasks();
        loadUsers();
    }, []);

    useEffect(() => {
        filterTasks();
    }, [tasks, selectedUserId, sortOption]);

    const loadTasks = async () => {
        try {
            let url = `${API_URL}/tasks`;
            if (currentUser.role === 'Developer') {
                url = `${API_URL}/tasks/my/${currentUser.id}`;
            }

            const response = await axios.get(url);
            setTasks(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading tasks:', error);
            setLoading(false);
        }
    };

    const loadUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const filterTasks = () => {
        let updatedTasks = [...tasks];

        // Filter by assigned user
        if (selectedUserId) {
            updatedTasks = updatedTasks.filter(
                task => task.assignedTo == selectedUserId
            );
        }

        // Priority order
        const priorityOrder = {
            High: 3,
            Medium: 2,
            Low: 1
        };

        // Sorting
        if (sortOption === 'highToLow') {
            updatedTasks.sort(
                (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
            );
        }

        if (sortOption === 'lowToHigh') {
            updatedTasks.sort(
                (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
            );
        }

        setFilteredTasks(updatedTasks);
    };

    const handleCreateTask = () => {
        setEditingTask(null);
        setShowModal(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowModal(true);
    };

    const handleSaveTask = async (taskData) => {
        try {
            if (editingTask) {
                await axios.put(`${API_URL}/tasks/${editingTask.id}`, taskData);
            } else {
                await axios.post(`${API_URL}/tasks`, taskData);
            }
            setShowModal(false);
            loadTasks();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            await axios.delete(`${API_URL}/tasks/${taskId}?userId=${currentUser.id}`);
            loadTasks();
            setShowModal(false);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleUpdateTaskStatus = async (taskId, newStatus) => {
        try {
            const task = tasks.find(t => t.id === taskId);
            const updatedTask = { ...task, status: newStatus };
            await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask);
            loadTasks();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading tasks...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Kanban Board</h2>
                {currentUser.role === 'Admin' && (
                    <button
                        onClick={handleCreateTask}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium shadow-lg transition"
                    >
                        <Plus size={20} />
                        Create Task
                    </button>
                )}
            </div>
           
                <TaskFilter
                    users={users}
                    selectedUserId={selectedUserId}
                    onFilterChange={setSelectedUserId}
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                    currentUser={currentUser}
                />
           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <KanbanColumn
                    title="To Do"
                    columnId="Todo"
                    tasks={filteredTasks.filter(t => t.status === 'Todo')}
                    onTaskClick={handleEditTask}
                    onDropTask={handleUpdateTaskStatus}
                    color="slate"
                />

                <KanbanColumn
                    title="In Progress"
                    columnId="InProgress"
                    tasks={filteredTasks.filter(t => t.status === 'InProgress')}
                    onTaskClick={handleEditTask}
                    onDropTask={handleUpdateTaskStatus}
                    color="yellow"
                />

                <KanbanColumn
                    title="Done"
                    columnId="Done"
                    tasks={filteredTasks.filter(t => t.status === 'Done')}
                    onTaskClick={handleEditTask}
                    onDropTask={handleUpdateTaskStatus}
                    color="green"
                />
            </div>

            {showModal && (
                <TaskModal
                    task={editingTask}
                    tasks={tasks}
                    users={users}
                    onSave={handleSaveTask}
                    onDelete={handleDeleteTask}
                    onClose={() => setShowModal(false)}
                    currentUser={currentUser}
                />
            )}
        </div>
    );
}
