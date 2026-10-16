"use server";

import { db } from "@/lib/db";
import { requireUser } from "@/lib/sessions";
import { redirect } from "next/navigation";
import z from "zod";
import {
  ChageUserDetailsSchema,
  ChangeUserPasswordSchema,
} from "./ProfileSchema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

//fetch current user for the profile
export async function FetchCurrentUserAction() {
  const user = await requireUser();
  if (!user) redirect("/login");

  const currentuser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return currentuser;
}

export async function ChangeUserDetailsAction(
  data: z.infer<typeof ChageUserDetailsSchema>,
) {
  const user = await requireUser();
  const validated = ChageUserDetailsSchema.parse(data);

  try {
    //check and change username
    if (user.name !== validated.name) {
      await auth.api.updateUser({
        body: {
          name: validated.name,
        },
        headers: await headers(),
      });
    }
    //check and change email
    if (user.email !== validated.email) {
      const emailCheck = await db.user.findFirst({
        where: {
          email: validated.email,
        },
      });

      if (!emailCheck) {
        await auth.api.changeEmail({
          body: {
            newEmail: validated.email,
            callbackURL: "/profile",
          },
          headers: await headers(),
        });
      } else {
        return { success: false, message: "Email already in use" };
      }
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to updated user",
    };
  }
  revalidatePath("profile");
  return { success: true, message: "User updated" };
}

export async function ChnageUserPasswordAction(
  data: z.infer<typeof ChangeUserPasswordSchema>,
) {
  await requireUser();

  const validated = ChangeUserPasswordSchema.parse(data);

  try {
    await auth.api.changePassword({
      body: {
        currentPassword: validated.currentPassword,
        newPassword: validated.newPassword,
      },
      headers: await headers(),
    });
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to change password",
    };
  }

  return { success: true, message: "Password Changed" };
}
