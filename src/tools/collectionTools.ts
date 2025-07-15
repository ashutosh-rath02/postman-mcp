import { defineTool } from "./utils";
import {
  listCollectionsSchema,
  getCollectionSchema,
  createCollectionSchema,
  updateCollectionSchema,
  deleteCollectionSchema,
} from "../validation/collectionSchemas";

export const listCollections = defineTool({
  name: "list_collections",
  description: "List all collections in a workspace",
  schema: listCollectionsSchema,
  handler: async (client, args) => client.listCollections(args.workspaceId),
});

export const getCollection = defineTool({
  name: "get_collection",
  description: "Get detailed information about a specific collection",
  schema: getCollectionSchema,
  handler: async (client, args) => client.getCollection(args.collectionUid),
});

export const createCollection = defineTool({
  name: "create_collection",
  description: "Create a new collection",
  schema: createCollectionSchema,
  handler: async (client, args) =>
    client.createCollection(args.name, args.workspaceId, args.description),
});

export const updateCollection = defineTool({
  name: "update_collection",
  description: "Update collection metadata",
  schema: updateCollectionSchema,
  handler: async (client, args) => {
    const current = await client.getCollection(args.collectionUid);
    const updated = {
      ...current,
      info: {
        ...current.info,
        ...args.updated,
      },
    };
    return client.updateCollection(args.collectionUid, updated);
  },
});

export const deleteCollection = defineTool({
  name: "delete_collection",
  description: "Delete a Postman collection",
  schema: deleteCollectionSchema,
  handler: async (client, args) => client.deleteCollection(args.collectionUid),
});

export const collectionTools = [
  listCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
];
