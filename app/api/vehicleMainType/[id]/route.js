// pages/api/vehicalMainType/[id].js
import connectMongoDB from "../../../../libs/mongodb"; 
import VehicalMainType from "../../../../models/vehicleMainType"; 
import mongoose from "mongoose"; 
import { NextResponse } from "next/server";

// PUT request to update VehicalMainType by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params; // Get the ID from params directly (no await needed here in API route)

    // Destructure request body data
    const { name } = await request.json();  // Ensure the request body is parsed correctly

    // Ensure the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Update the VehicalMainType using the 'id' and return the updated document
    const updatedVehicalMainType = await VehicalMainType.findByIdAndUpdate(
      id,
      { name },
      { new: true } // Return the updated document
    );

    // If no document is found to update
    if (!updatedVehicalMainType) {
      return NextResponse.json({ message: "VehicalMainType not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "VehicalMainType updated", vehicalMainType: updatedVehicalMainType },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// GET request to fetch a VehicalMainType by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;  // Get the ID from params

    // Ensure the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectMongoDB();

    // Find the VehicalMainType by its ID
    const vehicalMainType = await VehicalMainType.findById(id);  // Using findById for clarity

    // If no document is found
    if (!vehicalMainType) {
      return NextResponse.json({ message: "VehicalMainType not found" }, { status: 404 });
    }

    return NextResponse.json({ vehicalMainType }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
