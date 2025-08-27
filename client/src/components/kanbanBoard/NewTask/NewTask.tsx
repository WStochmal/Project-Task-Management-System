// lib
import React, { useEffect, useState } from "react";

// style
import style from "./NewTask.module.css";

// type
type NewTaskProps = {
  isFormVisible: boolean;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleNewTask: (taskName: string, sortOrder: number) => void;
  order: number;
};

const NewTask = ({
  isFormVisible,
  setIsFormVisible,
  handleNewTask,
  order,
}: NewTaskProps) => {
  const [newTaskName, setNewTaskName] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    handleNewTask(newTaskName, order);
    setIsFormVisible(false);
    setNewTaskName("");
  };
  const handleClose = () => {
    setIsFormVisible(false);
    setNewTaskName("");
  };

  const handleOpen = () => {
    setIsFormVisible(true);
  };
  useEffect(() => {
    if (isFormVisible) {
      inputRef.current?.focus();
    }
  }, [isFormVisible]);
  return (
    <div className={style["new-status-column"]}>
      {isFormVisible && (
        <>
          <div className={style["new-task-form"]}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter task name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <button onClick={handleClose} data-button-type="btn-close">
              Close
            </button>
            <button onClick={handleAdd} data-button-type="btn-add">
              Add
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewTask;
