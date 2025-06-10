"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-emerald-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Pizza Street Admin</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link 
              href="/admin/orders" 
              className={`block p-2 rounded ${pathname.includes('/orders') ? 'bg-emerald-700' : ''}`}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/products"
              className={`block p-2 rounded ${pathname.includes('/products') ? 'bg-emerald-700' : ''}`}
            >
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}