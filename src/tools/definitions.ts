import { z } from "zod";
import { ToolDefinition } from "../types/tool";
import { PostmanClient } from "../client/postmanClient";

// Example tool: List Collections
export const listCollections: ToolDefinition = {
  name: "listCollections",
  description: "List all Postman collections for the user.",
  schema: z.object({}), // No input required
  async handler(client: PostmanClient) {
    return client.get("/collections");
  },
};

// Tool registry
export const tools: ToolDefinition[] = [listCollections];

// Helper to get tool by name
export function getToolByName(name: string) {
  return tools.find((t) => t.name === name);
}
