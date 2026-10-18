import { StatusType } from "@prisma/client";
import { z } from "zod";
import { CategorySchema } from "../categories/CategorySchema";

export const BusinessSchema = z.object({
  name: z.string().min(1),
  image: z.string().optional(),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string().optional(),
  category: CategorySchema,
  contactNumber: z.string().optional(),
  contactEmail: z.string().optional(),
  address: z.string().optional(),
  website: z.string().optional(),
  status: z.enum(StatusType).default("DRAFT"),
  published: z.boolean().default(false),
});
