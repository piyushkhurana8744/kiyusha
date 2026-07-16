import { z } from "zod";

// Helper regexes
const nameRegex = /^[a-zA-Z\s]+$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(nameRegex, "Name must only contain letters and spaces")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .lowercase()
    .trim(),
  phone: z
    .string()
    .regex(phoneRegex, "Phone number must be exactly 10 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordRegex,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    ),
  turnstileToken: z.string().min(1, "Bot protection verification token is required")
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .lowercase()
    .trim(),
  password: z.string().min(1, "Password is required"),
  turnstileToken: z.string().min(1, "Bot protection verification token is required")
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .lowercase()
    .trim(),
  turnstileToken: z.string().min(1, "Bot protection verification token is required")
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      ),
    confirmPassword: z.string().min(1, "Password confirmation is required")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .regex(
        passwordRegex,
        "New password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      ),
    confirmNewPassword: z.string().min(1, "Password confirmation is required")
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmNewPassword"]
  });
