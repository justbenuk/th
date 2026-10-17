import { ContentType } from "@prisma/client";
import { z } from "zod";

export const TagSchema = z.object({
  name: z.string().min(1, "The tag must have a name"),
  type: z.enum(ContentType),
});
