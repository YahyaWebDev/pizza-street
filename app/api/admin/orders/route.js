import { Order } from "@/lib/models";
import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { status } = await request.json();
  
  await connectDB();
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}