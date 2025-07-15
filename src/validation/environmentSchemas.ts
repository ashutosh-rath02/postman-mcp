import { z } from "zod";

export const listEnvironmentsSchema = z.object({ workspaceId: z.string() });
export const getEnvironmentSchema = z.object({ environmentUid: z.string() });
export const createEnvironmentSchema = z.object({
  name: z.string(),
  values: z.array(z.any()).optional(),
  workspaceId: z.string(),
});
export const updateEnvironmentSchema = z.object({
  environmentUid: z.string(),
  name: z.string().optional(),
  values: z.array(z.any()).optional(),
});
export const deleteEnvironmentSchema = z.object({ environmentUid: z.string() });
