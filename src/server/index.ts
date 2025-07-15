import { PostmanClient } from "../client/postmanClient";
import dotenv from "dotenv";
import { tools, getToolByName } from "../tools/definitions";

dotenv.config();

const apiKey = process.env.POSTMAN_API_KEY;

/**
 * Minimal server bootstrap
 * Now lists available tools and calls 'listCollections' as a demo.
 */
export async function startServer() {
  if (!apiKey) {
    console.error("POSTMAN_API_KEY is not set in environment variables.");
    process.exit(1);
  }
  const client = new PostmanClient(apiKey);

  // List available tools
  console.log("Available tools:");
  for (const tool of tools) {
    console.log(`- ${tool.name}: ${tool.description}`);
  }

  // Demo: Call 'listCollections' tool
  const tool = getToolByName("listCollections");
  if (tool) {
    try {
      const validatedInput = tool.schema.parse({});
      const result = await tool.handler(client, validatedInput);
      console.log("\nResult of listCollections:", result);
    } catch (err) {
      console.error("Error running tool:", err);
    }
  }
}
