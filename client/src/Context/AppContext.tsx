import React, { createContext, useContext, useState, useCallback } from "react";
import type { Task, Project, Member, Workspace } from "../types";
import { TaskStatus } from "../types";
import { 
  defaultTasks, 
  defaultProjects, 
  defaultMembers, 
  defaultWorkspace 
} from "../data/data";

interface AppState {
  // Data
  workspace: Workspace;
  projects: Project[];
  tasks: Task[];
  members: Member[];
  selectedProjectId: string | null;
  
  // Actions
  addTask: (task: Omit<Task, "id" | "createdAt" | "position">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  addProject: (project: Omit<Project, "id" | "createdAt">) => void;
  setSelectedProjectId: (id: string | null) => void;
}

const AppContext = createContext<AppState | null>(null);

export const useAppState = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppProvider");
  return ctx;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workspace] = useState<Workspace>(defaultWorkspace);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [members] = useState<Member[]>(defaultMembers);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const addTask = useCallback((task: Omit<Task, "id" | "createdAt" | "position">) => {
    setTasks((prev) => {
      const sameStatusTasks = prev.filter((t) => t.status === task.status);
      const newTask: Task = {
        ...task,
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
        position: sameStatusTasks.length,
      };
      return [...prev, newTask];
    });
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTask = useCallback((taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }, []);

  const addProject = useCallback((project: Omit<Project, "id" | "createdAt">) => {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProjects((prev) => [...prev, newProject]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        workspace,
        projects,
        tasks,
        members,
        selectedProjectId,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        addProject,
        setSelectedProjectId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};