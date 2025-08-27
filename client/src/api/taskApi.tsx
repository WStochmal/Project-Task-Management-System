import type { Task } from "../types/Task.type";
import axiosClient from "./axiosClient";

export const TaskApi = {
  createTask: async (taskData: Partial<Task>) => {
    console.log("Creating task with data:", taskData);
    const response = await axiosClient.post("/project/task/create", taskData);
    return response.data;
  },
  moveTask: async (data: {
    taskId: string;
    sourceStatusId: string;
    targetStatusId: string;
    targetSortOrder: number;
  }) => {
    const response = await axiosClient.put("/project/task/move", data);
    return response.data;
  },
  deleteTask: async (id: string) => {
    await axiosClient.delete(`/project/task/delete/${id}`);
  },
};
