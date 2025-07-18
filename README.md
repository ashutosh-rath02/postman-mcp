# Postman MCP

This project enables seamless programmatic access to Postman workspaces, collections, requests, environments, and folders for AI assistants and developer tools.

---

## 🚀 Features

- List, create, update, and get workspaces
- List, create, update, get, and delete collections
- List, create, update, get, and delete environments

## 🗂️ Project Structure

```
postman-mcp/
  src/
    api/                # Postman API client (all API logic)
    tools/
      workspaceTools.ts # Workspace tool definitions
      collectionTools.ts# Collection tool definitions
      environmentTools.ts# Environment tool definitions
      utils.ts          # Tool definition helpers
      definitions.ts    # Central tool registry
    types/              # Custom types/interfaces
    validation/         # Zod schemas for input validation
    mcp/                # MCP server entrypoint
  package.json
  README.md
  ...
```

## ⚙️ Setup

### 1. Get Your Postman API Key

- Go to [Postman Account Settings](https://go.postman.co/settings/me/api-keys)
- Generate and copy your API key

### 2. Install & Configure

```bash
npm install
```

- Set your `POSTMAN_API_KEY` in your environment or `.env` file

### 3. Build & Run

```bash
npm run build
npm run dev
```

## 🛠️ MCP Integration

Add this to your Cursor or MCP client config:

```json
{
  "mcp": {
    "servers": {
      "postman": {
        "command": "npm run dev",
        "env": {
          "POSTMAN_API_KEY": "your_postman_api_key_here"
        }
      }
    }
  }
}
```

## 🔍 Available Tools

### Workspace Tools

- `list_workspaces`
- `get_workspace`
- `create_workspace`
- `update_workspace`

### Collection Tools

- `list_collections`
- `get_collection`
- `create_collection`
- `update_collection`
- `delete_collection`

### Environment Tools

- `list_environments`
- `get_environment`
- `create_environment`
- `update_environment`
- `delete_environment`

---

**This codebase is modular, professional, and ready for extension.**

- Add new tools by creating new files in `src/tools/` and schemas in `src/validation/`.
- All business logic is separated from validation and API logic for maintainability.

---

Made with ❤️ by Ashutosh Rath
