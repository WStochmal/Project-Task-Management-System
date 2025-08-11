import type { Task } from "./Task.type";

export interface Status {
  id: number;
  name: string;
  projectId: number;
  tasks: Task[];
}
