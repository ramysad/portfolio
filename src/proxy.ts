import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ar", "fr"];
const defaultLocale = "en";

// Changed: Renamed the exported function from 'middleware' to 'proxy'
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|images|favicon.ico).*)"],
};
