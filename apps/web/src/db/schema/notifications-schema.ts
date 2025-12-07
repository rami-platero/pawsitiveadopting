import { integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { adoptionPost } from "./posts-schema";

export const notificationType = pgEnum("notification_type", ["ADOPTION"]);

export const notification = pgTable("notification", {
  id: serial("id").primaryKey(),
  sourceTargetId: text("id")
    .references(() => user.id)
    .notNull(),
  adoptionPostId: integer("adoption_post_id").references(()=>adoptionPost.id),
  type: notificationType("type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
