import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTagForm from "@/features/tags/forms/AddtagForm";
import AllTagsTable from "@/features/tags/tables/AllTagsTable";
import { FetchAllTagsAction } from "@/features/tags/TagsActions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
};

export default async function TagsPage() {
  const tags = await FetchAllTagsAction();

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Manage all tags</CardDescription>
          </div>
          <AddTagForm />
        </CardHeader>
        <CardContent>
          <AllTagsTable tags={tags} />
        </CardContent>
      </Card>
    </div>
  );
}
