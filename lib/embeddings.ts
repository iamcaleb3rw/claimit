import axios from "axios";
// adjust import
import { lostItems } from "@/db/schema";
import { isNull, eq } from "drizzle-orm";
import { db } from "..";

// Axios client
const embeddingsClient = axios.create({
  baseURL: "https://lamhieu-lightweight-embeddings.hf.space",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30_000,
});

async function embedTexts(texts: string[]) {
  const res = await embeddingsClient.post("/v1/embeddings", {
    model: "bge-m3",
    input: texts,
  });

  return res.data.data.map((d: any) => d.embedding as number[]);
}

function buildLostItemText(item: any) {
  return `
Lost item description: ${item.description}
Bus company: ${item.busCompany ?? "unknown"}
Bus color: ${item.busColor ?? "unknown"}
Bus plate: ${item.busRegPlate ?? "unknown"}
Lost date: ${item.lostItemOn}
`.trim();
}

async function generateEmbeddings() {
  console.log("Fetching lost items without embeddings...");

  const items = await db
    .select()
    .from(lostItems)
    .where(isNull(lostItems.embedding));

  if (items.length === 0) {
    console.log("No items need embeddings.");
    return;
  }

  console.log(`Found ${items.length} items`);

  // Batch to avoid rate limits
  const BATCH_SIZE = 16;

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);

    const texts = batch.map(buildLostItemText);

    console.log(`Embedding batch ${i / BATCH_SIZE + 1}`);

    const embeddings = await embedTexts(texts);

    for (let j = 0; j < batch.length; j++) {
      await db
        .update(lostItems)
        .set({
          embedding: embeddings[j],
          updatedAt: new Date(),
        })
        .where(eq(lostItems.id, batch[j].id));
    }
  }

  console.log("Embedding generation complete.");
}

generateEmbeddings()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
