import { NextRequest, NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./utils/i18nConfig";

const protectedRoutes = ["/dashboard"];

export default async function middleware(req: NextRequest) {
  const cookie = req.cookies.get("jwt_token");

  if (!cookie && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (
    cookie &&
    (req.nextUrl.pathname.includes("/login") ||
      req.nextUrl.pathname.includes("/sign-up"))
  ) {
    const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  return i18nRouter(req, i18nConfig);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
