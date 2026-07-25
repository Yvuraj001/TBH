import { NextResponse } from "next/server";
import Orders from "@/schems/orders.model";
import connectDB from "@/lib/connectDb";
import { getCurrentAdmin } from "@/lib/getCurrentAdmin";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json(
      { sucess: false, msg: "Unauthorized" },
      { status: 401 },
    );
  }

  await connectDB();
  const count = await Orders.countDocuments({ delivered: false });

  return NextResponse.json({ sucess: true, count });
}
