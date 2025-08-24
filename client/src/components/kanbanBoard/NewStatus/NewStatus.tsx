// lib
import React, { useState } from "react";

// style
import style from "./NewStatus.module.css";

// type
type NewStatusProps = {
  handleNewStatus: (status: string) => void;
};

const NewStatus = ({ handleNewStatus }: NewStatusProps) => {
  const [newStatusName, setNewStatusName] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAdd = () => {
    handleNewStatus(newStatusName);
  };
  const handleClose = () => {
    setIsFormVisible(false);
    setNewStatusName("");
  };
  return (
    <div className={style["new-status-column"]}>
      <h3 onClick={() => setIsFormVisible(!isFormVisible)}>+ New Status</h3>
      {isFormVisible && (
        <div className={style["new-status-form"]}>
          <input
            type="text"
            placeholder="Enter status name"
            value={newStatusName}
            onChange={(e) => setNewStatusName(e.target.value)}
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
