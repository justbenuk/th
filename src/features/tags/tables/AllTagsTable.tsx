"use client";
import TableContainer from "@/components/tables/TableContainer";
import { Button } from "@/components/ui/button";
import { Tag } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { format } from "date-fns";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import DeleteTagButton from "../components/DeleteTagButton";
import UpdateTagForm from "../forms/UpdateTagForm";

export default function AllTagsTable({ tags }: { tags: Tag[] }) {
  const columns: ColDef<Tag>[] = [
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
      headerName: "Content Type",
    },
    {
      field: "createdAt",
      headerName: "Created",
      cellRenderer: (row: ICellRendererParams<Tag>) => (
        <span>{format(row.data!.createdAt, "dd/MM/yy")}</span>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated",
      cellRenderer: (row: ICellRendererParams<Tag>) => (
        <span>{format(row.data!.updatedAt, "dd/MM/yy")}</span>
      ),
    },
    {
      headerName: "Actions",
      cellRenderer: (row: ICellRendererParams) => (
        <div className="flex h-full items-center gap-2">
          <Button variant={"outline"} size={"icon-xs"} asChild>
            <Link href={`/tags/${row.data!.slug}`}>
              <EyeIcon />
            </Link>
          </Button>
          <UpdateTagForm tag={row.data} />
          <DeleteTagButton id={row.data!.id} />
        </div>
      ),
    },
  ];
  return <TableContainer data={tags} columns={columns} />;
}
