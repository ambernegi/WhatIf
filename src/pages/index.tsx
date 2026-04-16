import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { API_CARDS, APP_CARDS, INDUSTRY_LINKS, PRODUCT_CARDS } from '../data/unified';
import { PRODUCTS } from '../data/catalog';

const safeTrim = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

const DocIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ViewerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 3L17 7v6l-7 4L3 13V7l7-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M10 3v10M3 7l7 4 7-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const WebhookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 2a5 5 0 00-4.9 6H3a2 2 0 000 4h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 8l2.5 4H10a2 2 0 000 4h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 8a5 5 0 00-1-5.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="6" cy="16" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const ICONS_BY_PRODUCT_ID: Record<string, React.ReactNode> = {
  'design-automation': <DocIcon />,
  viewer: <ViewerIcon />,
  webhooks: <WebhookIcon />,
  metrics: <DocIcon />,
  'machine-translation': <DocIcon />,
};

export default function Home() {
  const [search, setSearch] = useState('');
  const [industries, setIndustries] = useState<Set<string>>(new Set());
  const [productFilters, setProductFilters] = useState<Set<string>>(new Set());
  const [apiFilters, setApiFilters] = useState<Set<string>>(new Set());
  const hasQuery = safeTrim(search) !== '';

  const clearAll = () => {
    setSearch('');
    setIndustries(new Set());
    setProductFilters(new Set());
    setApiFilters(new Set());
  };

  const toggleSet = <T extends string>(set: Set<T>, value: T): Set<T> => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  };

  const featuredProducts = useMemo(() => {
    return [...PRODUCTS]
      .filter((p) => typeof p.featuredRank === 'number')
      .sort((a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999))
      .slice(0, 4);
  }, []);

  const trendingProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.maturity !== 'ga').slice(0, 4);
  }, []);

  const filteredDirectory = useMemo(() => {
    const q = safeTrim(search).toLowerCase();

    const hasIndustry = industries.size > 0;
    const industryKeywordsByLabel: Record<string, string[]> = {
      AEC: ['aec', 'bim'],
      'Design & Manufacturing': ['manufacturing', 'design & drafting'],
      'Media & Entertainment': ['media', 'entertainment'],
    };
    const selectedIndustryKeywords = new Set(
      [...industries]
        .flatMap((label) => industryKeywordsByLabel[label] || [])
        .map((s) => s.toLowerCase()),
    );

    const matchesQuery = (title: string, summary: string, tags?: string[]) => {
      if (!q) return true;
      const hay = `${title} ${summary} ${(tags || []).join(' ')}`.toLowerCase();
      return hay.includes(q);
    };

    const matchesIndustry = (tags?: string[]) => {
      if (!hasIndustry) return true;
      const tl = (tags || []).map((t) => t.toLowerCase());
      for (const k of selectedIndustryKeywords) {
        if (tl.some((t) => t.includes(k))) return true;
      }
      return false;
    };

    const matchesSelectedProduct = (title: string, tags?: string[]) => {
      if (productFilters.size === 0) return true;
      const titleL = title.toLowerCase();
      const tl = (tags || []).map((t) => t.toLowerCase());
      for (const p of productFilters) {
        const pl = p.toLowerCase();
        if (titleL.includes(pl)) return true;
        if (tl.some((t) => t.includes(pl) || pl.includes(t))) return true;
      }
      return false;
    };

    const matchesSelectedApi = (title: string) => {
      if (apiFilters.size === 0) return true;
      const titleL = title.toLowerCase();
      for (const a of apiFilters) {
        if (titleL.includes(a.toLowerCase())) return true;
      }
      return false;
    };

    const products = PRODUCT_CARDS.filter(
      (c) => matchesIndustry(c.tags) && matchesSelectedProduct(c.title, c.tags) && matchesQuery(c.title, c.summary, c.tags),
    );
    const apis = API_CARDS.filter(
      (c) => matchesIndustry(c.tags) && matchesSelectedApi(c.title) && matchesQuery(c.title, c.summary, c.tags),
    );
    const apps = APP_CARDS.filter((c) => {
      const matchesProducts =
        productFilters.size === 0 ? true : (c.tags || []).some((t) => productFilters.has(t));
      return matchesProducts && matchesQuery(c.title, c.summary, c.tags);
    });

    return { products, apis, apps };
  }, [apiFilters, industries, productFilters, search]);

  return (
    <Layout title="Explore" description="Discover Autodesk products, APIs, and apps">
      <div className="aps-landing">
        <main className="aps-landing__main">
          <section className="aps-hero">
            <div className="aps-hero__left">
              <div className="aps-hero__kicker">Autodesk</div>
              <h1 className="aps-hero__title">Explore products, APIs, and apps.</h1>
              <p className="aps-hero__desc">
                A unified entry point to discover Autodesk software, developer APIs, and marketplace apps — in one place.
              </p>
              <div className="aps-hero__ctaRow">
                <Link className="aps-btn aps-btn--primary" to="/docs">
                  Get started
                </Link>
                <Link className="aps-btn" to="/docs/releases">
                  See newest releases
                </Link>
              </div>

              <div className="aps-seg">
                <div className="aps-seg__card aps-seg__card--expandable">
                  <div className="aps-seg__top">
                    <Link className="aps-seg__label" to="/products">Products</Link>
                  </div>
                  <div className="aps-seg__desc">Discover Autodesk flagship software.</div>
                  <div className="aps-seg__panel" role="group" aria-label="Product shortcuts">
                    {PRODUCT_CARDS.map((c) => (
                      <a key={c.id} className="aps-seg__link" href={c.href}>
                        {c.title}
                      </a>
                    ))}
                    <Link className="aps-seg__more" to="/products">View all products</Link>
                  </div>
                </div>

                <div className="aps-seg__card aps-seg__card--expandable">
                  <div className="aps-seg__top">
                    <Link className="aps-seg__label" to="/docs/apis">APIs</Link>
                  </div>
                  <div className="aps-seg__desc">Build on Autodesk Platform Services.</div>
                  <div className="aps-seg__panel" role="group" aria-label="API shortcuts">
                    {API_CARDS.map((c) => (
                      <a key={c.id} className="aps-seg__link" href={c.href}>
                        {c.title}
                      </a>
                    ))}
                    <Link className="aps-seg__more" to="/docs/apis">View all APIs</Link>
                  </div>
                </div>

                <div className="aps-seg__card aps-seg__card--expandable">
                  <div className="aps-seg__top">
                    <Link className="aps-seg__label" to="/apps">Apps</Link>
                  </div>
                  <div className="aps-seg__desc">Extend products via the App Store.</div>
                  <div className="aps-seg__panel" role="group" aria-label="App shortcuts">
                    {APP_CARDS.map((c) => (
                      <a key={c.id} className="aps-seg__link" href={c.href}>
                        {c.title}
                      </a>
                    ))}
                    <Link className="aps-seg__more" to="/apps">View all apps</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="aps-hero__right">
              <section className="aps-filterbar">
                <div className="aps-filterbar__row">
                  <div className="aps-filterbar__search">
                    <div className="aps-search-wrap">
                      <svg className="aps-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <input
                        className="aps-search"
                        type="search"
                        placeholder="Search products, APIs, and apps…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Search"
                      />
                    </div>
                  </div>

                  <div className="aps-filterbar__actions">
                    {(hasQuery || industries.size > 0 || productFilters.size > 0 || apiFilters.size > 0) && (
                      <button type="button" className="aps-clear-btn" onClick={clearAll}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="aps-filterbar__row">
                  <div className="aps-paramFilters">
                    <details className="aps-param">
                      <summary className="aps-param__summary">
                        Industry
                        <span className="aps-param__value">
                          {industries.size === 0 ? 'Any' : `${industries.size} selected`}
                        </span>
                      </summary>
                      <div className="aps-param__panel" role="group" aria-label="Industry filter">
                        {INDUSTRY_LINKS.map((i) => (
                          <label key={i.id} className="aps-param__option">
                            <input
                              type="checkbox"
                              checked={industries.has(i.label)}
                              onChange={() => setIndustries(toggleSet(industries, i.label))}
                            />
                            <span className="aps-param__optionLabel">{i.label}</span>
                          </label>
                        ))}
                        <button
                          type="button"
                          className="aps-param__reset"
                          onClick={() => setIndustries(new Set())}
                        >
                          Reset industry
                        </button>
                      </div>
                    </details>

                    <details className="aps-param">
                      <summary className="aps-param__summary">
                        Product
                        <span className="aps-param__value">
                          {productFilters.size === 0 ? 'Any' : `${productFilters.size} selected`}
                        </span>
                      </summary>
                      <div className="aps-param__panel" role="group" aria-label="Product filter">
                        <div className="aps-param__options">
                          {PRODUCT_CARDS.map((p) => (
                            <label key={p.id} className="aps-param__option">
                              <input
                                type="checkbox"
                                checked={productFilters.has(p.title)}
                                onChange={() => setProductFilters(toggleSet(productFilters, p.title))}
                              />
                              <span className="aps-param__optionLabel">{p.title}</span>
                            </label>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="aps-param__reset"
                          onClick={() => setProductFilters(new Set())}
                        >
                          Reset product
                        </button>
                      </div>
                    </details>

                    <details className="aps-param">
                      <summary className="aps-param__summary">
                        API
                        <span className="aps-param__value">
                          {apiFilters.size === 0 ? 'Any' : `${apiFilters.size} selected`}
                        </span>
                      </summary>
                      <div className="aps-param__panel" role="group" aria-label="API filter">
                        <div className="aps-param__options">
                          {API_CARDS.map((a) => (
                            <label key={a.id} className="aps-param__option">
                              <input
                                type="checkbox"
                                checked={apiFilters.has(a.title)}
                                onChange={() => setApiFilters(toggleSet(apiFilters, a.title))}
                              />
                              <span className="aps-param__optionLabel">{a.title}</span>
                            </label>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="aps-param__reset"
                          onClick={() => setApiFilters(new Set())}
                        >
                          Reset API
                        </button>
                      </div>
                    </details>
                  </div>
                </div>
              </section>
            </div>
          </section>

          <section className="aps-section">
            <div className="aps-section__head">
              <h2 className="aps-section__title">Featured products</h2>
              <p className="aps-section__desc">A curated subset inspired by Autodesk.com.</p>
            </div>
            <div className="aps-miniGrid">
              {filteredDirectory.products.map((c) => (
                <a key={c.id} className="aps-miniCard" href={c.href}>
                  {c.imageUrl && (
                    <div className="aps-miniCard__media" aria-hidden="true">
                      <img
                        className="aps-miniCard__img"
                        src={c.imageUrl}
                        alt={c.imageAlt ?? ''}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="aps-miniCard__top">
                    <span className="aps-badge aps-badge--soon">Product</span>
                  </div>
                  <div className="aps-miniCard__title">{c.title}</div>
                  <div className="aps-miniCard__desc">{c.summary}</div>
                </a>
              ))}
            </div>
          </section>

          <section className="aps-section">
            <div className="aps-section__head">
              <h2 className="aps-section__title">Popular APIs</h2>
              <p className="aps-section__desc">Inspired by APS: get building fast.</p>
            </div>
            <div className="aps-miniGrid">
              {filteredDirectory.apis.map((c) => (
                <a key={c.id} className="aps-miniCard" href={c.href}>
                  {c.imageUrl && (
                    <div className="aps-miniCard__media" aria-hidden="true">
                      <img
                        className="aps-miniCard__img"
                        src={c.imageUrl}
                        alt={c.imageAlt ?? ''}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="aps-miniCard__top">
                    <span className="aps-badge aps-badge--soon">API</span>
                    {c.badge && <span className="aps-badge aps-badge--beta">{c.badge}</span>}
                  </div>
                  <div className="aps-miniCard__title">{c.title}</div>
                  <div className="aps-miniCard__desc">{c.summary}</div>
                </a>
              ))}
            </div>
          </section>

          <section className="aps-section">
            <div className="aps-section__head">
              <h2 className="aps-section__title">Featured apps</h2>
              <p className="aps-section__desc">A curated subset inspired by the Autodesk App Store.</p>
            </div>
            <div className="aps-miniGrid">
              {filteredDirectory.apps.map((c) => (
                <a key={c.id} className="aps-miniCard" href={c.href}>
                  {c.imageUrl && (
                    <div className="aps-miniCard__media" aria-hidden="true">
                      <img
                        className="aps-miniCard__img"
                        src={c.imageUrl}
                        alt={c.imageAlt ?? ''}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="aps-miniCard__top">
                    <span className="aps-badge aps-badge--soon">App</span>
                  </div>
                  <div className="aps-miniCard__title">{c.title}</div>
                  <div className="aps-miniCard__desc">{c.summary}</div>
                </a>
              ))}
            </div>
          </section>

          <section className="aps-section">
            <div className="aps-section__head">
              <h2 className="aps-section__title">Trending</h2>
              <p className="aps-section__desc">Be an early adopter of the newest releases.</p>
            </div>
            <div className="aps-miniGrid">
              {trendingProducts.length === 0 ? (
                <div className="aps-mutedNote">No trending items right now.</div>
              ) : (
                trendingProducts.map((product) => (
                  <Link key={product.id} to={product.entry.docs} className="aps-miniCard">
                    <div className="aps-miniCard__top">
                      <span className="aps-card-icon" aria-hidden="true">
                        {ICONS_BY_PRODUCT_ID[product.id] ?? <DocIcon />}
                      </span>
                      <span className="aps-badge aps-badge--beta">{product.maturity.toUpperCase()}</span>
                    </div>
                    <div className="aps-miniCard__title">{product.name}</div>
                    <div className="aps-miniCard__desc">{product.summary}</div>
                  </Link>
                ))
              )}
            </div>
          </section>

          <section className="aps-section">
            <div className="aps-section__head">
              <h2 className="aps-section__title">Start building today</h2>
              <p className="aps-section__desc">Our most popular products and APIs.</p>
            </div>
            <div className="aps-miniGrid">
              {featuredProducts.map((product) => (
                <Link key={product.id} to={product.entry.docs} className="aps-miniCard">
                  <div className="aps-miniCard__top">
                    <span className="aps-card-icon" aria-hidden="true">
                      {ICONS_BY_PRODUCT_ID[product.id] ?? <DocIcon />}
                    </span>
                    {product.pricing === 'monetized' && (
                      <span className="aps-badge aps-badge--dollar" title="Usage costs may apply">
                        $
                      </span>
                    )}
                  </div>
                  <div className="aps-miniCard__title">{product.name}</div>
                  <div className="aps-miniCard__desc">{product.summary}</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="aps-section">
            <div className="aps-section__head">
              <h2 className="aps-section__title">Developer documentation</h2>
              <p className="aps-section__desc">Direct entry points into the docs published by this site.</p>
            </div>
            <div className="aps-grid">
              {PRODUCTS.map((product) => {
                const icon = ICONS_BY_PRODUCT_ID[product.id] ?? <DocIcon />;
                return (
                  <Link key={product.id} to={product.entry.docs} className="aps-card">
                    <div className="aps-card-top">
                      <span className="aps-card-icon" aria-hidden="true">{icon}</span>
                      <div className="aps-card-badges">
                        {product.maturity !== 'ga' && (
                          <span className="aps-badge aps-badge--beta">{product.maturity.toUpperCase()}</span>
                        )}
                        {product.pricing === 'monetized' && (
                          <span className="aps-badge aps-badge--dollar" title="Usage costs may apply">$</span>
                        )}
                      </div>
                    </div>
                    <h2 className="aps-card-title">{product.name}</h2>
                    <p className="aps-card-desc">{product.summary}</p>
                    <div className="aps-card-footer">
                      <div className="aps-card-tags">
                        {product.capabilities.map((c) => (
                          <span key={c} className="aps-card-tag">{c}</span>
                        ))}
                      </div>
                      <span className="aps-card-cta">
                        Explore
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
