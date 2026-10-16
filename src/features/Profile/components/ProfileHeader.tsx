import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function ProfileHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;
  return (
    <header className="flex flex-row items-center justify-between py-2 px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>
      <div>
        {session.user.role === "admin" && (
          <Button asChild variant={"destructive"}>
            <Link href={"/portal"}>Admin</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
