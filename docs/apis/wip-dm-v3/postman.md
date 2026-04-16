---
title: Postman
description: Interactive testing guidance for the Data Management API (WIP DM v3) with Postman.
---

Ready-to-import collection guidance for interactive API testing.

## Quick start

1. Import the WIP DM v3 collection JSON into Postman.
2. Set environment variables:
   - `CLIENT_ID` — your Autodesk OAuth2 client ID
   - `CLIENT_SECRET` — your Autodesk OAuth2 client secret
   - `BASE_URL` — `https://developer.api.autodesk.com/wipdata-serv`
3. Run the **Get Token** request first.

## Note about this repo

The original file set you provided includes Postman *instructions* but does **not** include the actual collection JSON.  
To make this fully consumable in the pipeline, add a real collection file (example location):

- `static/postman/wip-dm-v3.postman_collection.json`

Then we can link to it directly from this page.

Example link once the JSON is added:

- `http://<your-site>/WhatIf/postman/wip-dm-v3.postman_collection.json`

## Collection structure (expected)

```
WIP DM v3
├── Auth
├── Entities
├── Folders
├── Versioned Files
├── Lineages
├── Relationships
├── Policies & Statics
└── System
```

## Related resources

- [Technical guide](/docs/apis/wip-dm-v3/technical-guide)
- [Code examples](/docs/apis/wip-dm-v3/code-examples)
- [Migration guide](/docs/apis/wip-dm-v3/migration-guide)

