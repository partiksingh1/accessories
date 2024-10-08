import { z } from 'zod';

export const shopkeeperSchema = z.object({
  shopName: z.string().min(2, 'Shop name must be at least 2 characters'),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
  publicName: z.string().optional(),
  contactNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'), // Use regex for contact number validation
  city: z.string().min(3, 'city must be at least 3 characters'),
  gst: z.string().optional(),
  pan: z.string().optional(),
});

export type ShopkeeperSchemaData = z.infer<typeof shopkeeperSchema>;