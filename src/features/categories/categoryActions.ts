"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/sessions";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { z } from "zod";
import { CategorySchema } from "./CategorySchema";

export async function FetchAllCategoriesAction() {
  return db.category.findMany();
}

const path = "/portal/categories";

export async function AddCategoryAction(data: z.infer<typeof CategorySchema>) {
  await requireAdmin();
  const validated = CategorySchema.parse(data);
  try {
    await db.category.create({
      data: {
        ...validated,
        slug: slugify(validated.name, {
          lower: true,
        }),
      },
    });
    revalidatePath(path);
    return { success: true, message: "Added category" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to add category",
    };
  }
}

export async function UpdateCategoryAction(
  id: string,
  data: z.infer<typeof CategorySchema>,
) {
  await requireAdmin();
  const validated = CategorySchema.parse(data);

  try {
    await db.category.update({
      where: { id },
      data: {
        ...validated,
        slug: slugify(validated.name, {
          lower: true,
        }),
      },
    });
    revalidatePath(path);
    return { success: true, message: "Updated Category" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to updated category",
    };
  }
}

export async function DeleteCategoryAction(id: string) {
  await requireAdmin();
  try {
    await db.category.delete({
      where: { id },
    });

    revalidatePath(path);
    return { success: true, message: "Category Deleted" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete category",
    };
  }
}
