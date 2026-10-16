import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChangeUserPasswordForm from "../forms/ChangeUserPasswordForm";

export default function ChangepasswordCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your current password</CardDescription>
      </CardHeader>
      <CardContent>
        <ChangeUserPasswordForm />
      </CardContent>
    </Card>
  );
}
