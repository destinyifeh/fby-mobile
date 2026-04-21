import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const dobSchema = z.string()
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Please format as DD/MM/YYYY")
  .refine((dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    const now = new Date();
    
    // Check if it's a valid date object and the components match (prevents 31/02/2024 etc)
    const isValidDate = date.getFullYear() === year && 
                       date.getMonth() === month - 1 && 
                       date.getDate() === day;
    
    return isValidDate && date < now && year > 1900;
  }, "Please enter a valid date of birth in the past.");

export const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Please enter a valid email address."),
  dateOfBirth: dobSchema,
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
