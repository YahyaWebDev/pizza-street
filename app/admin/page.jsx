// app/admin/orders/page.jsx
"use client";
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const statusOptions = [
  { value: 'en attente', label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'en cours', label: 'En cours', color: 'bg-blue-100 text-blue-800' },
  { value: 'livrée', label: 'Livrée', color: 'bg-green-100 text-green-800' },
  { value: 'annulée', label: 'Annulée', color: 'bg-red-100 text-red-800' },
];

export default function AdminOrdersPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !user?.publicMetadata?.isAdmin) {
      router.push('/');
    }
  }, [user, isLoaded, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders');
        if (!response.ok) throw new Error('Échec du chargement des commandes');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && user?.publicMetadata?.isAdmin) {
      fetchOrders();
    }
  }, [isLoaded, user]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Échec de la mise à jour');

      const updatedOrder = await response.json();
      setOrders(orders.map(order => 
        order._id === updatedOrder._id ? updatedOrder : order
      ));
      toast.success('Statut mis à jour');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Commandes Administrateur</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Articles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adresse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{order.customer.name}</div>
                    <div className="text-sm text-gray-500">{order.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.customer.phone}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <img 
                            src={item.imageUrl} 
                            alt={item.productName} 
                            className="w-10 h-10 rounded mr-2"
                          />
                          <div>
                            <div>{item.productName}</div>
                            <div className="text-sm text-gray-500">
                              {item.quantity} × {item.price} DH
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.total} DH
                  </td>
                  <td className="px-6 py-4">
                    {order.delivery.address}
                    {order.delivery.notes && (
                      <div className="text-sm text-gray-500 mt-1">
                        Notes: {order.delivery.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`px-2 py-1 rounded text-sm ${
                        statusOptions.find(s => s.value === order.status)?.color || 'bg-gray-100'
                      }`}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}