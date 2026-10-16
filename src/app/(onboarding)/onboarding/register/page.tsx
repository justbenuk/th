import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterUserForm from "@/features/Onboarding/forms/RegisterUserForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) redirect("/profile");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Let&apos;s Get Started
        </CardTitle>
        <CardDescription>
          Register your account with us today. Please note, We will not sell
          your data. This community portal is for Tamworth People and Tamworth
          Businesses. It would go against{" "}
          <Link
            href={"/about"}
            className="text-primary text-lg font-semibold underline underline-offset-2"
          >
            our ethos
          </Link>{" "}
          if we were to sell data to large corporations outside this community
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <RegisterUserForm />
      </CardContent>
    </Card>
  );
}
