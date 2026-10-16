import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChangepasswordCard from "@/features/Profile/components/ChangepasswordCard";
import DarkModeCard from "@/features/Profile/components/DarkModeCard";
import ProfileUserCard from "@/features/Profile/components/ProfileUserCard";

export default function ProfilePage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-xl">Welcome Back</CardTitle>
          <CardDescription>Welcome to your profile</CardDescription>
        </CardHeader>
      </Card>
      <ProfileUserCard />
      <ChangepasswordCard />
      <DarkModeCard />
    </div>
  );
}
