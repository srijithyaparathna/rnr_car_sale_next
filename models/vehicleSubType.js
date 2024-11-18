import mongoose from "mongoose";

const VehicleSubTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mainTypeId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "VehicleMainType", // Correct the ref to the actual model name
      required: true 
    },
  },
  { timestamps: true }
);

// Check if the model already exists, otherwise create a new one
export default mongoose.models.VehicleSubType || mongoose.model("VehicleSubType", VehicleSubTypeSchema);
