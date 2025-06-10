import ProductCard from "../../components/ProductCard";
import { Product } from '@/lib/models';
import connectDB from '@/lib/dbConnect';

async function getBoissons() {
  await connectDB();
  const boissons = await Product.find({ category: 'boisson' });
  return JSON.parse(JSON.stringify(boissons));
}

export default async function BoissonsCategory() {
  const boissons = await getBoissons();

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Nos Boissons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boissons.map((boisson) => (
          <ProductCard key={boisson._id} product={boisson} />
        ))}
      </div>
    </main>
  );
}