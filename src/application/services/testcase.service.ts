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
    title:
      "Verify logout clears the active session and returns user to sign-in",
    steps: [
      "Sign in with a valid user account and confirm the dashboard loads successfully.",
      "Open the account menu from the application header.",
      "Click the Logout action.",
      "Verify the session is cleared and the browser is redirected to the sign-in page.",
      "Refresh the page and confirm protected content is no longer accessible without signing in again.",
    ],
  },
};

type CreateTestCaseInput = {
  title: string;
  steps: string[];
  type: string;
  tag?: string;
  parent_id?: string;
  dedupe_by?: string;
};

const createdTestCases: Record<string, TestCase> = {};
const linkedCreatedTestCaseIdsByTaskId: Record<number, string[]> = {};

const createStoredTestCase = (
  id: string,
  { title, steps, type, tag, parent_id, dedupe_by }: CreateTestCaseInput
): TestCase => {
  return {
    id,
    title,
    type,
    steps,
    tag,
    parent_id,
    dedupe_by,
    status: "created",
    message: "Test case was created successfully in the mocked tracking system.",
  };
};

const linkCreatedTestCaseToTask = (taskId: number, testCaseId: string) => {
  const linkedIds = linkedCreatedTestCaseIdsByTaskId[taskId] || [];

  if (!linkedIds.includes(testCaseId)) {
    linkedIds.push(testCaseId);
  }

  linkedCreatedTestCaseIdsByTaskId[taskId] = linkedIds;
};

const seedCreatedTestCase = (
  id: string,
  testCase: CreateTestCaseInput & { parent_id: string }
) => {
  createdTestCases[id] = createStoredTestCase(id, testCase);
  linkCreatedTestCaseToTask(Number(testCase.parent_id), id);
};

