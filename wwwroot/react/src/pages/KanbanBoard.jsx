import React from 'react';
import KanbanBoard from '../components/KanbanBoard';

export default function KanbanPage({ currentUser }) {
    return <KanbanBoard currentUser={currentUser} />;
}
