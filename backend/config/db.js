import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Db connected");
    } catch(error) {
        console.error("DB Connection Error:", error.message);
        console.log("Server running without DB - using demo mode");
    }
}