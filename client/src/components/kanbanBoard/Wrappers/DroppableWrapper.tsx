import React, { useRef } from "react";

interface Props {
  statusId: number;
  onTaskDrop: (taskId: number, statusId: number, index: number) => void;
  children: React.ReactNode;
}

const DroppableWrapper: React.FC<Props> = ({
  statusId,
  onTaskDrop,
  children,
}) => {
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const container = e.currentTarget;
    const prevPositions = savePositions();

    const afterElement = getDragAfterElement(container, e.clientY);
    if (!placeholderRef.current) {
      placeholderRef.current = document.createElement("div");
      placeholderRef.current.className = "placeholder";
    }

    if (afterElement == null) {
      container.appendChild(placeholderRef.current);
    } else {
      container.insertBefore(placeholderRef.current, afterElement);
    }

    animateReorder(prevPositions);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = Number(e.dataTransfer.getData("text/plain"));

    if (placeholderRef.current) {
      const index = Array.from(e.currentTarget.children).indexOf(
        placeholderRef.current
      );
      onTaskDrop(taskId, statusId, index);
      placeholderRef.current.remove();
      placeholderRef.current = null;
    }
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      {children}
    </div>
  );
};

export default DroppableWrapper;

// --- helpers ---
function getDragAfterElement(container: HTMLElement, y: number) {
  const draggableElements = [
    ...container.querySelectorAll(".task:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY, element: null as Element | null }
  ).element;
}

function savePositions() {
  const positions = new Map<Element, DOMRect>();
  document.querySelectorAll(".task").forEach((el) => {
    const rect = el.getBoundingClientRect();
    positions.set(el, rect);
  });
  return positions;
}

function animateReorder(prevPositions: Map<Element, DOMRect>) {
  document.querySelectorAll(".task").forEach((el) => {
    const prev = prevPositions.get(el);
    if (!prev) return;
    const newBox = el.getBoundingClientRect();

    const dx = prev.left - newBox.left;
    const dy = prev.top - newBox.top;

    if (dx || dy) {
      (el as HTMLElement).style.transition = "none";
      (el as HTMLElement).style.transform = `translate(${dx}px, ${dy}px)`;
      requestAnimationFrame(() => {
        (el as HTMLElement).style.transition = "transform 0.25s ease";
        (el as HTMLElement).style.transform = "none";
      });
    }
  });
}
