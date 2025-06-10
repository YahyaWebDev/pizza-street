import { Product } from '@/lib/models';
import connectDB from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  try {
    await connectDB();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectDB();
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}