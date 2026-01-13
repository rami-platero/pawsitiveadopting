import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema";
import { adoptionPost } from "./posts-schema";

// TABLES

export const application = pgTable(
  "application",
  {
    userId: text("user_id").references(() => user.id),
    adoptionPostId: integer("adoption_post_id").references(
      () => adoptionPost.id
    ),
  },
  (table) => [primaryKey({ columns: [table.userId, table.adoptionPostId] })]
);

// RELATIONS

export const applicationRelations = relations(application, ({ one }) => ({
  user: one(user, {
    fields: [application.userId],
    references: [user.id],
  }),
  adoptionPost: one(adoptionPost, {
    fields: [application.adoptionPostId],
    references: [adoptionPost.id],
  }),
}));

// TYPES

export type Application = typeof application.$inferSelect;
export type CreateApplicationData = typeof application.$inferInsert;
