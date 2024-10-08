import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { shopkeeperSchema } from '@/schemas/shopkeeperSchema'

export async function POST(req: Request) {
  try {
    const userId = req.headers.get('x-user-id')
    const userRole = req.headers.get('x-user-role')

    if (userRole !== 'SALESPERSON') {
      return NextResponse.json(
        { message: 'Only salespersons can create shopkeepers' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = shopkeeperSchema.parse(body)

    const salesperson = await prisma.salesperson.findUnique({
      where: { userId: userId! }
    })

    if (!salesperson) {
      return NextResponse.json(
        { message: 'Salesperson not found' },
        { status: 404 }
      )
    }

    const shopkeeper = await prisma.shopkeeper.create({
      data: {
        ...validatedData,
        salespersonId: salesperson.id
      }
    })

    return NextResponse.json(shopkeeper, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const userId = req.headers.get('x-user-id')
    const userRole = req.headers.get('x-user-role')
    
    const { searchParams } = new URL(req.url)

    let whereClause: any = {}

    if (userRole === 'SALESPERSON') {
      const salesperson = await prisma.salesperson.findUnique({
        where: { userId: userId! }
      })
      whereClause.salespersonId = salesperson?.id
    }

    const [shopkeepers, total] = await Promise.all([
      prisma.shopkeeper.findMany({
        where: whereClause,
        include: {
          salesperson: true
        }
      }),
      prisma.shopkeeper.count({ where: whereClause })
    ])

    return NextResponse.json({
      shopkeepers,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}