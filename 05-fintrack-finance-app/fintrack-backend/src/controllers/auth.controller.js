// src/controllers/auth.controller.js
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

// ✅ Register user
export async function register(req, res) {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: Role.user,
      },
    });

    const token = generateToken({ userId: user.id, role: user.role });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
}

// ✅ Login user
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = generateToken({ userId: user.id, role: user.role });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
}

// ✅ Get authenticated user (GET /api/auth/me)
export async function getMe(req, res) {
  const { userId } = req.user; // Decoded from token in middleware

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, fullName: true, email: true, role: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
