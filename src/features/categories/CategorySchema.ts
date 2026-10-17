import { ContentType } from "@prisma/client";
import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, "You must provide a name"),
  type: z.enum(ContentType),
  description: z.string().optional(),
  parentId: z.string().optional().nullable(),
});
