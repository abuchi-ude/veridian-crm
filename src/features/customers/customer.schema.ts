import { z } from "zod";
import {
  registrationCustomerStatuses,
  registrationCustomerTypes,
  registrationIndustries,
} from "./customer.constants";

export const customerSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(1, "Business Name is required")
    .min(3, "Business Name can't be less than 3 characters"),
  customerType: z.enum(registrationCustomerTypes, {
    error: "Customer type is required",
  }),
  industry: z.enum(registrationIndustries, {
    error: "Industry is required",
  }),
  contactPerson: z
    .string()
    .trim()
    .min(1, "Contact person is required")
    .min(3, "Contact person's name can't be less than 3"),
  email: z.email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(
      /^\+?[0-9\s()-]+$/,
      "Phone number can only contain digits, spaces, parentheses, hyphens, and an optional leading +",
    )
    .refine((phone) => {
      const digitCount = phone.replace(/\D/g, "").length;
      return digitCount >= 7 && digitCount <= 15;
    }, "Enter a valid phone number with 7 to 15 digits"),
  status: z.enum(registrationCustomerStatuses, {
    error: "Customer status is required",
  }),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
