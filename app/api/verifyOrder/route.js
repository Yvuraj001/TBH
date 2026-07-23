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
        { success: false, msg: "Unauthorized" },
        { status: 401 },
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, msg: "Missing payment details" },
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
      return NextResponse.json({ success: false, msg: "Buffer timeout" }, { status: 400 });
    }

    const valid = crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

    if (!valid) {
      return NextResponse.json(
        { success: false, msg: "Invalid payment signature" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ _id: userId.userId });
    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User not found" },
        { status: 404 },
      );
    }

    const fetchPayments = await razorpay.payments.fetch(razorpay_payment_id);
    const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
    const originalCart = JSON.parse(razorpayOrder.notes.cartItems);
    const orderType = razorpayOrder.notes.orderType;

    if (!["dine-in", "takeaway"].includes(orderType)) {
      return NextResponse.json(
        { success: false, msg: "Order type is missing or invalid" },
        { status: 400 },
      );
    }

    if (fetchPayments.order_id !== razorpay_order_id) {
      return NextResponse.json(
        { success: false, msg: "Payment does not match this order" },
        { status: 400 },
      );
    }

    const recomputed = originalCart.reduce((sum, ci) => {
      const item = menuItems.find((m) => m.id === ci.id);
      return sum + item.price * ci.quantity;
    }, 0);

    if (recomputed * 100 !== fetchPayments.amount) {
      return NextResponse.json(
        { success: false, msg: "Amount mismatch" },
        { status: 400 },
      );
    }

    if (fetchPayments.status === "captured") {
      const pendingOrders = await Orders.find({
        user: user.email,
        delivered: false,
      }).sort({ orderPlaced: -1 });
      const existingCode = pendingOrders.find(
        (pendingOrder) => pendingOrder.orderVerificationCode,
      )?.orderVerificationCode;
      const orderVerificationCode = existingCode || crypto.randomInt(100000, 1000000).toString();

      if (pendingOrders.length) {
        await Orders.updateMany(
          { user: user.email, delivered: false },
          { $set: { orderVerificationCode } },
        );
      }

      const order = await new Orders({
        user: user.email,
        order: originalCart,
        orderType,
        status: false,
        delivered: false,
        inStock: true,
        orderVerificationCode,
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
          return NextResponse.json({ success: true, msg: "Order already processed" });
        }
        console.log("error while processing order in db", error.message)
       return NextResponse.json(
         { success: false, msg: "Error while processing order" },
         { status: 500 },
       );
      }

    
    }

    return NextResponse.json({ success: false, msg: "Payment not captured" });
  } catch (error) {
    console.log("erorr in verify route: ",  error.message)
     return NextResponse.json(
       { success: false, msg: "Error while verfiying order" },
       { status: 500 },
     );
  }
}
