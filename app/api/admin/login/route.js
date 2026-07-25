import { NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/setAdminCookie";
import Admin from "@/schems/admin.model";
import connectDB from "@/lib/connectDb";
import bcryptjs from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({
        sucess: false,
        msg: "Credentials not provided",
      });

    await connectDB();

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return NextResponse.json({
        sucess: false,
        msg: "Admin not found",
      });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({
        sucess: false,
        msg: "Invalid credentials",
      });
    }

    await setAdminCookie(admin._id);

    return NextResponse.json({
      sucess: true,
      msg: "login sucessful",
    });
  } catch (error) {
    console.log("error in admin login", error);
    return NextResponse.json({
      sucess: false,
      msg: "Error occured in admin login route",
    });
  }
}
