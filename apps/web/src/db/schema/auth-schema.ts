import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  integer,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ENUMS

export const rolesEnum = pgEnum("role", ["admin", "regular"]);

// TABLES

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  verificationEmailSentAt: timestamp("verification_email_sent_at"),
  verificationEmailCount: integer("verification_email_count")
    .default(0)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: rolesEnum("roles").notNull().default("regular"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
  activeAssociationId: text("active_association_id"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const association = pgTable("association", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  logo: text("logo"),
  createdAt: timestamp("created_at").notNull(),
  metadata: text("metadata"),
  description: text("description"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  latitude: real("latitude"),
  longitude: real("longitude"),
});

export const memberRolesEnum = pgEnum("memberRole", [
  "owner",
  "member",
  "admin",
  "pet_manager",
]);

// TABLES

export const member = pgTable("member", {
  id: text("id").primaryKey(),
  associationId: text("association_id")
    .notNull()
    .references(() => association.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: memberRolesEnum("roles").default("member").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const invitation = pgTable("invitation", {
  id: text("id").primaryKey(),
  associationId: text("association_id")
    .notNull()
    .references(() => association.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  role: text("role"),
  status: text("status").default("pending").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  inviterId: text("inviter_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

// RELATIONS

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  members: many(member),
  invitations: many(invitation),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const associationRelations = relations(association, ({ many }) => ({
  members: many(member),
  invitations: many(invitation),
}));

export const memberRelations = relations(member, ({ one }) => ({
  user: one(user, {
    fields: [member.userId],
    references: [user.id],
  }),
  association: one(association, {
    fields: [member.associationId],
    references: [association.id],
  }),
}));

export const invitationRelations = relations(invitation, ({ one }) => ({
  association: one(association, {
    fields: [invitation.associationId],
    references: [association.id],
  }),
  inviter: one(user, {
    fields: [invitation.inviterId],
    references: [user.id],
  }),
}));

// TYPES

export type User = typeof user.$inferSelect;
export type CreateUserData = typeof user.$inferInsert;
export type UpdateUserData = Partial<
  Omit<CreateUserData, "id" | "createdAt" | "updatedAt">
>;

export type Session = typeof session.$inferSelect;
export type CreateSessionData = typeof session.$inferInsert;
export type UpdateSessionData = Partial<
  Omit<CreateSessionData, "id" | "createdAt" | "updatedAt">
>;

export type Account = typeof account.$inferSelect;
export type CreateAccountData = typeof account.$inferInsert;
export type UpdateAccountData = Partial<
  Omit<CreateAccountData, "id" | "createdAt" | "updatedAt">
>;

export type Verification = typeof verification.$inferSelect;
export type CreateVerificationData = typeof verification.$inferInsert;
export type UpdateVerificationData = Partial<
  Omit<CreateVerificationData, "id" | "createdAt" | "updatedAt">
>;

export type Association = typeof association.$inferSelect;
export type CreateAssociationData = typeof association.$inferInsert;
export type UpdateAssociationData = Partial<
  Omit<CreateAssociationData, "id" | "createdAt">
>;

export type Member = typeof member.$inferSelect;
export type CreateMemberData = typeof member.$inferInsert;

export type Invitation = typeof invitation.$inferSelect;
export type CreateInvitationData = typeof invitation.$inferInsert;
export type UpdateInvitationData = Partial<
  Omit<CreateInvitationData, "id" | "inviterId">
>;
