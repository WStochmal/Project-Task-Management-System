import type { Project } from "../types/Project.type";
import axiosClient from "./axiosClient";

export const ProjectApi = {
  fetchProjects: async (): Promise<Project[]> => {
    const response = await axiosClient.get("/project");
    return response.data;
  },
  fetchProjectById: async (id: string): Promise<Project> => {
    const response = await axiosClient.get(`/project/${id}`);
    return response.data;
  },
  createNewProject: async (project: Partial<Project>): Promise<Project> => {
    const response = await axiosClient.post("/project", project);
    return response.data;
  },
  deleteProject: async (id: string): Promise<void> => {
    await axiosClient.delete(`/project/${id}`);
  },
};
