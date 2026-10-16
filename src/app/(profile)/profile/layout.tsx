import PageContainer from "@/components/Shared/PageContainer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProfileHeader from "@/features/Profile/components/ProfileHeader";
import ProfileSidebar from "@/features/Profile/components/ProfileSidebar";
import { requireAdmin } from "@/lib/sessions";
import type { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Profile",
};
export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();
  return (
    <SidebarProvider>
      <ProfileSidebar />
      <SidebarInset>
        <ProfileHeader />
        <PageContainer size="large">{children}</PageContainer>
      </SidebarInset>
    </SidebarProvider>
  );
}
