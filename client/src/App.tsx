import TaskCard from "./Components/TaskCard";
import type { Task } from "./Components/TaskCard";


const mockTasks: Task[] = [
  {
    id: "1",
    title: "Set up CI/CD pipeline",
    priority: "Medium",
    dueDate: "2026-03-25",
    assignee: { name: "Alex Johnson" },
  },
  {
    id: "2",
    title: "Design dashboard UI",
    priority: "High",
    dueDate: "2026-03-18",
    assignee: { name: "Sarah Miller" },
  },
  {
    id: "3",
    title: "Write unit tests",
    priority: "Low",
    assignee: { name: "John Doe" },
  },
];
// This code is for testing the component , remove it for your use
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-xl font-semibold text-gray-900">
        Task Board (Test)
      </h1>

      <div className="grid gap-4 max-w-sm">
        {mockTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => alert(`Clicked: ${task.title}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;