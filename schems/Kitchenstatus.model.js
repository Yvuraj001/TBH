import mongoose from "mongoose";

const kitchenStatusSchema = new mongoose.Schema(
  {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const KitchenStatus =
  mongoose.models.KitchenStatus ||
  mongoose.model("KitchenStatus", kitchenStatusSchema);

export default KitchenStatus;
