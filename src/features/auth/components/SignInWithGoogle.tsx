"use client"

import { signInWithGoogle } from "@/lib/auth-client"

const SignInWithGoogle = () => {

    
  return (
    <button onClick={signInWithGoogle}>
        Sign In With Google
    </button>
  )
}

export default SignInWithGoogle