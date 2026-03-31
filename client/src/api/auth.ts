import { api } from "./client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "member";
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  avatarUrl?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    api.post<AuthResponse>("/auth/login", payload),

  register: (payload: RegisterPayload) =>
    api.post<AuthUser>("/auth/register", payload),

  me: () => api.get<AuthUser>("/auth/me"),
};
