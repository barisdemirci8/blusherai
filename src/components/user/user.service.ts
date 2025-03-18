import { db } from "@/db";
import { TUser, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function createUser(email: string, password: string) {
  // Commented out user creation logic
  const existingUser: TUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (existingUser) {
    console.log("existing user: ", existingUser);
    return { message: "User already exists." };
  }
  const savedUser = await db
    .insert(users)
    .values({
      email: email,
      password: password,
    })
    .returning();

  console.log("saved user: ", savedUser);

  // Check what tables exist in the db and ping it
  try {
    const tables = (await db.query.getTables?.()) || [];
    console.log("Available tables:", tables);

    // Ping the database
    const pingResult = await db.execute(sql`SELECT 1 as ping`);
    console.log("Database ping result:", pingResult);
  } catch (error) {
    console.error("Error checking database:", error);
  }
  return { message: "User created" };
}
