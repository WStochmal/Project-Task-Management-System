// lib
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

// context hook
import { useAppContext } from "../../context/appContext";

// style
import style from "./Dashboard.module.css";

// icons
import icon_add from "@assets/icons/add.png";
import icon_search from "@assets/icons/search.png";
import { formatDate } from "../../utils/formatDate";

const Dashboard = () => {
  const { projects, loadingProjects, deleteProject, createNewProject } =
    useAppContext();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (type: string, projectId?: string) => {
    switch (type) {
      case "open":
        navigate(`/projects/${projectId}`);
        break;
      case "delete":
        deleteProject(projectId);
        break;
      case "create":
        createNewProject({ name: "New Project" });
        break;
    }
  };

  if (loadingProjects) return <div>Loading...</div>;

  return (
    <div className={style["project-section"]}>
      <div className={style["project-section-header"]}>
        <img
          src={icon_search}
          alt="Search Projects"
          className={style["project-search-icon"]}
        />
        <input
          type="text"
          placeholder="Search projects..."
          className={style["project-search-input"]}
          ref={inputRef}
        />
        <button onClick={() => handleButtonClick("create")}>
          <img src={icon_add} alt="Add Project" />
        </button>
      </div>
      <h2>Available Projects</h2>

      <div className={style["project-list"]}>
        {projects.map((project) => (
          <div key={project.id} className={style["project-item"]}>
            <div className={style["project-item-content"]}>
              <h3>{project.name}</h3>
              <p>{formatDate(project.createdAt)}</p>
            </div>
            <div className={style["project-item-actions"]}>
              <button
                className={style["project-item-button"]}
                data-action="delete"
                onClick={() => handleButtonClick("delete", project.id)}
              >
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
              <button
                className={style["project-item-button"]}
                data-action="open"
                onClick={() => handleButtonClick("open", project.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="arrow-circle-down"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512"
                  fill="currentColor"
                >
                  <path d="M24,12A12,12,0,1,1,12,0,12.013,12.013,0,0,1,24,12ZM2,12A10,10,0,1,0,12,2,10.011,10.011,0,0,0,2,12Zm13.414-1.414L10.7,5.874,9.289,7.288,14,12,9.327,16.673l1.414,1.414,4.673-4.673a2,2,0,0,0,0-2.828Z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
