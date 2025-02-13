import { Task } from "../../domain/task/task";
import { TaskRepository } from "../../domain/task/task.repository";

export class LocalStorageTaskRepository implements TaskRepository {
  private readonly tasks = new Map<string, Task>();

  constructor() {
    this.tasks = new Map<string, Task>(
      JSON.parse(localStorage.getItem("tasks") ?? "[]")
    );
  }

  private persist() {
    localStorage.setItem("tasks", JSON.stringify([...this.tasks.entries()]));
  }

  async nextId(): Promise<string> {
    return (
      "id-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).substring(2, 5)
    );
  }

  async all(): Promise<Task[]> {
    return [...this.tasks.values()];
  }

  async finished(): Promise<Task[]> {
    return (await this.all()).filter((task) => task.done);
  }

  async unfinished(): Promise<Task[]> {
    return (await this.all()).filter((task) => !task.done);
  }

  async matchingTitle(title: string): Promise<Task[]> {
    return (await this.all()).filter((task) => task.match(title));
  }

  async taskOfId(id: string): Promise<Task | null> {
    return this.tasks.get(id) ?? null;
  }

  async save(task: Task): Promise<void> {
    this.tasks.set(task.id, task);
    this.persist();
  }

  async remove(task: Task): Promise<void> {
    this.tasks.delete(task.id);
    this.persist();
  }
}
