import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing payment details" },
        { status: 400 },
      );
    }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature);
  const receivedBuffer = Buffer.from(razorpay_signature);

  if (expectedBuffer.length !== receivedBuffer.length) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const valid = crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

  if (valid) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 400 });
}
