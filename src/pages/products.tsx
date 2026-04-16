import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { INDUSTRY_LINKS, PRODUCT_CARDS } from '../data/unified';

export default function ProductsLanding() {
  return (
    <Layout title="Products" description="Discover Autodesk products by industry and workflow">
      <div className="aps-landing">
        <main className="aps-landing__main">
          <section className="aps-hero aps-hero--single">
            <div className="aps-hero__left">
              <div className="aps-hero__kicker">Autodesk</div>
              <h1 className="aps-hero__title">Products</h1>
              <p className="aps-hero__desc">
                A curated entry point to flagship Autodesk products — with pathways into APIs and Apps.
              </p>
              <div className="aps-hero__ctaRow">
                <Link className="aps-btn aps-btn--primary" to="/docs/apis">
                  Explore APIs
                </Link>
                <Link className="aps-btn" to="/apps">
                  Browse Apps
                </Link>
              </div>
            </div>
          </section>

          <section className="aps-section">
            <div className="aps-section__head">
              <h2 className="aps-section__title">Explore by industry</h2>
              <p className="aps-section__desc">Start broad, then drill down.</p>
            </div>
            <div className="aps-miniGrid">
              {INDUSTRY_LINKS.map((i) => (
                <a key={i.id} className="aps-miniCard" href={i.href}>
                  <div className="aps-miniCard__title">{i.label}</div>
                  <div className="aps-miniCard__desc">View industry solutions and products.</div>
                </a>
              ))}
            </div>
          </section>

          <section className="aps-section">
            <div className="aps-section__head">
              <h2 className="aps-section__title">Flagship products</h2>
              <p className="aps-section__desc">Mirrors key entry points from Autodesk.com.</p>
            </div>
            <div className="aps-miniGrid">
              {PRODUCT_CARDS.map((p) => (
                <a key={p.id} className="aps-miniCard" href={p.href}>
                  {p.imageUrl && (
                    <div className="aps-miniCard__media" aria-hidden="true">
                      <img
                        className="aps-miniCard__img"
                        src={p.imageUrl}
                        alt={p.imageAlt ?? ''}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="aps-miniCard__top">
                    <span className="aps-badge aps-badge--soon">Product</span>
                  </div>
                  <div className="aps-miniCard__title">{p.title}</div>
                  <div className="aps-miniCard__desc">{p.summary}</div>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}

