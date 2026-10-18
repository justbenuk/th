"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { requireUser } from "@/lib/sessions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Business, Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AddBusinessAction, UpdateBusinessAction } from "../BusinessActions";
import { BusinessSchema } from "../BusinessSchema";

type SessionUser = Awaited<ReturnType<typeof requireUser>>;

type BusinessProps =
  | {
      mode: "add";
      business?: never;
      categories: Category[];
      user: SessionUser;
    }
  | {
      mode: "edit";
      business: Business;
      categories: Category[];
      user: SessionUser;
    };

export default function BusinessForm(props: BusinessProps) {
  const router = useRouter();
  const isEditing = props.mode === "edit";
  const business = isEditing ? props.business : null;
  const categories = props.categories;
  const allowed = props.user.role === "admin";

  const defaultValues = {
    name: business?.name ?? "",
    image: business?.image ?? "",
    shortDescription: business?.shortDescription ?? "",
    description: business?.description ?? "",
    categoryId: business?.categoryId ?? "",
    contactNumber: business?.contactNumber ?? "",
    contactEmail: business?.contactEmail ?? "",
    address: business?.address ?? "",
    website: business?.website ?? "",
    status: business?.status,
    featured: business?.featured,
  };

  const form = useForm<
    z.input<typeof BusinessSchema>,
    unknown,
    z.output<typeof BusinessSchema>
  >({
    resolver: zodResolver(BusinessSchema),
    defaultValues,
  });

  async function handleSubmit(values: z.infer<typeof BusinessSchema>) {
    try {
      const response =
        props.mode === "edit"
          ? await UpdateBusinessAction(props.business.id, values)
          : await AddBusinessAction(values);

      if (response.success) {
        toast.success(response.message);
        form.reset();
        if (allowed) {
          router.push("/portal/businesses");
        } else {
          router.push("/profile/businesses");
        }
      }
      toast.error(response.message);
    } catch {
      toast.error(
        isEditing ? "Failed to update business" : "Failed to add business",
      );
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="grid grid-cols-1 lg:grid-cols-6 gap-10"
    >
      <div className="col-span-1 lg:col-span-4">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Describe your business</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <FieldContent>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="shortDescription"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Short Description</FieldLabel>
                    <FieldContent>
                      <Textarea {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <FieldContent>
                      <Textarea {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How can the public contact you</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="contactNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Contact Number</FieldLabel>
                    <FieldContent>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="contactEmail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <FieldContent>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Address</FieldLabel>
                    <FieldContent>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                name="website"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Website</FieldLabel>
                    <FieldContent>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-2">
        <div className="grid gap-6">
          <div>image will go here</div>
          {allowed && <div>other stuff here</div>}
          <Button className="w-full h-10">
            {isEditing ? "Update Business" : "Add Business"}
          </Button>
        </div>
      </div>
    </form>
  );
}
