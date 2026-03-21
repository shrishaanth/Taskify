import { Router } from "express";
import { tasks } from "../models/store";
import { requireAuth } from "../middleware/auth";
import { Task } from "../types";

const router = Router();
router.use(requireAuth);

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title, description, status = "todo", assigneeId, dueDate } = req.body as Partial<Task>;
  if (!title || !assigneeId) return res.status(400).json({ message: "title and assigneeId required" });

  const newTask: Task = {
    id: `t${Date.now()}`,
    title,
    description: description || "",
    status: status as Task["status"],
    assigneeId,
    dueDate: dueDate || null,
    createdBy: (req as any).user.userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.push(newTask);
  req.app.get("io")?.emit("task:created", newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  const { title, description, status, assigneeId, dueDate } = req.body as Partial<Task>;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status as Task["status"];
  if (assigneeId !== undefined) task.assigneeId = assigneeId;
  if (dueDate !== undefined) task.dueDate = dueDate;
  task.updatedAt = new Date().toISOString();
  req.app.get("io")?.emit("task:updated", task);
  res.json(task);
});

router.delete("/:id", (req, res) => {
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Task not found" });
  const removed = tasks.splice(idx, 1)[0];
  req.app.get("io")?.emit("task:deleted", removed);
  res.status(204).end();
});

export default router;
