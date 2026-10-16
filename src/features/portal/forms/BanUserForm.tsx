"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { banUserSchema } from "../PortalSchema";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { BanUserAction } from "../PortalActions";
import { toast } from "sonner";

export default function BanUserForm({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  const defaultValues = {
    banReason: "",
    banExpiresAt: "",
  };

  const form = useForm<
    z.input<typeof banUserSchema>,
    unknown,
    z.output<typeof banUserSchema>
  >({
    resolver: zodResolver(banUserSchema),
    defaultValues,
  });

  async function handleForm(values: z.output<typeof banUserSchema>) {
    const response = await BanUserAction(id, {
      banReason: values.banReason,
      banExpiresAt: form.getValues().banExpiresAt,
    });

    if (response.success) {
      toast.success(response.message);
      setOpen(false);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon-xs"}
          className="bg-yellow-200/50"
        >
          <Lock />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={form.handleSubmit(handleForm)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Ban User</AlertDialogTitle>
            <AlertDialogDescription>
              To permanently ban a user, leave the date empty
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-6 py-6">
            <Controller
              name="banReason"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Ban Reason</FieldLabel>
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
              name="banExpiresAt"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Ban Expires</FieldLabel>
                  <FieldContent>
                    <Input type="date" {...field} value={field.value ?? ""} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              type="submit"
              variant={"destructive"}
              disabled={form.formState.isSubmitting}
            >
              Ban
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
