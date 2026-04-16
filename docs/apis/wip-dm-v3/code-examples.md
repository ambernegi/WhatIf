---
title: Code examples
description: Python, Node.js, and cURL samples for common Data Management API (WIP DM v3) operations.
---

Working samples for common WIP DM v3 operations. All examples use:

**Base URL:** `https://developer.api.autodesk.com/wipdata-serv`

## Setup: get an access token

### Python

```python
import os
import requests

TOKEN_URL = "https://developer.api.autodesk.com/authentication/v2/token"

def get_token():
    resp = requests.post(
        TOKEN_URL,
        data={
            "grant_type": "client_credentials",
            "client_id": os.environ["CLIENT_ID"],
            "client_secret": os.environ["CLIENT_SECRET"],
            "scope": "data:read data:write",
        },
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()["access_token"]
```

### Node.js

```javascript
const axios = require("axios");

async function getToken() {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const { data } = await axios.post(
    "https://developer.api.autodesk.com/authentication/v2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "data:read data:write",
    })
  );
  return data.access_token;
}
```

### cURL

```bash
curl -X POST \
  https://developer.api.autodesk.com/authentication/v2/token \
  -d "grant_type=client_credentials" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "scope=data:read data:write"
```

## Batch retrieve entities

Retrieve multiple objects by their URNs in a single request.

### Python

```python
import requests

BASE = "https://developer.api.autodesk.com/wipdata-serv"

def get_entities(token, urns):
    resp = requests.post(
        f"{BASE}/storage/v3/entities/get",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        json={"urns": urns},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()
```

### Node.js

```javascript
const axios = require("axios");
const BASE = "https://developer.api.autodesk.com/wipdata-serv";

async function getEntities(token, urns) {
  const { data } = await axios.post(
    `${BASE}/storage/v3/entities/get`,
    { urns },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}
```

## List folder contents

### Python

```python
import requests

BASE = "https://developer.api.autodesk.com/wipdata-serv"

def list_folder_contents(token, folder_urn):
    resp = requests.get(
        f"{BASE}/storage/v3/folders/{folder_urn}/contents",
        headers={"Authorization": f"Bearer {token}"},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()
```

## Health check

### cURL

```bash
curl -s https://developer.api.autodesk.com/wipdata-serv/storage/v3/health
```

## Related resources

- [Technical guide](/docs/apis/wip-dm-v3/technical-guide)
- [Migration guide](/docs/apis/wip-dm-v3/migration-guide)
- [Postman](/docs/apis/wip-dm-v3/postman)

