import React, { useRef, useState, useEffect } from "react";
import type { Status } from "../../../types/Status.type";
import TaskCard from "../TaskCard/TaskCard";
import { DroppableWrapper } from "../Wrappers/DroppableWrapper";
import style from "./Status.module.css";

const Status = ({ status }: { status: Status }) => {
  const Placeholder = () => (
    <div
      style={{
        height: 40,
        background: "rgba(0,0,0,0.3)",
        borderRadius: 6,
        marginBottom: 8,
      }}
    />
  );

  const tasksContainerRef = useRef<HTMLDivElement>(null);
  const [taskPositions, setTaskPositions] = useState<number[]>([]);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const updateTaskPositions = () => {
    if (tasksContainerRef.current) {
      const tasks = Array.from(tasksContainerRef.current.children).filter(
        (el) => !el.hasAttribute("data-dragged")
      );
      const positions = tasks.map((task) => task.getBoundingClientRect().top);
      setTaskPositions(positions);
    }
  };

  useEffect(() => {
    updateTaskPositions();
    window.addEventListener("resize", updateTaskPositions);
    return () => window.removeEventListener("resize", updateTaskPositions);
  }, [status.tasks]);

  return (
    <DroppableWrapper droppableId={`status-${status.id}`}>
      {(placeholderIndex, setPlaceholderIndex) => (
        <div
          className={style["status"]}
          style={{ backgroundColor: status.color }}
        >
          <div className={style["status-header"]}>{status.name}</div>
          <div
            className={style["status-tasks"]}
            ref={tasksContainerRef}
            onDragOver={(e) => {
              e.preventDefault();
              const mouseY = e.clientY;
              let newIndex = status.tasks.length;
              for (let i = 0; i < taskPositions.length; i++) {
                const taskMiddle = taskPositions[i] + 20;
                const buffer = 10;
                const distanceToMiddle = Math.abs(mouseY - taskMiddle);

                if (
                  mouseY >= taskPositions[i] - buffer &&
                  mouseY < taskPositions[i] + 40 + buffer
                ) {
                  if (distanceToMiddle > 5) {
                    newIndex = mouseY < taskMiddle ? i : i + 1;
                  } else {
                    newIndex = placeholderIndex ?? i;
                  }
                  break;
                }
              }

              setPlaceholderIndex(newIndex);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setPlaceholderIndex(null);
              }
            }}
          >
            {status.tasks.length === 0 && placeholderIndex === 0 && (
              <Placeholder />
            )}

            {status.tasks.map((task, idx) => (
              <React.Fragment key={task.id}>
                {placeholderIndex === idx && <Placeholder />}
                <div
                  data-dragged={draggedTaskId === task.id ? "true" : undefined}
                  style={{
                    opacity: draggedTaskId === task.id ? 0.5 : 1, // Wyróżnienie przeciąganego elementu
                  }}
                  onDragStart={() => {
                    setDraggedTaskId(task.id);
                    updateTaskPositions();
                  }}
                  onDragEnd={() => {
                    setDraggedTaskId(null);
                    setPlaceholderIndex(null);
                    updateTaskPositions();
                  }}
                >
                  <TaskCard task={task} />
                </div>
              </React.Fragment>
            ))}
            {placeholderIndex === status.tasks.length &&
              status.tasks.length > 0 && <Placeholder />}
          </div>
        </div>
      )}
    </DroppableWrapper>
  );
};

export default Status;
