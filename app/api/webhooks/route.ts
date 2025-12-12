import { users } from "@/db/schema";
import { db } from "@/index";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    if (eventType === "user.created") {
      try {
        await db
          .insert(users)
          .values({
            email: evt.data.email_addresses[0].email_address,
            name: `${evt.data.first_name} ${evt.data.last_name}`,
            clerkId: evt.data.id,
          })
          .returning({
            insertedId: users.id,
          });
      } catch (e) {
        console.error("Failed to create user", e);
        throw new Error("Failed to create user");
      }
    }

    if (eventType === "user.deleted") {
      try {
        const userId = evt.data.id;
        if (!userId) return;
        await db
          .delete(users)
          .where(eq(users.clerkId, userId))
          .returning({ deletedUser: users.name });
      } catch (e) {
        console.error("Failed to delete user", e);
        throw new Error("Failed to delete user");
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
