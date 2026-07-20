import { NextResponse } from "next/server";
import crypto from "crypto";
import Orders from "@/schems/orders.model";
import User from "@/schems/user.model";
import connectDB from "@/lib/connectDb";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Razorpay from "razorpay";
import { menuItems } from "@/app/components/Menu";
 

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
})

export async function POST(req) {

  try {
    const userId = await getCurrentUser();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing payment details" },
        { status: 400 },
      );
    }

    await connectDB();

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

    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ _id: userId.userId });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const fetchPayments = await razorpay.payments.fetch(razorpay_payment_id);
    const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
    const originalCart = JSON.parse(razorpayOrder.notes.cartItems);

    if (fetchPayments.order_id !== razorpay_order_id) {
      return NextResponse.json(
        { success: false, message: "Payment does not match this order" },
        { status: 400 },
      );
    }

    const recomputed = originalCart.reduce((sum, ci) => {
      const item = menuItems.find((m) => m.id === ci.id);
      return sum + item.price * ci.quantity;
    }, 0);

    if (recomputed * 100 !== fetchPayments.amount) {
      return NextResponse.json(
        { success: false, message: "Amount mismatch" },
        { status: 400 },
      );
    }

    if (fetchPayments.status === "captured") {
      const order = await new Orders({
        user: user.email,
        order: originalCart,
        status: false,
        delivered: false,
        inStock: true,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        currency: fetchPayments.currency,
        paymentStatus: fetchPayments.status,
        amountPaid: fetchPayments.amount,
        method: fetchPayments.method,
      });
      try {
          await order.save();
          return NextResponse.json({ success: true });
      } catch (error) {
        if (error.code === 11000) {
          return NextResponse.json({ success: true, msg: "Already processed" });
        }
        console.log("error while processing order in db", error.message)
       return NextResponse.json(
         { success: false, msg: "Server error" },
         { status: 500 },
       );
      }

    
    }

    return NextResponse.json({ success: false, msg: "Payment not captured" });
  } catch (error) {
    console.log("erorr in verify route: ",  error.message)
     return NextResponse.json(
       { success: false, msg: "Server error" },
       { status: 500 },
     );
  }
}
