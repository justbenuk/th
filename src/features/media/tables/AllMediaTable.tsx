"use client";
import TableContainer from "@/components/tables/TableContainer";
import { Media } from "@prisma/client";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import Image from "next/image";
import DeleteMediaButton from "../components/DeleteMediaButton";

export default function AllMediaTable({ media }: { media: Media[] }) {
  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";

    const units = ["B", "KB", "MB", "GB", "TB"];
    const index = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1000)),
      units.length - 1,
    );
    return `${Number((bytes / 1000 ** index).toFixed(2))} ${units[index]}`;
  }
  const columns: ColDef<Media>[] = [
    {
      field: "url",
      headerName: "Image",
      cellRenderer: (row: ICellRendererParams<Media>) => (
        <Image
          src={row.data!.url}
          alt="Uploaded Image"
          width={100}
          height={100}
        />
      ),
    },
    {
      field: "name",
    },
    {
      field: "mimeType",
      headerName: "File Type",
    },
    {
      field: "size",
      headerName: "File Size",
      valueFormatter: ({ value }) =>
        value == null ? "" : formatFileSize(value),
    },
    {
      field: "fileKey",
      headerName: "File Key",
    },
    {
      headerName: "Actions",
      cellRenderer: (row: ICellRendererParams<Media>) => (
        <div className="h-full flex items-center gap-3">
          <DeleteMediaButton id={row.data!.id} />
        </div>
      ),
    },
  ];

  return <TableContainer data={media} columns={columns} />;
}
