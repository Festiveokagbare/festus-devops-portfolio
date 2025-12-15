// src/pages/Dashboard/Dashboard.tsx
import React, { useEffect, useState } from "react";
import AddEntry from "../../components/AddEntry";
import EntryList from "../../components/EntryList";

interface Entry {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  createdAt: string;
  userId: number;
}

function Dashboard() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/dashboard/entries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 403) {
        throw new Error("Session expired. Please login again.");
      }

      const data = await res.json();
      setEntries(data.entries);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleEntryAdded = (newEntry: Entry) => {
    setEntries([newEntry, ...entries]);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/dashboard/entry/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete");
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <AddEntry token={token} onEntryAdded={handleEntryAdded} />
      <EntryList entries={entries} onDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;
