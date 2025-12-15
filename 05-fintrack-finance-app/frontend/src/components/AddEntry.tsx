import React, { useState, FormEvent } from "react";

interface AddEntryProps {
  token: string;
  onEntryAdded: (entry: Entry) => void;
}

interface Entry {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  createdAt: string;
  userId: number;
}

const AddEntry: React.FC<AddEntryProps> = ({ token, onEntryAdded }) => {
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/dashboard/entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type, amount: parseFloat(amount), description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add entry");
      }

      onEntryAdded(data.entry);
      setType("income");
      setAmount("");
      setDescription("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value as "income" | "expense")}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>
      <br />
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0.01"
          step="0.01"
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Entry"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddEntry;
