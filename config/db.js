import mongoose from "mongoose";
import "dotenv/config"

async function connectDB() {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_CONNECTION_URL}`)
        console.log('Database Connected');
        
    } catch (error) {
        console.log("Database connection failed.")
    }
}


export default connectDB