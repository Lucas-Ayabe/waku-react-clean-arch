import { TaskRepository } from "./task.repository";

type Input = {
  id: string;
};

export class UndoTask {
  constructor(private readonly tasks: TaskRepository) {}

  async execute({ id }: Input) {
    const task = await this.tasks.taskOfId(id);

    if (!task) {
      throw new Error("Task not found");
    }

    await this.tasks.save(task.undo());
  }
}
