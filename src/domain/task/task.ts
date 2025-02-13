import { ensure } from "../../shared/error";

export type TaskState = {
  id: string;
  title: string;
  done: boolean;
};

export class Task {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly done: boolean
  ) {
    ensure(id.length > 0, () => "Id is required");
    ensure(title.length > 0, () => "Title is required");
  }

  static from(state: TaskState) {
    return new Task(state.id, state.title, state.done);
  }

  match(title: string): boolean {
    return this.title.includes(title);
  }

  rename(to: string) {
    return new Task(this.id, to, this.done);
  }

  finish() {
    return new Task(this.id, this.title, true);
  }

  undo() {
    return new Task(this.id, this.title, false);
  }

  toggle() {
    return this.done ? this.undo() : this.finish();
  }

  toJSON(): TaskState {
    return {
      id: this.id,
      title: this.title,
      done: this.done,
    };
  }
}
