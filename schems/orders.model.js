import mongoose from "mongoose";
const orderSchems = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  order: {
    type: Array,
    required: true,
  },
  orderType: {
    type: String,
    enum: ["dine-in", "takeaway"],
    required: true,
  },

  orderPlaced: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: Boolean,
    default: false,
  },

  inStock: {
    type: Boolean,
    default: true,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  orderVerificationCode: {
    type: String,
    match: /^\d{6}$/,
  },
  razorpayOrderId: {
    type: String,
    unique: true,
    required: true,
  },
  razorpayPaymentId: {
    type: String,
    required: true,
    unique: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  method: String,
});

const Orders =
  mongoose.models.Orders || mongoose.model("Orders", orderSchems);
export default Orders;
