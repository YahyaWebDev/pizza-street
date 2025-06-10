"use client";
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function DeliveryForm() {
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [orderDetails, setOrderDetails] = useState(null);
  const { user } = useUser();
  const router = useRouter();

  // Moroccan phone number regex validation
  const validatePhone = (phone) => {
    const regex = /^(?:(?:\+|00)212|0)[5-7]\d{8}$/;
    return regex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (name === 'phone' && errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };
  useEffect(() => {
    // Retrieve order data from sessionStorage
    const storedOrder = sessionStorage.getItem('currentOrder');
    if (!storedOrder) {
      router.push('/'); // Redirect if no order data
      return;
    }
    setOrderDetails(JSON.parse(storedOrder));
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
     // Validate phone number
    if (!validatePhone(formData.phone)) {
      setErrors({ phone: 'Numéro de téléphone marocain invalide (ex: 0612345678)' });
      return;
    }
  const completeOrder = {
    customer: {
      id: user.id,
      name: user.fullName,
      email: user.primaryEmailAddress.emailAddress,
      phone: formData.phone
    },
    items: [{
      productId: orderDetails.productId,
      productName: orderDetails.productName,
      quantity: orderDetails.quantity,
      price: orderDetails.price,
      imageUrl: orderDetails.imageUrl
    }],
    delivery: {
      address: formData.address,
      notes: formData.notes
    },
    total: orderDetails.price * orderDetails.quantity
  };

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(completeOrder)
    });

    if (response.ok) {
      router.push('/order-confirmation');
    }
  } catch (error) {
    console.error('Order submission failed:', error);
  }
};
  if (!orderDetails) return <div>Loading...</div>;

   return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Informations de Livraison</h2>
      
      {/* Order Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Votre Commande</h3>
        <p>{orderDetails?.productName} × {orderDetails?.quantity}</p>
        <p className="font-bold mt-2">
          Total: {(orderDetails?.price * orderDetails?.quantity || 0).toFixed(2)} Dh
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Address Field */}
        <div className="mb-4">
          <label className="block mb-2">Adresse de Livraison *</label>
          <textarea
            name="address"
            className="w-full p-2 border rounded"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <span className='text-gray-500'>**Nous faisons les livraison pour les clients habitants à Safi-Maroc</span>
        </div>
        
        {/* Phone Field with Validation */}
        <div className="mb-4">
          <label className="block mb-2">Téléphone *</label>
          <input
            type="tel"
            name="phone"
            className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="06 12 34 56 78"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Format: 05/06/07xxxxxxxx (10 chiffres)
          </p>
        </div>
        
        {/* Notes Field */}
        <div className="mb-6">
          <label className="block mb-2">Notes (optionnel)</label>
          <textarea
            name="notes"
            className="w-full p-2 border rounded"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
        >
          Confirmer la Commande
        </button>
      </form>
    </div>
  );
}