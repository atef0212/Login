import mongoose from 'mongoose';
import './config.js'
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.UEI, {
          serverSelectionTimeoutMS: 5000,
        });
    
        console.log("Database connected successfully");
      } catch (error) {
        console.error("Database connection error:", error);
      }
}

export default connectToDatabase;
