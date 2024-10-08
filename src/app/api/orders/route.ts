import { z } from 'zod';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ZodError } from 'zod';
import { OrderStatus } from '@prisma/client';
import { OrderSchemaData,OrderStatusEnum } from '@/schemas/order.schema';
export async function POST(req: Request) {
  try {
    const { 
      shopkeeperId, 
      salespersonId, 
      distributorId, // New field for distributor
      items,
      paymentTerm,
      notes 
    } = await req.json();

    // Validate required fields
    if (!shopkeeperId || !salespersonId || !distributorId || !items || !items.length || !paymentTerm) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate distributor existence
    const distributor = await prisma.distributor.findUnique({
      where: { id: distributorId },
    });

    if (!distributor) {
      return NextResponse.json(
        { error: 'Distributor not found' },
        { status: 404 }
      );
    }

    // Validate each item
    for (const item of items) {
      if (!item.productId || !item.quantity || !item.price) {
        return NextResponse.json(
          { error: 'Invalid item data' },
          { status: 400 }
        );
      }

      const productExists = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!productExists) {
        return NextResponse.json(
          { error: `Product with ID ${item.productId} does not exist` },
          { status: 404 }
        );
      }
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum: number, item: { price: number; quantity: number; }) => 
      sum + (item.price * item.quantity), 0);

    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD${Date.now()}`,
        totalAmount,
        paymentTerm,
        notes,
        shopkeeperId,
        createdById: salespersonId,
        assignedToId: distributor.id, // Use the specified distributor
        items: {
          create: items.map((item: { quantity: any; price: any; productId: any; }) => ({
            quantity: item.quantity,
            price: item.price,
            productId: item.productId,
          })),
        },
      },
      include: {
        items: { include: { product: true } },
        shopkeeper: true,
        assignedTo: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
