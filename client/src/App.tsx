import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import AppSidebar from "./Components/AppSideBar";
import { CreateTaskDialog } from "./Components/CreateTaskDialog";
import { EditTaskDialog } from "./Components/EditTaskDialog";
import type { TaskData } from "./Components/CreateTaskDialog";

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);

  // Sample task for demo/testing
  const sampleTask: TaskData = {
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment",
    status: "Backlog",
    priority: "Medium",
    project: "API Integration",
    assignee: "Alex Johnson",
    dueDate: "2025-03-25",
  };

  const handleCreate = (data: TaskData) => {
    console.log("created task", data);
    // TODO: add task to state/api
  };

  const handleEditOpen = (task: TaskData) => {
    setSelectedTask(task);
    setEditDialogOpen(true);
  };

  const handleEditSave = (data: TaskData) => {
    console.log("saved task", data);
    // TODO: update task in state/api
  };

  const handleDelete = () => {
    console.log("deleted task", selectedTask);
    // TODO: delete task from state/api
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex-1 p-6">
          <div className="flex gap-3 mb-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={() => setDialogOpen(true)}
            >
              New Task
            </button>
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              onClick={() => handleEditOpen(sampleTask)}
            >
              Edit Task
            </button>
          </div>

          {/* routes would go here */}
          <Routes>
            <Route path="/" element={<div>Welcome to Taskify</div>} />
            {/* add other routes as needed */}
          </Routes>
        </div>
      </div>

      <CreateTaskDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreate={handleCreate}
      />

      <EditTaskDialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleEditSave}
        onDelete={handleDelete}
        task={selectedTask}
      />
    </BrowserRouter>
  );
}

export default App;