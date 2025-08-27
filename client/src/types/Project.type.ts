import type { Status } from "./Status.type";

export interface Project {
  id: string;
  name: string;
  statuses: Status[];
  createdAt: string;
  favorite: boolean;
}
