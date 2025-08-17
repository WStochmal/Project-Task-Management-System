import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";

type DroppableWrapperProps = {
  droppableId: string;
  children: (
    placeholderIndex: number | null,
    setPlaceholderIndex: (index: number | null) => void
  ) => React.ReactNode;
};

export const DroppableWrapper = ({
  droppableId,
  children,
}: DroppableWrapperProps) => {
  const { handleTaskDrop } = useAppContext();
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedObjectId = e.dataTransfer.getData("draggedObjectId");

    if (draggedObjectId) {
      const draggedObjectType = draggedObjectId.split("-")[0];
      if (draggedObjectType === "task") {
        handleTaskDrop(draggedObjectId, droppableId, placeholderIndex);
      }
    }

    setPlaceholderIndex(null);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    // Ustawiamy placeholderIndex tylko, jeśli kursor wchodzi do kontenera
    if (e.currentTarget.dataset.droppableId === droppableId) {
      setPlaceholderIndex(0); // Domyślnie na początek listy
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Resetujemy tylko, jeśli kursor opuszcza cały kontener
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setPlaceholderIndex(null);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      data-droppable-id={droppableId}
    >
      {children(placeholderIndex, setPlaceholderIndex)}
    </div>
  );
};
