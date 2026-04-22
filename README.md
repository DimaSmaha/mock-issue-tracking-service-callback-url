# Mock Issue Tracker Callback URL Service

This project is a **fake issue tracker backend** built for integration and QA testing.
It gives you predictable API endpoints that behave like an external system (tasks, bugs, and test cases), so you can test callback/webhook flows without relying on a real tracker.

## What this project is for

Use this service when you need a lightweight mock of an issue-tracking platform:

- Testing callback URL integrations
- Simulating third-party API behavior during local development
- QA/demo environments where a real issue tracker is unnecessary
- Reproducing retry/error behavior with controlled random failures

## Key behavior

- Exposes REST endpoints for:
  - Tasks
  - Bugs
  - Test cases
- Returns hardcoded records for `GET /:id` endpoints
- Accepts payloads for `POST /create` endpoints and logs them
- Applies simulated network conditions to all requests:
  - Artificial delay (`300ms` by default)
  - Random failure rate (`20%` by default, returns HTTP `500`)

## Tech stack

- Node.js
- TypeScript
- Express 5
- ts-node (dev runtime)
- ngrok (optional public tunnel for callback testing)

## Project architecture

The project is organized in a clean layered style:

- `src/domain/models` — TypeScript interfaces (`Task`, `Bug`, `TestCase`)
- `src/application/services` — in-memory mock data and lookup logic
- `src/infrastructure/http/controllers` — HTTP handlers
- `src/infrastructure/http/routes` — route definitions
- `src/shared/middleware` — request logging + delay/failure simulation
- `src/shared/config.ts` — simulation settings
- `src/app.ts` — app composition and middleware wiring
- `src/server.ts` — server startup

## API overview

Base URL: `http://localhost:3000`

### Health/root

- `GET /`
  - Response: `"Callback mock server running"`

### Tasks

- `GET /tasks/:id`
  - Example: `GET /tasks/112`
  - `404` when not found
- `POST /tasks/create`
  - Accepts any JSON payload
  - Logs payload to server output
  - Returns: `{ "status": "ok" }`

### Bugs

- `GET /bugs/:id`
  - Example: `GET /bugs/114`
  - `404` when not found
- `POST /bugs/create`
  - Accepts any JSON payload
  - Logs payload to server output
  - Returns: `{ "status": "ok" }`

### Test cases

- `GET /testcases/:id`
  - Example: `GET /testcases/115`
  - `404` when not found
- `POST /testcases/create`
  - Accepts any JSON payload
  - Logs payload to server output
  - Returns: `{ "status": "ok" }`

## Running locally

### 1) Install dependencies

```bash
npm install
```

### 2) Start in development mode

```bash
npm run dev
```

Server runs on:

`http://localhost:3000`

### 3) Build and run production-style

```bash
npm run build
npm run start
```

## Available scripts

- `npm run dev` — run TypeScript directly with `ts-node`
- `npm run build` — compile TypeScript to `dist/`
- `npm run start` — run compiled server (`dist/server.js`)
- `npm run ngrok` — expose local port `3000` via ngrok

## Example requests

### Get an existing task

```bash
curl http://localhost:3000/tasks/112
```

### Create a task callback payload

```bash
curl -X POST http://localhost:3000/tasks/create \
  -H "Content-Type: application/json" \
  -d "{\"id\":999,\"title\":\"Imported task\",\"description\":\"From external system\"}"
```

### Create a bug callback payload

```bash
curl -X POST http://localhost:3000/bugs/create \
  -H "Content-Type: application/json" \
  -d "{\"id\":1001,\"title\":\"Button misaligned\",\"severity\":\"low\"}"
```

## Simulating real-world instability

The service intentionally behaves like an unreliable external dependency.
You can adjust this in `src/shared/config.ts`:

- `delayMs`: Adds latency to every request
- `failureRate`: Probability (0 to 1) of returning random HTTP `500`

Current defaults:

- `delayMs: 300`
- `failureRate: 0.2`

When a simulated failure happens, response is:

```json
{
  "status": "error",
  "message": "Random simulated failure"
}
```

## Using as a public callback URL (ngrok)

If your external system requires a public URL:

1. Start this server (`npm run dev`)
2. In another terminal, run:

```bash
npm run ngrok
```

3. Use the generated HTTPS URL + one of the API routes, for example:
   - `https://<your-ngrok-domain>/tasks/create`
   - `https://<your-ngrok-domain>/bugs/create`
   - `https://<your-ngrok-domain>/testcases/create`
   - `https://<your-ngrok-domain>/bugs/113` (fetch existing bug data)

## Limitations (intentional)

- No database persistence (in-memory only)
- No authentication/authorization
- Minimal validation
- No update/delete endpoints
- Data resets on restart

This is expected for a mock service and keeps setup simple.

## Suggested next improvements

If you want this fake tracker to be more realistic, consider adding:

- Payload schema validation
- Persistent storage (SQLite/Postgres)
- Webhook signature verification
- Retry/dead-letter simulation routes
- Configurable behavior via environment variables
- Automated integration tests
