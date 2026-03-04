// Task Status as const object (instead of enum)
export const TaskStatus = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
} as const;

// Task Priority as const object (instead of enum)
export const TaskPriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

// Derive types from the const objects
export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];
export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority];

// Interfaces
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  assigneeId: string | null;
  dueDate: string | null;
  createdAt: string;
  position: number;
}

export interface Project {
  id: string;
  name: string;
  workspaceId: string;
  imageUrl: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: "admin" | "member";
}

// Configuration objects for UI styling
export const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; dot: string }> = {
  [TaskStatus.BACKLOG]: { 
    label: "Backlog", 
    color: "bg-gray-100 text-gray-700", 
    dot: "bg-gray-500" 
  },
  [TaskStatus.TODO]: { 
    label: "Todo", 
    color: "bg-blue-50 text-blue-700", 
    dot: "bg-blue-500" 
  },
  [TaskStatus.IN_PROGRESS]: { 
    label: "In Progress", 
    color: "bg-yellow-50 text-yellow-700", 
    dot: "bg-yellow-500" 
  },
  [TaskStatus.IN_REVIEW]: { 
    label: "In Review", 
    color: "bg-purple-50 text-purple-700", 
    dot: "bg-purple-500" 
  },
  [TaskStatus.DONE]: { 
    label: "Done", 
    color: "bg-green-50 text-green-700", 
    dot: "bg-green-500" 
  },
};

export const PRIORITY_CONFIG: Record<TaskPriority, { label: string; color: string }> = {
  [TaskPriority.LOW]: { 
    label: "Low", 
    color: "bg-green-100 text-green-700" 
  },
  [TaskPriority.MEDIUM]: { 
    label: "Medium", 
    color: "bg-yellow-100 text-yellow-700" 
  },
  [TaskPriority.HIGH]: { 
    label: "High", 
    color: "bg-red-100 text-red-700" 
  },
};