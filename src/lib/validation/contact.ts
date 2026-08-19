import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string({
      error: "Name is required.",
    })
    .trim()
    .min(1, "Name is required.")
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters."),
  email: z
    .string({
      error: "Email is required.",
    })
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .max(254, "Email is too long."),
  message: z
    .string({
      error: "Message is required.",
    })
    .trim()
    .min(1, "Message is required.")
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message cannot exceed 2000 characters."),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
