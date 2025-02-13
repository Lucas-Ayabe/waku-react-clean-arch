import { TaskRepository } from "./task.repository";

type Input = {
  id: string;
  title: string;
};

export class RenameTask {
  constructor(private readonly tasks: TaskRepository) {}

  async execute({ id, title }: Input) {
    const task = await this.tasks.taskOfId(id);

    if (!task) {
      throw new Error("Task not found");
    }

    await this.tasks.save(task.rename(title));
  }
}
