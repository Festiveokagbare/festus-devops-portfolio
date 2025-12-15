// src/pages/dashboard/Savings.tsx
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SavingsData {
  month: string;
  amount: number;
}

export default function Savings() {
  const [savings, setSavings] = useState<SavingsData[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // You can replace this with your real API later
    const fakeData: SavingsData[] = [
      { month: "Jan", amount: 200 },
      { month: "Feb", amount: 450 },
      { month: "Mar", amount: 700 },
      { month: "Apr", amount: 1000 },
      { month: "May", amount: 400 },
      { month: "June", amount: 700 },
      { month: "July", amount: 700 },
      { month: "Aug", amount: 1000 },
      { month: "Sep", amount: 200 },
      { month: "Oct", amount: 450 },
      { month: "Nov", amount: 700 },
      { month: "Dec", amount: 1000 },
    ];

    setSavings(fakeData);
    const totalSaved = fakeData.reduce((sum, entry) => sum + entry.amount, 0);
    setTotal(totalSaved);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Savings</h2>
        <span className="text-lg font-bold text-green-700">
          Total Saved: ₦{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={savings}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `₦${Number(value).toLocaleString()}`} />
          <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
