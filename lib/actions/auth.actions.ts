'use server'

import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";
import { headers } from "next/headers";

export const signUpWithEmail = async ({email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry}: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: { email: email, password: password, name: fullName },
            headers: await headers()
        })

        if (response) {
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email,
                    name: fullName, 
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry
                }
            })

            return { success: true, data: response}
        }
        
        return { success: false, error: 'No response from sign up' };
    } catch (e) {
        console.error('Error during sign up:', e);
        return { success: false, error: e instanceof Error ? e.message : 'Sign up failed' };
    }
}

export const signInWithEmail = async ({email, password}: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({body: { email: email, password: password }})

        return { success: true, data: response}
    } catch (e) {
        console.error('Error during sign in:', e);
        return { success: false, error: e instanceof Error ? e.message : 'Sign in failed' };
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() });
    } catch (e) {
        console.error('Error during sign out:', e);
    }
}