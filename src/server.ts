/**
 * Simple Express server with a callback URL endpoint
 *
 * Usage:
 * 1. Install dependencies: npm i  OR (npm install express body-parser ngrok)
 * 2. Build the server: npm run build
 * 3. Run the server: npm run start
 * 4. Expose the server to the internet (for testing) using a tool like ngrok:
 *    npm run ngrok
 * 5. Use the public ngrok URL + /callback as your callback URL in the API provider.
 *    Example: https://lorem-ipsum.ngrok-free.dev/callback
 */

import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
