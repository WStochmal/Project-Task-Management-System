import type { Status } from "../types/Status.type";
import axiosClient from "./axiosClient";

export const StatusApi = {
  createStatus: async (status: Partial<Status>): Promise<Status> => {
    const response = await axiosClient.post("/project/status/create", status);
    return response.data;
  },
  deleteStatus: async (id: string): Promise<void> => {
    await axiosClient.delete(`/project/status/delete/${id}`);
  },
  updateStatusOrder: async (statusOrder: Partial<Status>[]): Promise<void> => {
    await axiosClient.put(`/project/status/update-order`, statusOrder);
  },
};
