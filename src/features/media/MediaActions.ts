"use server";

import { utapi } from "@/app/api/uploadthing/core";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/sessions";
import { revalidatePath } from "next/cache";

export async function FetchAllMedia() {
  await requireAdmin();
  return db.media.findMany();
}

export async function DeleteMediaById(id: string) {
  await requireAdmin();
  try {
    const image = await db.media.findUnique({
      where: { id },
      select: {
        fileKey: true,
      },
    });

    if (!image?.fileKey)
      return { success: false, message: "Failed to find image key" };

    await utapi.deleteFiles(image?.fileKey);

    await db.media.delete({
      where: { id },
    });
    revalidatePath("/portal/media");
    return { success: true, message: "Image deleted" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete image",
    };
  }
}
