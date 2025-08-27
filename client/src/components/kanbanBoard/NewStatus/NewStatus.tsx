// lib
import React, { useEffect, useState } from "react";

// style
import style from "./NewStatus.module.css";

// type
type NewStatusProps = {
  handleNewStatus: (status: string, color: string, sortOrder: number) => void;
  order: number;
};

const NewStatus = ({ handleNewStatus, order }: NewStatusProps) => {
  const [newStatusName, setNewStatusName] = useState("");
  const [newStatusColor, setNewStatusColor] = useState("#ccc");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    handleNewStatus(newStatusName, newStatusColor, order);
    setIsFormVisible(false);
    setNewStatusName("");
    setNewStatusColor("#ccc");
  };
  const handleClose = () => {
    setIsFormVisible(false);
    setNewStatusName("");
    setNewStatusColor("#ccc");
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
      <h3 onClick={handleOpen}>+ New Status</h3>
      {isFormVisible && (
        <div className={style["new-status-form"]}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter status name"
            value={newStatusName}
            onChange={(e) => setNewStatusName(e.target.value)}
          />
          <input
            type="color"
            value={newStatusColor}
            onChange={(e) => setNewStatusColor(e.target.value)}
          />
          <button onClick={handleClose} data-button-type="btn-close">
            Close
          </button>
          <button onClick={handleAdd} data-button-type="btn-add">
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default NewStatus;
