import { db } from "@/db";
import { TUser, usersTable } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { Profile } from "next-auth";

export async function createUser(provider: string, profile: any) {
  const existingUser = await db.query.usersTable.findFirst({
    where: and(
      eq(usersTable.email, profile.email),
      eq(usersTable.provider, provider),
    ),
  });

  if (existingUser) {
    return existingUser;
  }

  // Create a new user with profile data from Google
  const newUser = await db
    .insert(usersTable)
    .values({
      provider,
      email: profile.email,
      picture: profile.picture,
      providerId: profile.sub,
    })
    .returning();

  return newUser[0];
}
