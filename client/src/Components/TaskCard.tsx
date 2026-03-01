import { Calendar } from "lucide-react";


export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  dueDate?: string; 
  assignee?: {
    name: string;
  };
}

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}


const priorityStyles: Record<Priority, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};


const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const initials = task.assignee?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      onClick={onClick}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <p className="text-sm font-medium text-gray-900 leading-snug">
        {task.title}
      </p>

      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>

        {task.dueDate && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </div>

      {task.assignee && (
        <div className="mt-4 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white">
            {initials}
          </div>
          <span className="text-xs text-gray-600">
            {task.assignee.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;