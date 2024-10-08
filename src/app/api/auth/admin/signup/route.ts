import { NextResponse } from 'next/server'
import { adminSignupSchema } from '@/schemas/auth/admin.schema'
import { AuthService } from '@/services/auth.service'
// import { EmailService } from '@/services/email.service'
import { prisma } from '@/lib/prisma'
import { ZodError } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = adminSignupSchema.parse(body)

    // Verify admin code
    if (validatedData.adminCode !== process.env.ADMIN_SECRET_CODE) {
      return NextResponse.json(
        { message: 'Invalid admin code' },
        { status: 403 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await AuthService.hashPassword(validatedData.password)

    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: 'ADMIN',
      }
    })

    // Generate verification token and send email
    // const verificationToken = AuthService.generateToken(user.id, user.role)
    // await EmailService.sendVerificationEmail(user.email, verificationToken)

    return NextResponse.json(
      {
        message: 'Admin created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
      { status: 201 }
    )
  } catch (error: any) {
    // Handle different error types
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation error', details: error.errors },
        { status: 422 }
      )
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'This email is already registered' },
        { status: 400 }
      )
    }

    console.error('Internal server error:', error) // Log the error for debugging

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
