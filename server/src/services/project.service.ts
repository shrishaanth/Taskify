import mongoose from 'mongoose';
import { ProjectModel, ProjectDocument } from '../models/project.model';
import { Project } from '../types';

function toProject(doc: any): Project {
  return { ...doc, id: doc._id.toString(), workspaceId: doc.workspaceId?.toString() } as Project;
}

export async function getAllProjects(): Promise<Project[]> {
  const docs = await ProjectModel.find().lean().exec();
  return docs.map(toProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const doc = await ProjectModel.findById(id).lean().exec();
  if (!doc) return null;
  return toProject(doc);
}

export async function createProject(data: Pick<Project, "name" | "workspaceId" | "imageUrl">): Promise<Project> {
  const doc = await ProjectModel.create(data);
  const project = doc.toObject() as ProjectDocument;
  return { ...project, id: project._id!.toString(), workspaceId: (project.workspaceId as any)?.toString() } as Project;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const doc = await ProjectModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean().exec();
  if (!doc) return null;
  return toProject(doc);
}

export async function deleteProject(id: string): Promise<boolean> {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  const result = await ProjectModel.findByIdAndDelete(id).exec();
  return !!result;
}
