import { z } from 'zod'

export const shopkeeperSchema = z.object({
  shopName: z.string().min(2, 'Shop name must be at least 2 characters'),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
  publicName: z.string().optional(),
  contactDetails: z.string().min(5, 'Contact details must be at least 5 characters'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  gst: z.string().optional(),
  pan: z.string().optional(),
})
