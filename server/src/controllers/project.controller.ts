import { Request, Response } from "express";
import * as projectService from "../services/project.service";

export function listProjects(req: Request, res: Response) {
  res.json(projectService.getAllProjects());
}

export function getProject(req: Request, res: Response) {
  const project = projectService.getProjectById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
}

export function createProject(req: Request, res: Response) {
  const { name, workspaceId, imageUrl = "" } = req.body;
  if (!name || !workspaceId) {
    return res.status(400).json({ message: "name and workspaceId are required" });
  }

  const project = projectService.createProject({ name, workspaceId, imageUrl });
  res.status(201).json(project);
}

export function updateProject(req: Request, res: Response) {
  const updated = projectService.updateProject(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Project not found" });
  res.json(updated);
}

export function deleteProject(req: Request, res: Response) {
  const deleted = projectService.deleteProject(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Project not found" });
  res.status(204).end();
}
