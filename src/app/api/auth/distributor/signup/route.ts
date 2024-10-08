import { NextResponse } from 'next/server';
import { distributorSignupSchema } from '@/schemas/auth/distributor.schema';
import { AuthService } from '@/services/auth.service';
import { prisma } from '@/lib/prisma';
import { ZodError } from 'zod';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = distributorSignupSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: await AuthService.hashPassword(validatedData.password), // Assuming you hash the password
        role: 'DISTRIBUTOR',
      },
    });

    // Create distributor
    const distributor = await prisma.distributor.create({
      data: {
        userId: user.id,
        shopName: validatedData.shopName,
        ownerName: validatedData.ownerName,
        businessAddress: validatedData.businessAddress,
        contactNumber: validatedData.contactNumber,
        gst: validatedData.gst,
        pan: validatedData.pan,
      },
    });

    return NextResponse.json(
      {
        message: 'Distributor created successfully. Please verify your email.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        distributor: {
          id: distributor.id,
          shopName: distributor.shopName,
          ownerName: distributor.ownerName,
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation error', details: error.errors },
        { status: 422 }
      );
    }

    // Handle Prisma unique constraint errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'This email is already registered' },
        { status: 400 }
      );
    }

    console.error('Internal server error:', error); // Log the error for debugging

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
