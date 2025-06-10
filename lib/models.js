import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['pizza', 'sandwich', 'jus', 'boisson'] 
  },
  description: { type: String },
  ingredients: { type: [String], required: true },
  price: { type: Number, required: true },  // Direct price field
  quantity: { type: Number, default: 0 },   // Direct quantity field
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
  customer: {
    id: { type: String, required: true },        // Clerk user ID
    name: { type: String, required: true },      // User's full name
    email: { type: String, required: true },     // User's email
    phone: { type: String, required: true }      // From delivery form
  },
  items: [{
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product',
      required: true 
    },
    productName: { type: String, required: true }, // Cached product name
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },      // Price at time of order
    imageUrl: { type: String }                    // Cached product image
  }],
  delivery: {
    address: { type: String, required: true },   // From delivery form
    notes: { type: String }                      // Optional notes
  },
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['en attente', 'en préparation', 'terminée', 'annulée'],
    default: 'en attente'
  },
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);