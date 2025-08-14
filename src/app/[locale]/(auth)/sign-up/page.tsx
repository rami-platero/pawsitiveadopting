import ForgotPasswordButton from "@/features/auth/components/ForgotPasswordButton";
import SignInButton from "@/features/auth/components/SignInButton";
import SignInWithGoogle from "@/features/auth/components/SignInWithGoogle";
import SignUp from "@/features/auth/components/SignUpButton";

export default function SignUpPage() {
  return (
    <div>
      <SignUp />
      <SignInWithGoogle/>
      <SignInButton/>
      <ForgotPasswordButton/>
    </div>
  );
}
