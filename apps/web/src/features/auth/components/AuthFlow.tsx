"use client"

import { AuthFlowProvider, useAuthFlow } from "@/features/auth/components/context/AuthFlowContext"
import { Tabs } from "@pawsitiveadopting/ui/components/tabs"
import { ReactNode } from "react"

function AuthFlowContent({ children }: { children: ReactNode }) {
    const { currentTab } = useAuthFlow()

    return (
        <Tabs
            value={currentTab}
            className="w-full"
        >
            {children}
        </Tabs>
    )
}

export default function AuthFlow({ children }: { children: ReactNode }) {
    return (
        <AuthFlowProvider>
            <AuthFlowContent>{children}</AuthFlowContent>
        </AuthFlowProvider>
    )
}