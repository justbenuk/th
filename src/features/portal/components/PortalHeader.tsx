import { SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PortalHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;
  return (
    <header className="flex flex-row items-center justify-between py-2 px-6 border-b mb-10">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>
    </header>
  );
}
