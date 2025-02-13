import { Task } from "./task";
import { TaskRepository } from "./task.repository";

type Input = {
  title: string;
};

export class CreateTask {
  constructor(private readonly tasks: TaskRepository) {}

  async execute({ title }: Input) {
    const task = new Task(await this.tasks.nextId(), title, false);
    await this.tasks.save(task);
    return task;
  }
}
