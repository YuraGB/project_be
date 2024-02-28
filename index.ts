// Import the framework and instantiate it
import { build } from "./src/server.js";

const app = build({
  logger: true,
});

// Run the server!
try {
  await app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
