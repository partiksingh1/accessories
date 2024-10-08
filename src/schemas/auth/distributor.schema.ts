import { z } from 'zod'

export const distributorSignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  shopName: z.string().min(2, 'Shop name must be at least 2 characters'),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
  businessAddress: z.string().min(5, 'Business address must be at least 5 characters'),
  contactNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  gst: z.string().optional(),
  pan: z.string().optional(),
  city: z.string().min(2, 'City must be at least 2 characters'),
})

export const distributorLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
})

export type DistributorSignupData = z.infer<typeof distributorSignupSchema>
export type DistributorLoginData = z.infer<typeof distributorLoginSchema>