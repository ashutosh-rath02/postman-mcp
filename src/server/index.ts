import { PostmanClient } from "../client/postmanClient";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.POSTMAN_API_KEY;

/**
 * Minimal server bootstrap
 * For now, just checks Postman API connectivity.
 */
export async function startServer() {
  if (!apiKey) {
    console.error("POSTMAN_API_KEY is not set in environment variables.");
    process.exit(1);
  }
  const client = new PostmanClient(apiKey);
  try {
    // Try fetching the user's collections as a connectivity test
    const result = await client.get("/collections");
    const count = Array.isArray((result as any)?.collections)
      ? (result as any).collections.length
      : 0;
    console.log(
      "Successfully connected to Postman API. Collection count:",
      count
    );
  } catch (err) {
    console.error("Failed to connect to Postman API:", err);
    process.exit(1);
  }
}
