import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";

const migrationsClient = postgres(process?.env?.POSTGRES_URL ?? "", {
  max: 1,
});

const db = drizzle(migrationsClient);
await migrate(db, { migrationsFolder: "drizzle" });
