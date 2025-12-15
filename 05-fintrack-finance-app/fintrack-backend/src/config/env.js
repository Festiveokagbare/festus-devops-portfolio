// src/config/env.js
import dotenv from "dotenv";
import path from "path";

// Determine the appropriate .env file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Destructure expected variables from process.env
export const {
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN
} = process.env;

// Validate required environment variables
if (!PORT || !DATABASE_URL || !JWT_SECRET || !JWT_EXPIRES_IN) {
  throw new Error("❌ Missing one or more critical environment variables in " + envFile);
}
