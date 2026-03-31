import { 
  type Task, 
  TaskStatus, 
  TaskPriority, 
  type Project, 
  type Workspace, 
  type Member 
} from "../types";

// Default workspace
export const defaultWorkspace: Workspace = {
  id: "ws-1",
  name: "Acme Corp",
  imageUrl: "",
};

// Default members
export const defaultMembers: Member[] = [
  { id: "m-1", name: "John Doe", email: "john@acme.com", avatarUrl: "", role: "admin" },
  { id: "m-2", name: "Jane Smith", email: "jane@acme.com", avatarUrl: "", role: "member" },
  { id: "m-3", name: "Alex Johnson", email: "alex@acme.com", avatarUrl: "", role: "member" },
  { id: "m-4", name: "Sara Wilson", email: "sara@acme.com", avatarUrl: "", role: "member" },
];

// Default projects
export const defaultProjects: Project[] = [
  { id: "proj-1", name: "Website Redesign", workspaceId: "ws-1", imageUrl: "", createdAt: "2024-01-15" },
  { id: "proj-2", name: "Mobile App", workspaceId: "ws-1", imageUrl: "", createdAt: "2024-02-01" },
  { id: "proj-3", name: "API Integration", workspaceId: "ws-1", imageUrl: "", createdAt: "2024-02-10" },
];

// Default tasks - USING CONST OBJECTS
export const defaultTasks: Task[] = [
  {
    id: "task-1",
    title: "Design landing page mockup",
    description: "Create high-fidelity mockups for the new landing page design",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    projectId: "proj-1",
    assigneeId: "m-1",
    dueDate: "2024-03-15",
    createdAt: "2024-02-20",
    position: 0,
  },
  // ... rest of your tasks
  {
    id: "task-2",
    title: "Implement authentication flow",
    description: "Set up login, register and forgot password pages",
    status: TaskStatus.TODO,
    priority: TaskPriority.HIGH,
    projectId: "proj-2",
    assigneeId: "m-2",
    dueDate: "2024-03-20",
    createdAt: "2024-02-21",
    position: 0,
  },
  {
    id: "task-3",
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment",
    status: TaskStatus.BACKLOG,
    priority: TaskPriority.MEDIUM,
    projectId: "proj-3",
    assigneeId: "m-3",
    dueDate: "2024-03-25",
    createdAt: "2024-02-22",
    position: 0,
  },
  // ... add remaining tasks
];