import { isAuthenticated } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];

export default function middleware(req: NextRequest) {
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
