// src/components/EntryList.tsx
import React from "react";

interface Entry {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  createdAt: string;
  userId: number;
}

interface EntryListProps {
  entries: Entry[];
  onDelete: (id: number) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onDelete }) => {
  if (entries.length === 0) return <p className="text-gray-500">No entries yet.</p>;

  return (
    <ul className="space-y-2">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="flex justify-between items-center p-3 border rounded shadow-sm bg-white"
        >
          <div>
            <p className="font-semibold capitalize">
              [{entry.type}] ₦{entry.amount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-700">{entry.description}</p>
            <p className="text-xs text-gray-400">
              {new Date(entry.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => onDelete(entry.id)}
            className="text-red-500 text-sm hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default EntryList;
