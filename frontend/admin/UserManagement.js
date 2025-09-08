// src/pages/admin/UserManagement.js
import React, { useState } from "react";
import "../../index.css"; // <-- import your global CSS here

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Nandhini", email: "nandhini@example.com" },
    { id: 2, name: "Sohaaliya", email: "sohaaliya@example.com" },
    { id: 3, name: "Parimala", email: "parimala@example.com" },
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([
        ...users,
        { id: users.length + 1, name: newUser.name, email: newUser.email },
      ]);
      setNewUser({ name: "", email: "" });
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleSaveEdit = () => {
    setUsers(
      users.map((u) =>
        u.id === editingUser.id ? editingUser : u
      )
    );
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-white mb-6">User Management</h1>

      {/* Add New User */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="px-3 py-2 rounded border"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="px-3 py-2 rounded border"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New User
        </button>
      </div>

      {/* User Table */}
      <table className="table-auto border-collapse border w-full max-w-3xl text-center bg-white rounded shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-blue-50">
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    className="px-2 py-1 border rounded"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border px-4 py-2">
                {editingUser?.id === user.id ? (
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    className="px-2 py-1 border rounded"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border px-4 py-2 flex justify-center gap-2">
                {editingUser?.id === user.id ? (
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteUser(user.id)}
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
};

export default UserManagement;
