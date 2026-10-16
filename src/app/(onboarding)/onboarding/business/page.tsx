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

export default function RegisterBusinessByUserPage() {
  const [business, setBusiness] = useState(false);

  return (
    <div className="grid gap-6">
      <Card className=" flex md:flex-row md:items-center justify-between">
        <CardHeader className="grow">
          <CardTitle className="text-xl font-semibold text-primary">
            Do you have a Business?
          </CardTitle>
          <CardDescription>Start your business profile</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant={"secondary"}>
            <Link href={"/onboarding/charity"}>No</Link>
          </Button>
          <Button
            variant={business ? "default" : "secondary"}
            onClick={() => setBusiness(!business)}
          >
            Yes
          </Button>
        </CardContent>
      </Card>
      {business && (
        <Card>
          <CardHeader>
            <CardTitle>Create Business Profile</CardTitle>
            <CardDescription>
              add your business profile to our community
            </CardDescription>
          </CardHeader>
          <CardContent>form goes here</CardContent>
        </Card>
      )}
    </div>
  );
}
