"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/sessions";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { z } from "zod";
import { TagSchema } from "./TagsSchema";

export async function FetchAllTagsAction() {
  return db.tag.findMany();
}

const path = "/portal/tags";

export async function AddTagAction(data: z.infer<typeof TagSchema>) {
  await requireAdmin();
  const validated = TagSchema.parse(data);

  try {
    await db.tag.create({
      data: {
        ...validated,
        slug: slugify(validated.name, {
          lower: true,
        }),
      },
    });
    revalidatePath(path);
    return { success: true, message: "Tag Added" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to add tag",
    };
  }
}

export async function UpdateTagAction(
  id: string,
  data: z.infer<typeof TagSchema>,
) {
  await requireAdmin();
  const validated = TagSchema.parse(data);

  try {
    await db.tag.update({
      where: { id },
      data: {
        ...validated,
        slug: slugify(validated.name, {
          lower: true,
        }),
      },
    });
    revalidatePath(path);
    return { success: true, message: "Updated Tag" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "failed to update tag",
    };
  }
}

export async function DeleteTagAction(id: string) {
  await requireAdmin();

  try {
    await db.tag.delete({
      where: { id },
    });
    revalidatePath(path);
    return { success: true, message: "Tag deleted" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete tag",
    };
  }
}
