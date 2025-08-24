import React from "react";

interface Props {
  id: string;
  children: React.ReactNode;
}

const DraggableWrapper: React.FC<Props> = ({ id, children }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", id);
    (e.target as HTMLElement).classList.add("dragging");
    setTimeout(() => {
      (e.target as HTMLElement).style.display = "none";
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).classList.remove("dragging");
    (e.target as HTMLElement).style.display = "block";
  };

  return (
    <div draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {children}
    </div>
  );
};

export default DraggableWrapper;
