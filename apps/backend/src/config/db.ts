import "dotenv/config";
import mongoose from "mongoose";
import logger from "../logger.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info("DB connected");
  } catch (err) {
    logger.error({ err }, "MongoDB connection error:");
    process.exit(1);
  }
};
