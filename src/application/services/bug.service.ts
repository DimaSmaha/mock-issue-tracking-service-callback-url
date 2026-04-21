import { Bug } from "../../domain/models/bug";

const bugs: Record<number, Bug> = {
  114: {
    id: 114,
    title: "Login button not working",
    severity: "high",
  },
};

export const getBugById = (id: number): Bug | null => {
  return bugs[id] || null;
};
