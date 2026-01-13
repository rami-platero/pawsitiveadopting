import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema";
import { adoptionPost } from "./posts-schema";

// ENUMS

export const notificationType = pgEnum("notification_type", ["ADOPTION"]);

// TABLES

export const notification = pgTable("notification", {
  id: serial("id").primaryKey(),
  sourceTargetId: text("id")
    .references(() => user.id)
    .notNull(),
  adoptionPostId: integer("adoption_post_id").references(() => adoptionPost.id),
  type: notificationType("type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// RELATIONS

export const notificationRelations = relations(notification, ({ one }) => ({
  user: one(user, {
    fields: [notification.sourceTargetId],
    references: [user.id],
  }),
  adoptionPost: one(adoptionPost, {
    fields: [notification.adoptionPostId],
    references: [adoptionPost.id],
  }),
}));

// TYPES

export type Notification = typeof notification.$inferSelect;
export type CreateNotificationData = typeof notification.$inferInsert;
