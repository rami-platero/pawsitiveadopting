import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { association, user } from "./auth-schema";

export const review = pgTable("review", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  associationId: text("association_id").references(() => association.id, {
    onDelete: "cascade",
  }),
  rating: integer("rating").notNull(),
  description: text("description"),
  datePosted: timestamp("date_posted").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});
