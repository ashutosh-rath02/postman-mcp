import { AxiosInstance } from "axios";
import { Environment } from "../types/postman";

export class EnvironmentApi {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async list(workspaceId: string): Promise<Environment[]> {
    const res = await this.api.get("/environments", {
      params: { workspace: workspaceId },
    });
    return res.data.environments;
  }

  async get(uid: string): Promise<Environment> {
    const res = await this.api.get(`/environments/${uid}`);
    return res.data.environment;
  }

  async create(
    name: string,
    values: any[],
    workspaceId: string
  ): Promise<Environment> {
    const res = await this.api.post(
      "/environments",
      { environment: { name, values } },
      { params: { workspace: workspaceId } }
    );
    return res.data.environment;
  }

  async update(
    uid: string,
    name?: string,
    values?: any[]
  ): Promise<Environment> {
    const res = await this.api.put(`/environments/${uid}`, {
      environment: { name, values },
    });
    return res.data.environment;
  }

  async remove(uid: string): Promise<void> {
    await this.api.delete(`/environments/${uid}`);
  }
}
