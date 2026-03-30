import { workspaces } from "../models/store";
import { Workspace } from "../types";

export function getAllWorkspaces() {
  return workspaces;
}

export function getWorkspaceById(id: string) {
  return workspaces.find((w) => w.id === id);
}

export function createWorkspace(data: Pick<Workspace, "name" | "imageUrl">) {
  const now = new Date().toISOString();
  const workspace: Workspace = {
    id: `ws-${Date.now()}`,
    name: data.name,
    imageUrl: data.imageUrl || "",
    createdAt: now,
  };
  workspaces.push(workspace);
  return workspace;
}

export function updateWorkspace(id: string, data: Partial<Workspace>) {
  const workspace = workspaces.find((w) => w.id === id);
  if (!workspace) return null;
  if (data.name) workspace.name = data.name;
  if (data.imageUrl !== undefined) workspace.imageUrl = data.imageUrl;
  return workspace;
}

export function deleteWorkspace(id: string) {
  const idx = workspaces.findIndex((w) => w.id === id);
  if (idx === -1) return false;
  workspaces.splice(idx, 1);
  return true;
}
