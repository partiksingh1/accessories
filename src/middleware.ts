import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export function middleware(request: NextRequest) {
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json(
      { message: 'Authentication required' },
      { status: 401 }
    );
  }

  try {
    const decoded = jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', (decoded as any).userId);
    requestHeaders.set('x-user-role', (decoded as any).role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Token verification error:', error); // Log the error for debugging
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ['/api/orders/:path*', '/api/users/:path*'],
};
