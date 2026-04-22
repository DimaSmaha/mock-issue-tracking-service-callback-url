import { Task } from "../../domain/models/task";

const tasks: Record<number, Task> = {
  112: {
    id: 112,
    title: "Implement secure user sign-in with inline validation feedback",
    description:
      "Create the end-to-end login experience so users can sign in with validated credentials, see clear inline error states, and remain on the page when authentication fails.",
    type: "story",
  },
  113: {
    id: 113,
    title: "Implement reliable logout flow across header and session timeout paths",
    description:
      "Add logout handling that clears the current session, redirects the user to the sign-in screen, and behaves consistently for both manual logout and automatic session expiration.",
    type: "story",
  },
};

export const getTaskById = (id: number): Task | null => {
  return tasks[id] || null;
};

type CreateTaskInput = {
  title: string;
  description: string;
  type: string;
};

let nextTaskId = 600;

export const createMockTask = ({
  title,
  description,
  type,
}: CreateTaskInput) => {
  return {
    id: nextTaskId++,
    title,
    description,
    type,
    status: "created" as const,
    message: "Task was created successfully in the mocked tracking system.",
  };
};
