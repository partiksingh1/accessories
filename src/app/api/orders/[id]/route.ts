// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const userId = req.headers.get('x-user-id')
//     const userRole = req.headers.get('x-user-role')

//     const order = await prisma.order.findUnique({
//       where: { id: params.id },
//       include: { salesperson: true }
//     })

//     if (!order) {
//       return NextResponse.json(
//         { message: 'Order not found' },
//         { status: 404 }
//       )
//     }

//     // Only the original salesperson or a distributor can update the order
//     if (userRole === 'SALESPERSON' && order.salesperson.userId !== userId) {
//       return NextResponse.json(
//         { message: 'You can only update your own orders' },
//         { status: 403 }
//       )
//     }

//     const body = await req.json()
//     const updatedOrder = await prisma.order.update({
//       where: { id: params.id },
//       data: {
//         ...body,
//         // If distributor is updating, update the status
//         ...(userRole === 'DISTRIBUTOR' && { status: body.status })
//       }
//     })

//     return NextResponse.json(updatedOrder)
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const userRole = req.headers.get('x-user-role')

//     if (userRole !== 'ADMIN') {
//       return NextResponse.json(
//         { message: 'Only admins can delete orders' },
//         { status: 403 }
//       )
//     }

//     await prisma.order.delete({
//       where: { id: params.id }
//     })

//     return NextResponse.json(
//       { message: 'Order deleted successfully' },
//       { status: 200 }
//     )
//   } catch (error) {
//     return NextResponse.json(
//         { message: 'Internal server error' },
//         { status: 500 }
//       )
//     }
//   }