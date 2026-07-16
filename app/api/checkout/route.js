import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { menuItems } from "@/app/components/Menu";
import { getCurrentUser } from "@/lib/getCurrentUser";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

export  async function POST(req) {

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { sucess: false, msg: "Unauthorized" },
      { status: 401 },
    );
  }

  const { cartItems } = await req.json();
    if(!cartItems) {
      return NextResponse.json({
        sucess: false,
        msg: "items not provided",
      });
    }
   const amount = cartItems.reduce((sum, ci) => {
     const item = menuItems.find((m) => m.id === ci.id);
    
     return sum + item.price * ci.quantity;
   }, 0);


 
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
  });
 
  return NextResponse.json(order);
}
