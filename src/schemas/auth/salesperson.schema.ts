import { z } from 'zod';

export const salesPersonSignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  employeeCode: z.string().min(3, 'Employee code must be at least 3 characters'),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'), // Renamed from 'number'
  city: z.string().min(2, 'City must be at least 2 characters'),
});

// Login schema remains the same
export const salesPersonLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

// Type inference for TypeScript
export type SalesPersonSignupData = z.infer<typeof salesPersonSignupSchema>;
export type SalesPersonLoginData = z.infer<typeof salesPersonLoginSchema>;
