// src/pages/admin/Logs.js
import React, { useState } from "react";

// Sample users for dropdown
const usersList = [
  "Nandhini",
  "Sohaaliya",
  "Parimala",
  "Sathya",
];

const initialLogs = [
  { id: 1, user: "Nandhini", action: "Logged in", date: "2025-10-29" },
  { id: 2, user: "Sohaaliya", action: "Started Exam", date: "2025-10-30" },
];

function Logs() {
  const [logs, setLogs] = useState(initialLogs);
  const [editLog, setEditLog] = useState(null);
  const [newLog, setNewLog] = useState({ user: "", action: "", date: "" });

  const handleAddLog = () => {
    if (!newLog.user || !newLog.action || !newLog.date) return;
    const nextId = logs.length > 0 ? Math.max(...logs.map(l => l.id)) + 1 : 1;
    setLogs([...logs, { id: nextId, ...newLog }]);
    setNewLog({ user: "", action: "", date: "" });
  };

  const handleEditLog = (log) => setEditLog(log);

  const handleUpdateLog = () => {
    setLogs(logs.map(l => (l.id === editLog.id ? editLog : l)));
    setEditLog(null);
  };

  const handleDeleteLog = (id) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      setLogs(logs.filter(l => l.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Logs</h1>

      {/* Add Log */}
      <div className="mb-4 flex gap-2">
        <select
          value={newLog.user}
          onChange={(e) => setNewLog({ ...newLog, user: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select User</option>
          {usersList.map((u, i) => (
            <option key={i} value={u}>{u}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Action"
          value={newLog.action}
          onChange={(e) => setNewLog({ ...newLog, action: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={newLog.date}
          onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddLog}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Log
        </button>
      </div>

      {/* Logs Table */}
      <table className="w-full border-collapse border text-center">
        <thead>
          <tr className="bg-blue-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Action</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-blue-50">
              <td className="border px-4 py-2">{log.id}</td>
              <td className="border px-4 py-2">
                {editLog && editLog.id === log.id ? (
                  <select
                    value={editLog.user}
                    onChange={(e) =>
                      setEditLog({ ...editLog, user: e.target.value })
                    }
                    className="border p-1 rounded w-full"
                  >
                    {usersList.map((u, i) => (
                      <option key={i} value={u}>{u}</option>
                    ))}
                  </select>
                ) : (
                  log.user
                )}
              </td>
              <td className="border px-4 py-2">
                {editLog && editLog.id === log.id ? (
                  <input
                    type="text"
                    value={editLog.action}
                    onChange={(e) =>
                      setEditLog({ ...editLog, action: e.target.value })
                    }
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  log.action
                )}
              </td>
              <td className="border px-4 py-2">
                {editLog && editLog.id === log.id ? (
                  <input
                    type="date"
                    value={editLog.date}
                    onChange={(e) =>
                      setEditLog({ ...editLog, date: e.target.value })
                    }
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  log.date
                )}
              </td>
              <td className="border px-4 py-2 flex justify-center gap-2">
                {editLog && editLog.id === log.id ? (
                  <button
                    onClick={handleUpdateLog}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditLog(log)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteLog(log.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Logs;
