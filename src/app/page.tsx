import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./home.css";

export const metadata: Metadata = {
  title: "Hire Feroz Arshad — Solo Engineer, Designer & Strategist for Founders",
  description:
    "A one-person practice that ships SaaS, AI automation and high-conversion commerce — weekly Friday demos, outcome pricing, NDA + IP transfer on every brief. Book a free 30-minute intro call.",
  alternates: { canonical: "https://ferozarshad.com" },
  openGraph: {
    title: "Hire Feroz Arshad — Solo Engineer, Designer & Strategist",
    description:
      "Senior engineering, design & strategy in one head. Weekly Friday demos, outcome pricing, full IP transfer.",
    url: "https://ferozarshad.com",
    type: "website",
    images: [{ url: "/logo-black.png", width: 1200, height: 630 }],
  },
};

const proService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Feroz Arshad — Independent Practice",
  description:
    "Senior engineering, design & strategy in one head. Weekly demos, outcome pricing, full IP transfer on delivery.",
  url: "https://ferozarshad.com/",
  image: "https://ferozarshad.com/logo-black.png",
  areaServed: "Worldwide",
  priceRange: "$$$",
  founder: { "@type": "Person", name: "Feroz Arshad" },
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  makesOffer: [
    { "@type": "Offer", name: "The Sprint", price: "8000", priceCurrency: "USD", description: "4-week scoped engagement" },
    { "@type": "Offer", name: "The Build", price: "25000", priceCurrency: "USD", description: "8–16 week full-stack build" },
    { "@type": "Offer", name: "The Retainer", price: "5000", priceCurrency: "USD", description: "Monthly retainer, 20 senior hours" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "60" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What if you're not available when I need you?", acceptedAnswer: { "@type": "Answer", text: "Capacity is shown live in the nav and on each tier card. If the next sprint slot is full I'll tell you up front, lock you in for the following window, and either suggest someone I'd hire for the gap or hold the brief warm." } },
    { "@type": "Question", name: "How is this not just freelancer risk?", acceptedAnswer: { "@type": "Answer", text: "Mutual NDA up front. Full IP assignment on delivery. Escrow available on builds over $20k. Code, design files, and docs in a repo you own from day one." } },
    { "@type": "Question", name: "Can you work with my existing team?", acceptedAnswer: { "@type": "Answer", text: "Yes. Most engagements are alongside an in-house team. I plug in as the senior generalist who owns end-to-end outcomes." } },
    { "@type": "Question", name: "What's the smallest engagement you take?", acceptedAnswer: { "@type": "Answer", text: "The 4-week sprint at $8k is the floor. Below that, it's a paid strategy memo or a single advisory call." } },
    { "@type": "Question", name: "How do you compare to an agency on day one?", acceptedAnswer: { "@type": "Answer", text: "You hear back from me, personally, inside one business day. Written response to your brief, calendar link, and a scoped proposal with weekly milestones inside 48 hours." } },
    { "@type": "Question", name: "What does the first week actually look like?", acceptedAnswer: { "@type": "Answer", text: "Two long calls. A written brief in your words, sharpened. A clickable prototype by day 7." } },
    { "@type": "Question", name: "Where are you based and what timezones do you cover?", acceptedAnswer: { "@type": "Answer", text: "Karachi · UTC+5. Four hours of overlap with EU mornings and US east-coast afternoons." } },
    { "@type": "Question", name: "What does the contract look like?", acceptedAnswer: { "@type": "Answer", text: "A two-page MSA + a one-page SOW per engagement. Mutual NDA, milestone billing, full IP on delivery." } },
  ],
};

