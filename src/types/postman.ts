export interface Workspace {
  id: string;
  name: string;
  type: "personal" | "team";
  description?: string;
}

export interface Collection {
  uid: string;
  name: string;
  info: {
    name: string;
    description?: string;
    schema: string;
  };
  item: any[];
  variable?: any[];
}

export interface Environment {
  uid: string;
  name: string;
  values: any[];
}

export interface RequestDefinition {
  name: string;
  method: string;
  url: string;
  headers?: Record<string, string> | { key: string; value: string }[];
  body?: any;
  folder?: string;
  description?: string;
}

export interface FolderDefinition {
  name: string;
  parentFolder?: string;
}
