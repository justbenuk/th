import PageContainer from "@/components/Shared/PageContainer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import PortalHeader from "@/features/portal/components/PortalHeader";
import PortalSidebar from "@/features/portal/components/PortalSidebar";
import { requireAdmin } from "@/lib/sessions";
import type { Metadata } from "next";
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
  await requireAdmin();

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
