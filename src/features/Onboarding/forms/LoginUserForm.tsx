"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { LoginUserSchema } from "../OnboardingSchemas";
import z from "zod";
import { LoginUserAction } from "../OnboardingActions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginUserForm() {
  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm({
    resolver: zodResolver(LoginUserSchema),
    defaultValues,
  });

  async function handleForm(values: z.infer<typeof LoginUserSchema>) {
    const response = await LoginUserAction(values);

    if (response.success) {
      toast.success(response.message);
      redirect("/profile");
    } else {
      toast.error(response.message);
    }
  }
  return (
    <form onSubmit={form.handleSubmit(handleForm)}>
      <div className="flex flex-row items-center gap-10">
        <Controller
          name="email"
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
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Password</FieldLabel>
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
      <div className="flex flex-row items-center justify-end mt-6">
        <Button>Login</Button>
      </div>
    </form>
  );
}
