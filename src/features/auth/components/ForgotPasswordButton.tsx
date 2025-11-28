"use client";

import { authClient } from "@/shared/lib/auth-client";
import React from "react";

const ForgotPasswordButton = () => {
  const forgotPassword = async () => {
    const { data, error } = await authClient.forgetPassword.emailOtp({
      email: "ramiplatero11@gmail.com", // required
    });

    console.log(error);
  };

  return <button onClick={forgotPassword}>Forgot password</button>;
};

export default ForgotPasswordButton;
