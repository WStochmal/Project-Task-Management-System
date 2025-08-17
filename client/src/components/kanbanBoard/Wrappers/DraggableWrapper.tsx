import { useAppContext } from "../../../context/appContext";

type DraggableWrapperProps = {
  draggableId: string;
  children: React.ReactNode;
};

export const DraggableWrapper = ({
  draggableId,
  children,
}: DraggableWrapperProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("draggedObjectId", draggableId);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      data-draggable-id={draggableId}
    >
      {children}
    </div>
  );
};
