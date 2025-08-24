import React from "react";
import DraggableWrapper from "../Wrappers/DraggableWrapper";
import style from "./TaskCard.module.css";
import type { Task } from "../../../types/Task.type";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  // const handleDragStart = (e) => {
  //   e.dataTransfer.setData("taskId", id);
  //   if (onDragStart) {
  //     onDragStart(id);
  //   }
  // };

  return (
    <div
      className={style["task-card"]}
      draggable="true"
      // onDragStart={handleDragStart}
    >
      {task.name}
    </div>
  );
};

export default TaskCard;
