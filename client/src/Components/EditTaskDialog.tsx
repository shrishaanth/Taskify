import React, { useState, useEffect } from "react";
import type { TaskData } from "./CreateTaskDialog";

interface EditTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TaskData) => void;
  onDelete: () => void;
  task: TaskData | null;
}

export const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  task,
}) => {
  const [editTask, setEditTask] = useState<TaskData | null>(task);
  
  // --- Transition State Logic ---
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    let enterTimeout: number;
    let exitTimeout: number;

    if (isOpen) {
      setIsRendered(true);
      setEditTask(task);
      setShowDeleteConfirm(false);
      
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
  }, [isOpen, task]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!editTask) return;
    const { name, value } = e.target;
    setEditTask((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTask) {
      onSave(editTask);
      onClose();
    }
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete();
      onClose();
    } else {
      setShowDeleteConfirm(true);
    }
  };

  if (!isRendered || !editTask) return null;

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
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit Task</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-200 rounded-lg p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6">
          <div className="space-y-5">
            {/* Title Field */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={editTask.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Task title"
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
                value={editTask.description}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Task description"
              />
            </div>

            {/* 2x2 Grid for Selects */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              {[
                { id: "status", label: "Status", options: ["Todo", "In Progress", "Done"] },
                { id: "priority", label: "Priority", options: ["Low", "Medium", "High"] },
                { id: "project", label: "Project", options: ["Website Redesign", "API Integration", "Mobile App"] },
                { id: "assignee", label: "Assignee", options: ["Unassigned", "Alex Johnson", "Sarah Smith", "Mike Brown"] },
              ].map((field) => (
                <div key={field.id}>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500" htmlFor={field.id}>
                    {field.label}
                  </label>
                  <select
                    id={field.id}
                    name={field.id}
                    value={(editTask as any)[field.id]}
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
                value={editTask.dueDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
            {/* Delete Button */}
            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-red-200 hover:bg-red-700 active:scale-[0.98] transition-all"
              >
                Delete
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Keep
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 active:scale-[0.98] transition-all"
                >
                  Confirm Delete
                </button>
              </div>
            )}

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
