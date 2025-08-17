// lib
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// context
import { useAppContext } from "../../context/AppContext";

// style
import style from "./Project.module.css";

// components
import Status from "../../components/kanbanBoard/Status/Status";

const Project = () => {
  const { loadSelectedProject, selectedProject, loadingProjectDetails } =
    useAppContext();
  const { id: projectId } = useParams();

  useEffect(() => {
    loadSelectedProject(Number(projectId));
  }, [projectId]);

  if (loadingProjectDetails) return <div>Loading...</div>;

  return (
    <div className={style["project-section"]}>
      <div className={style["project-kanban-board"]}>
        {selectedProject?.statuses?.map((status) => (
          <Status key={status.id} status={status} />
        ))}
      </div>
    </div>
  );
};

export default Project;
