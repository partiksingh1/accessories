import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { shopkeeperSchema, ShopkeeperSchemaData } from '@/schemas/shopkeeperSchema';

export async function POST(req: Request) {
  try {
    const userId = req.headers.get('x-user-id');
    const userRole = req.headers.get('x-user-role');

    if (userRole !== 'SALESPERSON') {
      return NextResponse.json(
        { message: 'Only salespersons can create shopkeepers' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validatedData = shopkeeperSchema.parse(body);

    const salesperson = await prisma.salesperson.findUnique({
      where: { userId: userId! }
    });

    if (!salesperson) {
      return NextResponse.json(
        { message: 'Salesperson not found' },
        { status: 404 }
      );
    }

    const shopkeeperData = {
      ...validatedData,
      salespersonId: salesperson.id,
      gst: validatedData.gst ?? null, // Setting to null if not provided
      pan: validatedData.pan ?? null, // Setting to null if not provided
    };

    const shopkeeper = await prisma.shopkeeper.create({
      data: shopkeeperData,
    });


    return NextResponse.json(shopkeeper, { status: 201 });
  } catch (error) {
    console.error('Error creating shopkeeper:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
