"use server";

import { InMemoryTaskRepository } from "../../data/in-memory";
import {
  FilterTasks,
  CreateTask,
  FinishTask,
  RenameTask,
  UndoTask,
  ToggleTask,
  Task,
} from "../../../domain/task";

export interface TaskBoundary {
  filter: FilterTasks["execute"];
  create: CreateTask["execute"];
  finish: FinishTask["execute"];
  rename: RenameTask["execute"];
  undo: UndoTask["execute"];
  toggle: ToggleTask["execute"];
}

export const createBoundary = (): TaskBoundary => {
  "use server";
  const taskRepository = new InMemoryTaskRepository(
    [
      { id: "id-1", title: "test 1", done: false },
      { id: "id-2", title: "test 2", done: false },
      { id: "id-3", title: "test 3", done: false },
      { id: "id-4", title: "test 4", done: false },
    ].map(Task.from)
  );

  const filterTasks = new FilterTasks(taskRepository);
  const createTask = new CreateTask(taskRepository);
  const finishTask = new FinishTask(taskRepository);
  const renameTask = new RenameTask(taskRepository);
  const undoTask = new UndoTask(taskRepository);
  const toggleTask = new ToggleTask(taskRepository);

  return {
    filter: (input) => {
      "use server";
      return filterTasks.execute(input);
    },
    create: (input) => {
      "use server";
      return createTask.execute(input);
    },
    finish: (input) => {
      "use server";
      return finishTask.execute(input);
    },
    rename: (input) => {
      "use server";
      return renameTask.execute(input);
    },
    undo: (input) => {
      "use server";
      return undoTask.execute(input);
    },

    toggle: (input) => {
      "use server";
      return toggleTask.execute(input);
    },
  };
};
