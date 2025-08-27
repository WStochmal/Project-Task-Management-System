// lib
import React from "react";

// style
import style from "./TaskCard.module.css";

// icons
import icon_delete from "@assets/icons/delete.png";

// context hook
import { useAppContext } from "../../../context/AppContext";

// type
import type { Task } from "../../../types/Task.type";
interface TaskCardProps {
  task: Task;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const TaskCard = ({ task, onDragStart, onDragEnd }: TaskCardProps) => {
  const { deleteTask } = useAppContext();
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onDragStart) onDragStart(e);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onDragEnd) onDragEnd(e);
  };

  const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  return (
    <div
      className={`task ${style["task-card"]}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {task.name}
      <button className={style["delete-btn"]} onClick={handleDeleteTask}>
        <img src={icon_delete} alt="Delete" />
      </button>
    </div>
  );
};

export default TaskCard;
