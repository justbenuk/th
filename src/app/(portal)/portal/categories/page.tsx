import ErrorCard from "@/components/Shared/ErrorCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FetchAllCategoriesAction } from "@/features/categories/categoryActions";
import AddCategoryForm from "@/features/categories/forms/AddCategoryForm";
import AllCategoriesTable from "@/features/categories/table/AllcategoriesTable";
import { List } from "lucide-react";

export default async function PortalCategoriesPage() {
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage all categories</CardDescription>
        </div>
        <AddCategoryForm />
      </CardHeader>
      <CardContent>
        <AllCategoriesTable categories={categories} />
      </CardContent>
    </Card>
  );
}
