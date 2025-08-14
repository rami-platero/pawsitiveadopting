import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { adoptionPost } from "./posts-schema";

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
