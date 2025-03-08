import { Client } from "pg";
import config from "../../config";


const dbConnectionData = {
    host: config.DB.HOST,
    user: config.DB.USER,
    database: config.DB.DATABASE,
    password: String(config.DB.PASSWORD),
    port: Number(config.DB.PORT),
}

const client = new Client(dbConnectionData);

const connectDB = async () => {
    try {
        await client.connect();
        console.log("✅ Connected to PostgreSQL successfully!");
    } catch (error) {
        console.error("❌ Connection error:", error);
        process.exit(1); // Exit the process on failure
    }
};

export { client, connectDB };