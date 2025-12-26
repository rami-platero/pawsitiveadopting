"use client"

import { useTransition } from 'react'
import { Button } from '@pawsitiveadopting/ui/components/button'

type Props = {
    action: () => Promise<void>
    children: React.ReactNode
}

export default function ConfirmEmailButton({ action, children }: Props) {
    const [isPending, startTransition] = useTransition()

    const handleClick = () => {
        startTransition(async () => {
            await action()
        })
    }

    return (
        <Button 
            variant="default" 
            size="lg" 
            onClick={handleClick} 
            isLoading={isPending}
            className="mt-4"
        >
            {children}
        </Button>
    )
}