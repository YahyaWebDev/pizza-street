import ProductCard from "../../components/ProductCard";
import { Product } from '@/lib/models';
import connectDB from '@/lib/dbConnect';

async function getSandwichs() {
  await connectDB();
  const sandwichs = await Product.find({ category: 'sandwich' });
  return JSON.parse(JSON.stringify(sandwichs));
}

export default async function SandwichCategory() {
  const sandwichs = await getSandwichs();

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Nos Sandwichs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sandwichs.map((sandwich) => (
          <ProductCard key={sandwich._id} product={sandwich} />
        ))}
      </div>
    </main>
  );
}