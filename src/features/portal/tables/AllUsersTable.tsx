"use client";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { User } from "@prisma/client";
import TableContainer from "@/components/tables/TableContainer";
import { format } from "date-fns";
import { Check, EyeIcon, X } from "lucide-react";
import Image from "next/image";
import DeleteUserButton from "../components/DeleteUserButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BanUserToggle from "../components/BanUserToggle";

export default function AllUsersTable({ users }: { users: User[] }) {
  const columns: ColDef<User>[] = [
    {
      field: "image",
      headerName: "Image",
      cellRenderer: (row: ICellRendererParams<User>) => (
        <div className="flex h-full items-center">
          <Image
            src={row.data?.image || "/assets/profile.png"}
            alt={row.data?.name || "Profile image"}
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "email",
      headerName: "Email",
    },
    {
      field: "emailVerified",
      headerName: "Verified Email",
      cellRenderer: (row: ICellRendererParams<User>) => (
        <div className="flex h-full items-center">
          {row.data!.emailVerified ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <X className="size-4 text-red-500" />
          )}
        </div>
      ),
    },
    {
      field: "role",
      headerName: "Role",
    },
    {
      field: "createdAt",
      headerName: "Member Since",
      cellRenderer: (row: ICellRendererParams<User>) => (
        <span>{format(row.data!.createdAt, "dd/MM/yy")}</span>
      ),
    },
    {
      field: "banned",
      headerName: "Banned",
      cellRenderer: (row: ICellRendererParams) => (
        <div className="flex h-full items-center">
          {row.data.banned ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <X className="size-4 text-red-500" />
          )}
        </div>
      ),
    },
    {
      headerName: "Actions",
      cellRenderer: (row: ICellRendererParams<User>) => (
        <div className="flex h-full items-center gap-2">
          <Button variant={"outline"} size={"icon-xs"} asChild>
            <Link href={`/portal/users/${row.data!.id}`}>
              <EyeIcon />
            </Link>
          </Button>
          <BanUserToggle row={row.data!} />
          <DeleteUserButton id={row.data!.id} />
        </div>
      ),
    },
  ];
  return <TableContainer data={users} columns={columns} size={20} />;
}
