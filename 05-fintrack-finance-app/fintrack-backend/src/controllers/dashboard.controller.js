import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Add income/expense entry
export async function addEntry(req, res) {
  const { type, amount, description } = req.body;
  const userId = req.user.userId;

  if (!type || !["income", "expense"].includes(type)) {
    return res.status(400).json({ message: "Invalid entry type." });
  }

  try {
    const entry = await prisma.entry.create({
      data: {
        type,
        amount: parseFloat(amount),
        description,
        userId,
      },
    });

    res.status(201).json({
      message: "Entry added successfully",
      entry,
    });
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).json({ message: "Failed to add entry" });
  }
}

// ✅ Get all entries for the logged-in user
export async function getEntries(req, res) {
  const userId = req.user.userId;

  try {
    const entries = await prisma.entry.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ entries });
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
}

// ✅ Update a specific entry
export async function updateEntry(req, res) {
  const { id } = req.params;
  const { type, amount, description } = req.body;
  const userId = req.user.userId;

  try {
    const entry = await prisma.entry.findUnique({
      where: { id: parseInt(id) },
    });

    if (!entry || entry.userId !== userId) {
      return res.status(404).json({ message: "Entry not found or unauthorized" });
    }

    const updatedEntry = await prisma.entry.update({
      where: { id: parseInt(id) },
      data: {
        type,
        amount: parseFloat(amount),
        description,
      },
    });

    res.json({ message: "Entry updated successfully", entry: updatedEntry });
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).json({ message: "Failed to update entry" });
  }
}

// ✅ Delete a specific entry
export async function deleteEntry(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const entry = await prisma.entry.findUnique({
      where: { id: parseInt(id) },
    });

    if (!entry || entry.userId !== userId) {
      return res.status(404).json({ message: "Entry not found or unauthorized" });
    }

    await prisma.entry.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({ message: "Failed to delete entry" });
  }
}
