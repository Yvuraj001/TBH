import connectDB from "@/lib/connectDb";
import KitchenStatus from "@/schems/Kitchenstatus.model";

export const getKitchenStatus = async () => {
  await connectDB();
  let status = await KitchenStatus.findOne();
  if (!status) {
    status = await KitchenStatus.create({ isOpen: true });
  }
  return status.isOpen;
};
