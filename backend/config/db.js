import mongoose from 'mongoose';
export const connectDb = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://nitin:nitin007@cluster0.hbuugmo.mongodb.net/QuizApp');
        console.log("Db connected");
    } catch(error) {
        console.error("DB Connection Error:", error.message);
        console.log("Server running without DB - using demo mode");
    }
}