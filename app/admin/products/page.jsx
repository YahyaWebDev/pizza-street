'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

const ProductManagementPage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Check if user is admin
  useEffect(() => {
    if (isLoaded && !user?.publicMetadata?.isAdmin) {
      router.push('/');
      toast.error('Unauthorized access');
    }
  }, [user, isLoaded, router]);

  // Handle delete product
  const handleDelete = async (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) throw new Error('Failed to delete product');
        
        setProducts(products.filter(product => product._id !== productId));
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Handle edit product - FIXED
  const handleEdit = (product) => {
    // Create a deep copy of the product to edit
    const productToEdit = JSON.parse(JSON.stringify(product));
    setEditingProduct(productToEdit);
  };

  // Handle save edited product - FIXED
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProduct),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update product');
      }
      
      const updatedProduct = await response.json();
      setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
      setEditingProduct(null);
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle input change for editing - FIXED
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    }));
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Management</h1>
      
      {editingProduct && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Edit Product: {editingProduct.name}</h2>
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingProduct.name || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={editingProduct.category || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="pizza">Pizza</option>
                  <option value="sandwich">Sandwich</option>
                  <option value="jus">Jus</option>
                  <option value="boisson">Boisson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (DH)</label>
                <input
                  type="number"
                  name="price"
                  value={editingProduct.price || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={editingProduct.quantity || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                  min="0"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (comma separated)</label>
                <input
                  type="text"
                  name="ingredients"
                  value={Array.isArray(editingProduct.ingredients) ? 
                    editingProduct.ingredients.join(', ') : 
                    editingProduct.ingredients || ''}
                  onChange={(e) => {
                    const ingredients = e.target.value.split(',').map(item => item.trim());
                    setEditingProduct(prev => ({...prev, ingredients}));
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={editingProduct.imageUrl || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
                {editingProduct.imageUrl && (
                  <div className="mt-2 w-32 h-32 relative">
                    <Image
                      src={editingProduct.imageUrl}
                      alt={editingProduct.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Ingredients</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </td>
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4 capitalize">{product.category}</td>
                <td className="py-3 px-4">{product.price} DH</td>
                <td className="py-3 px-4">{product.quantity}</td>
                <td className="py-3 px-4 max-w-xs truncate">
                  {Array.isArray(product.ingredients) ? product.ingredients.join(', ') : product.ingredients}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagementPage;