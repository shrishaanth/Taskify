import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "../models/store";
import { requireAuth } from "../middleware/auth";
import { User } from "../types";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

router.post("/register", async (req, res) => {
  const { name, email, password, role = "Member" } = req.body as { name: string; email: string; password: string; role?: string };
  if (!name || !email || !password) return res.status(400).json({ message: "name/email/password required" });
  if (users.some((u) => u.email === email)) return res.status(400).json({ message: "Email already used" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = { id: `u${Date.now()}`, name, email, passwordHash, role: role === "Admin" ? "Admin" : "Member", createdAt: new Date().toISOString() };
  users.push(user);
  res.status(201).json({ id: user.id, name, email, role: user.role });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

router.get("/me", requireAuth, (req, res) => {
  const user = users.find((u) => u.id === req.user?.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

export default router;
