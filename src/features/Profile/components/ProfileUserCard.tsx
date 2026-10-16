import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FetchCurrentUserAction } from "../ProfileActions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";
import ChangeUserDetailsCard from "./ChangeUserDetailsCard";

export default async function ProfileUserCard() {
  const user = await FetchCurrentUserAction();

  if (!user) redirect("/login");

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-10">
      <Card className="col-span-1 relative">
        <CardContent>
          <Image
            src={user.image || "/assets/profile.png"}
            alt="Profile Image"
            width={400}
            height={400}
          />
          <Button
            className="absolute z-100 bottom-3 right-5"
            variant={"secondary"}
          >
            <CameraIcon />
          </Button>
        </CardContent>
      </Card>
      <div className="col-span-1 md:col-span-3 lg:col-span-5">
        <ChangeUserDetailsCard />
      </div>
    </div>
  );
}
