"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ChangeUserPasswordSchema } from "../ProfileSchema";
import z from "zod";
import { ChnageUserPasswordAction } from "../ProfileActions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ChangeUserPasswordForm() {
  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const form = useForm({
    resolver: zodResolver(ChangeUserPasswordSchema),
    defaultValues,
  });

  async function handleForm(values: z.infer<typeof ChangeUserPasswordSchema>) {
    const response = await ChnageUserPasswordAction(values);

    if (response.success) {
      toast.success(response.success);
      form.reset();
    } else {
      toast.error(response.message);
      form.reset();
    }
  }
  return (
    <form onSubmit={form.handleSubmit(handleForm)} className="grid gap-6">
      <div className="flex flex-row items-center justify-between gap-10">
        <Controller
          name="currentPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Current Password</FieldLabel>
              <FieldContent>
                <Input {...field} type="password" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>New Password</FieldLabel>
              <FieldContent>
                <Input {...field} type="password" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <FieldContent>
                <Input {...field} type="password" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
            </Field>
          )}
        />
      </div>
      <div className="flex flex-row items-center justify-end">
        <Button
          type="button"
          variant={"ghost"}
          size={"icon"}
          className="text-red-500"
        >
          <X />
        </Button>
        <Button variant={"ghost"} size={"icon"} className="text-green-500">
          <Check />
        </Button>
      </div>
    </form>
  );
}
