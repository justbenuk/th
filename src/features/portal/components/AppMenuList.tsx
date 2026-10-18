import {
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PlaySquareIcon, Users2Icon } from "lucide-react";
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
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={"/portal/media"}>
            <PlaySquareIcon />
            <span>Media</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}
