import { z } from "zod";

export const listWorkspacesSchema = z.object({});
export const getWorkspaceSchema = z.object({ workspaceId: z.string() });
export const createWorkspaceSchema = z.object({
  name: z.string(),
  type: z.enum(["personal", "team"]),
  description: z.string(),
});
export const updateWorkspaceSchema = z.object({
  workspaceId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
});
