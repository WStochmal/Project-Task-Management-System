// lib
import React from "react";

// style
import style from "./StatusColumn.module.css";

// type
import type { Status } from "../../../types/Status.type";
import TaskCard from "../TaskCard/TaskCard";

interface StatusProps {
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  status: Status;
}

const StatusColumn: React.FC<StatusProps> = ({
  status,
  onDragStart,
  onDragEnd,
}) => {
  return (
    <div
      id={status.id}
      draggable
      className={`column ${style["status-column"]}`}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className={style["status-header"]}>
        <div
          style={{ backgroundColor: status.color }}
          className={style["status-color"]}
        ></div>
        <div className={style["status-description"]}>
          <h3>{status.name}</h3>
          <span>{status?.tasks.length} tasks</span>
          <span className={style["status-btns"]}>
            <button>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                fill="currentColor"
                width="512"
                height="512"
              >
                <g>
                  <path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z" />
                </g>
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="512"
                height="512"
                fill="currentColor"
              >
                <g id="_01_align_center" data-name="01 align center">
                  <path d="M22,4H17V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2ZM9,2h6V4H9Zm9,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V6H18Z" />
                  <rect x="9" y="10" width="2" height="8" />
                  <rect x="13" y="10" width="2" height="8" />
                </g>
              </svg>
            </button>
          </span>
        </div>
      </div>
      <div className={style["task-list"]}>
        {status?.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default StatusColumn;
