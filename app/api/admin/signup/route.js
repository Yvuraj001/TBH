import { NextResponse } from "next/server";
import Admin from "@/schems/admin.model";
import connectDB from "@/lib/connectDb";
import bcryptjs from "bcrypt";

// Protected by ADMIN_SECRET_KEY (set it in .env). Send it as "secret" in body.
// Use once to create your first admin, then you can remove this route.
export async function POST(req) {
  try {
    const { email, password, name, secret } = await req.json();

    if (secret !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ sucess: false, msg: "Unauthorized" });
    }

    if (!email || !password)
      return NextResponse.json({
        sucess: false,
        msg: "Credentials not provided",
      });

    await connectDB();
    const isAdmin = await Admin.findOne({ email: email.toLowerCase() });

    if (isAdmin) {
      return NextResponse.json({ sucess: false, msg: "Admin already exists" });
    }

    if (password.length < 5)
      return NextResponse.json({ sucess: false, msg: "Password too short" });

    const hashedPassword = await bcryptjs.hash(password, 10);

    const admin = new Admin({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
    });

    await admin.save();

    return NextResponse.json({
      sucess: true,
      msg: "Admin created sucessfully",
    });
  } catch (error) {
    console.log("error in admin signup", error.message);
    return NextResponse.json({
      sucess: false,
      msg: "Error occured in admin signup route",
    });
  }
}
