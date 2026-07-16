import { NextResponse } from "next/server";
import { setCookie } from "@/lib/setCookie";
import User from "@/schems/user.model";
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

    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({
        sucess: false,
        msg: "User not found",
      });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({
        sucess: false,
        msg: "Invalid credentials",
      });
    }

   await setCookie(user._id);

    return NextResponse.json({
      sucess: true,
      msg: "login sucessful",
    });
  } catch (error) {
    console.log("error in login", error)
    return NextResponse.json({
      sucess: false,
      msg: "Error occured in login route",
      
    });
  }
}
