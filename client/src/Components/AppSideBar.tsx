import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Settings,
  Users,
  FolderKanban,
  ChevronDown,
  Plus,
  CheckSquare,
} from "lucide-react";

const cls = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Mock Data
interface Project {
  id: string;
  name: string;
}

interface Workspace {
  name: string;
}

// Mock context hook 
const useAppState = () => {
  return {
    workspace: { name: "Acme Corp" } as Workspace,
    projects: [
      { id: "1", name: "Website Redesign" },
      { id: "2", name: "Mobile App" },
      { id: "3", name: "API Integration" },
    ] as Project[],
    selectedProjectId: null as string | null,
    setSelectedProjectId: (id: string | null) => console.log(id),
  };
};

const AppSidebar = () => {
  const location = useLocation();
  const { workspace, projects, selectedProjectId, setSelectedProjectId } = useAppState();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: CheckSquare, label: "My Tasks", path: "/my-tasks" },
    { icon: Users, label: "Members", path: "/members" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="flex h-screen w-[280px] flex-col border-r border-gray-200 bg-white">
      {/* Workspace Header */}
      <div className="flex h-14 items-center gap-3 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white text-sm font-semibold">
          {workspace.name.charAt(0)}
        </div>
        <span className="text-sm font-semibold text-gray-900">
          {workspace.name}
        </span>
        <ChevronDown className="ml-auto h-4 w-4 text-gray-500" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 px-2 py-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cls(
                "flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
                active
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className={cls("flex h-5 w-5 items-center justify-center", active && "text-gray-900")}>
                <item.icon className="h-[18px] w-[18px] stroke-[2]" />
              </div>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-3 my-2 h-px bg-gray-200" />

      {/* Projects */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Projects
          </span>
          <button className="rounded p-1 hover:bg-gray-100 transition-colors">
            <Plus className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div className="flex flex-col gap-0.5 px-2 overflow-y-auto flex-1">
          {projects.map((project: Project) => {
            const isSelected = selectedProjectId === project.id;
            return (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                onClick={() => setSelectedProjectId(project.id)}
                className={cls(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
                  isSelected
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div className="flex h-5 w-5 items-center justify-center">
                  <FolderKanban className="h-[18px] w-[18px] stroke-[2]" />
                </div>
                <span className="truncate">{project.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;