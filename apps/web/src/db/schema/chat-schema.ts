import { integer, pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { association, user } from "./auth-schema";
import { adoptionPost } from "./posts-schema";

export const conversation = pgTable("conversation", {
  id: serial("id").primaryKey(),
  adoptionPostId: integer("post_id")
    .notNull()
    .unique() 
    .references(() => adoptionPost.id, { onDelete: "cascade" }),
  associationId: integer("association_id")
    .notNull()
    .references(() => association.id, { onDelete: "cascade" }),
  adopterId: integer("adopter_id") 
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const message = pgTable("message", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id")
    .notNull()
    .references(() => conversation.id, { onDelete: "cascade" }),
  senderId: integer("sender_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  isRead: boolean("isRead").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});