import { z } from "zod";

// Bus registration plate pattern (flexible for international formats)
const busRegPlateRegex = /^[A-Z0-9-\s]{2,20}$/i;

export const lostItemSchema = z
  .object({
    description: z
      .string()
      .min(1, "Please describe the item you lost")
      .min(
        10,
        "Description must be at least 10 characters to help others identify your item"
      )
      .max(
        2000,
        "Description is too long. Please keep it under 2000 characters"
      )
      .refine(
        (val) => val.trim().length > 0,
        "Description cannot be only whitespace"
      ),

    busCompany: z
      .string()
      .max(100, "Bus company name cannot exceed 100 characters")
      .optional(),

    busColor: z
      .string()
      .max(50, "Bus color cannot exceed 50 characters")
      .optional(),

    busRegPlate: z
      .string()
      .max(20, "Registration plate cannot exceed 20 characters")
      .refine(
        (val) => !val || val.length === 0 || busRegPlateRegex.test(val),
        "Please enter a valid registration plate (letters, numbers, hyphens, and spaces only)"
      )
      .optional(),

    rewardPoints: z
      .number({
        error: "Reward points must be a number",
      })
      .int("Reward points must be a whole number")
      .min(0, "Reward points cannot be negative")
      .max(100000, "Reward points cannot exceed 100,000")
      .optional()
      .or(z.literal(0)),

    rewardCash: z
      .number({
        error: "Reward amount must be a number",
      })
      .min(0, "Reward amount cannot be negative")
      .max(10000, "Reward amount cannot exceed $10,000")
      .multipleOf(0.01, "Reward amount can only have up to 2 decimal places")
      .optional(),
    lostItemOn: z
      .date({
        error: "Please select when you lost this item",
      })
      .max(new Date(), "The date cannot be in the future")
      .refine((date) => {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        return date >= oneYearAgo;
      }, "Please enter a date within the last year"),
  })
  .refine(
    (data) => {
      // If any bus info is provided, at least 2 fields should be filled
      const busFields = [
        data.busCompany,
        data.busColor,
        data.busRegPlate,
      ].filter((field) => field && field.length > 0);
      return busFields.length === 0 || busFields.length >= 2;
    },
    {
      message:
        "Please provide at least 2 bus details (company, color, or registration) to help identify the bus",
      path: ["busCompany"], // Show error on busCompany field
    }
  )
  .refine(
    (data) => {
      // Can't offer both points and cash
      const hasPoints = data.rewardPoints && data.rewardPoints > 0;
      const hasCash = data.rewardCash && data.rewardCash > 0;
      return !(hasPoints && hasCash);
    },
    {
      message: "Please choose either reward points or cash reward, not both",
      path: ["rewardCash"],
    }
  );

export type LostItemFormData = z.infer<typeof lostItemSchema>;
