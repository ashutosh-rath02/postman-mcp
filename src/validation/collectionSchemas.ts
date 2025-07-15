import { z } from "zod";

export const listCollectionsSchema = z.object({ workspaceId: z.string() });
export const getCollectionSchema = z.object({ collectionUid: z.string() });
export const createCollectionSchema = z.object({
  name: z.string(),
  description: z.string(),
  workspaceId: z.string(),
});
export const updateCollectionSchema = z.object({
  collectionUid: z.string(),
  updated: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
    })
    .partial(),
});
export const deleteCollectionSchema = z.object({ collectionUid: z.string() });
