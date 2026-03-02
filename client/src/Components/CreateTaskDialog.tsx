import React, { useState, useEffect } from "react";

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: TaskData) => void;
}

export interface TaskData {
  title: string;
  description: string;
  status: string;
  priority: string;
  project: string;
  assignee: string;
  dueDate: string;
}

const defaultTask: TaskData = {
  title: "",
  description: "",
  status: "Todo",
  priority: "Medium",
  project: "Website Redesign",
  assignee: "Unassigned",
  dueDate: "",
};

export const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [task, setTask] = useState<TaskData>({ ...defaultTask });
  
  // --- New Transition State Logic ---
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
    let enterTimeout: number;
    let exitTimeout: number;    

    if (isOpen) {
        setIsRendered(true);
        
        // Using window.setTimeout ensures it returns a number
        enterTimeout = window.setTimeout(() => {
        setIsVisible(true);
        }, 10); 
    } else {
        setIsVisible(false);
        
        exitTimeout = window.setTimeout(() => {
        setIsRendered(false);
        }, 300);
    }

    return () => {
        clearTimeout(enterTimeout);
        clearTimeout(exitTimeout);
    };
    }, [isOpen]);
  // --------------------------------------
  // ----------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(task);
    setTask({ ...defaultTask });
    onClose();
  };

  // Only remove from DOM after the exit animation completes
  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* 1. Backdrop with Smooth Fade */}
      <div
        className={`absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* 2. Modal Content with Smooth Scale & Slide */}
      <div
        className={`relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transform transition-all duration-300 ease-out ${
          isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-4 opacity-0 scale-95"
        }`}
      >
        {/* Header */}
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Create New Task</h2>
          <p className="text-xs text-gray-500">Fill in the details to track your progress.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Title Field */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500" htmlFor="title">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="e.g., Design system audit"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="What needs to be done?"
              />
            </div>

            {/* 2x2 Grid for Selects */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              {[
                { id: "status", label: "Status", options: ["Todo", "In Progress", "Done"] },
                { id: "priority", label: "Priority", options: ["Low", "Medium", "High"] },
                { id: "project", label: "Project", options: ["Website Redesign", "Mobile App", "Internal Tool"] },
                { id: "assignee", label: "Assignee", options: ["Unassigned", "Alice", "Bob", "Charlie"] },
              ].map((field) => (
                <div key={field.id}>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500" htmlFor={field.id}>
                    {field.label}
                  </label>
                  <select
                    id={field.id}
                    name={field.id}
                    value={(task as any)[field.id]}
                    onChange={handleChange}
                    className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    {field.options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Due Date */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500" htmlFor="dueDate">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={() => {
                setTask({ ...defaultTask });
                onClose();
              }}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};