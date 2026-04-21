import { Task } from "../../domain/models/task";

const tasks: Record<number, Task> = {
  112: {
    id: 112,
    title: "User Story 1",
    description: "Implement login",
    type: "story",
  },
  113: {
    id: 113,
    title: "User Story 2",
    description: "Implement logout",
    type: "story",
  },
};

export const getTaskById = (id: number): Task | null => {
  return tasks[id] || null;
};
