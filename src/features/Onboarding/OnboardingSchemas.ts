import z from "zod";

export const RegisterUserSchema = z
  .object({
    name: z.string().min(3, "Whats your name"),
    email: z.email("You need a valid Email Address"),
    password: z.string().min(8, "Needs to be at least 8 characters"),
    confirmPassword: z.string().min(8, "Needs to be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["password"],
    message: "Your passwords don't match",
  });

export const LoginUserSchema = z.object({
  email: z.email("You need a valid Email Address"),
  password: z.string().min(8, "Needs to be at least 8 characters"),
});
