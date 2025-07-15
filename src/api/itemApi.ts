import { AxiosInstance } from "axios";
import {
  Collection,
  RequestDefinition,
  FolderDefinition,
} from "../types/postman";
import { CollectionApi } from "./collectionApi";
import {
  PostmanItem,
  PostmanRequest,
  PostmanBody,
  PostmanHeader,
} from "../types/index";

export class ItemApi {
  private api: AxiosInstance;
  private collectionApi: CollectionApi;

  constructor(api: AxiosInstance, collectionApi: CollectionApi) {
    this.api = api;
    this.collectionApi = collectionApi;
  }

  private toPostmanRequest(request: RequestDefinition): PostmanRequest {
    const headers: PostmanHeader[] = request.headers
      ? Array.isArray(request.headers)
        ? request.headers.map((h) => ({
            key: h.key,
            value: h.value,
            type: "text",
          }))
        : Object.entries(request.headers).map(([key, value]) => ({
            key,
            value,
            type: "text",
          }))
      : [];
    let body: PostmanBody | undefined = undefined;
    if (request.body !== undefined) {
      if (typeof request.body === "object" && request.body.mode) {
        body = {
          ...request.body,
          options:
            request.body.mode === "raw" && !request.body.options
              ? { raw: { language: "json" } }
              : request.body.options,
        };
      } else {
        body = {
          mode: "raw",
          raw:
            typeof request.body === "string"
              ? request.body
              : JSON.stringify(request.body, null, 2),
          options: { raw: { language: "json" } },
        };
      }
    }
    return {
      method: request.method,
      url: request.url,
      header: headers,
      body,
      description: request.description,
    };
  }

  private findItemByName(
    items: PostmanItem[],
    name: string
  ): PostmanItem | null {
    for (const item of items) {
      if (item.name === name) return item;
      if (item.item) {
        const found = this.findItemByName(item.item, name);
        if (found) return found;
      }
    }
    return null;
  }

  private findFolderByPath(
    items: PostmanItem[],
    folderPath: string
  ): PostmanItem | null {
    const folders = folderPath.split("/");
    let currentItems = items;
    let folder: PostmanItem | null = null;
    for (const folderName of folders) {
      folder =
        currentItems.find((i) => i.name === folderName && i.item) || null;
      if (!folder) return null;
      currentItems = folder.item!;
    }
    return folder;
  }

  private removeItemByName(items: PostmanItem[], name: string): boolean {
    for (let i = 0; i < items.length; i++) {
      if (items[i].name === name) {
        items.splice(i, 1);
        return true;
      }
      if (items[i].item) {
        if (this.removeItemByName(items[i].item!, name)) {
          return true;
        }
      }
    }
    return false;
  }

  async addRequest(
    collectionUid: string,
    request: RequestDefinition
  ): Promise<void> {
    const collection = await this.collectionApi.get(collectionUid);
    const postmanRequest: PostmanItem = {
      name: request.name,
      request: this.toPostmanRequest(request),
    };
    if (request.folder) {
      const folder = this.findFolderByPath(collection.item, request.folder);
      if (!folder) throw new Error(`Folder '${request.folder}' not found`);
      folder.item = folder.item || [];
      folder.item.push(postmanRequest);
    } else {
      collection.item.push(postmanRequest);
    }
    await this.collectionApi.update(collectionUid, collection);
  }

  async updateRequest(
    collectionUid: string,
    requestName: string,
    updates: Partial<RequestDefinition>
  ): Promise<void> {
    const collection = await this.collectionApi.get(collectionUid);
    const item = this.findItemByName(collection.item, requestName);
    if (!item || !item.request)
      throw new Error(`Request '${requestName}' not found`);
    if (updates.name) item.name = updates.name;
    if (updates.method) item.request.method = updates.method;
    if (updates.url) item.request.url = updates.url;
    if (updates.description !== undefined)
      item.request.description = updates.description;
    if (updates.headers) {
      item.request.header = Array.isArray(updates.headers)
        ? updates.headers.map((h) => ({
            key: h.key,
            value: h.value,
            type: "text",
          }))
        : Object.entries(updates.headers).map(([key, value]) => ({
            key,
            value,
            type: "text",
          }));
    }
    if (updates.body !== undefined) {
      item.request.body = updates.body
        ? typeof updates.body === "object" && updates.body.mode
          ? {
              ...updates.body,
              options:
                updates.body.mode === "raw" && !updates.body.options
                  ? { raw: { language: "json" } }
                  : updates.body.options,
            }
          : {
              mode: "raw",
              raw:
                typeof updates.body === "string"
                  ? updates.body
                  : JSON.stringify(updates.body, null, 2),
              options: { raw: { language: "json" } },
            }
        : undefined;
    }
    // Handle folder move
    if (updates.folder !== undefined) {
      this.removeItemByName(collection.item, requestName);
      if (updates.folder) {
        const folder = this.findFolderByPath(collection.item, updates.folder);
        if (!folder) throw new Error(`Folder '${updates.folder}' not found`);
        folder.item = folder.item || [];
        folder.item.push(item);
      } else {
        collection.item.push(item);
      }
    }
    await this.collectionApi.update(collectionUid, collection);
  }

  async deleteRequest(
    collectionUid: string,
    requestName: string
  ): Promise<void> {
    const collection = await this.collectionApi.get(collectionUid);
    if (!this.removeItemByName(collection.item, requestName)) {
      throw new Error(`Request '${requestName}' not found`);
    }
    await this.collectionApi.update(collectionUid, collection);
  }

  async createFolder(
    collectionUid: string,
    folderName: string,
    parentFolder?: string
  ): Promise<void> {
    const collection = await this.collectionApi.get(collectionUid);
    const newFolder: PostmanItem = { name: folderName, item: [] };
    if (parentFolder) {
      const folder = this.findFolderByPath(collection.item, parentFolder);
      if (!folder) throw new Error(`Parent folder '${parentFolder}' not found`);
      folder.item = folder.item || [];
      folder.item.push(newFolder);
    } else {
      collection.item.push(newFolder);
    }
    await this.collectionApi.update(collectionUid, collection);
  }

  async deleteFolder(
    collectionUid: string,
    folderName: string,
    parentFolder?: string
  ): Promise<void> {
    const collection = await this.collectionApi.get(collectionUid);
    let targetItems = collection.item;
    if (parentFolder) {
      const folder = this.findFolderByPath(collection.item, parentFolder);
      if (!folder) throw new Error(`Parent folder '${parentFolder}' not found`);
      targetItems = folder.item!;
    }
    const idx = targetItems.findIndex(
      (item) => item.name === folderName && item.item !== undefined
    );
    if (idx === -1) throw new Error(`Folder '${folderName}' not found`);
    targetItems.splice(idx, 1);
    await this.collectionApi.update(collectionUid, collection);
  }
}
