import { defineTool } from "./utils";
import {
  listEnvironmentsSchema,
  getEnvironmentSchema,
  createEnvironmentSchema,
  updateEnvironmentSchema,
  deleteEnvironmentSchema,
} from "../validation/environmentSchemas";

export const listEnvironments = defineTool({
  name: "list_environments",
  description: "List all environments in a workspace",
  schema: listEnvironmentsSchema,
  handler: async (client, args) => client.listEnvironments(args.workspaceId),
});

export const getEnvironment = defineTool({
  name: "get_environment",
  description: "Get detailed information about a specific environment",
  schema: getEnvironmentSchema,
  handler: async (client, args) => client.getEnvironment(args.environmentUid),
});

export const createEnvironment = defineTool({
  name: "create_environment",
  description: "Create a new environment",
  schema: createEnvironmentSchema,
  handler: async (client, args) =>
    client.createEnvironment(args.name, args.values || [], args.workspaceId),
});

export const updateEnvironment = defineTool({
  name: "update_environment",
  description: "Update an existing environment",
  schema: updateEnvironmentSchema,
  handler: async (client, args) =>
    client.updateEnvironment(args.environmentUid, args.name, args.values),
});

export const deleteEnvironment = defineTool({
  name: "delete_environment",
  description: "Delete an existing environment",
  schema: deleteEnvironmentSchema,
  handler: async (client, args) =>
    client.deleteEnvironment(args.environmentUid),
});

export const environmentTools = [
  listEnvironments,
  getEnvironment,
  createEnvironment,
  updateEnvironment,
  deleteEnvironment,
];
