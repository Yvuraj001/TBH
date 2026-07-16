import { NextResponse } from "next/server";
import User from "@/schems/user.model";
import connectDB from "@/lib/connectDb";
import bcryptjs from "bcrypt";
import { setCookie } from "@/lib/setCookie";
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({
        sucess: false,
        msg: "Credentials not provided",
      });

    await connectDB();
    const isUser = await User.findOne({ email: email });

    if (isUser) {
      return NextResponse.json({
        sucess: false,
        msg: "User already exists",
      });
    }
    if (password.length < 5)
      return NextResponse.json({ sucess: false, msg: "Password too short" });
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      email: email,
      password: hashedPassword,
    });

    await user.save();
   await setCookie(user._id);

    return NextResponse.json({
      sucess: true,
      msg: "Account created sucessfully",
    });
  } catch (error) {
    console.log("error in signup", error.message)
    return NextResponse.json({
      sucess: false,
      msg: "Error occured in signup route",
       
    });
  }
}
