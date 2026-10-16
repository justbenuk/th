import type { Metadata } from "next";
import ErrorCard from "@/components/Shared/ErrorCard";
import { FetchAllUsersAction } from "@/features/portal/PortalActions";
import AllUsersTable from "@/features/portal/tables/AllUsersTable";
import { Users2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "All Users",
};

export default async function UsersPage() {
  const response = await FetchAllUsersAction();

  if (!response.data)
    return (
      <ErrorCard
        title="Failed Fetch"
        description="Failed to fetch users"
        icon={Users2Icon}
      />
    );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Manage all users</CardDescription>
      </CardHeader>
      <CardContent>
        <AllUsersTable users={response.data} />
      </CardContent>
    </Card>
  );
}