[
  {
    id: "TEST-1001",
    title:
      "[P1] Auth: Login with valid credentials redirects to inventory page",
    type: "Test Case",
    steps: [
      "# [P1] Auth: Login with valid credentials redirects to inventory page",
      "Step 1: Navigate to https://www.saucedemo.com",
      "  Expected: Login page is displayed with Username field, Password field, and Login button visible",
      "Step 2: Enter 'standard_user' in the Username field",
      "  Expected: Username field displays 'standard_user'",
      "Step 3: Enter 'secret_sauce' in the Password field",
      "  Expected: Password field is filled (value masked)",
      "Step 4: Click the Login button",
      "  Expected: Browser navigates away from the login page",
      "Step 5: Observe the page after login",
      "  Expected: URL is 'https://www.saucedemo.com/inventory.html' and the Products heading with inventory items is visible",
    ],
    tag: "automated,claude-generated",
    parent_id: "112",
    dedupe_by: "title",
  },
  {
    id: "TEST-1002",
    title:
      '[P1] Auth: Login with invalid password shows error "Epic sadface: Username and password do not match any user in this service"',
    type: "Test Case",
    steps: [
      '# [P1] Auth: Login with invalid password shows error "Epic sadface: Username and password do not match any user in this service"',
      "Step 1: Navigate to https://www.saucedemo.com",
      "  Expected: Login page is displayed with all form elements present",
      "Step 2: Enter 'standard_user' in the Username field",
      "  Expected: Username field displays 'standard_user'",
      "Step 3: Enter 'wrong_password' in the Password field",
      "  Expected: Password field is filled",
      "Step 4: Click the Login button",
      "  Expected: User remains on the login page (URL is still https://www.saucedemo.com/)",
      "Step 5: Observe the inline error message",
      "  Expected: Inline error message reads exactly 'Epic sadface: Username and password do not match any user in this service'",
    ],
    tag: "automated,claude-generated",
    parent_id: "112",
    dedupe_by: "title",
  },
  {
    id: "TEST-1003",
    title:
      '[P1] Auth: Login with locked-out user shows error "Epic sadface: Sorry, this user has been locked out."',
    type: "Test Case",
    steps: [
      '# [P1] Auth: Login with locked-out user shows error "Epic sadface: Sorry, this user has been locked out."',
      "Step 1: Navigate to https://www.saucedemo.com",
      "  Expected: Login page is displayed",
      "Step 2: Enter 'locked_out_user' in the Username field",
      "  Expected: Username field displays 'locked_out_user'",
      "Step 3: Enter 'secret_sauce' in the Password field",
      "  Expected: Password field is filled",
      "Step 4: Click the Login button",
      "  Expected: User remains on the login page (URL unchanged)",
      "Step 5: Observe the inline error message",
      "  Expected: Inline error message reads exactly 'Epic sadface: Sorry, this user has been locked out.'",
    ],
    tag: "automated,claude-generated",
    parent_id: "112",
    dedupe_by: "title",
  },
  {
    id: "TEST-1004",
    title:
      "[P1] Auth: Session is established after successful login � protected inventory page is accessible",
    type: "Test Case",
    steps: [
      "# [P1] Auth: Session is established after successful login � protected inventory page is accessible",
      "Step 1: Navigate to https://www.saucedemo.com and log in as 'standard_user' with 'secret_sauce'",
      "  Expected: User is redirected to /inventory.html after clicking Login",
      "Step 2: Observe the page immediately after login",
      "  Expected: Inventory page displays product items, confirming an active authenticated session",
      "Step 3: Navigate directly to https://www.saucedemo.com/inventory.html",
      "  Expected: URL remains at https://www.saucedemo.com/inventory.html",
      "Step 4: Observe that the page loads without prompting for re-authentication",
      "  Expected: Inventory page renders with products visible � no redirect to the login page occurs",
    ],
    tag: "automated,claude-generated",
    parent_id: "112",
    dedupe_by: "title",
  },
  {
    id: "TEST-1005",
    title:
      '[P2] Auth: Login with empty username shows validation error "Epic sadface: Username is required"',
    type: "Test Case",
    steps: [
      '# [P2] Auth: Login with empty username shows validation error "Epic sadface: Username is required"',
      "Step 1: Navigate to https://www.saucedemo.com",
      "  Expected: Login page is displayed",
      "Step 2: Leave the Username field empty",
      "  Expected: Username field remains empty",
      "Step 3: Enter 'secret_sauce' in the Password field",
      "  Expected: Password field is filled",
      "Step 4: Click the Login button",
      "  Expected: User remains on the login page",
      "Step 5: Observe the inline validation error",
      "  Expected: Inline error message reads exactly 'Epic sadface: Username is required'",
    ],
    tag: "automated,claude-generated",
    parent_id: "112",
    dedupe_by: "title",
  },
  {
    id: "TEST-1006",
    title:
      '[P2] Auth: Login with empty password shows validation error "Epic sadface: Password is required"',
    type: "Test Case",
    steps: [
      '# [P2] Auth: Login with empty password shows validation error "Epic sadface: Password is required"',
      "Step 1: Navigate to https://www.saucedemo.com",
      "  Expected: Login page is displayed",
      "Step 2: Enter 'standard_user' in the Username field",
      "  Expected: Username field displays 'standard_user'",
      "Step 3: Leave the Password field empty",
      "  Expected: Password field remains empty",
      "Step 4: Click the Login button",
      "  Expected: User remains on the login page",
      "Step 5: Observe the inline validation error",
      "  Expected: Inline error message reads exactly 'Epic sadface: Password is required'",
    ],
    tag: "automated,claude-generated",
    parent_id: "112",
    dedupe_by: "title",
  },
  {
    id: "TEST-1007",
    title:
      '[P2] Auth: Login with both username and password empty shows "Epic sadface: Username is required"',
    type: "Test Case",
    steps: [
      '# [P2] Auth: Login with both username and password empty shows "Epic sadface: Username is required"',
      "Step 1: Navigate to https://www.saucedemo.com",
      "  Expected: Login page is displayed",
      "Step 2: Leave the Username field empty",
      "  Expected: Username field is empty",
      "Step 3: Leave the Password field empty",
      "  Expected: Password field is empty",
      "Step 4: Click the Login button",
      "  Expected: User remains on the login page",
      "Step 5: Observe the inline validation error",
      "  Expected: Inline error message reads 'Epic sadface: Username is required' (username is validated first)",
    ],
    tag: "automated,claude-generated",
    parent_id: "112",
    dedupe_by: "title",
  },
  {
    id: "TEST-1008",
    title:
      '[P2] Auth: Login with non-existent username shows "Epic sadface: Username and password do not match any user in this service"',
    type: "Test Case",
    steps: [
      '# [P2] Auth: Login with non-existent username shows "Epic sadface: Username and password do not match any user in this service"',
      "Step 1: Navigate to https://www.saucedemo.com",
      "  Expected: Login page is displayed",
      "Step 2: Enter 'nonexistent_user' in the Username field",
      "  Expected: Username field displays 'nonexistent_user'",
      "Step 3: Enter 'secret_sauce' in the Password field",
      "  Expected: Password field is filled",
      "Step 4: Click the Login button",
      "  Expected: User remains on the login page",
      "Step 5: Observe the inline error message",
      "  Expected: Inline error message reads exactly 'Epic sadface: Username and password do not match any user in this service'",
    ],
    tag: "automated,claude-generated",
    parent_id: "112",
    dedupe_by: "title",
  },
  {
    id: "TEST-1009",
    title:
      "[P2] Auth: Direct access to /inventory.html without login redirects to login page with error",
    type: "Test Case",
    steps: [
      "# [P2] Auth: Direct access to /inventory.html without login redirects to login page with error",
      "Step 1: Clear all browser cookies and local storage to ensure no active session exists",
      "  Expected: No authenticated session cookie or storage state is present",
      "Step 2: Navigate directly to https://www.saucedemo.com/inventory.html",
      "  Expected: Browser is redirected to the login page (URL is https://www.saucedemo.com/)",
      "Step 3: Observe the resulting page and URL",
      "  Expected: Login page displays inline error: \"Epic sadface: You can only access '/inventory.html' when you are logged in.\"",
    ],
    tag: "automated,claude-generated",
    parent_id: "112",
    dedupe_by: "title",
  },
  {
    id: "TEST-1010",
    title: "[P3] Auth: Error message is dismissed when the X button is clicked",
    type: "Test Case",
    steps: [
      "# [P3] Auth: Error message is dismissed when the X button is clicked",
      "Step 1: Navigate to https://www.saucedemo.com",
      "  Expected: Login page is displayed",
      "Step 2: Submit the login form with empty fields to trigger the error",
      "  Expected: Error message 'Epic sadface: Username is required' is visible",
      "Step 3: Observe the error message is displayed",
      "  Expected: Error heading element contains an X button",
      "Step 4: Click the X (dismiss) button on the error message",
      "  Expected: X button is clicked successfully",
      "Step 5: Observe the page state after dismissal",
      "  Expected: Error message element is no longer visible in the page",
    ],
    tag: "automated,claude-generated",
    parent_id: "112",
    dedupe_by: "title",
  },
  {
    id: "TEST-1011",
    title:
      "[P3] Auth: Error state is cleared when user modifies credentials and resubmits",
    type: "Test Case",
    steps: [
      "# [P3] Auth: Error state is cleared when user modifies credentials and resubmits",
      "Step 1: Navigate to https://www.saucedemo.com",
      "  Expected: Login page is displayed",
      "Step 2: Enter 'standard_user' in Username and 'wrong_password' in Password, then click Login",
      "  Expected: Error message 'Epic sadface: Username and password do not match any user in this service' is visible",
      "Step 3: Observe the error message from the failed attempt",
      "  Expected: Error heading is shown and user remains on the login page",
      "Step 4: Clear the Password field and enter the correct password 'secret_sauce'",
      "  Expected: Password field now contains 'secret_sauce'",
      "Step 5: Click the Login button again",
      "  Expected: User is redirected away from the login page",
      "Step 6: Observe the result after resubmission with correct credentials",
      "  Expected: URL is 'https://www.saucedemo.com/inventory.html', inventory is visible, and no error message is present",
    ],
    tag: "automated,claude-generated",
    parent_id: "112",
    dedupe_by: "title",
  },
].forEach(({ id, ...testCase }) => {
  seedCreatedTestCase(id, testCase);
});

