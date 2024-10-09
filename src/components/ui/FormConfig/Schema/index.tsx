import { z } from "zod";

export const registerDefaultValue = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export const loginDefaultValue = {
  email: "",
  password: "",
  confirmPassword: "",
}

export const registerSchema = z
  .object({
    username: z.string().min(2, {
      message: "Profile Name must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
