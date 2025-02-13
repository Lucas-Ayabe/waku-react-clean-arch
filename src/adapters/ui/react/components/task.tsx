import { TaskState } from "../../../../domain/task";

type Props = {
  task: TaskState;
  onRename: ((formData: FormData) => void) | string;
  onDone: ((formData: FormData) => void) | string;
};

export const Task = ({ task, onRename, onDone }: Props) => {
  return (
    <li>
      <form action={onRename}>
        <input type="hidden" name="_action" value="rename" />
        <input type="hidden" name="id" value={task.id} />
        <input type="text" name="title" defaultValue={task.title} />
      </form>

      <form action={onDone}>
        <input type="hidden" name="_action" value="toggle" />
        <input type="hidden" name="id" value={task.id} />
        <button name="done" value={task.done ? "true" : "false"}>
          {task.done ? "Undo" : "Finish"}
        </button>
      </form>
    </li>
  );
};
