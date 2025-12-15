// src/utils/jwt.js
import jwt from "jsonwebtoken";

// Generate JWT with id, email, and role
export function generateToken({ id, email, role }) {
  const token = jwt.sign(
    { id, email, role }, // include role in the payload
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  console.log("✅ JWT Created:", token);
  return token;
}

// Verify JWT token
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔓 JWT Verified. Payload:", decoded);
    return decoded;
  } catch (err) {
    console.error("❌ JWT Verification Failed:", err.message);
    throw new Error("Invalid or expired token");
  }
}
