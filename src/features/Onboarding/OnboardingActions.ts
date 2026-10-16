"use server";

import z from "zod";
import { LoginUserSchema, RegisterUserSchema } from "./OnboardingSchemas";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//Register User Action
export async function RegisterUserAction(
  data: z.infer<typeof RegisterUserSchema>,
) {
  const validated = RegisterUserSchema.parse(data);

  try {
    await auth.api.signUpEmail({
      body: {
        ...validated,
        image: "/assets/profile.png",
      },
      headers: await headers(),
    });
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to register user",
    };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "User Registered" };
}

export async function LoginUserAction(data: z.infer<typeof LoginUserSchema>) {
  const validated = LoginUserSchema.parse(data);
  try {
    await auth.api.signInEmail({
      body: {
        ...validated,
      },
      headers: await headers(),
    });
  } catch (error) {
    return {
      sucess: false,
      message: error instanceof Error ? error.message : "Failed to log in",
    };
  }

  return { success: true, message: "User signed in" };
}
