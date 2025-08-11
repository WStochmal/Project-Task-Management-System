import type { Status } from "./Status.type";

export interface Project {
  id: number;
  name: string;
  statuses: Status[];
}
