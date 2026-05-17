import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Upload, ArrowUpDown, FileSpreadsheet } from 'lucide-react';

//For Local Development, change the API_URL to your backend URL if different
const API_URL = 'https://localhost:7222/api';
//For Production, use the relative path
//const API_URL = import.meta.env.VITE_API_URL;

export default function BacklogPage({ currentUser }) {

    const [backlogs, setBacklogs] = useState([]);

    const [sortOrder, setSortOrder] = useState('high-to-low');

    const [file, setFile] = useState(null);

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadBacklogs();
    }, []);

    const loadBacklogs = async () => {

        try {

            const response = await axios.get(
                `${API_URL}/backlogs`
            );

            setBacklogs(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    const priorityOrder = {
        High: 3,
        Medium: 2,
        Low: 1
    };

    const sortedBacklogs = useMemo(() => {
        const copied = [...backlogs];

        copied.sort((a, b) => {

            const aPriority = priorityOrder[a.priority] || 0;
            const bPriority = priorityOrder[b.priority] || 0;

            return sortOrder === 'high-to-low'
                ? bPriority - aPriority
                : aPriority - bPriority;
        });
        return copied;

    }, [backlogs, sortOrder]);

    const handleConvertToTask = async (id) => {
        try {

            await axios.post(
                `${API_URL}/backlogs/${id}/convert-to-task`
            );

            loadBacklogs();

        } catch (error) {

            console.error(error);

            alert('Conversion failed');
        }
    };

    const handleImportExcel = async () => {
        if (!file) {
            alert('Please select Excel file');
            return;
        }

        try {

            setUploading(true);

            const formData = new FormData();

            formData.append('file', file);

            await axios.post(
                `${API_URL}/backlogimport/import`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            alert('Excel imported successfully');

            setFile(null);

            loadBacklogs();

        } catch (error) {

            console.error(error);

            alert('Import failed');

        } finally {

            setUploading(false);
        }

    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">
                        Backlog
                    </h1>

                    <p className="text-slate-400 mt-1">
                        Manage imported backlog items
                    </p>
                </div>
            </div>

            {/* Import Section */}
            {currentUser.role === 'Admin' && (

                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">

                    <div className="flex items-center gap-2 mb-4">
                        <FileSpreadsheet size={22} />
                        <h2 className="text-xl font-semibold">
                            Import Excel Backlog
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">

                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="block w-full md:w-auto text-sm text-slate-300"
                        />

                        <button
                            onClick={handleImportExcel}
                            disabled={uploading}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-5 py-2 rounded-lg font-medium transition"
                        >
                            <Upload size={18} />
                            {uploading ? 'Importing...' : 'Import Excel'}
                        </button>

                    </div>

                </div>
            )}

            {/* Sorting */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div className="flex items-center gap-2">
                    <ArrowUpDown size={18} />
                    <span className="font-medium">
                        Sort By Priority
                    </span>
                </div>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
                >
                    <option value="high-to-low">
                        High → Low
                    </option>

                    <option value="low-to-high">
                        Low → High
                    </option>
                </select>
            </div>

            {/* Backlog Table */}
            <div className="overflow-x-auto bg-slate-800 border border-slate-700 rounded-2xl">
                <table className="w-full text-sm">
                    <thead className="bg-slate-900 text-slate-300">

                        <tr>
                            <th className="text-left p-4">Title</th>
                            <th className="text-left p-4">Description</th>
                            <th className="text-left p-4">Priority</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Module</th>
                            <th className="text-left p-4">Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {sortedBacklogs.map(backlog => (
                            <tr
                                key={backlog.id}
                                className="border-t border-slate-700 hover:bg-slate-700/40 transition"
                            >
                                <td className="p-4">
                                    {backlog.title}
                                </td>
                                <td className="p-4">
                                    {backlog.description}
                                </td>
                                <td className="p-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${backlog.priority === 'High'
                                                ? 'bg-red-500/20 text-red-400'
                                                : backlog.priority === 'Medium'
                                                    ? 'bg-yellow-500/20 text-yellow-400'
                                                    : 'bg-green-500/20 text-green-400'
                                            }`}
                                    >
                                        {backlog.priority}
                                    </span>
                                </td>

                                <td className="p-4">
                                    {backlog.status}
                                </td>

                                <td className="p-4">
                                    {backlog.module}
                                </td>

                                <td className="p-4">

                                    {currentUser.role === 'Admin' && (

                                        backlog.isImportedToTask ? (

                                            <span className="text-green-400 font-medium">
                                                Converted
                                            </span>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    handleConvertToTask(backlog.id)
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
                                            >
                                                Convert To Task
                                            </button>

                                        )
                                    )}

                                </td>

                            </tr>
                        ))};
                    </tbody>
                </table>
            </div>

        </div>
    );
}