---
title: Documentation
slug: /
---

import Link from '@docusaurus/Link';

<div className="aps-docsHome">
  <div className="aps-docsHome__hero">
    <div className="aps-docsHome__kicker">Autodesk</div>
    <h1 className="aps-docsHome__title">Documentation</h1>
    <p className="aps-docsHome__desc">
      Choose a track to browse product docs, developer APIs, SDKs/MCPs, and anything published by this site.
    </p>
  </div>

  <div className="aps-docsHome__grid">
    <Link className="aps-docsCard aps-docsCard--products" to="/docs/products">
      <div className="aps-docsCard__top">Products</div>
      <div className="aps-docsCard__title">Product documentation</div>
      <div className="aps-docsCard__desc">
        Feature guides, concepts, and release notes — organized by product.
      </div>
      <div className="aps-docsCard__meta">Design Automation · Viewer · Webhooks · Metrics · Machine Translation</div>
    </Link>

    <Link className="aps-docsCard aps-docsCard--apis" to="/docs/apis">
      <div className="aps-docsCard__top">APIs</div>
      <div className="aps-docsCard__title">APIs, SDKs & MCPs</div>
      <div className="aps-docsCard__desc">
        Developer surfaces that make up the platform: REST APIs, SDKs & samples, and MCPs.
      </div>
      <div className="aps-docsCard__links" aria-label="API-related hubs">
        <span>Browse:</span>
        <Link to="/docs/apis">API catalog</Link>
        <span className="aps-docsCard__dot" aria-hidden="true">•</span>
        <Link to="/docs/sdks">SDKs & Samples</Link>
        <span className="aps-docsCard__dot" aria-hidden="true">•</span>
        <Link to="/docs/mcps">MCPs</Link>
      </div>
    </Link>

    <Link className="aps-docsCard aps-docsCard--apps" to="/docs/apps">
      <div className="aps-docsCard__top">Apps</div>
      <div className="aps-docsCard__title">App documentation</div>
      <div className="aps-docsCard__desc">
        App-specific docs (when published) — install, configure, and extend Autodesk products.
      </div>
      <div className="aps-docsCard__meta">App Store listings · Integrations · Configuration</div>
    </Link>
  </div>

  <div className="aps-docsHome__quick">
    <div className="aps-docsHome__quickTitle">Direct entry points</div>
    <div className="aps-docsHome__quickGrid">
      <Link to="/docs/releases" className="aps-docsQuick">Releases</Link>
      <Link to="/docs/sdks" className="aps-docsQuick">SDKs & Samples</Link>
      <Link to="/docs/apis" className="aps-docsQuick">API Catalog</Link>
      <Link to="/docs/mcps" className="aps-docsQuick">MCPs</Link>
    </div>
  </div>
</div>

