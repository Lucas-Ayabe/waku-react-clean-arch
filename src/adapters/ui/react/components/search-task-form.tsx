type Props = { action: ((formData: FormData) => void) | string };

export const SearchTaskForm = ({ action }: Props) => {
  return (
    <form action={action}>
      <input type="hidden" name="_action" value="search" />
      <input type="text" name="title" id="title" />
      <button type="submit">Search</button>
    </form>
  );
};
