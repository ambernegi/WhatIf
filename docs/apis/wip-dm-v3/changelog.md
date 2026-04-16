---
title: Changelog
description: Version history for the Data Management API (WIP DM v3).
---

All notable changes to the WIP Data Management API.

Format follows [Keep a Changelog](https://keepachangelog.com/). Versions use [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-04-15

### Added
- Initial GA release of WIP DM v3 REST API
- 32 operations across 7 resource groups (entities, folders, lineages, versioned files, relationships, policies, statics)
- Six-region deployment: US, Canada, Germany, UK, India, Japan
- Streaming support for large response payloads
- Oxygen profile integration for identity-aware authorization
- Locale support via `Accept-Language` header
- Batch entity retrieval (`POST /storage/v3/entities/get`)
- Advanced relationship queries (`POST /storage/v3/relationships/query2`)
- Cross-project relationship discovery (`POST /storage/v3/relationships/related-projects`)
- Design description metadata endpoint (`GET /storage/v3/versionedfiles/{urn}/designdescription`)
- Health check endpoint (`GET /storage/v3/health`)

### Changed
- Authentication migrating from API-key to OAuth2 client credentials (see [Migration guide](./migration-guide))
- Rate limits now enforced per OAuth client instead of per API key
- URN format standardized to `urn:adsk.wipdata:fs.*`

### Security
- Removed hardcoded API keys that were present in a pre-release spec; affected keys were rotated
- Added secret scanning to CI/CD pipeline to prevent recurrence

### Deprecated
- API-key authentication — scheduled for removal in v3.1 (Q3 2026)
- `GET /storage/v3/entities/get` (query-string variant) — use `POST` for batch operations

## [0.9.0-beta] — 2026-03-01

### Added
- Public Beta release for early adopters
- Core entity and folder CRUD operations
- Basic relationship management
- Lineage reservation (checkout/checkin)

### Known issues
- Empty response schemas (`type: object` with no properties) — resolved in 1.0.0
- Inconsistent operation ID naming — planned standardization

