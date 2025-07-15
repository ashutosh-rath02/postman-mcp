import fetch, { RequestInit } from "node-fetch";

/**
 * Minimal Postman API client
 * Add more methods as needed for your tools.
 */
export class PostmanClient {
  private apiKey: string;
  private baseUrl: string = "https://api.getpostman.com";

  constructor(apiKey: string) {
    if (!apiKey) throw new Error("POSTMAN_API_KEY is required");
    this.apiKey = apiKey;
  }

  /**
   * Make a GET request to the Postman API
   * @param endpoint e.g. '/collections'
   */
  async get(endpoint: string) {
    return this.request(endpoint, { method: "GET" });
  }

  /**
   * Generic request method
   */
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "X-Api-Key": this.apiKey,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Postman API error: ${response.status} ${text}`);
    }
    return response.json();
  }
}
