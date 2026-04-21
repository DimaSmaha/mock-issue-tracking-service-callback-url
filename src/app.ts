import express from "express";
import taskRoutes from "./infrastructure/http/routes/task.routes";
import bugRoutes from "./infrastructure/http/routes/bug.routes";
import testcaseRoutes from "./infrastructure/http/routes/testcase.routes";

import { requestLogger } from "./shared/middleware/logger.middleware";
import {
  simulateDelay,
  simulateFailure,
} from "./shared/middleware/simulation.middleware";

const app = express();

app.use(express.json());

app.use(requestLogger);
app.use(simulateDelay);
app.use(simulateFailure);

app.get("/", (_, res) => {
  res.send("Callback mock server running");
});

app.use("/tasks", taskRoutes);
app.use("/bugs", bugRoutes);
app.use("/testcases", testcaseRoutes);

export default app;
