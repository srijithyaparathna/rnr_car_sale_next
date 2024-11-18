// /models/vehicleMainType.js

import mongoose from "mongoose";

// Define the schema for VehicleMainType
const VehicleMainTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name is required
    imageUrls: { type: String }, // Array of image URLs, optional
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model, creating it if it doesn't already exist
export default mongoose.models.VehicleMainType || mongoose.model("VehicleMainType", VehicleMainTypeSchema);
