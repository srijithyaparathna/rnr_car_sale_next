require('dotenv').config();  // This loads the variables from .env file

import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in the .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to MongoDB");

  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Optionally throw the error or handle it as necessary
    throw error;
  }
};

export default connectMongoDB;
