// pages/api/vehicleSubType/[id].js
import connectMongoDB from "../../../../libs/mongodb"; // Ensure the import path is correct
import VehicleSubType from "../../../../models/vehicleSubType"; // Update to VehicleSubType model
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// PUT request to update VehicleSubType by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params; // Get the ID from params

    // Destructure request body data
    const { name, mainTypeId } = await request.json(); // Ensure the request body is parsed correctly

    // Ensure the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    
    // Ensure the mainTypeId is a valid MongoDB ObjectId (only validate if it exists)
    if (mainTypeId && !mongoose.Types.ObjectId.isValid(mainTypeId)) {
      return NextResponse.json({ message: "Invalid mainTypeId format" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Update the VehicleSubType using the 'id' and return the updated document
    const updatedVehicleSubType = await VehicleSubType.findByIdAndUpdate(
      id,
      { name, mainTypeId },
      { new: true } // Return the updated document
    );

    // If no document is found to update
    if (!updatedVehicleSubType) {
      return NextResponse.json({ message: "VehicleSubType not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "VehicleSubType updated", vehicleSubType: updatedVehicleSubType },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT request:", error); // Enhanced error logging
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}

// GET request to fetch a VehicleSubType by ID
export async function GET(request, { params }) {
  try {
    const { id } = params; // Get the ID from params

    // Ensure the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectMongoDB(); // Connect to MongoDB

    // Find the VehicleSubType by its ID and populate the mainTypeId field
    const vehicleSubType = await VehicleSubType.findById(id).populate("mainTypeId");

    // If no document is found
    if (!vehicleSubType) {
      return NextResponse.json({ message: "VehicleSubType not found" }, { status: 404 });
    }

    return NextResponse.json({ vehicleSubType }, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error); // Enhanced error logging
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}

// DELETE request to delete a VehicleSubType by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;  // Extract ID from dynamic route params
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid or missing ID" }, { status: 400 });
    }

    await connectMongoDB();  // Connect to MongoDB

    // Delete the VehicleSubType by its ID
    const vehicleSubType = await VehicleSubType.findByIdAndDelete(id);
    if (!vehicleSubType) {
      return NextResponse.json({ message: "VehicleSubType not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "VehicleSubType deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE request:", error); // Enhanced error logging
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
