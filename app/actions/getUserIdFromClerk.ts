"use server";
import { users } from "@/db/schema";
import { db } from "@/index";
import { eq } from "drizzle-orm";

export async function getUserIdFromClerk(clerkId: string) {
  try {
    const userId = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
      columns: {
        id: true,
      },
    });
    return userId;
  } catch {
    console.error("Failed to get user id");
    throw new Error("Something went wrong");
  }
}
