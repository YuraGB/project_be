import "dotenv/config";
import type { Config } from "drizzle-kit";

const credentials = {
  host: process.env?.DB_HOST ?? "",
  user: process.env?.DB_USER ?? "",
  password: process.env?.DB_PASSWORD ?? "",
  database: process.env?.DB_NAME ?? "",
} as const;

export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "mysql2", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: credentials,
} satisfies Config;
