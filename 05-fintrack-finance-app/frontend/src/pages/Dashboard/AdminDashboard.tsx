// src/pages/dashboard/AdminDashboard.tsx
import { useEffect, useState } from "react";
import { FaUsers, FaUserShield, FaTrash, FaArrowUp } from "react-icons/fa";

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  entryCount?: number;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data.users))
      .catch((err) => setError(err.message));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;

  const deleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 border-b border-blue-600 pb-2">Admin Dashboard</h1>

      {error && <p className="bg-red-700 p-3 rounded mb-6 font-semibold">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-800 p-6 rounded shadow flex items-center gap-4">
          <FaUsers className="text-3xl" />
          <div>
            <p className="text-lg">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
        </div>
        <div className="bg-green-800 p-6 rounded shadow flex items-center gap-4">
          <FaUserShield className="text-3xl" />
          <div>
            <p className="text-lg">Admins</p>
            <p className="text-2xl font-bold">{adminCount}</p>
          </div>
        </div>
        <div className="bg-purple-800 p-6 rounded shadow flex items-center gap-4">
          <FaArrowUp className="text-3xl" />
          <div>
            <p className="text-lg">Regular Users</p>
            <p className="text-2xl font-bold">{userCount}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded bg-black text-white border border-blue-700 focus:outline-none"
        />
      </div>

      <section className="bg-black bg-opacity-60 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Users List</h2>

        {filteredUsers.length === 0 ? (
          <p className="text-gray-400">No users found.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4">Full Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700 hover:bg-blue-800 transition"
                >
                  <td className="py-2 px-4">{user.fullName}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 capitalize">{user.role}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
