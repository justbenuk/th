import {
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Users2Icon } from "lucide-react";
import Link from "next/link";

export default function AppMenuList() {
  return (
    <SidebarGroup>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={"/portal/users"}>
            <Users2Icon />
            <span>Users</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}
