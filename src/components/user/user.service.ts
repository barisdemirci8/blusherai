import { db } from "@/db";
import { TUser, usersTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function createUser(email: string, password: string) {
  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });
  if (existingUser) {
    console.log("existing user: ", existingUser);
    return { message: "User already exists." };
  }
  const savedUser = await db
    .insert(usersTable)
    .values({
      email: email,
      password: password,
    })
    .returning();

  return { message: "User created" };
}
