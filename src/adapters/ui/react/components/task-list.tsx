import { TaskState } from "../../../../domain/task";
import { Task } from "./task";

type Props = {
  tasks: TaskState[];
  onRename: ((formData: FormData) => void) | string;
  onDone: ((formData: FormData) => void) | string;
};

export const TaskList = ({ tasks, onRename, onDone }: Props) => {
  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onRename={onRename} onDone={onDone} />
      ))}
    </ul>
  );
};
