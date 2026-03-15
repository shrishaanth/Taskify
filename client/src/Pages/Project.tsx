import { useParams } from "react-router-dom";
import { useState } from "react";
import AppSidebar from "../Components/AppSideBar";
import KanbanBoard from "../Components/KanbanBoard";
import { AnalyticsCard, mockTasks } from "../Components/Home";
import type { Task } from "../Components/TaskCard";

const projects = [
  { id: "1", name: "Website Redesign" },
  { id: "2", name: "Mobile App" },
  { id: "3", name: "API Integration" },
];

const Project = () => {
  const { id } = useParams();

  const project = projects.find((p) => p.id === id);

  // For now we filter mock tasks randomly for demo
  const [tasks, setTasks] = useState<Task[]>(
    mockTasks.filter((t) => t.id) // simple demo filter
  );

  if (!project) {
    return (
      <div className="p-10 text-center text-gray-600">
        Project not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AppSidebar />

      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto w-full max-w-7xl">

          {/* Header */}
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              {project.name}
            </h1>
            <p className="text-sm text-gray-600">
              Kanban Board
            </p>
          </header>

          {/* Analytics */}
          <AnalyticsCard tasks={tasks} />

          {/* Kanban */}
          <KanbanBoard tasks={tasks} setTasks={setTasks} />

        </div>
      </main>
    </div>
  );
};

export default Project;