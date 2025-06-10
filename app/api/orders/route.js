import { Order } from '@/lib/models';
import connectDB from '@/lib/dbConnect';
import { NextResponse } from 'next/server';



export async function POST(request) {
  await connectDB();
  
  try {
    // First parse the request body
    const data = await request.json();
    
    // Validate required fields exist
    if (!data?.customer?.phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Server-side phone validation
    const moroccanPhoneRegex = /^(?:(?:\+|00)212|0)[5-7]\d{8}$/;
    if (!moroccanPhoneRegex.test(data.customer.phone)) {
      return NextResponse.json(
        { error: 'Numéro de téléphone invalide' },
        { status: 400 }
      );
    }

    // Create the order
    const newOrder = await Order.create(data);
    
    return NextResponse.json(newOrder, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}