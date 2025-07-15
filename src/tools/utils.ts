import { z } from "zod";
import { PostmanClient } from "../api/postmanClient";

export interface ToolDefinition<TSchema extends z.ZodSchema, TResult> {
  name: string;
  description: string;
  schema: TSchema;
  handler: (client: PostmanClient, args: z.infer<TSchema>) => Promise<TResult>;
}

export function defineTool<TSchema extends z.ZodSchema, TResult>(
  definition: ToolDefinition<TSchema, TResult>
): ToolDefinition<TSchema, TResult> {
  return definition;
}
