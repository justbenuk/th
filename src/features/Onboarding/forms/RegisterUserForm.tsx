"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserSchema } from "../OnboardingSchemas";
import z from "zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RegisterUserAction } from "../OnboardingActions";
export default function RegisterUserForm() {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues,
  });

  async function handleForm(values: z.infer<typeof RegisterUserSchema>) {
    const response = await RegisterUserAction(values);
    if (response.success) {
      toast.message(response.message);
      router.push("/onboarding/business");
      router.refresh();
    } else {
      toast.error(response.message);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleForm)}
      className="w-full grid gap-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
        <Button>Next</Button>
      </div>
    </form>
  );
}
