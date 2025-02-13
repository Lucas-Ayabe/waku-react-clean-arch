import { boundary } from "../adapters/ui/react/controllers";
import { HomePage } from "../adapters/ui/react/pages/home";

export default async function Page() {
  const tasks = await boundary.filter({ criteria: "all" });
  return <HomePage defaultTasks={tasks} />;
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
