import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { tasksApi, type ApiTask } from "../api/tasks";
import { projectsApi, type ApiProject } from "../api/projects";
import { membersApi, type ApiMember } from "../api/members";
import { useAuth } from "./AuthContext";
import { api } from "../api/client";

// Map API task to UI Task shape (KanbanBoard expects string status labels)
export interface UITask {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  projectId: string;
  assigneeId: string | null;
  dueDate: string | null;
  createdAt: string;
  position: number;
  assignee?: { name: string };
}

interface AppState {
  projects: ApiProject[];
  tasks: UITask[];
  members: ApiMember[];
  selectedProjectId: string | null;
  isLoading: boolean;
  error: string | null;

  addTask: (task: {
    title: string; description?: string; status: string; priority: string;
    projectId: string; assigneeId?: string | null; dueDate?: string | null;
  }) => Promise<void>;
  updateTask: (id: string, updates: Partial<UITask>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, newStatus: string) => Promise<void>;
  addProject: (project: { name: string; imageUrl?: string }) => Promise<void>;
  setSelectedProjectId: (id: string | null) => void;
  refetchTasks: (projectId?: string) => Promise<void>;
}

const AppContext = createContext<AppState | null>(null);

export const useAppState = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppProvider");
  return ctx;
};

function enrichTasks(tasks: ApiTask[], members: ApiMember[]): UITask[] {
  return tasks.map((t) => {
    const assignee = t.assigneeId
      ? members.find((m) => m.id === t.assigneeId)
      : undefined;
    return {
      ...t,
      assignee: assignee ? { name: assignee.name } : undefined,
    };
  });
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [tasks, setTasks] = useState<UITask[]>([]);
  const [members, setMembers] = useState<ApiMember[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const [proj, mem, tsk] = await Promise.all([
        projectsApi.list(),
        membersApi.list(),
        tasksApi.list(),
      ]);
      setProjects(proj);
      setMembers(mem);
      setTasks(enrichTasks(tsk, mem));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const refetchTasks = useCallback(async (projectId?: string) => {
    try {
      const tsk = await tasksApi.list(projectId);
      setTasks(enrichTasks(tsk, members));
    } catch (e: any) {
      setError(e.message);
    }
  }, [members]);

  const addTask = useCallback(async (task: {
    title: string; description?: string; status: string; priority: string;
    projectId: string; assigneeId?: string | null; dueDate?: string | null;
  }) => {
    const newTask = await tasksApi.create(task);
    const assignee = newTask.assigneeId
      ? members.find((m) => m.id === newTask.assigneeId)
      : undefined;
    setTasks((prev) => [...prev, { ...newTask, assignee: assignee ? { name: assignee.name } : undefined }]);
  }, [members]);

  const updateTask = useCallback(async (id: string, updates: Partial<UITask>) => {
    const updated = await tasksApi.update(id, updates);
    const assignee = updated.assigneeId
      ? members.find((m) => m.id === updated.assigneeId)
      : undefined;
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...updated, assignee: assignee ? { name: assignee.name } : undefined } : t)
    );
  }, [members]);

  const deleteTask = useCallback(async (id: string) => {
    await tasksApi.delete(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTask = useCallback(async (taskId: string, newStatus: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    await tasksApi.update(taskId, { status: newStatus });
    setTasks((prev) =>
      prev.map((t) => t.id === taskId ? { ...t, status: newStatus } : t)
    );
  }, [tasks]);

  const addProject = useCallback(async (project: { name: string; imageUrl?: string }) => {
  // Get the real workspace id from the API
  const workspaces = await api.get<{ id: string }[]>("/workspaces");
  const workspaceId = workspaces[0]?.id;
  if (!workspaceId) throw new Error("No workspace found. Please register first.");
  const newProject = await projectsApi.create({ ...project, workspaceId, imageUrl: project.imageUrl || "" });
  setProjects((prev) => [...prev, newProject]);
}, []);

  return (
    <AppContext.Provider value={{
      projects, tasks, members, selectedProjectId,
      isLoading, error,
      addTask, updateTask, deleteTask, moveTask, addProject,
      setSelectedProjectId, refetchTasks,
    }}>
      {children}
    </AppContext.Provider>
  );
};
