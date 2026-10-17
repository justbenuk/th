import ErrorCard from "@/components/Shared/ErrorCard";
import { FetchAllCategoriesAction } from "@/features/categories/categoryActions";
import { List } from "lucide-react";

export default async function CategoriesPage() {
  const categories = await FetchAllCategoriesAction();

  if (!categories)
    return (
      <ErrorCard
        title="Categories"
        description="Failed to load categories"
        icon={List}
      />
    );
  return (
    <div>
      <h1>cats</h1>
    </div>
  );
}
