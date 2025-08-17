import type { Task } from "./Task.type";

export interface Status {
  id: number;
  name: string;
  color: string;
  sort: number;
  projectId?: number;
  tasks: Task[];
}
