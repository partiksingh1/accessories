import { z } from 'zod'

export const OrderStatusEnum = z.enum(['PENDING', 'PROCESSED', 'SHIPPED', 'DELIVERED', 'CANCELLED']);
export const OrderItemSchema = z.object({
  id: z.string().optional(), // optional for new items
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  discountedPrice: z.number().positive().optional(),
  productId: z.string() // required for linking to a product
});
// Order Schema
const OrderSchema = z.object({
  id: z.string().optional(), // optional for new orders
  orderNumber: z.string(),
  totalAmount: z.number().positive(),
  paymentTerm: z.string(),
  status: OrderStatusEnum.default('PENDING'), // default to PENDING
  notes: z.string().optional(),
  createdAt: z.date().optional(), // optional, can be set by the backend
  updatedAt: z.date().optional(), // optional, can be set by the backend
  shopkeeperId: z.string(), // required to link to a shopkeeper
  createdById: z.string(), // required to link to the salesperson who created the order
  assignedToId: z.string(), // required to link to the distributor
  items: z.array(OrderItemSchema), // array of order items
});

export type OrderSchemaData = z.infer<typeof OrderSchema>
