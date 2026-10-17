import { FetchAllCategoriesAction } from "../categoryActions";
import CategoryForm from "./CategoryForm";

export default async function AddCategoryForm() {
  const categories = await FetchAllCategoriesAction();

  if (!categories) return null;

  return <CategoryForm mode={"add"} categories={categories} />;
}
