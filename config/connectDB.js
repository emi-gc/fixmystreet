import mongoose from "mongoose";

export const connectDB = async (mongoURL) => {
    const conn = await mongoose.connect(mongoURL, { serverSelectionTimeoutMS: 10000 });
    console.log(` MongoDB connected: ${conn.connection.host}`);
    return conn;
}
