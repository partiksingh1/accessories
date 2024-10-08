// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ZodError } from 'zod'; // Import ZodError if you're using Zod for validation

export async function POST(req: Request) {
  try {
    const { name, petName, code, price, description, adminId } = await req.json();

    // Validate inputs (optional, use your validation schema if needed)
    if (!name || !code || !price || !adminId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        petName,
        code,
        price,
        description,
        createdById: adminId,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create product:', error);

    // Handle Prisma unique constraint violations
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A product with this code already exists' },
        { status: 409 }
      );
    }

    // Handle Zod validation errors (if applicable)
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 422 }
      );
    }

    // General error handling
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
