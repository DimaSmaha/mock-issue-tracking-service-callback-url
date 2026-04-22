import { TestCase } from "../../domain/models/testcase";

const testcases: Record<number, TestCase> = {
  115: {
    id: 115,
    title: "Verify successful login with valid registered user credentials",
    steps: [
      "Navigate to the application sign-in page.",
      "Enter a valid registered email address in the email field.",
      "Enter the matching password in the password field.",
      "Click the Login button and wait for the authentication request to complete.",
      "Verify the user is redirected to the dashboard and the account menu is visible.",
    ],
  },
  116: {
    id: 116,
    title: "Verify logout clears the active session and returns user to sign-in",
    steps: [
      "Sign in with a valid user account and confirm the dashboard loads successfully.",
      "Open the account menu from the application header.",
      "Click the Logout action.",
      "Verify the session is cleared and the browser is redirected to the sign-in page.",
      "Refresh the page and confirm protected content is no longer accessible without signing in again.",
    ],
  },
};

export const getTestCaseById = (id: number): TestCase | null => {
  return testcases[id] || null;
};

type CreateTestCaseInput = {
  title: string;
  description: string;
  type: string;
};

let nextTestCaseId = 700;

export const createMockTestCase = ({
  title,
  description,
  type,
}: CreateTestCaseInput) => {
  return {
    id: nextTestCaseId++,
    title,
    description,
    type,
    status: "created" as const,
    steps: [
      `Prepare the system state required for the ${type} scenario.`,
      `Execute the workflow described by: ${title}.`,
      `Verify the expected outcome matches: ${description}.`,
    ],
    message: "Test case was created successfully in the mocked tracking system.",
  };
};
