import { Role } from "@/types/user";
import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statements = {
  ...defaultStatements,
} as const;

export const ac = createAccessControl(statements);

const admin = ac.newRole({
  ...adminAc.statements,
});

export const adminOptions = {
  ac,
  roles: {
    admin,
  },
  defaultRole: Role.REGULAR,
  adminRoles: [Role.ADMIN],
};
