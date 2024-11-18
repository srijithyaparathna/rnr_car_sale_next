import connectMongoDB from "../../../libs/mongodb"; // Ensure the import path is correct
import mongoose from "mongoose"; // Ensure mongoose is imported
import VehicleSubType from "../../../models/vehicleSubType"; // Correct import path
import { NextResponse } from "next/server";
import VehicleMainType from "../../../models/vehicleMainType"; 

// POST request to create a new VehicleSubType
export async function POST(request) {
  try {
    const { name, mainTypeId } = await request.json();
    
    if (!name || !mainTypeId) {
      return NextResponse.json({ message: "Name and mainTypeId are required" }, { status: 400 });
    }

    await connectMongoDB(); // Ensure connection to the database

    // Ensure the mainTypeId is valid and exists in the VehicleMainType collection
    if (!mongoose.Types.ObjectId.isValid(mainTypeId)) {
      return NextResponse.json({ message: "Invalid mainTypeId format" }, { status: 400 });
    }

    // Check if the provided mainTypeId exists in the VehicleMainType collection
    const mainTypeExists = await VehicleMainType.exists({ _id: mainTypeId });
    if (!mainTypeExists) {
      return NextResponse.json({ message: "VehicleMainType not found" }, { status: 404 });
    }

    // Create the VehicleSubType with the provided mainTypeId
    const vehicleSubType = await VehicleSubType.create({
      name,
      mainTypeId,
    });

    return NextResponse.json({ message: "VehicleSubType Created", vehicleSubType }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}

// GET request to fetch all VehicleSubTypes
export async function GET() {
  try {
    await connectMongoDB(); // Connect to MongoDB
    const vehicleSubTypes = await VehicleSubType.find().populate("mainTypeId"); // Correctly reference mainTypeId
    return NextResponse.json({ vehicleSubTypes });
  } catch (error) {
    console.error("Error in GET request:", error); // Log the error
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid or missing ID" }, { status: 400 });
    }

    await connectMongoDB();

    const vehicleSubType = await VehicleSubType.findByIdAndDelete(id);

    if (!vehicleSubType) {
      return NextResponse.json({ message: "VehicleSubType not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "VehicleSubType deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE request:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
