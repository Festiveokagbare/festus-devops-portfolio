// src/controllers/admin.controller.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to load users" });
  }
}
