import ConfirmEmailButton from '@/features/auth/components/ConfirmEmailButton'
import Container from '@/shared/components/Container'
import { auth } from '@/shared/lib/auth'
import { getTranslations } from 'next-intl/server'
import { unstable_noStore } from 'next/cache'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: Promise<{
        locale: string
    }>,
    searchParams: Promise<{
        email?: string,
        token?: string
    }>
}

export async function generateMetadata() {
    const t = await getTranslations('Metadata.ConfirmEmail');

    return {
        title: t('title'),
        description: t('description')
    };
}

const ConfirmPage = async ({ params, searchParams }: Props) => {
    const { email, token } = await searchParams
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'AuthPage.ConfirmEmail' })

    if (!token || !email) {
        return redirect("/authentication-failed")
    }

    const handleVerifyEmail = async () => {
        "use server"
        unstable_noStore()
        let hasFailed = false
        try {
            await auth.api.verifyEmail({
                query: {
                    token,
                },
                asResponse: true
            })

        } catch {
            hasFailed = true
        }

        if (hasFailed) return redirect("/authentication-failed")

        return redirect("/")

    }

    return (
        <Container className="full-screen-center gap-2 items-center justify-center my-4">
            <h1 className='text-3xl font-semibold'>{t('title')}</h1>
            <p className='max-w-xl text-center'>{t('description', { email })}</p>
            <ConfirmEmailButton action={handleVerifyEmail}>
                {t('verifyButton')}
            </ConfirmEmailButton>
        </Container>
    )
}

export default ConfirmPage