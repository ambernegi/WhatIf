import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {
  ALL_CAPABILITIES,
  ALL_INDUSTRIES,
  PRODUCTS,
  SOLUTIONS,
  type Maturity,
  type Pricing as ProductPricing,
} from '../data/catalog';

type ActiveTab = 'products' | 'solutions';
type PricingFilter = 'all' | ProductPricing;
type MaturityFilter = 'all' | Maturity;

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
  const [tab, setTab] = useState<ActiveTab>('products');
  const [search, setSearch] = useState('');
  const [pricing, setPricing] = useState<PricingFilter>('all');
  const [maturity, setMaturity] = useState<MaturityFilter>('all');
  const [industries, setIndustries] = useState<Set<string>>(new Set());
  const [capabilities, setCapabilities] = useState<Set<string>>(new Set());

  const toggleSet = (set: Set<string>, value: string): Set<string> => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  };

  const hasFilters =
    pricing !== 'all' ||
    maturity !== 'all' ||
    industries.size > 0 ||
    capabilities.size > 0 ||
    search.trim() !== '';

  const clearFilters = () => {
    setSearch('');
    setPricing('all');
    setMaturity('all');
    setIndustries(new Set());
    setCapabilities(new Set());
  };

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      if (pricing !== 'all' && product.pricing !== pricing) return false;
      if (maturity !== 'all' && product.maturity !== maturity) return false;
      if (industries.size > 0 && !product.industries.some((i) => industries.has(i))) return false;
      if (capabilities.size > 0 && !product.capabilities.some((c) => capabilities.has(c)))
        return false;
      if (q && !product.name.toLowerCase().includes(q) && !product.summary.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [search, pricing, maturity, industries, capabilities]);

  const filteredSolutions = useMemo(() => {
    const q = search.trim().toLowerCase();
    const productById = new Map(PRODUCTS.map((p) => [p.id, p] as const));
    return SOLUTIONS.filter((solution) => {
      if (q && !solution.name.toLowerCase().includes(q) && !solution.summary.toLowerCase().includes(q))
        return false;
      if (industries.size === 0 && capabilities.size === 0 && maturity === 'all' && pricing === 'all')
        return true;

      // Derive solution attributes from the products it uses.
      const products = solution.usesProducts
        .map((id) => productById.get(id))
        .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p));
      if (products.length === 0) return false;

      if (pricing !== 'all' && !products.some((p) => p.pricing === pricing)) return false;
      if (maturity !== 'all' && !products.some((p) => p.maturity === maturity)) return false;
      if (industries.size > 0 && !products.some((p) => p.industries.some((i) => industries.has(i))))
        return false;
      if (capabilities.size > 0 && !products.some((p) => p.capabilities.some((c) => capabilities.has(c))))
        return false;

      return true;
    });
  }, [search, pricing, maturity, industries, capabilities]);

  const featuredProducts = useMemo(() => {
    return [...PRODUCTS]
      .filter((p) => typeof p.featuredRank === 'number')
      .sort((a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999))
      .slice(0, 4);
  }, []);

  const trendingProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.maturity !== 'ga').slice(0, 4);
  }, []);

  return (
    <Layout title="Explore" description="Explore Autodesk products and solution journeys">
      <div className="aps-landing">
        <main className="aps-landing__main">
          <section className="aps-hero">
            <div className="aps-hero__kicker">Autodesk Platform Services</div>
            <h1 className="aps-hero__title">Explore products and solution journeys.</h1>
            <p className="aps-hero__desc">
              Browse by industry and capability, then dive into docs, SDKs & samples, and releases.
            </p>
            <div className="aps-hero__ctaRow">
              <Link className="aps-btn aps-btn--primary" to="/docs">
                Get started
              </Link>
              <Link className="aps-btn" to="/docs/releases">
                See newest releases
              </Link>
            </div>
          </section>

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
                    placeholder="Search products and solutions…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search"
                  />
                </div>
              </div>

              <div className="aps-filterbar__actions">
                <div className="aps-pills">
                  <button
                    type="button"
                    className={tab === 'products' ? 'aps-pill aps-pill--active' : 'aps-pill'}
                    onClick={() => setTab('products')}
                  >
                    Products
                  </button>
                  <button
                    type="button"
                    className={tab === 'solutions' ? 'aps-pill aps-pill--active' : 'aps-pill'}
                    onClick={() => setTab('solutions')}
                  >
                    Solutions
                  </button>
                </div>
                {hasFilters && (
                  <button type="button" className="aps-clear-btn" onClick={clearFilters}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="aps-filterbar__row">
              <div className="aps-filterbar__group">
                <span className="aps-filterbar__label">Pricing</span>
                <div className="aps-pills">
                  {(['all', 'free', 'monetized', 'mixed'] as PricingFilter[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={pricing === p ? 'aps-pill aps-pill--active' : 'aps-pill'}
                      onClick={() => setPricing(p)}
                    >
                      {p === 'all' ? 'All' : p === 'free' ? 'Free' : p === 'mixed' ? 'Mixed' : (
                        <span className="aps-pill-dollar-wrap">
                          Monetized <span className="aps-dollar" title="Usage costs may apply">$</span>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="aps-filterbar__group">
                <span className="aps-filterbar__label">Maturity</span>
                <div className="aps-pills">
                  {(['all', 'ga', 'beta', 'alpha'] as MaturityFilter[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={maturity === m ? 'aps-pill aps-pill--active' : 'aps-pill'}
                      onClick={() => setMaturity(m)}
                    >
                      {m === 'all' ? 'All' : m.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="aps-filterbar__row">
              <div className="aps-filterbar__group">
                <span className="aps-filterbar__label">Industry</span>
                <div className="aps-pills">
                  {ALL_INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      type="button"
                      className={industries.has(ind) ? 'aps-pill aps-pill--active' : 'aps-pill'}
                      onClick={() => setIndustries(toggleSet(industries, ind))}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              <div className="aps-filterbar__group">
                <span className="aps-filterbar__label">Capability</span>
                <div className="aps-pills">
                  {ALL_CAPABILITIES.map((cap) => (
                    <button
                      key={cap}
                      type="button"
                      className={capabilities.has(cap) ? 'aps-pill aps-pill--active' : 'aps-pill'}
                      onClick={() => setCapabilities(toggleSet(capabilities, cap))}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </div>
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

          <header className="aps-page-header">
            <h1 className="aps-page-title">Explore</h1>
            <p className="aps-page-desc">
              Start from a product or choose a solution journey, then dive into docs, SDKs, and releases.
            </p>
          </header>

          {tab === 'products' ? (
            filteredProducts.length === 0 ? (
              <div className="aps-empty">
                <p>No products match your filters.</p>
                <button type="button" className="aps-clear-btn" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <p className="aps-result-count">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  {hasFilters && (
                    <button type="button" className="aps-result-clear" onClick={clearFilters}>
                      Clear filters
                    </button>
                  )}
                </p>
                <div className="aps-grid">
                  {filteredProducts.map((product) => {
                    const icon = ICONS_BY_PRODUCT_ID[product.id] ?? <DocIcon />;
                    const cardContent = (
                      <>
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
                      </>
                    );
                    return (
                      <Link key={product.id} to={product.entry.docs} className="aps-card">
                        {cardContent}
                      </Link>
                    );
                  })}
                </div>
              </>
            )
          ) : filteredSolutions.length === 0 ? (
            <div className="aps-empty">
              <p>No solutions match your filters.</p>
              <button type="button" className="aps-clear-btn" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <p className="aps-result-count">
                Showing {filteredSolutions.length} {filteredSolutions.length === 1 ? 'solution' : 'solutions'}
                {hasFilters && (
                  <button type="button" className="aps-result-clear" onClick={clearFilters}>
                    Clear filters
                  </button>
                )}
              </p>
              <div className="aps-grid">
                {filteredSolutions.map((solution) => {
                  const cardContent = (
                    <>
                      <div className="aps-card-top">
                        <span className="aps-card-icon" aria-hidden="true"><DocIcon /></span>
                        <div className="aps-card-badges">
                          <span className="aps-badge aps-badge--soon">Collection</span>
                        </div>
                      </div>
                      <h2 className="aps-card-title">{solution.name}</h2>
                      <p className="aps-card-desc">{solution.summary}</p>
                      <div className="aps-card-footer">
                        <div className="aps-card-tags">
                          {solution.usesProducts.slice(0, 3).map((p) => (
                            <span key={p} className="aps-card-tag">{p.replaceAll('-', ' ')}</span>
                          ))}
                        </div>
                        <span className="aps-card-cta">
                          Explore
                          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </>
                  );
                  return (
                    <Link key={solution.id} to={solution.entry.docs} className="aps-card">
                      {cardContent}
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </main>
      </div>
    </Layout>
  );
}
