// src/pages/dashboard/Expenses.tsx
import { useEffect, useState } from "react";

interface Entry {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  createdAt: string;
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<Entry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/entries", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.entries.filter((e: Entry) => e.type === "expense");
        setExpenses(filtered);
      })
      .catch(() => setError("Failed to fetch expenses"));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-red-600">Expenses</h2>
      {error && <p className="text-red-500">{error}</p>}
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses yet.</p>
      ) : (
        <ul className="space-y-2 max-h-96 overflow-y-auto">
          {expenses.map((entry) => (
            <li key={entry.id} className="bg-red-100 p-3 rounded flex justify-between">
              <div>
                <p className="font-medium">{entry.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="font-bold text-red-700">
                -${entry.amount.toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
