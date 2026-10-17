import { Category } from "@prisma/client";
import CategoryForm from "./CategoryForm";

export default function UpdateCategoryForm({
  category,
  categories,
}: {
  category: Category;
  categories: Category[];
}) {
  return (
    <CategoryForm mode="edit" category={category} categories={categories} />
  );
}
