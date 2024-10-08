import { z } from 'zod'

export const adminSignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  adminCode: z.string().min(5, 'Admin code must be at least 5 characters'),
})

export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
})

export type AdminSignupData = z.infer<typeof adminSignupSchema>
export type AdminLoginData = z.infer<typeof adminLoginSchema>