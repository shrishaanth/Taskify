import { api } from "./client";

export interface ApiTask {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  projectId: string;
  assigneeId: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  position: number;
  createdBy: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  projectId: string;
  assigneeId?: string | null;
  dueDate?: string | null;
  position?: number;
}

export const tasksApi = {
  list: (projectId?: string) =>
    api.get<ApiTask[]>(projectId ? `/tasks?projectId=${projectId}` : "/tasks"),

  get: (id: string) => api.get<ApiTask>(`/tasks/${id}`),

  create: (payload: CreateTaskPayload) =>
    api.post<ApiTask>("/tasks", payload),

  update: (id: string, payload: Partial<CreateTaskPayload>) =>
    api.put<ApiTask>(`/tasks/${id}`, payload),

  delete: (id: string) => api.delete<void>(`/tasks/${id}`),
};
