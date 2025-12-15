import React, { useEffect, useState } from "react";

interface Entry {
  id: number;
  type: string;
  amount: number;
  description: string;
  createdAt: string;
  userId: number;
}

interface DashboardProps {
  token: string;
}

const Dashboard: React.FC<DashboardProps> = ({ token }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/dashboard/entries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch entries");
      }
      setEntries(data.entries);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Your Entries</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              [{entry.type}] {entry.description} - ${entry.amount.toFixed(2)} on{" "}
              {new Date(entry.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
