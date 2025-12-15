import { useEffect, useState } from "react";

interface User {
  id: number;
  fullName: string;
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}