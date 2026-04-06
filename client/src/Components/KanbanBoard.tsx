import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import TaskCard from "./TaskCard";
import { type UITask } from "../Context/AppContext";

export type Status = "Backlog" | "Todo" | "In Progress" | "In Review" | "Done";

interface KanbanBoardProps {
  tasks: UITask[];
  onMoveTask: (taskId: string, newStatus: string) => void;
  onTaskClick?: (task: UITask) => void;
}

const STATUSES: Status[] = ["Backlog", "Todo", "In Progress", "In Review", "Done"];

const KanbanBoard = ({ tasks, onMoveTask, onTaskClick }: KanbanBoardProps) => {
  const [activeTask, setActiveTask] = useState<UITask | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    const draggedTask = tasks.find((t) => t.id === activeId);
    if (!draggedTask) return;

    let newStatus: string;
    if (STATUSES.includes(overId as Status)) {
      newStatus = overId;
    } else {
      const overTask = tasks.find((t) => t.id === overId);
      if (!overTask || overTask.status === draggedTask.status) return;
      newStatus = overTask.status;
    }

    if (newStatus !== draggedTask.status) {
      onMoveTask(activeId, newStatus);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 mt-6">
        {STATUSES.map((status) => {
          const columnTasks = tasks.filter((t) => t.status === status);
          return (
            <Column key={status} status={status}>
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-600">
                {status} ({columnTasks.length})
              </h3>
              <SortableContext
                items={columnTasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-3">
                  {columnTasks.map((task) => (
                    <SortableTask
                      key={task.id}
                      task={task}
                      onClick={onTaskClick}
                      isDragging={activeTask?.id === task.id}
                    />
                  ))}
                </div>
              </SortableContext>
            </Column>
          );
        })}
      </div>

      {/* This is the floating card that follows your cursor while dragging */}
      <DragOverlay dropAnimation={{
        duration: 200,
        easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
      }}>
        {activeTask ? (
          <div className="rotate-2 scale-105 opacity-95 shadow-2xl">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const Column = ({ status, children }: { status: Status; children: React.ReactNode }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-xl p-3 min-h-[500px] transition-colors duration-200 ${
        isOver ? "bg-blue-50 ring-2 ring-blue-200" : "bg-gray-50"
      }`}
    >
      {children}
    </div>
  );
};

const SortableTask = ({
  task,
  onClick,
  isDragging,
}: {
  task: UITask;
  onClick?: (task: UITask) => void;
  isDragging: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {isDragging ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 opacity-50 h-24" />
      ) : (
        <TaskCard task={task} onClick={() => onClick?.(task)} />
      )}
    </div>
  );
};

export default KanbanBoard;