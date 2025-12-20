"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

type AuthTab = "entry" | "email-verification"

interface AuthFlowContextType {
    email: string
    setEmail: (email: string) => void
    currentTab: AuthTab 
    setCurrentTab: (step: AuthTab) => void
    goToVerification: (email: string) => void
}

const AuthFlowContext = createContext<AuthFlowContextType | undefined>(undefined)

export function AuthFlowProvider({ children }: { children: ReactNode }) {
    const [email, setEmail] = useState("")
    const [currentTab, setCurrentTab] = useState<AuthTab>("entry")

    function goToVerification(email: string) {
        setEmail(email)
        setCurrentTab("email-verification")
    }

    useEffect(() => {
        setCurrentTab("entry")
    }, [])

    return (
        <AuthFlowContext.Provider value={{ email, setEmail, currentTab, setCurrentTab, goToVerification }}>
            {children}
        </AuthFlowContext.Provider>
    )
}

export function useAuthFlow() {
    const context = useContext(AuthFlowContext)
    if (!context) throw new Error("useAuthFlow must be used within a AuthFlowProvider")
    return context
}