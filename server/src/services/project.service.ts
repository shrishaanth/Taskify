import { projects } from "../models/store";
import { Project } from "../types";

export function getAllProjects() {
  return projects;
}

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id);
}

export function createProject(data: Pick<Project, "name" | "workspaceId" | "imageUrl">) {
  const now = new Date().toISOString();
  const project: Project = {
    id: `proj-${Date.now()}`,
    name: data.name,
    workspaceId: data.workspaceId,
    imageUrl: data.imageUrl || "",
    createdAt: now,
  };
  projects.push(project);
  return project;
}

export function updateProject(id: string, data: Partial<Project>) {
  const project = projects.find((p) => p.id === id);
  if (!project) return null;
  if (data.name) project.name = data.name;
  if (data.workspaceId) project.workspaceId = data.workspaceId;
  if (data.imageUrl !== undefined) project.imageUrl = data.imageUrl;
  return project;
}

export function deleteProject(id: string) {
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  projects.splice(idx, 1);
  return true;
}
