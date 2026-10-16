"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/sessions";
import { revalidatePath } from "next/cache";
import z from "zod";
import { banUserSchema } from "./PortalSchema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const path = "/portal";

export async function FetchAllUsersAction() {
  await requireAdmin();

  try {
    const data = await db.user.findMany();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch users",
    };
  }
}

export async function DeleteUserByIdAction(id: string) {
  await requireAdmin();
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (user!.role !== "admin") {
      await db.user.delete({
        where: { id },
      });
    } else {
      return { success: false, message: "You can not delete an Admin" };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete user",
    };
  }
  revalidatePath(`${path}/users`);
  return { success: true, message: "User deleted" };
}

export async function BanUserAction(
  id: string,
  data: z.input<typeof banUserSchema>,
) {
  await requireAdmin();
  const validated = banUserSchema.parse(data);

  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (user!.role !== "admin") {
      await auth.api.banUser({
        body: {
          userId: id,
          banReason: validated.banReason,
          banExpiresIn: validated.banExpiresAt,
        },
        headers: await headers(),
      });
    } else {
      return { success: false, message: "You can not ban an Admin" };
    }

    revalidatePath(`${path}/users`);
    return { success: true, message: "User Banned" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to ban user",
    };
  }
}

export async function UnbanUserAction(id: string) {
  await requireAdmin();
  try {
    await auth.api.unbanUser({
      body: {
        userId: id,
      },
      headers: await headers(),
    });
    revalidatePath(`${path}/users`);
    return { sucess: true, message: "User Ban Cancelled" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to unban user",
    };
  }
}
