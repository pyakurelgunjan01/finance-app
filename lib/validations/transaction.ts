import { z } from "zod";

export const transactionSchema = z.object({
  category: z.string().min(1, "Category is required"),

  amount: z.coerce
    .number()
    .positive("Amount must be greater than 0"),

  type: z.enum(["Income", "Expense"]),

  date: z.date(),
});

export type TransactionFormValues =
  z.infer<typeof transactionSchema>;