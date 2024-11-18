import connectMongoDB from "../../../libs/mongodb"; // Ensure the import path is correct
import VehicalMainType from "../../../models/vehicleMainType";
import { NextResponse } from "next/server";

// POST request to create a new VehicalMainType
export async function POST(request) {
  const { name } = await request.json();
  await connectMongoDB();
  await VehicalMainType.create({ name });
  return NextResponse.json({ message: "VehicalMainType Created" }, { status: 201 });
}

// GET request to fetch all VehicalMainTypes
export async function GET() {
  await connectMongoDB();
  const mainTypes = await VehicalMainType.find(); // Update response data name
  return NextResponse.json({ mainTypes }); // Ensure response data matches frontend expectation
}

// DELETE request to delete a VehicalMainType by ID
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await VehicalMainType.findByIdAndDelete(id);
  return NextResponse.json({ message: "VehicalMainType deleted" }, { status: 200 });
}
