import { NextResponse } from 'next/server';
import { salesPersonSignupSchema } from '@/schemas/auth/salesperson.schema';
import { AuthService } from '@/services/auth.service';
import { prisma } from '@/lib/prisma';
import { ZodError } from 'zod';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = salesPersonSignupSchema.parse(body);

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

    // Check if employee code is unique
    const existingSalesperson = await prisma.salesperson.findUnique({
      where: { employeeCode: validatedData.employeeCode }
    });

    if (existingSalesperson) {
      return NextResponse.json(
        { message: 'Employee code already exists' },
        { status: 400 }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: await AuthService.hashPassword(validatedData.password), // Assuming you hash the password
        role: 'SALESPERSON',
      },
    });

    // Create salesperson
    const salesperson = await prisma.salesperson.create({
      data: {
        userId: user.id,
        employeeCode: validatedData.employeeCode,
        phoneNumber: validatedData.phoneNumber,
        city: validatedData.city,
      },
    });

    return NextResponse.json(
      {
        message: 'Salesperson created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
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
        { message: 'This email is already registered or employee code is already in use' },
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
