import { useState } from "react";
import AppSidebar from "../Components/AppSideBar";
import { mockTasks } from "../Components/Home";
import KanbanBoard from "../Components/KanbanBoard";

const MyTasksPage = () => {
  const currentUserName = "Jane Smith";
  const [tasks, setTasks] = useState(
    mockTasks.filter((t) => t.assignee?.name === currentUserName)
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto w-full max-w-7xl">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">My Tasks</h1>
            <p className="mt-1 text-sm text-gray-600">
              Tasks assigned to you across all projects.
            </p>
          </header>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-600">
              Showing tasks assigned to <span className="font-semibold">{currentUserName}</span>.
            </p>

            <div className="mt-6">
              <KanbanBoard tasks={tasks} setTasks={setTasks} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyTasksPage;
