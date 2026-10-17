"use client";
import TableContainer from "@/components/tables/TableContainer";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { format } from "date-fns";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import DeleteCategoryButton from "../components/DeleteCategoryButton";
import UpdateCategoryForm from "../forms/UpdatecategoryForm";

export default function AllCategoriesTable({
  categories,
}: {
  categories: Category[];
}) {
  const columns: ColDef<Category>[] = [
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "slug",
      headerName: "Slug",
    },
    {
      field: "type",
      headerName: "Type",
    },
    {
      field: "createdAt",
      headerName: "Created",
      cellRenderer: (row: ICellRendererParams<Category>) => (
        <span>{format(row.data!.createdAt, "dd/MM/yy")}</span>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated",
      cellRenderer: (row: ICellRendererParams<Category>) => (
        <span>{format(row.data!.updatedAt, "dd/MM/yy")}</span>
      ),
    },
    {
      headerName: "Actions",
      cellRenderer: (row: ICellRendererParams<Category>) => (
        <div className="h-full flex items-center gap-3">
          <Button asChild variant={"outline"} size={"icon-xs"}>
            <Link href={`/categories/${row.data!.slug}`}>
              <EyeIcon />
            </Link>
          </Button>
          <UpdateCategoryForm category={row.data!} categories={categories} />
          <DeleteCategoryButton id={row.data!.id} />
        </div>
      ),
    },
  ];
  return <TableContainer data={categories} columns={columns} />;
}
