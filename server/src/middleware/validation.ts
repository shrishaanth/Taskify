import { Request, Response, NextFunction } from "express";
import { TaskStatus, TaskPriority } from "../types";

// Simple validation middleware (expand with Zod/Joi if needed)
export function validateTaskBody(req: Request, res: Response, next: NextFunction) {
  const { title, status, priority, projectId } = req.body;
  if (!title || typeof title !== "string") return res.status(400).json({ message: "Title is required and must be a string" });
  if (status && !Object.values(TaskStatus).includes(status)) return res.status(400).json({ message: "Invalid status" });
  if (priority && !Object.values(TaskPriority).includes(priority)) return res.status(400).json({ message: "Invalid priority" });
  if (!projectId || typeof projectId !== "string") return res.status(400).json({ message: "ProjectId is required" });
  next();
}

export function validateAuthBody(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
  next();
}