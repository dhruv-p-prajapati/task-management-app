import { NextResponse, type NextRequest } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';
import { doesRoleHaveAccessToURL } from '@/lib/utils';
import { UserRole } from '@/types/user.types';
import { RouteConstants } from './constants/routes.constants';

export async function middleware(request: NextRequest) {
  const token = (await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })) as (JWT & { role: UserRole }) | null;

  const pathname = request.nextUrl.pathname;

  if (!token) {
    if (
      pathname === RouteConstants.LOGIN ||
      pathname === RouteConstants.REGISTER
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(RouteConstants.LOGIN, request.nextUrl),
      );
    }
  }

  if (
    pathname === RouteConstants.LOGIN ||
    pathname === RouteConstants.REGISTER
  ) {
    return NextResponse.redirect(new URL(RouteConstants.HOME, request.nextUrl));
  }

  const roleHasAccessToUrl = doesRoleHaveAccessToURL(
    token.role as UserRole,
    pathname,
  );

  // Redirect user to 404 or access-denied page
  if (!roleHasAccessToUrl && pathname !== RouteConstants.NOT_FOUND) {
    return NextResponse.redirect(
      new URL(RouteConstants.NOT_FOUND, request.nextUrl),
    );
  }
  // if (!roleHasAccessToUrl && pathname !== RouteConstants.ACCESS_DENIED) {
  //   return NextResponse.redirect(
  //     new URL(RouteConstants.ACCESS_DENIED, request.nextUrl),
  //   );
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
