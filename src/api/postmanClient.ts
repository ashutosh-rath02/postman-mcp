import axios, { AxiosInstance } from "axios";
import { WorkspaceApi } from "./workspaceApi";
import { CollectionApi } from "./collectionApi";
import { EnvironmentApi } from "./environmentApi";
import { ItemApi } from "./itemApi";

export class PostmanClient {
  public api: AxiosInstance;
  public workspaces: WorkspaceApi;
  public collections: CollectionApi;
  public environments: EnvironmentApi;
  public items: ItemApi;

  constructor(apiKey: string) {
    this.api = axios.create({
      baseURL: "https://api.getpostman.com",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/vnd.api.v10+json",
      },
    });
    this.workspaces = new WorkspaceApi(this.api);
    this.collections = new CollectionApi(this.api);
    this.environments = new EnvironmentApi(this.api);
    this.items = new ItemApi(this.api, this.collections);
  }
}
