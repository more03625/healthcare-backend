import dotenv from "dotenv";
import path from 'path';

const result = dotenv.config({ path: path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV}`).trim() });
if (result.error) {
    throw new Error(`Error loading .env file: ${result.error}`);
}

const config = {
    NODE_ENV: process.env.NODE_ENV || "example",
    PORT: Number(process.env.PORT) || 8081,

    DEBUG: Boolean(Number(process.env.DEBUG)) || false,
    LOG_LEVEL: Number(process.env.LOG_LEVEL) || 1,

    DB: {
        HOST: process.env.DB_HOST || "localhost",
        PORT: Number(process.env.DB_PORT) || 5432,
        USER: process.env.DB_USER || "postgres",
        PASSWORD: process.env.DB_PASSWORD || "rahul@123",
        DATABASE: process.env.DB_DATABASE || "hospital-crm",
    },

    JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
    TIME_ZONE: process.env.TIME_ZONE || "America/New_York",
};

export default config;
