import mongoose from "mongoose";

export const connectDB = async (mongoURL) => {
    try {
        const conn = await mongoose.connect(mongoURL);
        console.log(` MongoDB Atlas connected: ${conn.connection.host}`);
    }catch (error) {
        console.error(` Database Connection Error: ${error.message}`);
        process.exit(1);
    }
}