import ProductCard from "../../components/ProductCard";
import { Product } from '@/lib/models';
import connectDB from '@/lib/dbConnect';

async function getJus() {
  await connectDB();
  const jus = await Product.find({ category: 'jus' });
  return JSON.parse(JSON.stringify(jus));
}

export default async function JusCategory() {
  const jus = await getJus();

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Nos Jus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jus.map((juice) => (
          <ProductCard key={juice._id} product={juice} />
        ))}
      </div>
    </main>
  );
}