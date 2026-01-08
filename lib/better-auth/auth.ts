import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDb } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";
import next from "next";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
  if (authInstance) return authInstance;

  const mongoose = await connectToDb();
  const db = mongoose.connection.db;

  if (!db) throw new Error("Database connection is not established.");

  authInstance = betterAuth({
    database: mongodbAdapter(db as any),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BASE_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignInAfterSignUp: true,
    }, 
    plugins: [nextCookies()],
  })

  return authInstance;
}

export const auth = await getAuth();