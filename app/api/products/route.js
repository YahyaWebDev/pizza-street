import { Product } from '@/lib/models';
import connectDB from '@/lib/dbConnect';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return Response.json(products);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}