import {
  DndContext,
  type DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { type Task } from "./TaskCard";
import TaskCard from "./TaskCard";

export type Status =
  | "Backlog"
  | "Todo"
  | "In Progress"
  | "In Review"
  | "Done";

interface KanbanBoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const STATUSES: Status[] = [
  "Backlog",
  "Todo",
  "In Progress",
  "In Review",
  "Done",
];

const KanbanBoard = ({ tasks, setTasks }: KanbanBoardProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const draggedTask = tasks.find((t) => t.id === activeId);
    if (!draggedTask) return;

    // Case 1: Dropped on column
    if (STATUSES.includes(overId as Status)) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === activeId
            ? { ...task, status: overId as Status }
            : task
        )
      );
      return;
    }

    // Case 2: Dropped on another task
    const overTask = tasks.find((t) => t.id === overId);
    if (!overTask) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === activeId
          ? { ...task, status: overTask.status }
          : task
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 mt-6">
        {STATUSES.map((status) => {
          const columnTasks = tasks.filter(
            (task) => task.status === status
          );

          return (
            <Column key={status} status={status}>
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-600">
                {status} ({columnTasks.length})
              </h3>

              <SortableContext
                items={columnTasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-3">
                  {columnTasks.map((task) => (
                    <SortableTask key={task.id} task={task} />
                  ))}
                </div>
              </SortableContext>
            </Column>
          );
        })}
      </div>
    </DndContext>
  );
};

/* ================= COLUMN ================= */

interface ColumnProps {
  status: Status;
  children: React.ReactNode;
}

const Column = ({ status, children }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col rounded-xl bg-gray-50 p-3 min-h-[500px]"
    >
      {children}
    </div>
  );
};

/* ================= SORTABLE TASK ================= */

interface SortableTaskProps {
  task: Task;
}

const SortableTask = ({ task }: SortableTaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} />
    </div>
  );
};

export default KanbanBoard;