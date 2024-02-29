import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.POSTGRES_URL ?? "");

// @ts-expect-error - This is a valid import
export const db = drizzle(sql);
