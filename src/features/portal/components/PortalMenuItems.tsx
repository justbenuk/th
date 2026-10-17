import {
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ListIcon, TagsIcon } from "lucide-react";
import Link from "next/link";

export default function PortalMenuItems() {
  return (
    <SidebarGroup>
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={"Categories"}>
          <Link href={"/portal/categories"}>
            <ListIcon />
            <span>Categories</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={"Tags"}>
          <Link href={"/portal/tags"}>
            <TagsIcon />
            <span>Tags</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}
