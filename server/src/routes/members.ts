import { Router } from "express";
import { users } from "../models/store";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

router.get("/", (req, res) => {
  const safe = users.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, createdAt: u.createdAt }));
  res.json(safe);
});

router.get("/:id", (req, res) => {
  const member = users.find((u) => u.id === req.params.id);
  if (!member) return res.status(404).json({ message: "Member not found" });
  res.json({ id: member.id, name: member.name, email: member.email, role: member.role, createdAt: member.createdAt });
});

router.put("/:id", requireAdmin, (req, res) => {
  const member = users.find((u) => u.id === req.params.id);
  if (!member) return res.status(404).json({ message: "Member not found" });
  const { name, role } = req.body as { name?: string; role?: string };
  if (name) member.name = name;
  if (role && (role === "Admin" || role === "Member")) member.role = role;
  res.json({ message: "Updated" });
});

router.delete("/:id", requireAdmin, (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Member not found" });
  users.splice(index, 1);
  res.status(204).end();
});

export default router;
