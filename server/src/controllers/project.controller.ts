import { Request, Response, NextFunction } from "express";
import * as projectService from "../services/project.service";

export async function listProjects(req: Request, res: Response, next: NextFunction) {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (error) { next(error); }
}

export async function getProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) { next(error); }
}

export async function createProject(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, workspaceId, imageUrl = "" } = req.body;
    if (!name || !workspaceId) {
      return res.status(400).json({ message: "name and workspaceId are required" });
    }
    const project = await projectService.createProject({ name, workspaceId, imageUrl });
    res.status(201).json(project);
  } catch (error) { next(error); }
}

export async function updateProject(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await projectService.updateProject(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (error) { next(error); }
}

export async function deleteProject(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await projectService.deleteProject(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.status(204).end();
  } catch (error) { next(error); }
}
