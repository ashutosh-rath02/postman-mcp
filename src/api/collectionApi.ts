import { AxiosInstance } from "axios";
import { Collection } from "../types/postman";

export class CollectionApi {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async list(workspaceId: string): Promise<Collection[]> {
    const res = await this.api.get("/collections", {
      params: { workspace: workspaceId },
    });
    return res.data.collections;
  }

  async get(uid: string): Promise<Collection> {
    const res = await this.api.get(`/collections/${uid}`);
    return res.data.collection;
  }

  async create(
    name: string,
    workspaceId: string,
    description: string
  ): Promise<Collection> {
    const res = await this.api.post(
      "/collections",
      {
        collection: {
          info: {
            name,
            description,
            schema:
              "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
          },
          item: [],
        },
      },
      { params: { workspace: workspaceId } }
    );
    return res.data.collection;
  }

  async update(uid: string, updated: Partial<Collection>): Promise<Collection> {
    const res = await this.api.put(`/collections/${uid}`, {
      collection: updated,
    });
    return res.data.collection;
  }

  async remove(uid: string): Promise<void> {
    await this.api.delete(`/collections/${uid}`);
  }
}
