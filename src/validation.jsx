import { z } from "zod";

export const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  mobileNumber: z.string().regex(/^[0-9]{10}$/, "Invalid mobile number"),
});
