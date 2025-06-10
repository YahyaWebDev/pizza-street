"use client";
import { useEffect, useState } from "react";
import OrderCard from "./_components/OrderCard";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Orders</h2>
      <div className="grid gap-4">
        {orders.length > 0 ? (
          orders.map(order => (
            <OrderCard 
              key={order._id} 
              order={order} 
              onStatusChange={updateOrderStatus} 
            />
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
}