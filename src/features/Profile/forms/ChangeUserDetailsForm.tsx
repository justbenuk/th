"use client";
import { User } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { ChageUserDetailsSchema } from "../ProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { ChangeUserDetailsAction } from "../ProfileActions";
import { toast } from "sonner";

export default function ChangeUserDetailsForm({ user }: { user: User }) {
  const defaultValues = {
    name: user.name || "",
    email: user.email || "",
  };

  const form = useForm({
    resolver: zodResolver(ChageUserDetailsSchema),
    defaultValues,
  });

  async function handleForm(values: z.infer<typeof ChageUserDetailsSchema>) {
    const response = await ChangeUserDetailsAction(values);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleForm)}
      className="grid gap-6"
      id="change"
    >
      <div className="flex flex-row items-center gap-10">
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
      <div className="flex flex-row items-center justify-end">
        <Button
          type="button"
          onClick={() => form.reset()}
          variant={"ghost"}
          size={"icon"}
          className="text-red-500"
        >
          <X />
        </Button>
        <Button
          form="change"
          variant={"ghost"}
          size={"icon"}
          className="text-green-500"
        >
          <Check />
        </Button>
      </div>
    </form>
  );
}
