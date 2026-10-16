import PageContainer from "@/components/Shared/PageContainer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import PortalHeader from "@/features/portal/components/PortalHeader";
import PortalSidebar from "@/features/portal/components/PortalSidebar";
import { FetchCurrentUserAction } from "@/features/Profile/ProfileActions";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: {
    template: "%s | Portal Tamworth Hub",
    default: "Portal | Tammworth Hub",
  },
};
export default async function PortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await FetchCurrentUserAction();

  if (!user) return notFound();

  return (
    <SidebarProvider>
      <PortalSidebar />
      <SidebarInset>
        <PortalHeader />
        <PageContainer size="large">{children}</PageContainer>
      </SidebarInset>
    </SidebarProvider>
  );
}
