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
    title:
      "Implement reliable logout flow across header and session timeout paths",
    description:
      "Add logout handling that clears the current session, redirects the user to the sign-in screen, and behaves consistently for both manual logout and automatic session expiration.",
    type: "story",
  },
  114: {
    id: 114,
    title:
      "Enable product details navigation from inventory with consistent cart behavior",
    description:
      "Implement the product details experience accessible from the inventory page. When a user clicks on a product name, they should be navigated to a dedicated product details page displaying full product information and maintaining consistent cart functionality. The product details page must include product name, detailed description, price, a larger product image, and an 'Add to cart' button that behaves identically to the one on the inventory page (including state change to 'Remove' when clicked and proper cart count update). A 'Back to products' button should return the user to the inventory page without losing state (e.g., cart contents). The cart icon/button must remain visible and functional, allowing navigation to the cart page at any time. Ensure routing, UI consistency, and state synchronization between inventory and product pages.",
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
