

import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req) {
  const { pathname } = req.nextUrl;

 
  if (pathname.startsWith("/orders")) {
    const cookie = req.cookies.get("lttob")?.value;
    let isValid = false;

    if (cookie) {
      try {
        await jwtVerify(cookie, secret);
        isValid = true;
      } catch (error) {
        console.log("JWT verify failed:", error.message);
      }
    }

    if (!isValid) {
      return NextResponse.redirect(new URL("/login?utm=orders", req.url));
    }
    return NextResponse.next();
  }

  // /admin protection ("admtok" admin cookie)
  if (pathname.startsWith("/admin")) {
    const cookie = req.cookies.get("admtok")?.value;
    let isValidAdmin = false;

    if (cookie) {
      try {
        const { payload } = await jwtVerify(cookie, secret);
        if (payload.role === "admin") isValidAdmin = true;
      } catch (error) {
        console.log("Admin JWT verify failed:", error.message);
      }
    }

    if (!isValidAdmin) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: ["/orders", "/admin/((?!login|signup).*)"],
};