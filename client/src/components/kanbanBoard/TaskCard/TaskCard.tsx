import React from "react";
import type { Task } from "../../../types/Task.type";
import style from "./TaskCard.module.css";
import { DraggableWrapper } from "../Wrappers/DraggableWrapper";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <DraggableWrapper draggableId={"task-" + task.id}>
      <div className={style["task-card"]}>{task.name}</div>
    </DraggableWrapper>
  );
};

export default TaskCard;
