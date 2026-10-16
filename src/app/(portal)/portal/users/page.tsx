import type { Metadata } from "next";
import ErrorCard from "@/components/Shared/ErrorCard";
import { FetchAllUsersAction } from "@/features/portal/PortalActions";
import AllUsersTable from "@/features/portal/tables/AllUsersTable";
import { Users2Icon } from "lucide-react";

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
  return <AllUsersTable users={response.data} />;
}
