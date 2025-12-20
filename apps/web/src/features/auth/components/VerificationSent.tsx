"use client"

import { useAuthFlow } from '@/features/auth/components/context/AuthFlowContext'
import { authClient } from '@/shared/lib/auth-client'
import { Button } from '@pawsitiveadopting/ui/components/button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

const VerificationSent = () => {
    const { email } = useAuthFlow()
    const t = useTranslations('AuthPage')

    const [timeToNextResend, setTimeToNextResend] = useState(30)
    const interval = useRef<NodeJS.Timeout>(undefined)
    const [resent, setResent] = useState(false)

    useEffect(() => {
        startEmailVerificationCountdown()
    }, [])

    function startEmailVerificationCountdown(time = 30) {
        setTimeToNextResend(time)

        clearInterval(interval.current)
        interval.current = setInterval(() => {
            setTimeToNextResend(t => {
                const newT = t - 1

                if (newT <= 0) {
                    clearInterval(interval.current)
                    return 0
                }
                return newT
            })
        }, 1000)
    }

    return (
        <div className="text-center p-6 flex flex-col items-center gap-4">

            <Image src={"/assets/img/cat-verification.png"} alt="verification sent cat image" width={400} height={400} />
            <div className='flex flex-col gap-2'>
                <h2 className="text-3xl font-semibold">{t('VerificationSent.title')}</h2>
                <div className='flex flex-col items-center gap-0'>
                    <p className="text-sm text-gray-700">
                        {t('VerificationSent.description', { email })}
                    </p>
                    <p className='text-sm text-gray-700'>
                        {t('VerificationSent.description2')}
                    </p>
                </div>
            </div>

            <Button onClick={async () => {
                const { error } = await authClient.sendVerificationEmail({ email })
                if (!error) {
                    setResent(true)
                    toast.success(t('VerificationSent.verificationResent'))
                } else {
                    toast.error(t(`errors.api.${error.code}`) || t("VerificationSent.resendError"))
                }
            }} className='mt-4 max-w-[150px] w-full bg-indigo-600 border border-indigo-950 shadow-indigo-950' disabled={timeToNextResend > 0 || resent}>{timeToNextResend > 0
                ? `${t('VerificationSent.resend')} (${timeToNextResend})`
                : t('VerificationSent.resend')}</Button>
        </div >
    )
}

export default VerificationSent