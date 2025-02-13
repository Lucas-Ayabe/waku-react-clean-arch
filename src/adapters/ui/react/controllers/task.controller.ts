"use server";

import { TaskState } from "../../../../domain/task";
import { createBoundary } from "../task.boundary";

export const boundary = createBoundary();

export const add = async (formData: FormData) => {
  const title = formData.get("title") as string;
  await boundary.create({ title });
  return boundary.filter({ criteria: "all" });
};

export const search = async (formData: FormData) => {
  const title = formData.get("title") as string;
  return boundary.filter({ criteria: "title", title });
};

export const rename = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  await boundary.rename({ id, title });

  return boundary.filter({ criteria: "all" });
};

export const toggle = async (formData: FormData) => {
  const id = formData.get("id") as string;
  await boundary.toggle({ id });

  return boundary.filter({ criteria: "all" });
};

export const controller = async (prev: TaskState[], formData: FormData) => {
  "use server";
  const action = formData.get("_action")?.toString() ?? "";

  switch (action) {
    case "create":
      return await add(formData);
    case "search":
      return await search(formData);
    case "rename":
      return await rename(formData);
    case "toggle":
      return await toggle(formData);
    default:
      return prev;
  }
};
