import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { zodToMCPInputSchema } from "../utils/schema-converter.js";
import { workspaceTools } from "./workspaceTools";
import { collectionTools } from "./collectionTools";
import { environmentTools } from "./environmentTools";

const allTools = [...workspaceTools, ...collectionTools, ...environmentTools];

export const tools: Tool[] = allTools.map((def) => ({
  name: def.name,
  description: def.description,
  inputSchema: zodToMCPInputSchema(def.schema),
}));

export const toolHandlers = Object.fromEntries(
  allTools.map((def) => [def.name, def])
);
