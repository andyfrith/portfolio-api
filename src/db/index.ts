import { drizzle } from "drizzle-orm/node-postgres";

import env from "@/env";

import * as schema from "./schema";

const db = drizzle(env.DATABASE_URL!, { schema });
console.log(db);

export default db;

/*
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import env from "@/env";

import * as schema from "./schema";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

const db = drizzle(client, {
  schema,
});

export default db;
*/

// import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { users } from './schema';

// export const db = drizzle(process.env.DATABASE_URL!);

// export const getUsers = async () => {
//   await new Promise((resolve) => setTimeout(resolve, 5000));
//   const result = await db.select().from(users);
//   console.log('Result', result);
//   return result;
// };

// export type NewUser = typeof users.$inferInsert;

// export const insertUser = async (user: NewUser) => {
//   return db.insert(users).values(user).returning();
// };
