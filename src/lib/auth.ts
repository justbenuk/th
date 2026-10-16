import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";

const baseURL =
  process.env.BETTER_AUTH_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://tamworthhub.co.uk"
    : "http://localhost:3000");

export const auth = betterAuth({
  baseURL,
  trustedOrigins: [
    baseURL,
    "https://tamworthhub.co.uk",
    "https://www.tamworthhub.co.uk",
    "http://localhost:3000",
  ],
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  user: {
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
  },
  session: {
    cookieCache: {
      deferSessionRefresh: true,
      enabled: true,
      maxAge: 60,
    },
  },
  plugins: [admin(), nextCookies()],
});
