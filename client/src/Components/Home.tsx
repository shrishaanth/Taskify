import { useState } from "react";
import KanbanBoard from "./KanbanBoard";
import { type Task } from "./TaskCard";
import { CheckCircle, Clock, ListTodo, AlertTriangle } from "lucide-react";

interface AnalyticsCardProps {
  tasks: Task[];
}

export const AnalyticsCard = ({ tasks }: AnalyticsCardProps) => {
  const totalTasks = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Done").length;
  const highPriority = tasks.filter((t) => t.priority === "High").length;

  const cards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <ListTodo className="h-5 w-5 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
      bg: "bg-yellow-100",
    },
    {
      title: "Completed",
      value: completed,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "High Priority",
      value: highPriority,
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.bg}`}
          >
            {card.icon}
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Implement authentication flow",
    priority: "High",
    status: "Todo",
    assignee: { name: "Jane Smith" },
    dueDate: "2026-03-20",
  },
  {
    id: "2",
    title: "Design landing page mockup",
    priority: "High",
    status: "In Progress",
    assignee: { name: "John Doe" },
    dueDate: "2026-03-15",
  },
  {
    id: "3",
    title: "Write API documentation",
    priority: "Low",
    status: "In Review",
    assignee: { name: "Sara Wilson" },
    dueDate: "2026-03-18",
  },
  {
    id: "4",
    title: "Fix responsive navbar",
    priority: "Medium",
    status: "Done",
    assignee: { name: "John Doe" },
    dueDate: "2026-03-10",
  },
  // Add more tasks if you want
];

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  return (
    <div>
      <AnalyticsCard tasks={tasks} />
      <KanbanBoard tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Home;