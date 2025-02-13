type Props = { action: ((formData: FormData) => void) | string };

export const CreateTaskForm = ({ action }: Props) => {
  return (
    <form action={action}>
      <input type="hidden" name="_action" value="create" />
      <input type="text" name="title" id="title" />
      <button type="submit">Add</button>
    </form>
  );
};
