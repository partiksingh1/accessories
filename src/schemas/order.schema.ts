import { z } from 'zod'

export const orderSchema = z.object({
  productName: z.string().min(2, 'Product name must be at least 2 characters'),
  productPetName: z.string().optional(),
  productCode: z.string().min(1, 'Product code is required'),
  productQty: z.number().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive'),
  discountedPrice: z.number().positive('Discounted price must be positive').optional(),
  paymentTerm: z.string(),
  shopkeeperId: z.string().min(1, 'Shopkeeper ID is required')
})

export type OrderData = z.infer<typeof orderSchema>