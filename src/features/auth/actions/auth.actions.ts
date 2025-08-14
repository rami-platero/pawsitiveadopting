"use server";
import { auth } from "@/lib/auth"
 
export const signIn = async () => {
    await auth.api.signInEmail({
        body: {
            email: "ramiplatero11@gmail.com",
            password: "password",
        }
    })
}

export const signUp = async () => {
    await auth.api.signUpEmail({
        body: {
            email: "ramiplatero11@gmail.com",
            password: "password",
            name: "Ramiro Platero",
        }
    })
}