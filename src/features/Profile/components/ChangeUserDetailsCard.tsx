import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FetchCurrentUserAction } from "../ProfileActions";
import ErrorCard from "@/components/Shared/ErrorCard";
import { User } from "lucide-react";
import ChangeUserDetailsForm from "../forms/ChangeUserDetailsForm";

export default async function ChangeUserDetailsCard() {
  const user = await FetchCurrentUserAction();

  if (!user)
    return (
      <ErrorCard
        title="Fetch Error"
        description="Failed to fetch User. If this problem persists. Contact the administrator"
        icon={User}
      />
    );

  return (
    <Card className="col-span-1 md:col-span-3">
      <CardHeader>
        <CardTitle>Your Details</CardTitle>
        <CardDescription>Change your details</CardDescription>
      </CardHeader>
      <CardContent>
        <ChangeUserDetailsForm user={user} />
      </CardContent>
    </Card>
  );
}
