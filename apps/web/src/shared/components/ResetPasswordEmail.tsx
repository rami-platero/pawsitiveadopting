import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
} from "@react-email/components";

type Props = {
  email: string;
  otp: string;
};

const ResetPasswordEmail = ({ email, otp }: Props) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your password reset verification code</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 mb-[8px] m-0">
                Password Reset Request
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                Hello,
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                Someone requested a password reset for your account associated
                with <strong>{email}</strong>. If this was you, please use the
                verification code below to proceed with resetting your password.
              </Text>

              {/* OTP Code Box */}
              <Section className="text-center mb-[24px]">
                <div className="bg-gray-50 border-[2px] border-solid border-gray-200 rounded-[8px] p-[24px] inline-block">
                  <Text className="text-[12px] text-gray-500 uppercase tracking-wide mb-[8px] m-0">
                    Verification Code
                  </Text>
                  <Text className="text-[36px] font-bold text-gray-900 letter-spacing-[8px] m-0 font-mono">
                    {otp}
                  </Text>
                </div>
              </Section>

              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                This code will expire in{" "}
                <strong>5 minutes</strong>. Enter this code on
                the password reset page to create your new password.
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                If you didn't request this password reset, please ignore this
                email. Your password will remain unchanged and your account is
                secure.
              </Text>
            </Section>

            {/* Security Notice */}
            <Section className="bg-amber-50 border-l-[4px] border-solid border-amber-400 p-[16px] mb-[32px]">
              <Text className="text-[14px] text-amber-800 m-0 leading-[20px]">
                <strong>Security reminder:</strong> Never share this code with
                anyone. Our team will never ask for your verification code via
                email or phone.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[32px]" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-[14px] text-gray-500 mb-[8px]">
                Need help? Contact our support team
              </Text>
              <Text className="text-[12px] text-gray-400 m-0">
                123 Security Street, Safe City, SC 12345
              </Text>
              <Text className="text-[12px] text-gray-400 m-0">
                © {new Date().getFullYear()} Your Company. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
