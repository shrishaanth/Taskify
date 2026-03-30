import { Request, Response } from "express";
import * as workspaceService from "../services/workspace.service";

export function listWorkspaces(req: Request, res: Response) {
  res.json(workspaceService.getAllWorkspaces());
}

export function getWorkspace(req: Request, res: Response) {
  const workspace = workspaceService.getWorkspaceById(req.params.id);
  if (!workspace) return res.status(404).json({ message: "Workspace not found" });
  res.json(workspace);
}

export function createWorkspace(req: Request, res: Response) {
  const { name, imageUrl = "" } = req.body;
  if (!name) {
    return res.status(400).json({ message: "name required" });
  }

  const workspace = workspaceService.createWorkspace({ name, imageUrl });
  res.status(201).json(workspace);
}

export function updateWorkspace(req: Request, res: Response) {
  const updated = workspaceService.updateWorkspace(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Workspace not found" });
  res.json(updated);
}

export function deleteWorkspace(req: Request, res: Response) {
  const deleted = workspaceService.deleteWorkspace(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Workspace not found" });
  res.status(204).end();
}
