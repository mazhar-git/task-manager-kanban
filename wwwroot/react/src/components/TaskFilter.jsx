import React from 'react';

export default function TaskFilter({
    users,
    selectedUserId,
    onFilterChange,
    sortOption,
    onSortChange,
    currentUser
}) {
    return (
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex flex-col md:flex-row gap-4 md:items-end">

            {/* Admin Only User Filter */}
            {currentUser.role === 'Admin' && (
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Filter by User
                    </label>

                    <select
                        value={selectedUserId}
                        onChange={(e) => onFilterChange(e.target.value)}
                        className="w-full md:w-64 bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                    >
                        <option value="">All Users</option>

                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Sorting For Everyone */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Sort Tasks
                </label>

                <select
                    value={sortOption}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full md:w-64 bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                >
                    <option value="highToLow">
                        High Priority → Low Priority
                    </option>

                    <option value="lowToHigh">
                        Low Priority → High Priority
                    </option>
                </select>
            </div>

        </div>
    );
}