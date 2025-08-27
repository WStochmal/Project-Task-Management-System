// lib
import React, { useRef, useState } from "react";

// component
import StatusColumn from "../Status/StatusColumn";

// type
import type { Status } from "../../../types/Status.type";
import type { Project } from "../../../types/Project.type";

// style
import style from "./Board.module.css";
import NewStatus from "../NewStatus/NewStatus";
import { useAppContext } from "../../../context/AppContext";

type BoardProps = {
  project: Project;
};

const Board = ({ project }: BoardProps) => {
  const { createStatus, updateStatusOrder } = useAppContext();
  const statuses = project?.statuses || [];
  const draggedTask = useRef<Task | null>(null);
  const draggedStatus = useRef<Status | null>(null);
  const colPlaceholder = useRef<HTMLDivElement | null>(null);
  const taskPlaceholder = useRef<HTMLDivElement | null>(null);
  if (!taskPlaceholder.current) {
    taskPlaceholder.current = document.createElement("div");
    taskPlaceholder.current.className = style["task-placeholder"];
  }

  if (!colPlaceholder.current) {
    colPlaceholder.current = document.createElement("div");
    colPlaceholder.current.className = style["column-placeholder"];
  }

  const handleDragStart = (
    status: Status,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    draggedStatus.current = status;
    const target = e.currentTarget as HTMLDivElement;

    target.classList.add(style.dragging);
    setTimeout(() => {
      target.style.display = "none";
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove(style.dragging);
    e.currentTarget.style.display = "flex";
    colPlaceholder.current?.remove();
    draggedStatus.current = null;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedStatus.current) return;
    e.preventDefault();

    const board = e.currentTarget;
    const prevPositions = savePositions();

    const afterElement = getDragAfterColumn(board, e.clientX);
    if (afterElement == null) {
      board.appendChild(colPlaceholder.current!);
    } else {
      board.insertBefore(colPlaceholder.current!, afterElement);
    }

    animateReorder(prevPositions); // 🔹 uruchom animację po zmianie
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedStatus.current) return;
    const newOrder: Status[] = [];
    const board = e.currentTarget;
    const children = Array.from(board.children);

    console.log("Dropped:", {
      draggedStatus: draggedStatus.current,
      newOrder: children.map((child) => child.id),
    });

    const draggedId = draggedStatus.current!.id;

    children.forEach((child) => {
      if (child === colPlaceholder.current) {
        newOrder.push(draggedStatus.current!);
      } else {
        const found = statuses.find((s) => s.id == child.id);
        if (found && found.id !== draggedId) {
          newOrder.push(found);
        }
      }
    });

    updateStatusOrder(newOrder, project.id);
    colPlaceholder.current?.remove();
    draggedStatus.current = null;
  };

  function getDragAfterColumn(container: Element, x: number) {
    const draggableCols = [
      ...container.querySelectorAll(".column:not([style*='display: none'])"),
    ].filter(
      (el) =>
        el !== colPlaceholder.current &&
        !el.classList.contains("new-status-column")
    );

    return draggableCols.reduce<{ offset: number; element: Element | null }>(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY, element: null }
    ).element;
  }

  const savePositions = () => {
    const positions = new Map<Element, DOMRect>();
    document.querySelectorAll(".column").forEach((el) => {
      positions.set(el, el.getBoundingClientRect());
    });
    return positions;
  };

  const animateReorder = (prevPositions: Map<Element, DOMRect>) => {
    document.querySelectorAll(".column").forEach((el) => {
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

  const createNewStatusColumn = (
    name: string,
    color: string,
    sortOrder: number
  ) => {
    createStatus(project.id, name, color, sortOrder);
  };

  return (
    <div className={style.boardContainer}>
      <div
        className={style.board}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {statuses
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((status) => (
            <StatusColumn
              key={status.id}
              status={status}
              onDragStart={(e) => handleDragStart(status, e)}
              onDragEnd={handleDragEnd}
              draggedTask={draggedTask}
              taskPlaceholder={taskPlaceholder}
            />
          ))}
      </div>
      <NewStatus
        handleNewStatus={createNewStatusColumn}
        order={statuses.length}
      />
    </div>
  );
};

export default Board;
