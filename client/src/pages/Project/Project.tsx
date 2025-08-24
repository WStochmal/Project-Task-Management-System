import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import style from "./Project.module.css";
import StatusColumn from "../../components/kanbanBoard/Status/StatusColumn";
import Board from "../../components/kanbanBoard/Board/Board";

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
      <Board project={selectedProject} />
    </div>
  );
};

export default Project;
