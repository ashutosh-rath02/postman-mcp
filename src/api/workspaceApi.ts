import { AxiosInstance } from "axios";
import { Workspace } from "../types/postman";

export class WorkspaceApi {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async fetchAll(): Promise<Workspace[]> {
    const res = await this.api.get("/workspaces");
    return res.data.workspaces;
  }

  async fetchById(id: string): Promise<Workspace> {
    const res = await this.api.get(`/workspaces/${id}`);
    return res.data.workspace;
  }

  async create(
    name: string,
    type: "personal" | "team",
    description: string
  ): Promise<Workspace> {
    const res = await this.api.post("/workspaces", {
      workspace: { name, type, description },
    });
    return res.data.workspace;
  }

  async update(
    id: string,
    name?: string,
    description?: string
  ): Promise<Workspace> {
    const res = await this.api.put(`/workspaces/${id}`, {
      workspace: { name, description },
    });
    return res.data.workspace;
  }
}
