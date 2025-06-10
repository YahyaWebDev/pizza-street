// app/pizzaCategory/page.jsx
import ProductCard from "@/components/ProductCard";
import { Product } from '@/lib/models';
import connectDB from '@/lib/dbConnect';

async function getPizzas() {
  try {
    await connectDB();
    const pizzas = await Product.find({ category: 'pizza' }).lean();
    console.log("Fetched pizzas:", pizzas); 
    return JSON.parse(JSON.stringify(pizzas));
  } catch (error) {
    console.error("Error fetching pizzas:", error);
    return [];
  }
}
console.log(Product.price)
export default async function PizzaCategory() {
  const pizzas = await getPizzas();
  
  if (pizzas.length === 0) {
    return (
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Nos Pizzas</h1>
        <p className="text-center">Aucune pizza disponible pour le moment</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Nos Pizzas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzas.map((pizza) => (
          <ProductCard key={pizza._id} product={pizza} />
        ))}
      </div>
    </main>
  );
}