import { FetchAllCategoriesAction } from "@/features/categories/categoryActions";
import { requireUser } from "@/lib/sessions";
import BusinessForm from "./BusinessForm";

export default async function AddBusinessForm() {
  const user = await requireUser();
  const categories = await FetchAllCategoriesAction();

  return <BusinessForm mode="add" categories={categories} user={user} />;
}
