import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error("Please define the MONGODB_URI");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to DB in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to DB:", error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
