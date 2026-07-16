import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

  const cookieStore = await cookies();
  const token = cookieStore.get("lttob")?.value;
  if (!token) return NextResponse.json({ sucess: false, user: "Loged out" });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ sucess: true, msg: "loged in" });
  } catch(error) {
    console.log("issue in auto login:",error.message);
    return NextResponse.json({
      sucess: false,
      user: "Issue in verify myself ",
    });
  }
};