export default function HomePage() {
  return (
    <div className="design5-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(proService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="nav" aria-label="Primary">
        <div className="nav-inner">
          <Link className="brand" href="#top">
            <Image src="/logo-black.png" alt="Feroz Arshad logo" width={28} height={28} priority />
            <span>Feroz Arshad</span>
            <span className="ver">v05</span>
          </Link>
          <ul className="nav-links">
            <li><a className="active" href="#offer">Offer</a></li>
            <li><a href="#how">How it works</a></li>
            <li><a href="#cases">Case studies</a></li>
            <li><a href="#compare">vs Agency</a></li>
            <li><a href="#voices">Reviews</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <span className="nav-status">
            <span className="dot" />
            <strong>1 slot left</strong> · Aug 2026
          </span>
          <a className="btn cobalt" href="#book">
            Book intro call
            <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 13 L13 3 M6 3 L13 3 L13 10" />
            </svg>
          </a>
        </div>
      </nav>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="wrap">
            <span className="eyebrow">
              <span className="swatch" aria-hidden="true" />
              Booking Aug 2026 → <strong style={{ color: "var(--ink)", fontWeight: 500 }}>·</strong> One operator · No agency · No handoffs
            </span>
            <h1>
              Senior <em>engineer</em>,<br />
              designer &amp; strategist — <span className="hl">in&nbsp;one&nbsp;head.</span>
            </h1>
            <p className="lede">
              I&apos;m Feroz. I run a one-person practice that ships <strong>SaaS, AI automation and high-conversion commerce</strong> — weekly Friday demos in your inbox, outcome pricing, NDA &amp; IP transfer on every brief. You talk to the person doing the work. Not three account managers and a junior.
            </p>
            <div className="hero-cta">
              <a className="btn cobalt big" href="#book">
                Book a free 30-min intro call
                <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 13 L13 3 M6 3 L13 3 L13 10" />
                </svg>
              </a>
              <a className="btn ghost big" href="#offer">See pricing</a>
              <span className="note">no pitch decks · reply within 1 business day</span>
            </div>

            <div className="proof-strip" aria-label="Client logos">
              <span className="label">Trusted by founders backed by</span>
              <div className="logos">
                <span className="logo"><svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="9" r="7" /><path d="M9 2 L9 16 M2 9 L16 9" /></svg>Plural</span>
                <span className="logo"><svg viewBox="0 0 18 18" fill="currentColor"><polygon points="9,2 16,16 2,16" /></svg>Apex Labs</span>
                <span className="logo"><svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="14" height="14" rx="3" /></svg>Heritage&nbsp;Co.</span>
                <span className="logo"><svg viewBox="0 0 18 18" fill="currentColor"><circle cx="9" cy="9" r="7" /><circle cx="9" cy="9" r="3" fill="var(--bg)" /></svg>Northbound</span>
                <span className="logo"><svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 14 L9 4 L16 14 Z" /></svg>Vertex&nbsp;OS</span>
                <span className="logo"><svg viewBox="0 0 18 18" fill="currentColor"><rect x="3" y="3" width="12" height="12" /></svg>Studio&nbsp;9</span>
              </div>
            </div>

            <div className="metrics">
              <div className="metric"><div className="v">$<em>4.2</em>M</div><div className="k">Client revenue shipped</div></div>
              <div className="metric"><div className="v"><em>60</em>+</div><div className="k">Products in production</div></div>
              <div className="metric"><div className="v"><em>4.9</em>★</div><div className="k">Average client rating</div></div>
              <div className="metric"><div className="v"><em>7</em>&nbsp;yrs</div><div className="k">Independent practice</div></div>
            </div>
          </div>
        </section>

        {/* OFFER */}
        <section className="s" id="offer">
          <div className="wrap">
            <header className="s-head">
              <div>
                <div className="num">/ 01 · The offer</div>
                <h2>Three ways<br />to <em>start.</em></h2>
              </div>
              <p className="aside">
                Productized. Outcome-priced. Each engagement comes with a written brief, weekly Friday demos, 30-day post-ship retainer and full IP transfer on delivery.
              </p>
            </header>

            <div className="offers">
              <article className="offer">
                <span className="tier">/ Tier · 01</span>
                <h3>The <em>Sprint</em></h3>
                <div className="price"><span className="v">$8k</span><span className="u">fixed · 4 wk</span></div>
                <div className="from">scoped, fixed-cost, no scope creep</div>
                <p className="summary">One contained outcome in four weeks. Perfect for a landing page rebuild, a single automation, or a critical fix on an existing product.</p>
                <ul>
                  <li>Written strategy brief in week one</li>
                  <li>Clickable prototype by day 7</li>
                  <li>Weekly Friday demos</li>
                  <li>Production code by week 4</li>
                  <li>Analytics &amp; docs included</li>
                  <li>30-day post-ship retainer</li>
                </ul>
                <a className="cta" href="#book">Book a sprint <span>→</span></a>
                <span className="availability"><span className="d" /> 0 slots open · waitlist only</span>
              </article>

              <article className="offer featured">
                <span className="ribbon">Most chosen</span>
                <span className="tier">/ Tier · 02</span>
                <h3>The <em>Build</em></h3>
                <div className="price"><span className="v">$25k</span><span className="u">from · 8–16 wk</span></div>
                <div className="from">multi-month build · outcome priced</div>
                <p className="summary">Full-stack SaaS, headless commerce, or production AI system. Strategy through ship. The shape I do my best work in.</p>
                <ul>
                  <li>Discovery → architecture → ship</li>
                  <li>Design system + production code</li>
                  <li>Auth, billing, observability done</li>
                  <li>Weekly Friday demos in your inbox</li>
                  <li>Senior-level decisions, in writing</li>
                  <li>Hand-off package + 30-day retainer</li>
                </ul>
                <a className="cta" href="#book">Start a build <span>→</span></a>
                <span className="availability"><span className="d green" /> 1 slot open · Aug 2026 →</span>
              </article>

              <article className="offer">
                <span className="tier">/ Tier · 03</span>
                <h3>The <em>Retainer</em></h3>
                <div className="price"><span className="v">$5k</span><span className="u">per&nbsp;month</span></div>
                <div className="from">ongoing · 3-month minimum</div>
                <p className="summary">An on-call senior partner for founders who&apos;ve shipped — and want one operator continuously moving the needle.</p>
                <ul>
                  <li>20 senior hours / month</li>
                  <li>Strategy + design + engineering</li>
                  <li>Slack &amp; weekly sync access</li>
                  <li>1 business-day response SLA</li>
                  <li>Pause &amp; resume any time</li>
                  <li>Priority on new sprints &amp; builds</li>
                </ul>
                <a className="cta" href="#book">Start a retainer <span>→</span></a>
                <span className="availability"><span className="d green" /> 2 slots open · rolling</span>
              </article>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="s" id="how" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <header className="s-head">
              <div>
                <div className="num">/ 02 · How it works</div>
                <h2>Four weeks to<br />something <em>real.</em></h2>
              </div>
              <p className="aside">
                No kickoff deck. No AI in the strategy. Just weekly Friday demos in your inbox — production code, not slides. We change direction in days, not sprints.
              </p>
            </header>

            <div className="timeline">
              {[
                { n: "01", week: "WEEK 1", title: "Listen", body: "Two long calls. I read your docs, your competitors, what your users actually say. Brief comes back in your words — sharper." },
                { n: "02", week: "WEEK 1–2", title: "Sketch", body: "Pencil, then pixels. You see the architecture, flow, and headline copy before a single line of code is written." },
                { n: "03", week: "WEEK 2–5", title: "Build", body: "Weekly Friday demos in your inbox. Production code, not slides. You watch the thing become real, every seven days." },
                { n: "04", week: "WEEK 6 +", title: "Hand off", body: "Code, design files, docs, the analytics dashboard, and a 30-day retainer so I'm on call when you flip the switch." },
              ].map((s, i) => (
                <div className="tl-step" key={s.n}>
                  <div className="ic">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {i === 0 && (<><path d="M12 4 V 2 M12 22 V 20" /><circle cx="12" cy="12" r="8" /><path d="M8 12 L 11 15 L 16 9" /></>)}
                      {i === 1 && (<><path d="M4 20 L 12 4 L 20 20 Z" /><path d="M9 14 L 15 14" /></>)}
                      {i === 2 && (<><polyline points="9 5 4 12 9 19" /><polyline points="15 5 20 12 15 19" /></>)}
                      {i === 3 && (<><path d="M3 12 L 21 12" /><polyline points="15 6 21 12 15 18" /></>)}
                    </svg>
                  </div>
                  <div className="head-row">
                    <span className="n">/ {s.n}</span>
                    <span className="week">{s.week}</span>
                  </div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES */}
        <section className="s" id="cases" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <header className="s-head">
              <div>
                <div className="num">/ 03 · Case studies</div>
                <h2>Hard numbers,<br /><em>verifiable</em> on request.</h2>
              </div>
              <p className="aside">
                Real builds, real founders, real deltas. Names &amp; full receipts available under NDA — just ask in the brief.
              </p>
            </header>

            <div className="cases">
              <a className="case" href="#book" aria-label="Case study: Heritage Apothecary Shopify rebuild">
                <div className="visual">
                  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <linearGradient id="cf1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#f4efe2" />
                        <stop offset="1" stopColor="#ece6d4" />
                      </linearGradient>
                      <linearGradient id="cf1-b" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#1a2a1c" />
                        <stop offset="1" stopColor="#3a5236" />
                      </linearGradient>
                    </defs>
                    <rect width="800" height="600" fill="url(#cf1)" />
                    <g transform="translate(80 100)">
                      <path d="M50 50 q 0 -32 50 -32 q 50 0 50 32 v 30 q 32 12 32 56 v 230 q 0 28 -28 28 h -108 q -28 0 -28 -28 v -230 q 0 -44 32 -56 z" fill="url(#cf1-b)" />
                      <rect x="48" y="160" width="104" height="180" fill="#f0e5cb" />
                      <text x="100" y="200" textAnchor="middle" fontFamily="Source Serif 4" fontStyle="italic" fontSize="22" fill="#1a2a1c">№ 07</text>
                      <text x="100" y="226" textAnchor="middle" fontFamily="Geist" fontSize="11" fill="#1a2a1c" letterSpacing="2">HERITAGE</text>
                      <text x="100" y="246" textAnchor="middle" fontFamily="Geist" fontSize="11" fill="#1a2a1c" letterSpacing="2">APOTHECARY</text>
                      <line x1="62" y1="264" x2="138" y2="264" stroke="#1a2a1c" />
                      <text x="100" y="284" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fill="#1a2a1c" letterSpacing="2">100ML · ELIXIR</text>
                    </g>
                    <g transform="translate(330 130)">
                      <text x="0" y="20" fontFamily="Geist Mono" fontSize="10" fill="#807a70" letterSpacing="3">№ 07 · ELIXIR · LIMITED</text>
                      <text x="0" y="70" fontFamily="Source Serif 4" fontStyle="italic" fontSize="46" fill="#0e0b08">Heritage</text>
                      <text x="0" y="118" fontFamily="Source Serif 4" fontStyle="italic" fontSize="46" fill="#0e0b08">Apothecary</text>
                      <line x1="0" y1="142" x2="280" y2="142" stroke="#0e0b08" />
                      <text x="0" y="172" fontFamily="Geist" fontSize="14" fill="#3d3a35">A daily tonic, blended in copper.</text>
                      <text x="0" y="192" fontFamily="Geist" fontSize="14" fill="#3d3a35">For mornings that need a slower start.</text>
                      <rect x="0" y="216" width="160" height="44" fill="#0e0b08" />
                      <text x="80" y="244" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="#f4efe2" fontWeight="500" letterSpacing="2">ADD TO CART · $48</text>
                      <rect x="170" y="216" width="180" height="44" fill="none" stroke="#0e0b08" />
                      <text x="260" y="244" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="#0e0b08" letterSpacing="2">SUBSCRIBE −15%</text>
                    </g>
                    <g transform="translate(660 90)">
                      <circle cx="0" cy="0" r="64" fill="#1e3aff" />
                      <text x="0" y="-8" textAnchor="middle" fontFamily="Geist" fontWeight="600" fontSize="22" fill="#fff" letterSpacing="-1">+42%</text>
                      <text x="0" y="14" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fill="#fff" letterSpacing="2">CONVERSION</text>
                      <text x="0" y="30" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fill="#fff" letterSpacing="2">LIFT</text>
                    </g>
                  </svg>
                </div>
                <div className="body">
                  <div className="topline">
                    <span>Case · 01 · Commerce</span>
                    <span>Shopify · React · CRO · 7 mo</span>
                  </div>
                  <h3>Heritage Apothecary — a <em>$1.1M</em> PDP rebuild.</h3>
                  <p>Full Hydrogen rebuild with custom subscription &amp; bundle logic. Conversion-led copy &amp; CRO instrumentation. Replaced a Shopify theme that had grown into 18 conflicting apps.</p>
                  <div className="delta">
                    <div className="d"><div className="v"><em>+42%</em></div><div className="k">conversion rate</div></div>
                    <div className="d"><div className="v"><em>$1.1M</em></div><div className="k">revenue · 7 mo</div></div>
                    <div className="d"><div className="v"><em>2.1×</em></div><div className="k">revenue per visitor</div></div>
                  </div>
                  <blockquote className="quote">
                    &ldquo;We shipped the rewrite in seven weeks. Revenue per visitor doubled in the first month.&rdquo;
                    <cite>Maya R. · Founder, D2C $4M ARR</cite>
                  </blockquote>
                </div>
              </a>

              <a className="case reverse" href="#book" aria-label="Case study: autonomous n8n support routing">
                <div className="visual">
                  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                    <rect width="800" height="600" fill="#0e0b08" />
                    <g stroke="rgba(244,239,226,.08)" strokeWidth=".5">
                      {[120, 240, 360, 480].map((y) => <line key={y} x1="0" y1={y} x2="800" y2={y} />)}
                      {[100, 200, 300, 400, 500, 600, 700].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="600" />)}
                    </g>
                    <g>
                      <circle cx="100" cy="300" r="46" fill="#1e3aff" />
                      <text x="100" y="306" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="#fff" fontWeight="500" letterSpacing="2">INBOX</text>
                      <circle cx="300" cy="180" r="46" fill="none" stroke="#f4efe2" strokeWidth="2" />
                      <text x="300" y="186" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="#f4efe2" letterSpacing="2">CLASSIFY</text>
                      <circle cx="300" cy="420" r="46" fill="none" stroke="#f4efe2" strokeWidth="2" />
                      <text x="300" y="426" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="#f4efe2" letterSpacing="2">ENRICH</text>
                      <circle cx="500" cy="180" r="46" fill="none" stroke="#f4efe2" strokeWidth="2" />
                      <text x="500" y="186" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="#f4efe2" letterSpacing="2">DRAFT</text>
                      <circle cx="500" cy="420" r="46" fill="none" stroke="#f4efe2" strokeWidth="2" />
                      <text x="500" y="426" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="#f4efe2" letterSpacing="2">ROUTE</text>
                      <circle cx="700" cy="300" r="46" fill="rgba(30,58,255,.18)" stroke="#1e3aff" strokeWidth="2" />
                      <text x="700" y="306" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="#1e3aff" fontWeight="500" letterSpacing="2">SEND</text>
                      <g stroke="#1e3aff" strokeWidth="2" fill="none">
                        <path d="M146 280 L 254 200" />
                        <path d="M146 320 L 254 400" />
                        <path d="M346 180 L 454 180" />
                        <path d="M346 420 L 454 420" />
                        <path d="M500 226 L 500 374" />
                        <path d="M546 200 L 654 280" />
                        <path d="M546 400 L 654 320" />
                      </g>
                    </g>
                    <text x="40" y="560" fontFamily="Geist Mono" fontSize="11" fill="rgba(244,239,226,.5)" letterSpacing="3">FIG 02 · 18,000 TICKETS / MONTH · AUTONOMOUS</text>
                  </svg>
                </div>
                <div className="body">
                  <div className="topline">
                    <span>Case · 02 · AI / Ops</span>
                    <span>n8n · OpenAI · Python · 9 days</span>
                  </div>
                  <h3>Autonomous <em>support</em> routing on n8n.</h3>
                  <p>Intake → classification → reply drafting end-to-end. Plugged into Zendesk and HubSpot with a small Postgres state machine. Replaced a two-person support team&apos;s first-pass triage.</p>
                  <div className="delta">
                    <div className="d"><div className="v"><em>−71%</em></div><div className="k">support cost</div></div>
                    <div className="d"><div className="v"><em>18k</em></div><div className="k">tickets / mo</div></div>
                    <div className="d"><div className="v"><em>9</em>&nbsp;days</div><div className="k">build to live</div></div>
                  </div>
                  <blockquote className="quote">
                    &ldquo;Two consultants quoted us six months. Feroz had the automation running in nine days.&rdquo;
                    <cite>Priya M. · Head of Ops, Series B fintech</cite>
                  </blockquote>
                </div>
              </a>

              <a className="case" href="#book" aria-label="Case study: B2B lead-gen scraper SaaS">
                <div className="visual">
                  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                    <rect width="800" height="600" fill="#f4efe2" />
                    <rect x="40" y="40" width="720" height="520" rx="8" fill="#fff" stroke="#d9d1bf" />
                    <rect x="40" y="40" width="720" height="44" rx="8" fill="#0e0b08" />
                    <circle cx="60" cy="62" r="5" fill="#1e3aff" />
                    <circle cx="76" cy="62" r="5" fill="rgba(244,239,226,.3)" />
                    <circle cx="92" cy="62" r="5" fill="rgba(244,239,226,.3)" />
                    <text x="400" y="66" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="#f4efe2" letterSpacing="3">LEADGEN · DASHBOARD · v04</text>
                    <rect x="60" y="104" width="180" height="436" rx="8" fill="#f4efe2" stroke="#d9d1bf" />
                    <text x="74" y="130" fontFamily="Geist Mono" fontSize="10" fill="#807a70" letterSpacing="3">FILTERS</text>
                    <g fontFamily="Geist" fontSize="13" fill="#0e0b08">
                      <text x="74" y="160">▢ industry</text>
                      <text x="74" y="184">▣ geography</text>
                      <text x="74" y="208">▢ headcount</text>
                      <text x="74" y="232">▣ funding stage</text>
                      <text x="74" y="256">▢ tech stack</text>
                      <text x="74" y="280">▢ intent</text>
                    </g>
                    <rect x="74" y="308" width="152" height="36" rx="6" fill="#1e3aff" />
                    <text x="150" y="332" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="#fff" fontWeight="500" letterSpacing="2">RUN QUERY ▸</text>
                    <g fontFamily="Geist" fontSize="15" fill="#0e0b08">
                      {[
                        { n: "Acme Co.", e: "sales@acme.io", y: 130 },
                        { n: "Globex Ltd", e: "bd@globex.com", y: 158 },
                        { n: "Initech", e: "founder@initech.io", y: 186 },
                        { n: "Massive Dynamic", e: "ops@m-d.io", y: 214 },
                        { n: "Pied Piper", e: "hr@piedpiper.io", y: 242 },
                        { n: "Hooli", e: "partner@hooli.com", y: 270 },
                        { n: "Soylent", e: "ceo@soylent.co", y: 298 },
                        { n: "Stark Industries", e: "pep@stark.io", y: 326 },
                      ].map((r) => (
                        <text key={r.y} x="266" y={r.y}>{r.n} · {r.e}</text>
                      ))}
                    </g>
                    <g fontFamily="Geist Mono" fontSize="11" fill="#1e3aff">
                      {[130, 158, 186, 214, 242, 270, 298, 326].map((y) => (
                        <text key={y} x="720" y={y} textAnchor="end">[+]</text>
                      ))}
                    </g>
                    <line x1="266" y1="350" x2="720" y2="350" stroke="#d9d1bf" />
                    <text x="266" y="380" fontFamily="Geist Mono" fontSize="11" fill="#807a70" letterSpacing="3">8 OF 240,000 · QUERY 0.08s</text>
                  </svg>
                </div>
                <div className="body">
                  <div className="topline">
                    <span>Case · 03 · SaaS</span>
                    <span>Full-stack · scraping · 11 mo</span>
                  </div>
                  <h3>Enterprise B2B <em>lead-gen</em> SaaS.</h3>
                  <p>Pulls signal from 14 sources, dedupes against a 12M-row Postgres index, exports ready-to-call lists. Multi-tenant from day one. Now serves 8 sales teams across 3 continents.</p>
                  <div className="delta">
                    <div className="d"><div className="v"><em>240k</em></div><div className="k">leads / month</div></div>
                    <div className="d"><div className="v"><em>0.08</em>s</div><div className="k">query p50</div></div>
                    <div className="d"><div className="v"><em>8</em>&nbsp;teams</div><div className="k">live tenants</div></div>
                  </div>
                  <blockquote className="quote">
                    &ldquo;The closest thing to having a senior CTO without the equity grant.&rdquo;
                    <cite>Daniel K. · CEO, B2B SaaS</cite>
                  </blockquote>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* VS AGENCY */}
        <section className="s" id="compare" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <header className="s-head">
              <div>
                <div className="num">/ 04 · The honest comparison</div>
                <h2>One operator<br /><em>vs.</em> a small agency.</h2>
              </div>
              <p className="aside">
                The difference is not quality — it&apos;s surface area. Same senior craftsmanship, half the friction. Choose the model that fits your stage.
              </p>
            </header>

            <div className="compare">
              <div className="row head">
                <div className="col">/ Capability</div>
                <div className="col you">Feroz</div>
                <div className="col">Typical agency</div>
              </div>
              {[
                ["Who you actually talk to", "The person doing the work", "Account manager + project manager"],
                ["Time to first prototype", "7 days", "4–8 weeks of \"discovery\""],
                ["Strategy & engineering — same head?", "Yes — every decision", "No — hand-offs between teams"],
                ["Change direction mid-build", "In days", "Change-order + invoice"],
                ["Weekly working-software demos", "Every Friday, in your inbox", "Monthly status slides"],
                ["Senior-level decisions", "On every line", "Sold senior, delivered junior"],
                ["Pricing", "Outcome & sprint-priced", "Hourly · rate cards · markups"],
                ["IP transfer & NDA", "Mutual NDA + full IP on delivery", "Negotiated per engagement"],
              ].map(([cap, you, them]) => (
                <div className="row" key={cap}>
                  <div className="col">{cap}</div>
                  <div className="col yes">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--cobalt)" strokeWidth="2.4">
                      <path d="M3 9 L7 13 L15 5" />
                    </svg>
                    {you}
                  </div>
                  <div className="col no">{them}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="s" id="voices" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <header className="s-head">
              <div>
                <div className="num">/ 05 · What clients say</div>
                <h2>Receipts from<br /><em>real</em> founders.</h2>
              </div>
              <p className="aside">
                Lightly edited for length, never for meaning. Reference calls available on request — most of these clients will pick up the phone for you.
              </p>
            </header>

            <div className="wall">
              {[
                { featured: true, av: "M", quote: "Feroz ran point on strategy, design and the build. We shipped the rewrite in seven weeks. Revenue per visitor doubled in the first month — and we didn't change ad spend.", name: "Maya R.", role: "Founder · D2C, $4M ARR" },
                { av: "D", quote: "The closest thing to having a senior CTO without the equity grant. He told us no when we needed to hear it, and yes when it mattered.", name: "Daniel K.", role: "CEO · B2B SaaS" },
                { av: "P", quote: "Two consultants quoted us six months. Feroz had the automation running in nine days. It still routes 18,000 tickets a month, untouched.", name: "Priya M.", role: "Head of Ops · Series B fintech" },
                { av: "A", quote: "We came in expecting a contractor. We left with a partner. Three engagements in, every brief is shorter — because he already gets it.", name: "Asad H.", role: "COO · Headless commerce" },
                { av: "L", quote: "Friday demos are the kind of accountability you don't realize you needed until you've seen them. They reset the whole tempo of our build.", name: "Liam G.", role: "Solo founder · Seed-stage AI" },
                { av: "S", quote: "Feroz writes documentation the way other engineers write code. We onboarded our next dev in under a day because everything is already explained.", name: "Sana K.", role: "CTO · Platform startup" },
              ].map((t, i) => (
                <figure className={`testi${t.featured ? " featured" : ""}`} key={i}>
                  <div className="stars">★★★★★</div>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <figcaption className="who">
                    <span className="av">{t.av}</span>
                    <div>
                      <div className="n">{t.name}</div>
                      <div className="r">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="s" id="founder" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="founder">
              <figure className="portrait">
                <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="fb" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#ece6d4" />
                      <stop offset="1" stopColor="#d9d1bf" />
                    </linearGradient>
                    <radialGradient id="fg" cx="50%" cy="35%" r="60%">
                      <stop offset="0" stopColor="#1e3aff" stopOpacity=".18" />
                      <stop offset="1" stopColor="#1e3aff" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="400" height="500" fill="url(#fb)" />
                  <rect width="400" height="500" fill="url(#fg)" />
                  <g stroke="#0e0b08" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M50 500 Q 60 380 170 350 Q 200 342 230 350 Q 340 380 350 500" />
                    <path d="M175 354 Q 200 368 225 354" />
                    <path d="M170 366 Q 200 388 230 366" />
                    <ellipse cx="200" cy="240" rx="76" ry="92" />
                    <path d="M128 208 Q 136 120 200 116 Q 264 120 272 208 Q 266 184 244 178 Q 222 196 200 178 Q 178 196 154 178 Q 132 184 128 208" />
                    <circle cx="170" cy="244" r="22" />
                    <circle cx="230" cy="244" r="22" />
                    <path d="M192 244 Q 200 238 208 244" />
                    <path d="M148 240 L 130 234" />
                    <path d="M252 240 L 270 234" />
                    <path d="M200 260 Q 195 290 205 304" />
                    <path d="M152 294 Q 158 348 200 360 Q 242 348 248 294" strokeDasharray="3 4" />
                    <path d="M180 324 Q 200 332 220 324" />
                  </g>
                  <g transform="translate(310 380) rotate(-18)" stroke="#1e3aff" strokeWidth="2.4" fill="none" strokeLinecap="round">
                    <line x1="0" y1="0" x2="46" y2="-46" />
                    <polyline points="32,-46 46,-46 46,-32" />
                  </g>
                  <text x="20" y="36" fontFamily="Geist Mono" fontSize="10" fill="#807a70" letterSpacing="3">CAST · LEAD</text>
                  <text x="20" y="478" fontFamily="Geist Mono" fontSize="10" fill="#807a70" letterSpacing="3">FEROZ ARSHAD · KARACHI</text>
                </svg>
              </figure>

              <div className="body">
                <p className="greet">Hi, I&apos;m Feroz —</p>
                <h2>You&apos;re hiring a <em>partner</em>, not a vendor.</h2>
                <p>
                  I&apos;ve spent seven years as a one-person engineering &amp; design practice, working with founders in commerce, SaaS, and frontier AI. I write the strategy memo, draw the screens, write the code, and stand behind the metrics — every week, in your inbox.
                </p>
                <p>
                  Before going independent I shipped consumer products at two startups and four years inside a commerce agency I do not name. I left because handoffs were killing the work. <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Making things end-to-end is the only way to keep the brief sharp.</strong>
                </p>
                <div className="signature">— Feroz</div>
                <div className="tag">Independent · Karachi · est. 2019</div>

                <div className="badges">
                  <span>Mutual NDA up front</span>
                  <span>Full IP on delivery</span>
                  <span>Weekly Friday demos</span>
                  <span>1-business-day reply</span>
                  <span>References on request</span>
                  <span>Escrow if you prefer</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="s" id="faq" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <header className="s-head">
              <div>
                <div className="num">/ 06 · Objections handled</div>
                <h2>The questions<br />that always <em>come up.</em></h2>
              </div>
              <p className="aside">Honest answers, written by me. If your question isn&apos;t here, just ask in the brief and I&apos;ll add it next month.</p>
            </header>

            <div className="faq">
              {[
                { open: true, q: "What if you're not available when I need you?", a: "Capacity is shown live in the nav and on each tier card. If the next sprint slot is full I'll tell you up front, lock you in for the following window, and either suggest someone I'd hire for the gap or hold the brief warm. No pretending." },
                { q: "How is this not just \"freelancer risk\"?", a: "Mutual NDA up front. Full IP assignment on delivery. Escrow available on builds over $20k. Code, design files, and docs in a repo you own from day one — so if I get hit by a bus, your team can keep shipping." },
                { q: "Can you work with my existing team?", a: "Yes — most engagements are alongside an in-house team. I plug in as the senior generalist who owns end-to-end outcomes, while your engineers stay focused on the platform. I'll PR-review and document anything I ship." },
                { q: "What's the smallest engagement you take?", a: "The 4-week sprint at $8k is the floor. Below that, it's me writing a paid strategy memo or doing a single advisory call. I don't take projects I can't ship inside a clean Friday-demo cadence." },
                { q: "How do you compare to an agency on day one?", a: "You hear back from me, personally, inside one business day. There's no agency sales call. You get a written response to your brief, a calendar link, and — if it's a fit — a scoped proposal with weekly milestones inside 48 hours." },
                { q: "What does the first week actually look like?", a: "Two long calls. A written brief in your words, sharpened. A clickable prototype by day 7. By Friday you have a sense of voice, architecture, and tempo — and you can call it off if the cadence isn't yours." },
                { q: "Where are you based and what timezones do you cover?", a: "Karachi · UTC+5. Four hours of overlap with EU mornings and US east-coast afternoons. Most clients sync once a week and async the rest — and I reply inside one business day, every day." },
                { q: "What does the contract look like?", a: "A two-page MSA + a one-page SOW per engagement. Mutual NDA, milestone billing, full IP on delivery. I'll send a sample after the intro call so you can run it past your counsel without any drama." },
              ].map((f, i) => (
                <details key={i} open={f.open}>
                  <summary>
                    <h3>{f.q}</h3>
                    <span className="tg" aria-hidden="true" />
                  </summary>
                  <div className="ans">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* BOOK */}
        <section id="book">
          <div className="wrap">
            <div className="close">
              <div className="num">/ 07 · Book the intro call</div>
              <h2>Got a brief?<br /><em>Let&apos;s start.</em></h2>
              <p>30 minutes. No pitch deck. We&apos;ll talk through the goal, the constraints, and whether I&apos;m the right operator. If yes, scoped proposal in your inbox inside 48 hours.</p>
              <div className="row">
                <a className="btn primary big" href="mailto:hello@ferozarshad.com?subject=Booking%20%C2%B7%20intro%20call">
                  Book a 30-min intro call
                  <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 13 L13 3 M6 3 L13 3 L13 10" />
                  </svg>
                </a>
                <a className="btn ghost big" href="mailto:hello@ferozarshad.com?subject=Brief">Email a brief instead</a>
              </div>
              <div className="below">replies inside 1 business day · NDA on first call · no agency middlemen</div>
            </div>
          </div>
        </section>
      </main>

      <aside className="stickbar" aria-label="Persistent CTA">
        <span className="left">
          <span className="d" aria-hidden="true" />
          <strong>1 slot open</strong>
          <span className="l-long">· next start Aug 2026</span>
        </span>
        <a className="btn cobalt" href="#book">Book intro call →</a>
      </aside>

      <footer className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="big">
                <Image src="/logo-black.png" alt="" width={28} height={28} /> Feroz Arshad
              </div>
              <p>Independent engineer, designer &amp; strategist. Building the things founders sketch on napkins, since 2019.</p>
            </div>
            <div>
              <h5>Offer</h5>
              <ul>
                <li><a href="#offer">Sprint · $8k</a></li>
                <li><a href="#offer">Build · $25k+</a></li>
                <li><a href="#offer">Retainer · $5k/mo</a></li>
                <li><a href="#book">Book a call</a></li>
              </ul>
            </div>
            <div>
              <h5>Page</h5>
              <ul>
                <li><a href="#how">How it works</a></li>
                <li><a href="#cases">Case studies</a></li>
                <li><a href="#compare">vs Agency</a></li>
                <li><a href="#voices">Reviews</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5>Elsewhere</h5>
              <ul>
                <li><a href="https://github.com/ferozarshad" target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
                <li><a href="https://linkedin.com/in/ferozarshad" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
                <li><Link href="/portfolio">Portfolio ↗</Link></li>
                <li><a href="mailto:hello@ferozarshad.com">Email ↗</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} Feroz Arshad — all rights reserved</span>
            <span>Karachi · UTC+5 · response in 1 business day</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
