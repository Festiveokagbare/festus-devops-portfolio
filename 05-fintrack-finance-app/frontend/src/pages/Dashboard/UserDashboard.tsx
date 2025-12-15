// src/pages/dashboard/UserDashboard.tsx
import { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown, FaEdit, FaTrash } from "react-icons/fa";

interface Entry {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  createdAt: string;
}

const currencyMap: Record<string, { label: string; locale: string }> = {
  NGN: { label: "₦", locale: "en-NG" },
  USD: { label: "$", locale: "en-US" },
  EUR: { label: "€", locale: "de-DE" },
  GBP: { label: "£", locale: "en-GB" },
};

const formatCurrency = (amount: number, currency: string = "NGN") => {
  const { locale } = currencyMap[currency] || currencyMap.NGN;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export default function UserDashboard() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState(0);
  const [editDescription, setEditDescription] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/entries", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setEntries(data.entries))
      .catch((err) => console.error("Error fetching entries:", err));
  }, []);

  const income = entries.filter((e) => e.type === "income").reduce((sum, e) => sum + e.amount, 0);
  const expenses = entries.filter((e) => e.type === "expense").reduce((sum, e) => sum + e.amount, 0);
  const balance = income - expenses;

  const startEdit = (entry: Entry) => {
    setEditingId(entry.id);
    setEditAmount(entry.amount);
    setEditDescription(entry.description);
  };

  const saveEdit = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/dashboard/entry/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount: editAmount, description: editDescription }),
      });

      if (!res.ok) throw new Error("Failed to update entry");

      const updatedEntry = await res.json();
      setEntries((prev) => prev.map((e) => (e.id === id ? updatedEntry.entry : e)));
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEntry = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/dashboard/entry/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete entry");
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>

      <div className="flex justify-end">
        <select
          className="border rounded px-3 py-1"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          <option value="NGN">₦ Nigerian Naira</option>
          <option value="USD">$ US Dollar</option>
          <option value="EUR">€ Euro</option>
          <option value="GBP">£ British Pound</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center gap-2 text-green-600">
            <FaArrowUp />
            <span className="text-sm">Income</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(income, selectedCurrency)}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center gap-2 text-red-600">
            <FaArrowDown />
            <span className="text-sm">Expenses</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(expenses, selectedCurrency)}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center gap-2 text-gray-800">
            <span className="text-sm">Balance</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(balance, selectedCurrency)}</p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
        <ul className="space-y-3 max-h-96 overflow-y-auto">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className={`flex justify-between items-center p-3 rounded ${
                entry.type === "income" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div>
                {editingId === entry.id ? (
                  <>
                    <input
                      value={editAmount}
                      onChange={(e) => setEditAmount(parseFloat(e.target.value))}
                      type="number"
                      className="mr-2 border rounded px-2 py-1"
                    />
                    <input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="border rounded px-2 py-1"
                    />
                    <button
                      className="ml-2 text-sm text-blue-600"
                      onClick={() => saveEdit(entry.id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <p className="font-medium">{entry.description}</p>
                    <p className="text-sm text-gray-500">{new Date(entry.createdAt).toLocaleDateString()}</p>
                  </>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold">
                  {entry.type === "income" ? "+" : "-"}
                  {formatCurrency(entry.amount, selectedCurrency)}
                </p>
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => startEdit(entry)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => deleteEntry(entry.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
