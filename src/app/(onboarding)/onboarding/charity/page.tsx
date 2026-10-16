"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";

export default function RegisterCharityByUserPage() {
  const [charity, setCharity] = useState(false);

  return (
    <div className="grid gap-6">
      <Card className="flex md:flex-row md:items-center justify-between">
        <CardHeader className="grow">
          <CardTitle className="text-xl font-semibold text-primary">
            Do you have a Charity?
          </CardTitle>
          <CardDescription>Start your charity profile</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant={"secondary"}>
            <Link href={"/profile"}>No</Link>
          </Button>
          <Button
            variant={charity ? "default" : "secondary"}
            onClick={() => setCharity(!charity)}
          >
            Yes
          </Button>
        </CardContent>
      </Card>
      {charity && (
        <Card>
          <CardHeader>
            <CardTitle>Create your Charity Profile</CardTitle>
          </CardHeader>
          <CardContent>Form goes here</CardContent>
        </Card>
      )}
    </div>
  );
}
