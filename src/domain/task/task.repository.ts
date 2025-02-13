import { Task } from "./task";

export interface TaskRepository {
  nextId(): Promise<string>;
  all(): Promise<Task[]>;
  finished(): Promise<Task[]>;
  unfinished(): Promise<Task[]>;
  matchingTitle(title: string): Promise<Task[]>;
  taskOfId(id: string): Promise<Task | null>;
  save(task: Task): Promise<void>;
  remove(task: Task): Promise<void>;
}
