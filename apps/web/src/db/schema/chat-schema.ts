import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { association, user } from "./auth-schema";
import { adoptionPost } from "./posts-schema";

// TABLES

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

// RELATIONS

export const conversationRelations = relations(
  conversation,
  ({ one, many }) => ({
    adoptionPost: one(adoptionPost, {
      fields: [conversation.adoptionPostId],
      references: [adoptionPost.id],
    }),
    association: one(association, {
      fields: [conversation.associationId],
      references: [association.id],
    }),
    adopter: one(user, {
      fields: [conversation.adopterId],
      references: [user.id],
    }),
    messages: many(message),
  })
);

export const messageRelations = relations(message, ({ one }) => ({
  conversation: one(conversation, {
    fields: [message.conversationId],
    references: [conversation.id],
  }),
  sender: one(user, {
    fields: [message.senderId],
    references: [user.id],
  }),
}));

// TYPES

export type Conversation = typeof conversation.$inferSelect;
export type CreateConversationData = typeof conversation.$inferInsert;

export type Message = typeof message.$inferSelect;
export type CreateMessageData = typeof message.$inferInsert;
export type UpdateMessageData = Partial<
  Omit<CreateMessageData, "id" | "conversationId" | "senderId" | "createdAt">
>;
