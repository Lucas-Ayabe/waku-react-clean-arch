import { TaskRepository } from "./task.repository";

type ValidInput =
  | { criteria: "all" }
  | { criteria: "finished" }
  | { criteria: "unfinished" }
  | { criteria: "title"; title: string };

type Input = ValidInput | { criteria: string };

export class FilterTasks {
  constructor(private readonly tasks: TaskRepository) {
    this.execute = this.execute.bind(this);
  }

  private isValid(filter: Input): filter is ValidInput {
    return ["all", "finished", "unfinished", "title"].includes(filter.criteria);
  }

  async execute(filter: Input) {
    if (!this.isValid(filter)) {
      return [];
    }

    if (filter.criteria === "title") {
      return (await this.tasks.matchingTitle(filter.title)).map((task) =>
        task.toJSON()
      );
    }

    return (await this.tasks[filter.criteria]()).map((task) => task.toJSON());
  }
}
