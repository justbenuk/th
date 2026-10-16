import type { Metadata } from "next";
import PageContainer from "@/components/Shared/PageContainer";
import { ReactNode } from "react";
import MainHeader from "@/components/Header/MainHeader";
import MainFooter from "@/components/Footer/MainFooter";

export const metadata: Metadata = {
  title: "Login",
};

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <MainHeader />
      <PageContainer size="small">{children}</PageContainer>
      <MainFooter />
    </div>
  );
}
