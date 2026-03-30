import { users } from "../models/store";
import { User } from "../types";

export function getAllUsers() {
  return users.map(({ passwordHash, ...safeUser }) => safeUser);
}

export function getUserById(id: string) {
  return users.find((u) => u.id === id);
}

export function updateUser(id: string, update: Partial<User>) {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  if (update.name) user.name = update.name;
  if (update.role && (update.role === "admin" || update.role === "member")) user.role = update.role;
  if (update.avatarUrl !== undefined) user.avatarUrl = update.avatarUrl;
  if (update.workspaceId !== undefined) user.workspaceId = update.workspaceId;
  return user;
}

export function deleteUser(id: string) {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}
