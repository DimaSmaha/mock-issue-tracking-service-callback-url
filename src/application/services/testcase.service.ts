import { TestCase } from "../../domain/models/testcase";

const testcases: Record<number, TestCase> = {
  115: {
    id: 115,
    title: "Login test",
    steps: ["Open page", "Enter creds", "Click login"],
  },
  116: {
    id: 116,
    title: "Logout test",
    steps: ["Click logout", "Verify redirect"],
  },
};

export const getTestCaseById = (id: number): TestCase | null => {
  return testcases[id] || null;
};
