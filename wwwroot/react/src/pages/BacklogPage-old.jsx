import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://localhost:7222/api';

export default function BacklogPage({ currentUser }) {

    const [backlogs, setBacklogs] = useState([]);

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

    const handleConvertToTask = async (id) => {

        try {

            await axios.post(
                `${API_URL}/backlogs/${id}/convert-to-task`
            );

            alert('Task created successfully');

            loadBacklogs();

        } catch (error) {

            console.error(error);

            alert('Conversion failed');
        }
    };

    return (
        <div>

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                    Backlog
                </h2>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full border border-slate-700">

                    <thead className="bg-slate-800">

                        <tr>

                            <th className="p-3 text-left">
                                Title
                            </th>
                            <th className="p-3 text-left">
                                Description
                            </th>
                            <th className="p-3 text-left">
                                Priority
                            </th>

                            <th className="p-3 text-left">
                                Status
                            </th>

                            <th className="p-3 text-left">
                                Module
                            </th>

                            <th className="p-3 text-left">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {backlogs.map(backlog => (

                            <tr
                                key={backlog.id}
                                className="border-t border-slate-700"
                            >

                                <td className="p-3">
                                    {backlog.title}
                                </td>

                                <td className="p-3">
                                    {backlog.description}
                                </td>

                                <td className="p-3">
                                    {backlog.priority}
                                </td>

                                <td className="p-3">
                                    {backlog.status}
                                </td>

                                <td className="p-3">
                                    {backlog.module}
                                </td>

                                <td className="p-3">

                                    {currentUser.role === 'Admin' && (

                                        backlog.isImportedToTask ? (

                                            <span className="text-green-400">
                                                Converted
                                            </span>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    handleConvertToTask(backlog.id)
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                                            >
                                                Convert To Task
                                            </button>

                                        )
                                    )}

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}