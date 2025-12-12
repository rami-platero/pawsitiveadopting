"use client"

import { signOut } from "@/features/auth/actions/auth.actions"
import { Button } from "@pawsitiveadopting/ui/components/button"
import { LogOutIcon } from "lucide-react"
import { useState } from "react"

const SignOutButton = () => {

    const [loading, setLoading] = useState(false)

    const handleSignOut = async () => {
        setLoading(true)
        await signOut()
        setLoading(false)
    }

    return (
        <Button isLoading={loading} onClick={handleSignOut} size={"sm"} className="w-full font-regular"><LogOutIcon className="text-white" />Sign Out</Button>
    )
}

export default SignOutButton