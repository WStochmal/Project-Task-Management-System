import type { Task } from "./Task.type";

export interface Status {
  id: string;
  name: string;
  color: string;
  sortOrder: number;
  projectId?: string;
  tasks: Task[];
}
