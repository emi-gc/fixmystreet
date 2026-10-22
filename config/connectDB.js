import mongoose from "mongoose";
import dns from "node:dns";

// use public dns to find the mongodb servers because otherwise it doesnt work for reasons i dont fully understand or something
dns.setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async (mongoURL) => {
    try {
        const conn = await mongoose.connect(mongoURL);
        console.log(` MongoDB Atlas connected: ${conn.connection.host}`);
    }catch (error) {
        console.error(` Database Connection Error: ${error.message}`);
        process.exit(1);
    }
}
