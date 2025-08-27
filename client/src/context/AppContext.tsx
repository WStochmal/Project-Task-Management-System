import { createContext, useContext, useEffect, useState } from "react";

import { ProjectApi } from "../api/projectApi";
import type { Project } from "../types/Project.type";
import type { Task } from "../types/Task.type";
import { StatusApi } from "../api/statusApi";
import type { Status } from "../types/Status.type";
import { TaskApi } from "../api/taskApi";

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
  loadSelectedProject: (id: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  createNewProject: (project: Partial<Project>) => Promise<void>;

  createTask: (
    statusId: string,
    name: string,
    sortOrder: number
  ) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  createStatus: (
    projectId: string,
    name: string,
    color: string,
    sortOrder: number
  ) => Promise<void>;
  deleteStatus: (id: string) => Promise<void>;
  updateStatusOrder: (
    statuses: Partial<Status>[],
    projectId: string
  ) => Promise<void>;
  moveTask: (
    taskId: string,
    targetStatusId: string,
    placeholderIndex: number | null
  ) => Promise<void>;
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

      console.log("Fetched projects:", data);
      setProjects(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProjects(false);
    }
  };

  // Load a specific project by ID
  const loadSelectedProject = async (id: string) => {
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

  // Delete a specific project by ID
  const deleteProject = async (id: string) => {
    try {
      await ProjectApi.deleteProject(id);
      setProjects((prev) => prev.filter((project) => project.id !== id));
      if (selectedProject?.id === id) {
        setSelectedProject(null);
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  // Create new project
  const createNewProject = async (project: Partial<Project>) => {
    try {
      const response = await ProjectApi.createNewProject(project);
      setProjects((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  // Create new task
  const createTask = async (
    statusId: string,
    name: string,
    sortOrder: number
  ) => {
    try {
      const response = await TaskApi.createTask({
        statusId,
        name,
        sortOrder,
      });

      const newTask = response.data;

      setSelectedProject((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          statuses: prev.statuses.map((status) => {
            if (status.id === statusId) {
              return {
                ...status,
                tasks: [...status.tasks, newTask].sort(
                  (a, b) => a.sortOrder - b.sortOrder
                ),
              };
            }
            return status;
          }),
        };
      });
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  // Create new status
  const createStatus = async (
    projectId: string,
    name: string,
    color: string,
    sortOrder: number
  ) => {
    try {
      const response = await StatusApi.createStatus({
        projectId,
        name,
        color,
        sortOrder,
      });

      console.log("Created status:", response);
      setSelectedProject((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          statuses: [...prev.statuses, response.data],
        };
      });
    } catch (error) {
      console.error("Failed to create status:", error);
    }
  };

  // delete status
  const deleteStatus = async (id: string) => {
    try {
      await StatusApi.deleteStatus(id);
      setSelectedProject((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          statuses: prev.statuses.filter((status) => status.id !== id),
        };
      });
    } catch (error) {
      console.error("Failed to delete status:", error);
    }
  };

  // update statuses order
  const updateStatusOrder = async (
    statuses: Partial<Status>[],
    projectId: string
  ) => {
    setSelectedProject((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        statuses: statuses.map((status, index) => {
          const existing = prev.statuses.find((s) => s.id === status.id);
          return {
            ...existing,
            sortOrder: index,
          };
        }),
      };
    });

    const statusOrders = statuses.map((s, index) => ({
      id: s.id,
      sortOrder: index,
      projectId,
    }));

    try {
      await StatusApi.updateStatusOrder(statusOrders);
      console.log("Statuses reordered successfully on server");
    } catch (error) {
      console.error("Failed to update status order on server:", error);
    }
  };

  // Handle task move (drop)
  const moveTask = (
    taskId: string,
    targetStatusId: string,
    placeholderIndex: number | null
  ) => {
    if (!selectedProject) return;

    let movedTask: Task | null = null;
    let sourceStatusId: string | null = null;

    console.log(placeholderIndex);

    // 1) Usuń task ze źródłowego statusu
    const updatedStatuses = selectedProject.statuses.map((status) => {
      const remaining = status.tasks.filter((t) => {
        if (t.id === taskId) {
          movedTask = t;
          sourceStatusId = status.id;
          return false;
        }
        return true;
      });

      return {
        ...status,
        tasks: remaining.map((t, i) => ({ ...t, sortOrder: i })),
      };
    });

    if (!movedTask || !sourceStatusId) return;

    // 2) policz docelową pozycję
    const target = updatedStatuses.find((s) => s.id === targetStatusId);
    if (!target) return;
    const targetLen = target.tasks.length;
    const insertIndex =
      placeholderIndex == null || placeholderIndex > targetLen
        ? targetLen
        : Math.max(0, placeholderIndex);

    // 3) wstaw taska do docelowego statusu
    const finalStatuses = updatedStatuses.map((status) => {
      if (status.id !== targetStatusId) return status;

      const newTasks = [
        ...status.tasks.slice(0, insertIndex),
        { ...movedTask!, sortOrder: insertIndex },
        ...status.tasks.slice(insertIndex),
      ].map((t, i) => ({ ...t, sortOrder: i }));

      return { ...status, tasks: newTasks };
    });

    // 4) Optimistic UI
    setSelectedProject({ ...selectedProject, statuses: finalStatuses });

    // 5) Call backend
    TaskApi.moveTask({
      taskId,
      sourceStatusId,
      targetStatusId,
      targetSortOrder: insertIndex,
    }).catch((err) => {
      console.error("Failed to move task:", err);
      // opcjonalnie rollback
    });
  };
  // Delete task
  const deleteTask = async (id: string) => {
    try {
      await TaskApi.deleteTask(id);
      setSelectedProject((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          statuses: prev.statuses.map((status) => ({
            ...status,
            tasks: status.tasks.filter((task) => task.id !== id),
          })),
        };
      });
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <AppContext.Provider
      value={{
        projects,
        createNewProject,
        selectedProject,
        loadingProjects,
        loadingProjectDetails,
        loadProjects,
        loadSelectedProject,
        moveTask,
        createTask,
        deleteTask,
        createStatus,
        deleteStatus,
        updateStatusOrder,
        deleteProject,
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
