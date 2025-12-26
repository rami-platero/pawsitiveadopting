import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Img,
  Link,
  Hr,
  Tailwind,
} from '@react-email/components';
import { getTranslations } from 'next-intl/server';

type Props = {
  url: string;
  name: string;
  locale: string
};

const VerifyEmail = async ({ url, name, locale }: Props) => {

  const t = await getTranslations({locale, namespace: 'emails.VerifyEmail'})

  return (
    <Html lang={locale} dir="ltr">
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border-separate border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-xl">

            {/* Logo Section */}
            <Section className="mt-[32px]">
              <Img
                src="https://pawsitiveadopting.vercel.app/assets/logo.png"
                width="40"
                height="40"
                alt="Pawsitive Adopting"
                className="my-0 mx-auto"
              />
            </Section>

            {/* Main Header */}
            <Section className="text-center mt-[32px] mb-[32px]">
              <Text className="text-[24px] font-normal text-black m-0 leading-[1.3]">
                {t('title')}
              </Text>
            </Section>

            {/* Greeting & Instruction */}
            <Section>
              <Text className="text-[14px] text-black leading-[24px]">
                {t.rich('greeting', {
                  name,
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </Text>
              <Text className="text-[14px] text-black leading-[24px]">
                {t.rich('instruction', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </Text>
            </Section>

            {/* Verify Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={url}
                className="bg-[#241511] text-white px-[24px] py-[12px] rounded-[5px] text-[12px] font-semibold no-underline text-center uppercase"
              >
                {t('verifyButton')}
              </Button>
            </Section>

            {/* Alternative Link Section */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-[#666666] leading-[24px]">
                {t('alternativeLink')}
              </Text>
              <Link
                href={url}
                className="text-[14px] text-[#0070f3] underline break-all"
              >
                {url}
              </Link>
            </Section>

            <Hr className="border-[#eaeaea] my-[26px] mx-0 w-full" />

            {/* SECURITY / IGNORE SECTION */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-[#666666] leading-[24px]">
                <strong>{t('security')}</strong>
                <br />
                {t('ignore')}
              </Text>
            </Section>

            {/* Footer */}
            <Section>
              <Text className="text-[12px] text-[#666666] leading-[24px]">
                © {new Date().getFullYear()} Pawsitive Adopting. {t("rightsReserved")}
                <br />
                123 Business Street, San Juan, Argentina
                <br />
                {/* <Link href="#" className="text-[#666666] underline">
                  Unsubscribe
                </Link> */}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmail;