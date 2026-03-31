import { api } from "./client";

export interface ApiProject {
  id: string;
  name: string;
  workspaceId: string;
  imageUrl: string;
  createdAt: string;
}

export const projectsApi = {
  list: () => api.get<ApiProject[]>("/projects"),
  get: (id: string) => api.get<ApiProject>(`/projects/${id}`),
  create: (payload: { name: string; workspaceId: string; imageUrl?: string }) =>
    api.post<ApiProject>("/projects", payload),
  update: (id: string, payload: Partial<{ name: string; imageUrl: string }>) =>
    api.put<ApiProject>(`/projects/${id}`, payload),
  delete: (id: string) => api.delete<void>(`/projects/${id}`),
};
