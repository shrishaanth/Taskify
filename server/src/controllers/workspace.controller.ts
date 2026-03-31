import { Request, Response, NextFunction } from "express";
import * as workspaceService from "../services/workspace.service";

export async function listWorkspaces(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await workspaceService.getAllWorkspaces());
  } catch (error) { next(error); }
}

export async function getWorkspace(req: Request, res: Response, next: NextFunction) {
  try {
    const workspace = await workspaceService.getWorkspaceById(req.params.id);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });
    res.json(workspace);
  } catch (error) { next(error); }
}

export async function createWorkspace(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, imageUrl = "" } = req.body;
    if (!name) return res.status(400).json({ message: "name required" });
    const workspace = await workspaceService.createWorkspace({ name, imageUrl });
    res.status(201).json(workspace);
  } catch (error) { next(error); }
}

export async function updateWorkspace(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await workspaceService.updateWorkspace(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Workspace not found" });
    res.json(updated);
  } catch (error) { next(error); }
}

export async function deleteWorkspace(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await workspaceService.deleteWorkspace(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Workspace not found" });
    res.status(204).end();
  } catch (error) { next(error); }
}
