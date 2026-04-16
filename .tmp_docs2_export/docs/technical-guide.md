---
title: Technical guide
description: Architecture, auth, regions, endpoints, and operational guidance for the Data Management API (WIP DM v3).
---

## Overview

The WIP Data Management (WIP DM) v3 API provides cloud storage and file management capabilities for Autodesk construction and design workflows. It enables programmatic access to folders, files, lineages, relationships, and static assets within Autodesk's Work-in-Progress data management layer.

**Base URL:** `https://developer.api.autodesk.com/wipdata-serv`  
**Service ID:** WIPDM  
**Spec version:** OpenAPI 3.0.1

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                   API Gateway                         │
│              (Autodesk API Proxy)                     │
│  Rate limiting · Auth · Routing · Oxygen profile      │
└──────────┬───────────────────────────┬───────────────┘
           │                           │
    ┌──────▼──────┐            ┌───────▼──────┐
    │ WIP DM v3   │            │  CloudOS     │
    │ REST API    │────────────│  Backend     │
    │ (32 ops)    │            │  (6 regions) │
    └─────────────┘            └──────────────┘
```

## Regional deployment

WIP DM v3 is deployed across six production regions for data residency compliance:

| Region | Server | Identifier |
|--------|--------|------------|
| US East (default) | `wipdm-p-ue1.cloudos.autodesk.com` | US |
| Canada | `wipdm-p-cc1.cloudos.autodesk.com` | CAN |
| Germany | `wipdm-p-ec1.cloudos.autodesk.com` | DEU |
| UK | `wipdm-p-ew2.cloudos.autodesk.com` | GBR |
| India | `wipdm-p-is1.cloudos.autodesk.com` | IND |
| Japan | `wipdm-p-an1.cloudos.autodesk.com` | JPN |

Requests are routed to the appropriate region based on the project's data residency setting. The API proxy handles routing transparently.

## Authentication

WIP DM v3 uses OAuth2 **client credentials** (`adskClientCredentials`, service-to-service). Every request must include:

```
Authorization: Bearer <access_token>
```

Obtain a token via the Autodesk Authentication API using your client ID and secret with the `data:read` and `data:write` scopes.

> Migration note: v3 replaces legacy API-key usage with OAuth2 client credentials. See the [Migration guide](/docs/apis/wip-dm-v3/migration-guide).

## API endpoints

WIP DM v3 exposes 32 operations across 7 resource groups:

### Storage — Entities
| Method | Path | Description |
|--------|------|-------------|
| POST | `/storage/v3/entities/get` | Batch-retrieve objects by URN |
| GET | `/storage/v3/entities/get` | Limited batch-retrieve (query string) |

### Storage — Versioned files
| Method | Path | Description |
|--------|------|-------------|
| GET | `/storage/v3/versionedfiles/{urn}` | Get a specific versioned file |
| GET | `/storage/v3/versionedfiles/{urn}/designdescription` | Get design description metadata |

### Storage — Lineages
| Method | Path | Description |
|--------|------|-------------|
| GET | `/storage/v3/lineages/{urn}` | Get lineage details |
| POST | `/storage/v3/lineages/purge` | Purge lineages |
| POST | `/storage/v3/lineages/{urn}/reserve` | Reserve a lineage |
| POST | `/storage/v3/lineages/{urn}/unreserve` | Release a lineage reservation |
| GET | `/storage/v3/lineages/{urn}/versions` | List versions of a lineage |

### Storage — Folders
| Method | Path | Description |
|--------|------|-------------|
| GET | `/storage/v3/folders/{urn}/contents` | List folder contents |
| POST | `/storage/v3/folders` | Create a folder |
| POST | `/storage/v3/folders/purge` | Purge folders |
| POST | `/storage/v3/folders/{urn}/contents/query` | Query folder contents with filters |
| GET | `/storage/v3/folders/{urn}/parents` | Get parent folders |
| GET | `/storage/v3/folders/{urn}/policies` | Get folder policies |

### Storage — Relationships
| Method | Path | Description |
|--------|------|-------------|
| POST | `/storage/v3/relationships` | Create/manage relationships |
| GET | `/storage/v3/relationships` | List relationships |
| POST | `/storage/v3/relationships/count` | Count relationships |
| POST | `/storage/v3/relationships/query2` | Advanced relationship query |
| POST | `/storage/v3/relationships/related-projects` | Find related projects |

### Storage — Policies & statics
| Method | Path | Description |
|--------|------|-------------|
| GET | `/storage/v3/policies/{urn}` | Get policy details |
| POST | `/storage/v3/statics` | Upload static assets |
| POST | `/storage/v3/statics/delete` | Delete static assets |

### System
| Method | Path | Description |
|--------|------|-------------|
| GET | `/storage/v3/system` | System information and status |
| GET | `/storage/v3/health` | Health check endpoint |

## Request/response format

All requests and responses use JSON (`application/json`). URNs follow the Autodesk URN format:

```
urn:adsk.wipdata:fs.file:vf.XXXXXXXX
urn:adsk.wipdata:fs.folder:co.XXXXXXXX
```

### Common headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | Bearer token |
| `Content-Type` | Yes (POST) | `application/json` |
| `x-ads-region` | No | Override region routing |

### Rate limits

Rate limits are enforced per OAuth client at the proxy level. Default limits:

- **Standard:** 3,000 requests/minute
- **Elevated:** Up to 300,000 requests/minute (by arrangement)

Rate limit headers are returned in every response:

- `X-RateLimit-Limit` — max requests per window
- `X-RateLimit-Remaining` — requests remaining
- `X-RateLimit-Reset` — seconds until window resets

## Error handling

All errors follow the standard Autodesk error response format:

```json
{
  "developerMessage": "The requested resource was not found.",
  "userMessage": "Item not found.",
  "errorCode": "NOT_FOUND",
  "more info": "https://developer.autodesk.com/en/docs/errors/NOT_FOUND"
}
```

| HTTP Code | Meaning |
|-----------|---------|
| 400 | Bad request — invalid parameters |
| 401 | Unauthorized — missing or invalid token |
| 403 | Forbidden — insufficient scopes |
| 404 | Not found — resource does not exist |
| 429 | Rate limited — too many requests |
| 500 | Internal server error |

## Related resources

- [Code examples](/docs/apis/wip-dm-v3/code-examples)
- [Changelog](/docs/apis/wip-dm-v3/changelog)
- [Migration guide](/docs/apis/wip-dm-v3/migration-guide)
- [Postman](/docs/apis/wip-dm-v3/postman)

