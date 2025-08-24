import { createContext, useContext, useEffect, useState } from "react";

import { ProjectApi } from "../api/projectApi";
import type { Project } from "../types/Project.type";
import type { Task } from "../types/Task.type";

interface AppContextProps {
  projects: Project[];
  selectedProject: Project;
  loadingProjects: boolean;
  loadingProjectDetails: boolean;
  openProject: (id: number) => Promise<void>;
  handleTaskDrop: (
    taskId: string,
    targetId: string,
    placeholderIndex: number | null
  ) => void;
  loadSelectedProject: (id: number) => Promise<void>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingProjectDetails, setLoadingProjectDetails] = useState(false);

  // Load all projects without details
  const loadProjects = async () => {
    setLoadingProjects(true);
    try {
      const data = await ProjectApi.fetchProjects();
      setProjects(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProjects(false);
    }
  };

  // Load a specific project by ID
  const loadSelectedProject = async (id: number) => {
    setLoadingProjectDetails(true);
    try {
      const data = await ProjectApi.fetchProjectById(id);
      setSelectedProject(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProjectDetails(false);
    }
  };

  // Handle task drop
  const handleTaskDrop = (
    taskId: string,
    targetId: string,
    placeholderIndex: number | null
  ) => {
    if (!selectedProject) return;

    console.log("Handling task drop:", {
      taskId,
      targetId,
      placeholderIndex,
    });

    const taskIdNumber = parseInt(taskId.split("-")[1], 10);
    const targetStatusId = parseInt(targetId.split("-")[1], 10);

    let movedTask: Task | null = null;

    const updatedStatuses = selectedProject.statuses.map((status) => {
      const remainingTasks = status.tasks.filter((task) => {
        if (task.id === taskIdNumber) {
          movedTask = task;
          return false;
        }
        return true;
      });

      return {
        ...status,
        tasks: remainingTasks.map((task, index) => ({
          ...task,
          sortOrder: index,
        })),
      };
    });

    const finalStatuses = updatedStatuses.map((status) => {
      if (status.id === targetStatusId && movedTask) {
        let newTasks: Task[];
        if (
          placeholderIndex === null ||
          placeholderIndex >= status.tasks.length
        ) {
          newTasks = [
            ...status.tasks,
            { ...movedTask, sortOrder: status.tasks.length },
          ];
        } else {
          newTasks = [
            ...status.tasks.slice(0, placeholderIndex),
            { ...movedTask, sortOrder: placeholderIndex },
            ...status.tasks.slice(placeholderIndex),
          ];
        }

        newTasks = newTasks.map((task, index) => ({
          ...task,
          sortOrder: index + 1,
        }));

        return { ...status, tasks: newTasks };
      }
      return status;
    });

    setSelectedProject({
      ...selectedProject,
      statuses: finalStatuses,
    });
  };
  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <AppContext.Provider
      value={{
        projects,
        selectedProject,
        loadingProjects,
        loadingProjectDetails,
        loadProjects,
        loadSelectedProject,
        handleTaskDrop,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppContextProvider");
  return context;
};
