// src/pages/dashboard/Settings.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>

      <div className="bg-white p-4 rounded shadow space-y-4">
        {/* Theme Switch */}
        <div>
          <label className="block mb-2 font-medium">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Language Switch */}
        <div>
          <label className="block mb-2 font-medium">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="en">English</option>
            <option value="yo">Yoruba</option>
            <option value="ha">Hausa</option>
          </select>
        </div>

        {/* Logout */}
        <div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
