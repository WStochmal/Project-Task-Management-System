// lib
import React, { useState } from "react";

// style
import style from "./StatusColumn.module.css";

// type
import type { Status } from "../../../types/Status.type";
import TaskCard from "../TaskCard/TaskCard";
import { useAppContext } from "../../../context/AppContext";
import type { Task } from "../../../types/Task.type";
import NewTask from "../NewTask/NewTask";

interface StatusProps {
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  status: Status;
  draggedTask: React.RefObject<Task>;
  taskPlaceholder: React.RefObject<HTMLDivElement>;
}

const StatusColumn: React.FC<StatusProps> = ({
  status,
  onDragStart,
  onDragEnd,
  draggedTask,
  taskPlaceholder,
}) => {
  const { deleteStatus, createTask, moveTask } = useAppContext();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleTaskDragStart = (
    task: Task,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    draggedTask.current = task;
    const target = e.currentTarget as HTMLDivElement;
    target.classList.add(style.dragging);
    setTimeout(() => (target.style.display = "none"), 0);
  };

  const handleTaskDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove(style.dragging);
    e.currentTarget.style.display = "flex";
    if (taskPlaceholder.current) taskPlaceholder.current.remove();
    draggedTask.current = null;
  };

  const handleTaskDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedTask.current || !taskPlaceholder.current) return;

    const container = e.currentTarget;

    // usuń placeholder z poprzedniego kontenera
    if (
      taskPlaceholder.current.parentElement &&
      taskPlaceholder.current.parentElement !== container
    ) {
      taskPlaceholder.current.parentElement.removeChild(
        taskPlaceholder.current
      );
    }

    const prevPositions = savePositions();

    const afterElement = getTaskAfterElement(container, e.clientY);

    if (afterElement == null) {
      container.appendChild(taskPlaceholder.current);
    } else {
      container.insertBefore(taskPlaceholder.current, afterElement);
    }

    animateReorder(prevPositions);
  };

  function getTaskAfterElement(container: Element, y: number) {
    const draggableTasks = [
      ...container.querySelectorAll(
        ".task:not(.dragging):not(.task-placeholder)"
      ),
    ];
    return draggableTasks.reduce<{ offset: number; element: Element | null }>(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset)
          return { offset, element: child };
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY, element: null }
    ).element;
  }

  const savePositions = () => {
    const positions = new Map<Element, DOMRect>();
    document
      .querySelectorAll(".task")
      .forEach((el) => positions.set(el, el.getBoundingClientRect()));
    return positions;
  };

  const animateReorder = (prevPositions: Map<Element, DOMRect>) => {
    document.querySelectorAll(".task").forEach((el) => {
      const prev = prevPositions.get(el);
      if (!prev) return;
      const newBox = el.getBoundingClientRect();
      const dx = prev.left - newBox.left;
      const dy = prev.top - newBox.top;
      if (dx || dy) {
        el.style.transition = "none";
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        requestAnimationFrame(() => {
          el.style.transition = "transform 0.25s ease";
          el.style.transform = "none";
        });
      }
    });
  };

  const handleNewTask = (taskName: string, sortOrder: number) => {
    createTask(status.id, taskName, sortOrder);
  };
  const handleTaskDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetStatusId: string
  ) => {
    e.preventDefault();
    if (!draggedTask.current || !taskPlaceholder.current) return;

    const children = Array.from(e.currentTarget.children);
    const placeholderIndex = children.indexOf(taskPlaceholder.current);
    moveTask(draggedTask.current.id, targetStatusId, placeholderIndex);

    taskPlaceholder.current.remove();
  };

  return (
    <div
      id={status.id}
      draggable
      className={`column ${style["status-column"]}`}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className={style["status-header"]}>
        <div
          style={{ backgroundColor: status.color }}
          className={style["status-color"]}
        ></div>
        <div className={style["status-description"]}>
          <h3>{status.name}</h3>
          <span>{status?.tasks.length} tasks</span>
          <span className={style["status-btns"]}>
            <button onClick={() => setIsFormVisible(true)}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                fill="currentColor"
                width="512"
                height="512"
              >
                <g>
                  <path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z" />
                </g>
              </svg>
            </button>
            <button onClick={() => deleteStatus(status.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="512"
                height="512"
                fill="currentColor"
              >
                <g id="_01_align_center" data-name="01 align center">
                  <path d="M22,4H17V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2ZM9,2h6V4H9Zm9,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V6H18Z" />
                  <rect x="9" y="10" width="2" height="8" />
                  <rect x="13" y="10" width="2" height="8" />
                </g>
              </svg>
            </button>
          </span>
        </div>
      </div>
      <div
        className={style["task-list"]}
        onDragOver={(e) => handleTaskDragOver(e, status.id)}
        onDrop={(e) => handleTaskDrop(e, status.id)}
      >
        {status.tasks
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={(e) => handleTaskDragStart(task, e)}
              onDragEnd={handleTaskDragEnd}
            />
          ))}
        <NewTask
          isFormVisible={isFormVisible}
          setIsFormVisible={setIsFormVisible}
          handleNewTask={handleNewTask}
          order={status.tasks.length}
        />
      </div>
    </div>
  );
};

export default StatusColumn;
