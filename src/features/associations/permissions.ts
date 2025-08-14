import { defaultStatements, adminAc } from 'better-auth/plugins/organization/access'
import { createAccessControl } from "better-auth/plugins/access"

const statements = {
    ...defaultStatements
} as const

const ac = createAccessControl(statements)

const org_admin = ac.newRole({
    ...adminAc.statements
})

const regular = ac.newRole({

})

export const organizationOptions = {
    ac,
}

