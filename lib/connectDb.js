import mongoose from "mongoose";

const connectDB = async () => {
  try {
 await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected");
  } catch (error) {
    console.log("Error while connecting DB: ", error.message);
    process.exit(1);
  }
};

export default connectDB;