const createRandomKey = (prefix: string) => {
  const value = Math.floor(100 + Math.random() * 90_000);
  return `${prefix}-${value}`;
};

const findCreatedTestCaseByTitleForTask = (taskId: number, title: string) => {
  const linkedIds = linkedCreatedTestCaseIdsByTaskId[taskId] || [];

  return (
    linkedIds
      .map((id) => createdTestCases[id])
      .find((testCase) => testCase?.title === title) || null
  );
};

export const getTestCaseById = (id: number | string): TestCase | null => {
  const createdTestCase = createdTestCases[String(id)];

  if (createdTestCase) {
    return createdTestCase;
  }

  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    return null;
  }

  return testcases[numericId] || null;
};

export const getLinkedCreatedTestCasesByTaskId = (taskId: number): TestCase[] => {
  const linkedIds = linkedCreatedTestCaseIdsByTaskId[taskId] || [];

  return linkedIds.flatMap((id) => {
    const testcase = createdTestCases[id];
    return testcase ? [testcase] : [];
  });
};

export const createMockTestCase = (input: CreateTestCaseInput) => {
  const parentTaskId =
    input.parent_id === undefined ? null : Number(input.parent_id);

  if (
    input.dedupe_by === "title" &&
    parentTaskId !== null &&
    !Number.isNaN(parentTaskId)
  ) {
    const existingTestCase = findCreatedTestCaseByTitleForTask(
      parentTaskId,
      input.title
    );

    if (existingTestCase) {
      return existingTestCase;
    }
  }

  const testCase = createStoredTestCase(createRandomKey("TEST"), input);
  createdTestCases[String(testCase.id)] = testCase;

  if (parentTaskId !== null && !Number.isNaN(parentTaskId)) {
    linkCreatedTestCaseToTask(parentTaskId, String(testCase.id));
  }

  return testCase;
};
