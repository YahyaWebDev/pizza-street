"use client";
import { useState } from "react";

export default function OrderCard({ order, onStatusChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusColors = {
    "en attente": "bg-yellow-100 text-yellow-800",
    "en préparation": "bg-blue-100 text-blue-800",
    "terminée": "bg-green-100 text-green-800",
    "annulée": "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Order #{order._id.slice(-6)}</h3>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
            {order.status}
          </span>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-emerald-600 hover:text-emerald-800"
          >
            {isExpanded ? "Hide" : "Details"}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="font-medium">Customer</h4>
            <p>{order.customer.name}</p>
            <p className="text-sm">{order.customer.phone}</p>
          </div>

          <div>
            <h4 className="font-medium">Items</h4>
            <ul className="divide-y">
              {order.items.map((item, index) => (
                <li key={index} className="py-2">
                  <div className="flex justify-between">
                    <span>{item.productName} × {item.quantity}</span>
                    <span>{item.price * item.quantity} Dh</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Delivery</h4>
            <p>{order.delivery.address}</p>
            {order.delivery.notes && (
              <p className="text-sm italic">Note: {order.delivery.notes}</p>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <select
              value={order.status}
              onChange={(e) => onStatusChange(order._id, e.target.value)}
              className="border rounded p-1 text-sm"
            >
              {Object.keys(statusColors).map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}