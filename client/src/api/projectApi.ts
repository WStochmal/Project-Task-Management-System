import type { Project } from "../types/Project.type";
import axiosClient from "./axiosClient";

export const ProjectApi = {
  fetchProjects: async (): Promise<Project[]> => {
    const response = await axiosClient.get("/projects");
    return response.data;
  },

  createNewProject: async (project: Project): Promise<Project> => {
    const response = await axiosClient.post("/projects", project);
    return response.data;
  },
};
