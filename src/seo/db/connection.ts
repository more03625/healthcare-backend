import { Client } from "pg";
import config from "../../config";


const dbConnectionData = {
    host: config.DB.HOST,
    user: config.DB.USER,
    database: config.DB.DATABASE,
    password: String(config.DB.PASSWORD),
    port: Number(config.DB.PORT),
}

console.log('dbConnectionData ==>', dbConnectionData)
const client = new Client(dbConnectionData);

const formatQuery = (query: string, params?: any[]) => {
    if (!params || params.length === 0) return query;
    return query.replace(/\$(\d+)/g, (_, index) => {
        let value = params[Number(index) - 1];
        if (typeof value === "string") return `'${value}'`; // Wrap strings in quotes
        if (value === null) return "NULL";
        return value;
    });
};

const queryWithLogging = async (query: string, params?: any[]) => {
    const rawQuery = formatQuery(query, params);
    console.log("Raw SQL Query:", rawQuery);
    return client.query(query, params);
};

const connectDB = async () => {
    try {
        await client.connect();
        console.log("✅ Connected to PostgreSQL successfully!");
    } catch (error) {
        console.error("❌ Connection error:", error);
        process.exit(1); // Exit the process on failure
    }
};

export { client, queryWithLogging, connectDB };