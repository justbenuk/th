"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContentType, Tag } from "@prisma/client";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AddTagAction, UpdateTagAction } from "../TagsActions";
import { TagSchema } from "../TagsSchema";

type TagProps =
  | {
      mode: "add";
      tag?: never;
    }
  | {
      mode: "edit";
      tag: Tag;
    };

export default function TagForm(props: TagProps) {
  const router = useRouter();
  const isEditing = props.mode === "edit";
  const tag = isEditing ? props.tag : null;
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof TagSchema>>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      name: tag?.name ?? "",
      type: tag?.type,
    },
  });

  async function handleSubmit(values: z.infer<typeof TagSchema>) {
    try {
      const response =
        props.mode === "edit"
          ? await UpdateTagAction(props.tag.id, values)
          : await AddTagAction(values);

      if (response.success) {
        toast.success(response.message);
        form.reset();
        setOpen(false);
        router.push("/portal/tags");
        router.refresh();
        return;
      }

      toast.error(response.message);
    } catch {
      toast.error(isEditing ? "failed to update tag" : "Failed to add tag");
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon-xs"}
          className={isEditing ? "bg-yellow-300/50" : "bg-green-300/50"}
        >
          {isEditing ? <PencilIcon /> : <PlusIcon />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Update Tag" : "Add Tag"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-6">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
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
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Content Type</FieldLabel>
                <FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={field.disabled}
                  >
                    <SelectTrigger
                      ref={field.ref}
                      onBlur={field.onBlur}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select a tag type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(ContentType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0) + type.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
          <DialogFooter className="flex flex-row items-center justify-between gap-4">
            <DialogClose>Cancel</DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Saving…"
                : isEditing
                  ? "Update Tag"
                  : "Add Tag"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
