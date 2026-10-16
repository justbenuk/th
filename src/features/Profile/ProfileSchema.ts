import z from "zod";

export const ChageUserDetailsSchema = z.object({
  name: z.string().min(3),
  email: z.email("Please use a valid email address"),
});

export const ChangeUserPasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Password must be 8 characters or more"),
    newPassword: z.string().min(8, "Password must be 8 characters or more"),
    confirmPassword: z.string().min(8, "Password must be 8 characters or more"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't Match",
  });
