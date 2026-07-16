// middleware.js
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
 
export const middleware = async (req) => {
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
};

export const config = {
  matcher: ["/orders"],
};
