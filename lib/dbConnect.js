// lib/dbConnect.js
import mongoose from 'mongoose';

const connection = {};

export default async function connectDB() {
  if (connection.isConnected) return;
  
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error; 
  }
}