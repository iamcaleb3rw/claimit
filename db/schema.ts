import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  boolean,
  vector,
  real,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

// =======================================================
// USERS
// =======================================================

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerkId").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  reputation: integer("reputation").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  lostItems: many(lostItems),
  foundItems: many(foundItems),
}));

// =======================================================
// LOST ITEMS
// =======================================================

export const lostItems = pgTable("lost_items", {
  id: varchar("id", { length: 50 }).primaryKey(),

  ownerUserId: uuid("owner_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  description: text("description").notNull(),
  busCompany: varchar("bus_company", { length: 100 }),
  busColor: varchar("bus_color", { length: 50 }),
  busRegPlate: varchar("bus_reg_plate", { length: 20 }),
  rewardPoints: integer("reward_points").default(0),
  rewardCash: real("reward_cash").default(0),
  status: varchar("status", { length: 20 }).default("posted"),

  // Important: correct embedding vector
  embedding: vector("embedding", { dimensions: 3072 }),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const lostItemsRelations = relations(lostItems, ({ one, many }) => ({
  owner: one(users, {
    fields: [lostItems.ownerUserId],
    references: [users.id],
  }),
  matches: many(matches),
}));

// =======================================================
// FOUND ITEMS
// =======================================================

export const foundItems = pgTable("found_items", {
  id: varchar("id", { length: 50 }).primaryKey(),

  // FOREIGN KEY -> users.id
  finderUserId: uuid("finder_user_id").references(() => users.id, {
    onDelete: "set null",
  }),

  description: text("description").notNull(),
  busCompany: varchar("bus_company", { length: 100 }),
  busColor: varchar("bus_color", { length: 50 }),
  busRegPlate: varchar("bus_reg_plate", { length: 20 }),
  status: varchar("status", { length: 20 }).default("posted"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const foundItemsRelations = relations(foundItems, ({ one, many }) => ({
  finder: one(users, {
    fields: [foundItems.finderUserId],
    references: [users.id],
  }),
  matches: many(matches),
}));

// =======================================================
// MATCHES
// =======================================================

export const matches = pgTable("matches", {
  id: varchar("id", { length: 50 }).primaryKey(),

  // FOREIGN KEY -> lost_items.id
  lostItemId: varchar("lost_item_id", { length: 50 })
    .notNull()
    .references(() => lostItems.id, { onDelete: "cascade" }),

  // FOREIGN KEY -> found_items.id
  foundItemId: varchar("found_item_id", { length: 50 })
    .notNull()
    .references(() => foundItems.id, { onDelete: "cascade" }),

  aiMatchScore: real("ai_match_score").default(0),
  confirmed: boolean("confirmed").default(false),
  rewardReleased: boolean("reward_released").default(false),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const matchesRelations = relations(matches, ({ one }) => ({
  lostItem: one(lostItems, {
    fields: [matches.lostItemId],
    references: [lostItems.id],
  }),
  foundItem: one(foundItems, {
    fields: [matches.foundItemId],
    references: [foundItems.id],
  }),
}));
