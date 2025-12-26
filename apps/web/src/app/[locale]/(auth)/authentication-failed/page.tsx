import Container from '@/shared/components/Container'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import React from 'react'

type Props = {
    params: Promise<{
        locale: string
    }>
}

export async function generateMetadata() {
  const t = await getTranslations('Metadata.AuthenticationFailed');

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function AuthenticationFailedPage({ params }: Props) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'AuthPage.AuthenticationFailed' })

    return (
        <Container className="full-screen-center gap-2 items-center justify-center my-4">
            <Image src="/assets/img/cat-authentication-failed.png" alt="Authentication Failed" width={500} height={500} />
            <h1 className='text-3xl font-semibold text-secondary'>{t('title')}</h1>
            <p className='max-w-xl text-secondary/80 text-center'>{t('description')}</p>
        </Container>
    )
}
