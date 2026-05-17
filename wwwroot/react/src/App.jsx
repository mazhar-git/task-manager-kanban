import React, { useState, useEffect } from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useNavigate
} from 'react-router-dom';

import Header from './components/Header';
import Navigation from './components/Navigation';

import KanbanBoard from './pages/KanbanBoard';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import BacklogPage from './pages/BacklogPage';

import './App.css';

function ProtectedLayout({ children }) {

    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const user =
            JSON.parse(localStorage.getItem('user'));

        if (!user) {

            navigate('/login');

            return;
        }

        setCurrentUser(user);

        setLoading(false);

    }, []);

    const handleLogout = () => {

        localStorage.removeItem('user');

        navigate('/login');
    };

    if (loading) {

        return (
            <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
                Loading...
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-900">

            <Header
                currentUser={currentUser}
                onLogout={handleLogout}
            />

            <Navigation />

            <main className="p-6">

                {React.cloneElement(children, {
                    currentUser
                })}

            </main>

        </div>
    );
}

export default function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/kanban"
                    element={
                        <ProtectedLayout>
                            <KanbanBoard />
                        </ProtectedLayout>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedLayout>
                            <Dashboard />
                        </ProtectedLayout>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/kanban" />}
                />
                <Route
                    path="/backlog"
                    element={
                        <ProtectedLayout>
                            <BacklogPage />
                        </ProtectedLayout>
                    }
                />
            </Routes>

        </BrowserRouter>
    );
}