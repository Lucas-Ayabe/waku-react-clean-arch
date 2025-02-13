"use client";

import { useActionState } from "react";
import { CreateTaskForm, SearchTaskForm, TaskList } from "../components";
import { controller } from "../controllers";
import { TaskState } from "../../../../domain/task";

export function HomePage({ defaultTasks }: { defaultTasks: TaskState[] }) {
  const [tasks, dispatch] = useActionState(controller, defaultTasks);

  return (
    <div>
      <CreateTaskForm action={dispatch} />
      <SearchTaskForm action={dispatch} />

      <h1>Tasks</h1>
      <TaskList tasks={tasks} onRename={dispatch} onDone={dispatch} />
    </div>
  );
}
