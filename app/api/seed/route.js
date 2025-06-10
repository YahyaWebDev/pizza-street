import { Product } from '@/lib/models';
import connectDB from '@/lib/dbConnect';

export async function GET() {
  try {
    await connectDB();
    
    const sampleProducts = [
      // Pizzas
      {
        name: "2 Fromages",
        category: "pizza",
        ingredients: ["Fromage Maasdam", "Fromage Rouge", "Mozzarella", "Sauce Tomate", "Origon"],
        price: 25,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-2-fromages.avif"
      },
      {
        name: "Dinde Fumee",
        category: "pizza",
        ingredients: ["Pomodoro", "Mozzarella", "Origon", "Dinde Fumée", "Fromage Idam"],
        price: 25,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-dinde-fumee.avif"
      },
      {
        name: "Hot-Dog + Salami",
        category: "pizza",
        ingredients: ["Pomodoro", "Mozzarella", "Origon", "Poivre", "Oignon", "Hot-Dog", "Salami", "Fromage Idam"],
        price: 25,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-hot-dog.avif"
      },
      {
        name: "Thon",
        category: "pizza",
        ingredients: ["Pomodoro", "Mozzarella", "Origon", "Poivre", "Champignion", "Thon", "Oignon", "Fromage Idam"],
        price: 28,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-thon.avif"
      },
      {
        name: "Champignion",
        category: "pizza",
        ingredients: ["Pomodoro", "Mozzarella", "Origon", "Champignion", "Maasdam", "Fromage Idam"],
        price: 28,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-champignonnn.jpg"
      },
      {
        name: "Champignion (sauce blanche)",
        category: "pizza",
        ingredients: ["Pomodoro", "Mozzarella", "Origon", "Champignion", "Maasdam", "Fromage Idam"],
        price: 30,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-champignonn.avif"
      },
      {
        name: "Vegan",
        category: "pizza",
        ingredients: ["Pomodoro", "Mozzarella", "Origon", "Olive", "Aubergine", "Légumes de saison", "Fromage Idam", "Courgette"],
        price: 30,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-vegan.avif"
      },
      {
        name: "Poulet",
        category: "pizza",
        ingredients: ["Pomodoro", "Mozzarella", "Origon", "Poivre", "Oignon", "Poulet", "Fromage Idam"],
        price: 30,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-poulet.avif"
      },
      {
        name: "Viande Hachee",
        category: "pizza",
        ingredients: ["Pomodoro", "Mozzarella", "Origon", "Poivre", "Oignon", "Viande Hachée", "Fromage Idam"],
        price: 30,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-viande-hachee.avif"
      },
      {
        name: "4 Fromages",
        category: "pizza",
        ingredients: ["Sauce Tomate", "Cheddar", "Fromage Rouge", "Fromage Bleu", "Maasdam", "Fromage Idam"],
        price: 30,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-4-fromages.avif"
      },
      {
        name: "Pepperoni",
        category: "pizza",
        ingredients: ["Pomodoro", "Mozzarella", "Origon", "Pepperoni", "Fromage Idam"],
        price: 30,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-peperoni.avif"
      },
      {
        name: "Moitie-Moitie",
        category: "pizza",
        ingredients: ["Votre Choix"],
        price: 33,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-moitie-moitie.avif"
      },
      {
        name: "Royal",
        category: "pizza",
        ingredients: ["Sauce Tomate", "Mozzarella", "Peppironi", "Hot-Dog", "Dinde Fumée", "Crevette", "Fromage Idam", "Boulette de Poulet", "Poivre", "Oignon"],
        price: 35,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-royal.avif"
      },
      {
        name: "4 Fromages (sauce blanche)",
        category: "pizza",
        ingredients: ["Sauce Tomate", "Cheddar", "Fromage Rouge", "Fromage Bleu", "Maasdam", "Fromage Idam"],
        price: 35,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-4-fromages.avif"
      },
      {
        name: "Fruits de mer",
        category: "pizza",
        ingredients: ["Pomodoro", "Mozzarella", "Champignion", "Crevette", "Fromage Idam"],
        price: 35,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-fruit-mer.avif"
      },
      {
        name: "Street",
        category: "pizza",
        ingredients: ["Pomodoro", "Mozzarella", "4 Fromages", "Dinde Fumée", "Fruits de mer", "Fromage Idam"],
        price: 35,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-street.avif"
      },
      {
        name: "Supreme",
        category: "pizza",
        ingredients: ["Sauce Tomate", "Mozzarella", "Poivre", "Oignon", "Boulette de Poulet", "Chapignion", "Maasdam", "Origon"],
        price: 35,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-supreme.avif"
      },
      {
        name: "4 Seasons",
        category: "pizza",
        ingredients: ["Sauce Tomate", "Mozzarella", "Poivre", "Oignon", "Boulette de Poulet", "Fruits de mer", "Dinde Fumée"],
        price: 35,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-4-saison.jpg"
      },
      {
        name: "6 Seasons",
        category: "pizza",
        ingredients: ["Poulet", "Viande Hachée", "Fruits de mer", "Dinde Fumée", "Hot-Dog", "Salami", "Fromage Idam", "Peppironi", "Maasdam"],
        price: 40,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-6-saison.jpg"
      },
      {
        name: "Street (sauce blanche)",
        category: "pizza",
        ingredients: ["Pomodoro", "Mozzarella", "4 Fromages", "Dinde Fumée", "Fruits de mer", "Fromage Idam"],
        price: 40,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-street.avif"
      },
      {
        name: "Venisia",
        category: "pizza",
        ingredients: ["Pomodoro", "Mozzarella", "Champignion", "4 Fromages", "Sauce Blanche", "Fromage Idam", "Peppironi"],
        price: 40,
        quantity: 10,
        imageUrl: "/images/pizzas/pizza-venezia.jpg"
      },
      
      // Sandwichs
      {
        name: "Thon Special",
        category: "sandwich",
        ingredients: ["thon", "Fromage", "Légumes"],
        price: 17,
        quantity: 15,
        imageUrl: "/images/sandwich/sandwich-thn.jpg"
      },
      {
        name: "Dinde Special",
        category: "sandwich",
        ingredients: ["dinde fumée", "Fromage", "Légumes"],
        price: 20,
        quantity: 15,
        imageUrl: "/images/sandwich/sandwich-dindee.jpg"
      },
      {
        name: "Viande Hachée",
        category: "sandwich",
        ingredients: ["viande hachée", "Fromage", "Légumes"],
        price: 23,
        quantity: 15,
        imageUrl: "/images/sandwich/sandwich-viande-hachée.jpg"
      },
      {
        name: "Mixte",
        category: "sandwich",
        ingredients: ["viande hachée", "Dinde Fumée", "Poulet", "Fromage", "Légumes"],
        price: 25,
        quantity: 15,
        imageUrl: "/images/sandwich/sandwich-mixte.jpg"
      },
      
      
      // Jus
      {
        name: "Jus d'Orange",
        category: "jus",
        ingredients: ["Orange fraîche"],
        price: 15,
        quantity: 20,
        imageUrl: "/images/jus/jus-orange.jpg"
      },
      {
        name: "Jus d'Avocat",
        category: "jus",
        ingredients: ["Avocat fraîche"],
        price: 15,
        quantity: 20,
        imageUrl: "/images/jus/jus-avocat.jpg"
      },
      {
        name: "Jus Panache",
        category: "jus",
        ingredients: ["Panache fraîche"],
        price: 16,
        quantity: 20,
        imageUrl: "/images/jus/panachee.jpg"
      },
      {
        name: "Jus d'Ananas",
        category: "jus",
        ingredients: ["Ananas fraîche"],
        price: 18,
        quantity: 20,
        imageUrl: "/images/jus/jus-ananas.jpg"
      },
      {
        name: "Jus de Mangue",
        category: "jus",
        ingredients: ["Mangue fraîche"],
        price: 18,
        quantity: 20,
        imageUrl: "/images/jus/jus-mangue.jpg"
      },
      {
        name: "Jus de Mangue et Ananas",
        category: "jus",
        ingredients: ["Mangue fraîche"],
        price: 20,
        quantity: 20,
        imageUrl: "/images/jus/jus-mangue-ananas.jpg"
      },
      {
        name: "Jus d'Avocat sec",
        category: "jus",
        ingredients: ["Avocat fraîche"],
        price: 20,
        quantity: 20,
        imageUrl: "/images/jus/avocat-sec.jpg"
      },
      // Boissons
      {
        name: "Eau Minérale",
        category: "boisson",
        ingredients: ["Eau"],
        price: 4,
        quantity: 30,
        imageUrl: "/images/boissons/eau.jpg"
      },
      {
        name: "Sode",
        category: "boisson",
        ingredients: ["Soda"],
        price: 6,
        quantity: 30,
        imageUrl: "/images/boissons/soda.jpg"
      },
      {
        name: "Oulmes Tropical",
        category: "boisson",
        ingredients: ["Oulmes"],
        price: 8,
        quantity: 30,
        imageUrl: "/images/boissons/oulmes.jpg"
      }
    ];

    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);

    return Response.json({ success: true, message: "Database seeded successfully" });

  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
  
}