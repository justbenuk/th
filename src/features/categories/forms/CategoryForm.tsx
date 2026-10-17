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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, ContentType } from "@prisma/client";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CategorySchema } from "../CategorySchema";
import { AddCategoryAction, UpdateCategoryAction } from "../categoryActions";

type CategoryProps =
  | {
      mode: "add";
      category?: never;
      categories: Category[];
    }
  | {
      mode: "edit";
      category: Category;
      categories: Category[];
    };

export default function CategoryForm(props: CategoryProps) {
  const router = useRouter();
  const isEditing = props.mode === "edit";
  const category = isEditing ? props.category : null;
  const categories = props.categories;
  const [open, setOpen] = useState(false);

  const defaultValues = {
    name: category?.name ?? "",
    type: category?.type,
    description: category?.description ?? "",
    parentId: category?.parentId ?? null,
  };

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues,
  });

  async function handleSubmit(values: z.infer<typeof CategorySchema>) {
    try {
      const response =
        props.mode === "edit"
          ? await UpdateCategoryAction(props.category.id, values)
          : await AddCategoryAction(values);

      if (response.success) {
        toast.success(response.message);
        form.reset();
        setOpen(false);
        router.refresh();
      }

      toast.error(response.message);
    } catch {
      toast.error(
        isEditing ? "Failed to update category" : "Failed to add category",
      );
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
          <DialogTitle>
            {isEditing ? "Update Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-6">
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
          <Controller
            name="parentId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Parent Category</FieldLabel>
                <FieldContent>
                  <Select
                    name={field.name}
                    value={field.value ?? "none"}
                    onValueChange={(value) =>
                      field.onChange(value === "none" ? null : value)
                    }
                    disabled={field.disabled}
                  >
                    <SelectTrigger
                      ref={field.ref}
                      onBlur={field.onBlur}
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select a parent category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="none">
                        None (Top-Level Category)
                      </SelectItem>

                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
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
                  ? "Update Category"
                  : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
