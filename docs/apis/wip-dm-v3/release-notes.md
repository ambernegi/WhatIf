---
title: Release notes
description: GA release notes for the Data Management API (WIP DM v3).
---

**Version:** 1.0.0 (General Availability)  
**Release date:** April 15, 2026  
**Service:** WIP Data Management REST API  
**Service ID:** WIPDM

## What's new

WIP DM v3 is now generally available. This release brings multi-region support, streaming, improved authentication, and a cleaner API surface for managing files, folders, lineages, and relationships in Autodesk construction and design workflows.

### Multi-region deployment

WIP DM v3 is available in six regions to support data residency requirements:

- US East (default)
- Canada
- Germany
- United Kingdom
- India
- Japan

Requests are routed automatically based on your project's data residency configuration. No client-side changes needed.

### OAuth2 authentication

WIP DM v3 uses **adskClientCredentials** (service-to-service OAuth2), replacing legacy API-key authentication. This aligns with APS security and operational standards and provides better auditability and rate limit management.

> Action required: API-key authentication is deprecated and will be removed in v3.1 (Q3 2026). See the [Migration guide](./migration-guide) for step-by-step instructions.

### New endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /storage/v3/relationships/query2` | Advanced relationship queries with filtering |
| `POST /storage/v3/relationships/related-projects` | Discover cross-project relationships |
| `GET /storage/v3/versionedfiles/{urn}/designdescription` | Access design description metadata |
| `GET /storage/v3/health` | Service health check for monitoring |

### Streaming support

Large response payloads are streamed, reducing memory pressure on clients and enabling real-time processing of folder listings and relationship queries.

### Locale support

Pass `Accept-Language` headers to receive localized error messages and metadata. Supported locales include EN, DE, FR, JA, and ZH.

## Breaking changes

- **Base path:** All endpoints moved from `/storage/v2/` to `/storage/v3/`
- **Auth header:** `x-ads-apikey` replaced with `Authorization: Bearer <token>`
- **Rate limits:** Now enforced per OAuth client, not per API key

## Security fixes

A pre-release version of the API spec contained hardcoded API keys in plaintext. These have been removed, and all affected keys have been rotated. If you previously accessed the pre-release spec, ensure you are not using any exposed keys.

## Known limitations

- Response schemas for some endpoints return generic `type: object` — typed schemas are planned for v3.1
- Operation IDs use mixed naming conventions — standardization planned for v3.1
- Some API descriptions contain HTML entities instead of Markdown — cosmetic fix planned

## Getting started

1. [Technical guide](./technical-guide) — architecture, authentication, and endpoint reference
2. [Code examples](./code-examples) — Python, Node.js, and cURL samples
3. [Postman](./postman) — interactive testing guidance
4. [Migration guide](./migration-guide) — upgrade from v2 or API-key authentication

