type Props = {
    email: string
    url: string
}

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from '@react-email/components';

const VerifyEmail = ({email, url}: Props) => {

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[32px] font-bold text-gray-900 m-0 mb-[8px]">
                Verify Your Email
              </Text>
              <Text className="text-[16px] text-gray-600 m-0">
                Please confirm your email address to complete your account setup
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-800 mb-[16px] leading-[24px]">
                Hi there,
              </Text>
              <Text className="text-[16px] text-gray-800 mb-[16px] leading-[24px]">
                Thanks for signing up! We need to verify your email address <strong>{email}</strong> to ensure the security of your account.
              </Text>
              <Text className="text-[16px] text-gray-800 mb-[24px] leading-[24px]">
                Click the button below to verify your email address:
              </Text>
            </Section>

            {/* Verification Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={url}
                className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border hover:bg-blue-700"
              >
                Verify Email Address
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px]">
                If the button doesn't work, you can copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all">
                {url}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Security Notice */}
            <Section className="mb-[24px]">
              <Text className="text-[14px] text-gray-600 leading-[20px]">
                <strong>Security note:</strong> This verification link will expire in 24 hours for your security. If you didn't create an account, you can safely ignore this email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-[12px] text-gray-500 m-0 mb-[8px]">
                © {new Date().getFullYear()} Your Company Name. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 m-0 mb-[4px]">
                123 Business Street, Suite 100
              </Text>
              <Text className="text-[12px] text-gray-500 m-0 mb-[8px]">
                San Juan, Argentina
              </Text>
              <Text className="text-[12px] text-gray-500 m-0">
                <a href="#" className="text-gray-500 underline">Unsubscribe</a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmail;