// src/middleware/auth.middleware.js
import { verifyToken } from "../utils/jwt.js";

// ✅ Use this consistently across your routes
export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired token", error: error.message });
  }
}

// ✅ Protect routes meant for admins
export function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
}

// ✅ Alias if some files are importing `authenticate` instead of `authenticateToken`
export { authenticateToken as authenticate };
