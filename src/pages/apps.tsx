import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { APP_CARDS } from '../data/unified';

export default function AppsLanding() {
  return (
    <Layout title="Apps" description="Browse apps and add-ons from the Autodesk App Store">
      <div className="aps-landing">
        <main className="aps-landing__main">
          <section className="aps-hero aps-hero--single">
            <div className="aps-hero__left">
              <div className="aps-hero__kicker">Autodesk App Store</div>
              <h1 className="aps-hero__title">Apps</h1>
              <p className="aps-hero__desc">
                A curated view of featured apps — kept separate from Products and APIs, but available in one place.
              </p>
              <div className="aps-hero__ctaRow">
                <a className="aps-btn aps-btn--primary" href="https://apps.autodesk.com/">
                  Open App Store
                </a>
                <Link className="aps-btn" to="/docs/apis">
                  Explore APIs
                </Link>
              </div>
            </div>
          </section>

          <section className="aps-section">
            <div className="aps-section__head">
              <h2 className="aps-section__title">Featured apps</h2>
              <p className="aps-section__desc">Mirrors a subset of the App Store homepage.</p>
            </div>
            <div className="aps-miniGrid">
              {APP_CARDS.map((a) => (
                <a key={a.id} className="aps-miniCard" href={a.href}>
                  {a.imageUrl && (
                    <div className="aps-miniCard__media" aria-hidden="true">
                      <img
                        className="aps-miniCard__img"
                        src={a.imageUrl}
                        alt={a.imageAlt ?? ''}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="aps-miniCard__top">
                    <span className="aps-badge aps-badge--soon">App</span>
                  </div>
                  <div className="aps-miniCard__title">{a.title}</div>
                  <div className="aps-miniCard__desc">{a.summary}</div>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}

