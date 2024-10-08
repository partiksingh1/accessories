// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
// import { orderSchema } from '@/schemas/order.schema'

// export async function POST(req: Request) {
//   try {
//     const userId = req.headers.get('x-user-id')
//     const userRole = req.headers.get('x-user-role')

//     if (userRole !== 'SALESPERSON') {
//       return NextResponse.json(
//         { message: 'Only salespersons can create orders' },
//         { status: 403 }
//       )
//     }

//     const body = await req.json()
//     const validatedData = orderSchema.parse(body)

//     const salesperson = await prisma.salesperson.findUnique({
//       where: { userId: userId! }
//     })

//     if (!salesperson) {
//       return NextResponse.json(
//         { message: 'Salesperson not found' },
//         { status: 404 }
//       )
//     }

//     const order = await prisma.order.create({
//       data: {
//         ...validatedData,
//         salespersonId: salesperson.id
//       }
//     })

//     return NextResponse.json(order, { status: 201 })
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }

// export async function GET(req: Request) {
//   try {
//     const userId = req.headers.get('x-user-id')
//     const userRole = req.headers.get('x-user-role')
    
//     const { searchParams } = new URL(req.url)
//     const page = parseInt(searchParams.get('page') || '1')
//     const limit = parseInt(searchParams.get('limit') || '10')
//     const status = searchParams.get('status')

//     let whereClause: any = {}

//     if (userRole === 'SALESPERSON') {
//       const salesperson = await prisma.salesperson.findUnique({
//         where: { userId: userId! }
//       })
//       whereClause.salespersonId = salesperson?.id
//     } else if (userRole === 'DISTRIBUTOR') {
//       const distributor = await prisma.distributor.findUnique({
//         where: { userId: userId! }
//       })
//       whereClause.shopkeeperId = { in: distributor?.userId }
//     }

//     if (status) {
//       whereClause.status = status
//     }

//     const [orders, total] = await Promise.all([
//       prisma.order.findMany({
//         where: whereClause,
//         skip: (page - 1) * limit,
//         take: limit,
//         include: {
//           shopkeeper: true,
//           salesperson: true
//         }
//       }),
//       prisma.order.count({ where: whereClause })
//     ])

//     return NextResponse.json({
//       orders,
//       pagination: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit)
//       }
//     })
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }