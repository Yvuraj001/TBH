import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose;
    }

    if (!globalThis.__tbhMongoConnectionPromise) {
      globalThis.__tbhMongoConnectionPromise = mongoose.connect(
        process.env.MONGODB_URI,
      );
    }

    await globalThis.__tbhMongoConnectionPromise;
    console.log("Mongodb connected");
  } catch (error) {
    console.log("Error while connecting DB: ", error.message);
    process.exit(1);
  }
};

export default connectDB;
