import type { Project } from "../types/Project.type";
import axiosClient from "./axiosClient";

export const ProjectApi = {
  fetchProjects: async (): Promise<Project[]> => {
    const response = await axiosClient.get("/project");
    return response.data;
  },
  fetchProjectById: async (id: number): Promise<Project> => {
    const response = await axiosClient.get(`/project/${id}`);
    return response.data;
  },
  createNewProject: async (project: Project): Promise<Project> => {
    const response = await axiosClient.post("/project", project);
    return response.data;
  },
};
