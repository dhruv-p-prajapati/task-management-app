import { NextResponse, type NextRequest } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';
import { doesRoleHaveAccessToURL } from '@/lib/utils';
import { UserRole } from '@/types/user.types';
import { EndPoints } from './types/endpoints.types';

export async function middleware(request: NextRequest) {
  const token = (await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })) as (JWT & { role: UserRole }) | null;

  const pathname = request.nextUrl.pathname;

  if (!token) {
    if (
      pathname === '/' + EndPoints.LOGIN ||
      pathname === '/' + EndPoints.REGISTER
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
  }

  if (
    pathname === '/' + EndPoints.LOGIN ||
    pathname === '/' + EndPoints.REGISTER
  ) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  const roleHasAccessToUrl = doesRoleHaveAccessToURL(
    token.role as UserRole,
    pathname,
  );

  // Redirect user to 404 or access-denied page
  if (!roleHasAccessToUrl && pathname !== '/404') {
    return NextResponse.redirect(new URL('/404', request.nextUrl));
  }
  // if (!roleHasAccessToUrl && pathname !== '/access-denied') {
  //   return NextResponse.redirect(new URL('/access-denied', request.nextUrl));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
