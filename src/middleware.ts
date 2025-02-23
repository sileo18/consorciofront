import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  {path: '/signin', whenAuth: 'redirect'},
  {path: '/register', whenAuth: 'redirect'},
  {path: '/planos', whenAuth: 'next'},
] as const;

const REDIRECT_WHEN_NOT_AUTH_ROUTE = "/signin";

export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find(route => route.path === path);
    const authToken = request.cookies.get('authToken');

    if(!authToken && publicRoute) {
      return NextResponse.next();
    }

    
    if(!authToken && !publicRoute) {

      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTH_ROUTE;

      return NextResponse.redirect(redirectUrl);
    }

    if(authToken && publicRoute && publicRoute.whenAuth === 'redirect') {

      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/dashboard';

      return NextResponse.redirect(redirectUrl);
    }

    if(authToken && !publicRoute) {

      //Checar se o JWT está expirado
      //Se sim remove o cookie e manda pro login

      return NextResponse.next();
    }

    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }
