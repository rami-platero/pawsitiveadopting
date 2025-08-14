"use client"

import React from 'react'
import { signIn } from '../actions/auth.actions'

const SignInButton = () => {
  return (
    <button onClick={signIn} style={{margin: "1rem"}}>
        Sign in
    </button>
  )
}

export default SignInButton