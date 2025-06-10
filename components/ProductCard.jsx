"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { isSignedIn, user } = useUser();
  const { redirectToSignIn } = useClerk();
  const router = useRouter();

  const handleOrderClick = () => {
    if (!isSignedIn) {
      redirectToSignIn({ afterSignInUrl: window.location.href });
    } else {
      // Prepare order data and redirect to delivery form
      const orderData = {
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl
      };
      
      // Store temporarily in sessionStorage
      sessionStorage.setItem('currentOrder', JSON.stringify(orderData));
      
      // Redirect to delivery form
      router.push('/delivery-form');
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
          <Image 
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-3">{product.ingredients.join(', ')}</p>
        <p className="text-lg font-bold text-emerald-600 mb-3">
          {product.price} Dh
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button 
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <button 
            className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 cursor-pointer"
            onClick={handleOrderClick}
          >
            Demander
          </button>
        </div>
      </div>
    </div>
  );
}