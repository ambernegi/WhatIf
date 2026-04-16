---
title: Migration guide
description: Migrate from v2/API-key auth to the Data Management API (WIP DM v3) with OAuth2 client credentials.
---

## Who this is for

Teams currently using WIP DM v2 with API-key authentication that need to migrate to v3 with OAuth2 (**adskClientCredentials**). API-key auth is scheduled for removal in v3.1 (Q3 2026).

## Migration overview

| Aspect | v2 (current) | v3 (target) |
|--------|-------------|-------------|
| **Auth** | API key in header | OAuth2 client credentials |
| **Base path** | `/storage/v2/` | `/storage/v3/` |
| **Rate limits** | Per API key | Per OAuth client |
| **Regions** | US only | 6 regions (US, CAN, DEU, GBR, IND, JPN) |
| **Streaming** | Not supported | Supported |

## Step 1: Register an OAuth2 application

1. Go to the Autodesk developer portal
2. Create a new application (or update an existing one)
3. Enable the **adskClientCredentials** grant type
4. Request scopes: `data:read`, `data:write`
5. Note your **Client ID** and **Client Secret**

## Step 2: Update token acquisition

### Before (API key)

```bash
curl -X GET \
  https://developer.api.autodesk.com/wipdata-serv/storage/v2/entities/get \
  -H "x-ads-apikey: YOUR_API_KEY"
```

### After (OAuth2)

```bash
# Step 1: Get token
TOKEN=$(curl -s -X POST \
  https://developer.api.autodesk.com/authentication/v2/token \
  -d "grant_type=client_credentials" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "scope=data:read data:write" \
  | jq -r '.access_token')

# Step 2: Use token
curl -X POST \
  https://developer.api.autodesk.com/wipdata-serv/storage/v3/entities/get \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"urns": ["urn:adsk.wipdata:fs.file:vf.abc123"]}'
```

## Step 3: Update API paths

All paths change from `/v2/` to `/v3/`:

| v2 Path | v3 Path | Notes |
|---------|---------|-------|
| `/storage/v2/entities/get` | `/storage/v3/entities/get` | Now POST-preferred |
| `/storage/v2/folders/{urn}/contents` | `/storage/v3/folders/{urn}/contents` | Same interface |
| `/storage/v2/lineages/{urn}` | `/storage/v3/lineages/{urn}` | Same interface |
| `/storage/v2/relationships` | `/storage/v3/relationships` | Same interface |
| `/storage/v2/versionedfiles/{urn}` | `/storage/v3/versionedfiles/{urn}` | Same interface |
| (none) | `/storage/v3/relationships/query2` | New in v3 |
| (none) | `/storage/v3/relationships/related-projects` | New in v3 |
| (none) | `/storage/v3/versionedfiles/{urn}/designdescription` | New in v3 |
| (none) | `/storage/v3/health` | New in v3 |

## Step 4: Handle rate limit changes

In v2, rate limits were per API key. In v3, rate limits are per OAuth client.

New response headers to handle:

```
X-RateLimit-Limit: 3000
X-RateLimit-Remaining: 2847
X-RateLimit-Reset: 42
```

Implement exponential backoff when receiving `429` responses.

## Step 5: Region routing (if applicable)

v3 supports multi-region deployment. The API proxy routes automatically based on project configuration.

To explicitly target a region (override):

```bash
curl -X GET \
  https://developer.api.autodesk.com/wipdata-serv/storage/v3/health \
  -H "Authorization: Bearer $TOKEN" \
  -H "x-ads-region: EMEA"
```

## Step 6: Remove hardcoded API keys

If your codebase contains any WIP DM API keys, rotate them and remove API-key auth.

Search your code for:

- References to `x-ads-apikey`
- Environment variables that store WIP DM API keys

Replace all API-key authentication with the OAuth2 token flow described above.

## Migration checklist

- Register OAuth2 application on the developer portal
- Obtain Client ID and Client Secret
- Update token acquisition to `client_credentials`
- Replace `x-ads-apikey` with `Authorization: Bearer`
- Update all API paths from `/v2/` to `/v3/`
- Implement 429 handling using rate limit headers
- Validate multi-region routing if required

## Related resources

- [Technical guide](/docs/apis/wip-dm-v3/technical-guide)
- [Code examples](/docs/apis/wip-dm-v3/code-examples)
- [Changelog](/docs/apis/wip-dm-v3/changelog)

