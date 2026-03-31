import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/task.service';

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

export async function listTasks(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { projectId } = req.query;
    let tasks;
    if (projectId && typeof projectId === 'string') {
      tasks = await taskService.getTasksByProject(projectId);
    } else {
      tasks = await taskService.getAllTasks();
    }
    res.json(tasks);
  } catch (error) { next(error); }
}

export async function getTask(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) { next(error); }
}

export async function createTask(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { title, description, status, priority, projectId, assigneeId, dueDate, position } = req.body;
    if (!title || !projectId) {
      return res.status(400).json({ message: 'title and projectId are required' });
    }
    const createdBy = req.user?.userId || '';
    const taskData = {
      title,
      description: description || '',
      status: status || 'Todo',
      priority: priority || 'Medium',
      projectId,
      assigneeId: assigneeId || null,
      dueDate: dueDate || null,
      createdBy,
      position: position ?? 0,
    };
    const task = await taskService.createTask(taskData as any);
    (req.app.get('io') as any)?.emit('task:created', task);
    res.status(201).json(task);
  } catch (error) { next(error); }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    (req.app.get('io') as any)?.emit('task:updated', task);
    res.json(task);
  } catch (error) { next(error); }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    (req.app.get('io') as any)?.emit('task:deleted', { id: req.params.id });
    res.status(204).end();
  } catch (error) { next(error); }
}
