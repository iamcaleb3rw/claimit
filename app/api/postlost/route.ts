import { getUserIdFromClerk } from "@/app/actions/getUserIdFromClerk";
import { lostItems } from "@/db/schema";
import { db } from "@/index";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios";

// HF Lightweight Embeddings client
const embeddingsClient = axios.create({
  baseURL: "https://lamhieu-lightweight-embeddings.hf.space",
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

// helper to get embeddings
async function embedText(text: string): Promise<number[]> {
  const res = await embeddingsClient.post("/v1/embeddings", {
    model: "bge-m3", // or snowflake-arctic-embed-l-v2.0 if your DB supports 3072 dims
    input: [text],
  });
  return res.data.data[0].embedding;
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const response = await getUserIdFromClerk(userId);
    if (!response) return new NextResponse("Unauthorized", { status: 401 });

    // 1️⃣ Generate embedding for the lost item
    const embedding = await embedText(
      `Lost item description: ${payload.description}\n` +
        `Bus company: ${payload.busCompany || "unknown"}\n` +
        `Bus color: ${payload.busColor || "unknown"}\n` +
        `Bus plate: ${payload.busRegPlate || "unknown"}\n` +
        `Lost date: ${payload.lostItemOn}`
    );

    // 2️⃣ Insert lost item including embedding
    const result = await db
      .insert(lostItems)
      .values({
        ownerUserId: response.id,
        description: payload.description,
        busCompany: payload.busCompany,
        busColor: payload.busColor,
        busRegPlate: payload.busRegPlate,
        rewardCash: payload.rewardCash,
        rewardPoints: payload.rewardPoints ?? 0,
        lostItemOn: new Date(payload.lostItemOn),
        embedding,
      })
      .returning({ createdId: lostItems.id });

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (e) {
    console.log("ERROR POSTING LOST ITEM", e);
    return new NextResponse("Error posting a lost item", { status: 500 });
  }
}
