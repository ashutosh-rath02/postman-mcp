import { defineTool } from "./utils";
import {
  listWorkspacesSchema,
  getWorkspaceSchema,
  createWorkspaceSchema,
  updateWorkspaceSchema,
} from "../validation/workspaceSchemas";

export const listWorkspaces = defineTool({
  name: "list_workspaces",
  description: "List all workspaces",
  schema: listWorkspacesSchema,
  handler: async (client) => client.listWorkspaces(),
});

export const getWorkspace = defineTool({
  name: "get_workspace",
  description: "Get detailed information about a specific workspace",
  schema: getWorkspaceSchema,
  handler: async (client, args) => client.getWorkspace(args.workspaceId),
});

export const createWorkspace = defineTool({
  name: "create_workspace",
  description: "Create a new workspace",
  schema: createWorkspaceSchema,
  handler: async (client, args) =>
    client.createWorkspace(args.name, args.type, args.description),
});

export const updateWorkspace = defineTool({
  name: "update_workspace",
  description: "Update an existing workspace",
  schema: updateWorkspaceSchema,
  handler: async (client, args) =>
    client.updateWorkspace(args.workspaceId, args.name, args.description),
});

export const workspaceTools = [
  listWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
];
