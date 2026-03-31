import { Task, User, Project, Workspace } from "../types";

const now = () => new Date().toISOString();

export const workspaces: Workspace[] = [
  { id: "ws1", name: "Acme Corp", imageUrl: "", createdAt: now() },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Website Redesign",
    workspaceId: "ws1",
    imageUrl: "",
    createdAt: now(),
  },
  {
    id: "proj-2",
    name: "Mobile App",
    workspaceId: "ws1",
    imageUrl: "",
    createdAt: now(),
  },
  {
    id: "proj-3",
    name: "API Integration",
    workspaceId: "ws1",
    imageUrl: "",
    createdAt: now(),
  },
];

export const users: User[] = [
  {
    id: "u1",
    name: "Admin User",
    email: "admin@taskify.com",
    avatarUrl: "",
    passwordHash: "$2b$10$rkt.SrMsqnrQsB1WD3OjEuts1lOJMgj/KZwKKEvY0Yb5XoDpdYfBm",
    role: "admin",
    workspaceId: "ws1",
    createdAt: now(),
  },
];

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Set up backend",
    description: "Create Node/Express API for Taskify",
    status: "In Progress",
    priority: "High",
    projectId: "proj-1",
    assigneeId: "u1",
    dueDate: null,
    createdBy: "u1",
    createdAt: now(),
    updatedAt: now(),
    position: 0,
  },
];
