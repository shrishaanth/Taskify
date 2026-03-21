import { Task, User } from "../types";
import bcrypt from "bcrypt";

const now = () => new Date().toISOString();

export const users: User[] = [
  {
    id: "u1",
    name: "Admin User",
    email: "admin@taskify.com",
    passwordHash: "$2b$10$XavAjhMz6W7/Zv2nD0Iqce9E3jcw7g70iodAlUgVY26AgzCBf0e7K",
    role: "Admin",
    createdAt: now()
  }
];

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Set up backend",
    description: "Create Node/Express API for Taskify",
    status: "in-progress",
    assigneeId: "u1",
    dueDate: null,
    createdBy: "u1",
    createdAt: now(),
    updatedAt: now()
  }
];
