import { api } from "./client";

export interface ApiMember {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: "admin" | "member";
}

export const membersApi = {
  list: () => api.get<ApiMember[]>("/members"),
  get: (id: string) => api.get<ApiMember>(`/members/${id}`),
  update: (id: string, payload: Partial<ApiMember>) =>
    api.put<ApiMember>(`/members/${id}`, payload),
  delete: (id: string) => api.delete<void>(`/members/${id}`),
};
