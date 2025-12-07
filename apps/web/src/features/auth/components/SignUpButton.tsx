"use client";

import { signUp } from "../actions/auth.actions";

const SignUpButton = () => {
  return <button onClick={signUp}>Sign up</button>
};

export default SignUpButton;
