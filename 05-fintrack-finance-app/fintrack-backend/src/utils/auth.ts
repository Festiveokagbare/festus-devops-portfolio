// src/utils/auth.ts
export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch user");

    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
