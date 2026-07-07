import { z } from "zod";

export const payrollSchema = z.object({
  employee: z.string().min(1),
  month: z.string().min(1),

  basicSalary: z.number().min(0),
  bonus: z.number().min(0),
  deduction: z.number().min(0),

  netSalary: z.number().min(0),

  status: z.enum(["Paid", "Pending"]),

  remarks: z.string().optional(),
});