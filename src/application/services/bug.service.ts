import { Bug } from "../../domain/models/bug";

const bugs: Record<number, Bug> = {
  114: {
    id: 114,
    title: "Login button stays disabled after valid credentials are entered",
    description:
      "On the sign-in page, the primary Login button remains disabled even after a user enters a valid email and password combination, preventing authentication from starting.",
    severity: "high",
  },
};

export const getBugById = (id: number): Bug | null => {
  return bugs[id] || null;
};

type CreateBugInput = {
  title: string;
  description: string;
  type: string;
};

const createRandomKey = (prefix: string) => {
  const value = Math.floor(100 + Math.random() * 90_000);
  return `${prefix}-${value}`;
};

export const createMockBug = ({ title, description, type }: CreateBugInput) => {
  return {
    id: createRandomKey("BUG"),
    title,
    description,
    type,
    severity: "medium" as const,
    status: "created" as const,
    message: "Bug was created successfully in the mocked tracking system.",
  };
};
