import { ZodTypeAny } from "zod";
import { PostmanClient } from "../client/postmanClient";

export interface ToolDefinition<TInput = any, TResult = any> {
  name: string;
  description: string;
  schema: ZodTypeAny;
  handler: (client: PostmanClient, input: TInput) => Promise<TResult>;
}
