import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token and role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      // ✅ Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded shadow bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded text-white font-semibold ${
            loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-green-600 hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}
