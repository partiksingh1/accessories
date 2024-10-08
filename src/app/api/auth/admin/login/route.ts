import { NextResponse } from 'next/server';
import { adminLoginSchema } from '@/schemas/auth/admin.schema';
import { AuthService } from '@/services/auth.service';
import { prisma } from '@/lib/prisma';
import { ZodError } from 'zod'; // Assuming you are using Zod for validation

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = adminLoginSchema.parse(body);

    // Attempt to find the user by email and role
    const user = await prisma.user.findUnique({
      where: { email, role: 'ADMIN' }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify the password
    const isValidPassword = await AuthService.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    

    // Generate a token for the user
    const token = AuthService.generateToken(user.id, user.role);

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, { status: 200 });
    
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation error', details: error.errors },
        { status: 422 }
      );
    }

    console.error('Internal server error:', error); // Log the error for debugging

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
