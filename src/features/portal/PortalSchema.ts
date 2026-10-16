import z from "zod";

export const banUserSchema = z.object({
  banReason: z.string().optional(),
  banExpiresAt: z
    .union([z.literal(""), z.iso.date()])
    .transform((value) =>
      value
        ? Math.ceil(
            (new Date(`${value}T23:59:59`).getTime() - Date.now()) / 1000,
          )
        : undefined,
    ),
});
