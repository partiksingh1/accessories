import { NextResponse } from 'next/server'
import { distributorLoginSchema } from '@/schemas/auth/distributor.schema'
import { AuthService } from '@/services/auth.service'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = distributorLoginSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email, role: 'DISTRIBUTOR' },
      include: { distributor: true }
    })

    if (!user || !user.distributor) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const isValidPassword = await AuthService.verifyPassword(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = AuthService.generateToken(user.id, user.role)

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        distributor: {
          id: user.distributor.id,
          shopName: user.distributor.shopName,
          ownerName: user.distributor.ownerName,
        }
      }
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}