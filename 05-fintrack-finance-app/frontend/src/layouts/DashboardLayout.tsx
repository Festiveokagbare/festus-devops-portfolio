// src/layouts/DashboardLayout.tsx
import { Link, Outlet } from "react-router-dom";
import { FaChartPie, FaMoneyBillWave, FaPiggyBank, FaUser, FaCog, FaBell } from "react-icons/fa";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100 font-poppins">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center text-xl font-bold text-green-700 border-b">
          FinTrack
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-green-600">
            <FaChartPie /> Dashboard
          </Link>
          <Link to="/dashboard/expenses" className="flex items-center gap-2 text-gray-700 hover:text-green-600">
            <FaMoneyBillWave /> Expenses
          </Link>
          <Link to="/dashboard/savings" className="flex items-center gap-2 text-gray-700 hover:text-green-600">
            <FaPiggyBank /> Savings
          </Link>
          <Link to="/dashboard/profile" className="flex items-center gap-2 text-gray-700 hover:text-green-600">
            <FaUser /> Profile
          </Link>
          <Link to="/dashboard/settings" className="flex items-center gap-2 text-gray-700 hover:text-green-600">
            <FaCog /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <div className="text-xl font-semibold text-gray-800">Dashboard</div>
          <div className="flex items-center gap-4">
            <FaBell className="text-gray-600 text-lg cursor-pointer" />
            <div className="w-8 h-8 bg-green-600 rounded-full text-white flex items-center justify-center font-bold">
              U
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}