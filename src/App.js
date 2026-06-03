import React, { useState, useEffect, useRef } from "react";

// ── CINEMATIC ZEDPING LANDING PAGE ──────────────────────────────────────────
// Aesthetic: Dark cinematic · Film noir meets African tech · Dramatic lighting
// Fonts: Bebas Neue (display) + DM Sans (body)
// Palette: Deep black · Electric cyan · Warm amber · Smoke white

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');

  :root {
    --black: #060608;
    --deep: #0C0C14;
    --surface: #12121C;
    --indigo: #4F46E5;
    --cyan: #06B6D4;
    --amber: #F59E0B;
    --smoke: #E8E8F0;
    --mist: #9090A8;
    --border: rgba(255,255,255,0.06);
    --grain: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--black);
    color: var(--smoke);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* Film grain overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: var(--grain);
    opacity: 0.025;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: overlay;
  }

  /* Scanlines */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.03) 2px,
      rgba(0,0,0,0.03) 4px
    );
    pointer-events: none;
    z-index: 9998;
  }

  a { text-decoration: none; color: inherit; }

  /* Typography */
  .display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; line-height: 0.95; }
  .mono { font-family: 'Space Mono', monospace; }

  /* Cinematic button */
  .btn-cin {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--smoke); color: var(--black);
    padding: 14px 28px; font-family: 'Space Mono', monospace;
    font-size: 12px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; border: none; cursor: pointer;
    transition: all 0.3s; clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }
  .btn-cin:hover { background: var(--cyan); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(6,182,212,0.3); }

  .btn-ghost-cin {
    display: inline-flex; align-items: center; gap: 10px;
    background: transparent; color: var(--smoke);
    padding: 13px 28px; font-family: 'Space Mono', monospace;
    font-size: 12px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; border: 1px solid rgba(255,255,255,0.2);
    cursor: pointer; transition: all 0.3s;
  }
  .btn-ghost-cin:hover { border-color: var(--cyan); color: var(--cyan); }

  /* Animated reveal */
  .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
  .reveal.show { opacity: 1; transform: translateY(0); }

  /* Horizontal rule */
  .rule { height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); }

  /* Spotlight */
  .spotlight {
    position: absolute; border-radius: 50%; pointer-events: none;
    background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%);
    filter: blur(40px);
  }

  /* Nav */
  .nav-link-cin {
    font-family: 'Space Mono', monospace; font-size: 11px;
    font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    color: var(--mist); transition: color 0.2s;
  }
  .nav-link-cin:hover { color: var(--smoke); }

  /* Stat */
  .stat-block { border-left: 2px solid var(--cyan); padding-left: 20px; }

  /* Feature card */
  .feat-card {
    background: var(--surface); border: 1px solid var(--border);
    padding: 32px 28px; position: relative; overflow: hidden;
    transition: all 0.3s;
  }
  .feat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--cyan), transparent);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s ease;
  }
  .feat-card:hover::before { transform: scaleX(1); }
  .feat-card:hover { border-color: rgba(6,182,212,0.2); }

  /* Chat bubble */
  .bubble-out { background: var(--indigo); border-radius: 18px 18px 4px 18px; padding: 11px 16px; }
  .bubble-in { background: var(--surface); border: 1px solid var(--border); border-radius: 18px 18px 18px 4px; padding: 11px 16px; }

  /* Plan card */
  .plan { background: var(--surface); border: 1px solid var(--border); padding: 36px 30px; position: relative; }
  .plan.featured { border-color: var(--cyan); box-shadow: 0 0 60px rgba(6,182,212,0.08), inset 0 1px 0 rgba(6,182,212,0.15); }

  /* FAQ */
  .faq-item { border-bottom: 1px solid var(--border); overflow: hidden; cursor: pointer; }

  /* Ticker */
  @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .ticker-inner { display: flex; animation: ticker 30s linear infinite; width: max-content; }

  /* Mobile */
    @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    body { font-size: 17px !important; }
    p { font-size: 16px !important; line-height: 1.75 !important; }
    .btn-cin { font-size: 15px !important; padding: 14px 24px !important; width: 100% !important; justify-content: center !important; }
    .btn-ghost-cin { font-size: 14px !important; padding: 13px 20px !important; width: 100% !important; justify-content: center !important; }
    .feat-card { padding: 24px 18px !important; }
    section { padding-left: 18px !important; padding-right: 18px !important; }
    .before-after-grid { grid-template-columns: 1fr !important; background: none !important; gap: 12px !important; }
    .hero-inner { padding: 24px 18px 48px !important; flex-direction: column !important; }
    .hero-stats { flex-direction: row !important; flex-wrap: wrap !important; gap: 20px !important; }
    .plan-grid { grid-template-columns: 1fr !important; }
    .industry-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
`;

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("show"); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}s`, ...style }}>{children}</div>;
}

function CursorDot() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX - 4 + "px"; dot.current.style.top = e.clientY - 4 + "px"; }
      if (ring.current) { ring.current.style.left = e.clientX - 16 + "px"; ring.current.style.top = e.clientY - 16 + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <><div ref={dot} className="cursor" /><div ref={ring} className="cursor-ring" /></>;
}

const FEATURES = [
  { num: "01", icon: "⚡", label: "BROADCAST", title: "One click. Every contact.", body: "Send personalised WhatsApp messages to your entire list simultaneously. What took hours now takes four seconds." },
  { num: "02", icon: "🤖", label: "CHATBOT", title: "Instant keyword replies.", body: "QUOTE. HOURS. BOOK. Customer sends a word — ZedPing fires the perfect response. No human. No delay. No missed lead." },
  { num: "03", icon: "🧠", label: "AI AGENT", title: "Conversations that close.", body: "GPT-powered. Holds full natural conversations. Handles objections. Collects leads. Closes sales. Awake at 3am." },
  { num: "04", icon: "📅", label: "SCHEDULER", title: "Set it. Walk away.", body: "Schedule broadcasts days ahead. ZedPing sends at precisely the right moment while you focus on what matters." },
  { num: "05", icon: "🔗", label: "INTEGRATIONS", title: "Your tools, connected.", body: "New Airtable booking? WhatsApp confirmation fires instantly. New POS stock? Your list knows. Seamless." },
  { num: "06", icon: "📊", label: "ANALYTICS", title: "Every message, logged.", body: "Full message history. Delivery status. What customers ask, what converts. Intelligence you can act on." },
];

const PLANS = [
  { name: "STARTER", price: "K650", annual: "K450", setup: "K850", msg: "500 msgs / month", features: ["1 WhatsApp number", "Unlimited broadcasts", "2 keyword automations", "Message log", "CSV contact upload"], featured: false },
  { name: "BUSINESS", price: "K1,500", annual: "K1,000", setup: "K2,000", msg: "3,000 msgs / month", features: ["Everything in Starter", "Unlimited automations", "Full keyword chatbot", "1 AI agent (GPT-4o)", "Broadcast scheduler"], featured: true },
  { name: "PRO", price: "K2,500", annual: "K2,000", setup: "K3,500", msg: "Unlimited messages", features: ["Everything in Business", "3 WhatsApp numbers", "Multi-step chatbot", "Multiple AI agents", "Airtable & POS sync"], featured: false },
];

const INDUSTRIES = [
  { e: "🏫", n: "Schools", t: "Fee reminders to every parent. One click." },
  { e: "🏥", n: "Clinics", t: "Auto-confirmations the moment it's booked." },
  { e: "✂️", n: "Salons", t: "Promos, reminders, new stock alerts." },
  { e: "🍽️", n: "Restaurants", t: "Daily specials to your whole list." },
  { e: "🏘️", n: "Accommodation", t: "Rent reminders to every tenant." },
  { e: "🔧", n: "Workshops", t: "Job status by keyword. No calls needed." },
  { e: "💰", n: "Microfinance", t: "Loan reminders, disbursement alerts." },
  { e: "✈️", n: "Airlines", t: "Flight alerts, gate changes, confirmations." },
  { e: "🛍️", n: "Retail", t: "AI agent closes deals 24/7." },
  { e: "🏠", n: "Real Estate", t: "New listings to interested buyers instantly." },
];

const FAQS = [
  { q: "Do I need to download anything?", a: "No. ZedPing is entirely browser-based. Log in from any phone, tablet, or laptop. No app required." },
  { q: "Do my customers need to do anything?", a: "Nothing. They use WhatsApp exactly as normal. The automation happens invisibly behind the scenes." },
  { q: "How do I connect my WhatsApp number?", a: "Once you activate your plan, our team in Lusaka connects your WhatsApp Business number for you. We handle everything technical." },
  { q: "What is an AI agent and how is it different from a chatbot?", a: "A chatbot fires fixed replies to keywords — like a menu. An AI agent holds a full natural conversation. It understands context, asks follow-up questions, handles objections, and responds like a human would. Available on Business plan and above." },
  { q: "Is my data safe?", a: "Yes. ZedPing uses the official Meta WhatsApp Business API — the secure, compliant route. All data is handled under Zambia's Data Protection Act No. 3 of 2021." },
  { q: "What payment methods do you accept?", a: "Airtel Money, MTN Money, and Zamtel Money. All in Zambian Kwacha. No USD. No bank transfers. No exchange rate surprises." },
  { q: "I'm not technical. Can I still use ZedPing?", a: "Absolutely. ZedPing was built for business owners, not developers. Our team in Lusaka is available to set everything up and walk you through it personally." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel anytime. Your account stays active until the end of your billing period. No penalties." },
];

const TICKER = ["BROADCASTS", "AI AGENTS", "CHATBOTS", "AUTOMATION", "KWACHA BILLING", "LOCAL SUPPORT", "SCHOOLS", "CLINICS", "SALONS", "RESTAURANTS", "WORKSHOPS", "REAL ESTATE"];

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{css}</style>
      <CursorDot />

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(6,6,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.4s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 36, height: 36, background: "var(--indigo)", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontFamily: "Bebas Neue", fontSize: 22, letterSpacing: 1 }}>Z</span>
              </div>
              <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, background: "var(--cyan)", borderRadius: "50%", boxShadow: "0 0 8px var(--cyan)" }} />
            </div>
            <span className="display" style={{ fontSize: 22, color: "var(--smoke)", letterSpacing: 2 }}>ZED<span style={{ color: "var(--cyan)" }}>PING</span></span>
          </div>
          {/* Nav links */}
          <div className="hide-mobile" style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {["Features", "Pricing", "Industries", "FAQ"].map(l => (
              <a key={l} className="nav-link-cin" href={`#${l.toLowerCase()}`}>{l}</a>
            ))}
          </div>
          <a className="btn-cin" href="https://zed-ping-dashboard.vercel.app?signup=true" style={{ fontSize: 11, padding: "11px 22px", letterSpacing: 2 }}>Get Started</a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--black)", display: "flex", alignItems: "center", paddingTop: 68, position: "relative", overflow: "hidden" }}>
        {/* Dramatic spotlights */}
        <div className="spotlight" style={{ width: 800, height: 800, top: "10%", left: "55%", opacity: 0.8 }} />
        <div style={{ position: "absolute", top: "60%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

        {/* Film frame lines */}
        <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", background: "rgba(255,255,255,0.02)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1, background: "rgba(255,255,255,0.02)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(24px,5vw,80px) clamp(18px,4vw,32px) clamp(48px,6vw,100px)", position: "relative", zIndex: 1, width: "100%" }}>
          {/* Label */}
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
              <div style={{ width: 32, height: 1, background: "var(--cyan)" }} />
              <span className="mono" style={{ fontSize: 11, letterSpacing: 3, color: "var(--cyan)", textTransform: "uppercase" }}>Zambia's First WhatsApp Automation Platform</span>
            </div>
          </Reveal>

          {/* Main headline */}
          <Reveal delay={0.1}>
            <h1 className="display" style={{ fontSize: "clamp(72px, 12vw, 160px)", color: "var(--smoke)", lineHeight: 0.92, marginBottom: 8 }}>
              YOUR WHOLE
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="display" style={{ fontSize: "clamp(72px, 12vw, 160px)", color: "var(--cyan)", lineHeight: 0.92, marginBottom: 8, WebkitTextStroke: "1px var(--cyan)", WebkitTextFillColor: "transparent" }}>
              CONTACT LIST.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <h1 className="display" style={{ fontSize: "clamp(72px, 12vw, 160px)", color: "var(--smoke)", lineHeight: 0.92, marginBottom: 48 }}>
              ONE CLICK.
            </h1>
          </Reveal>

          {/* Sub + CTAs */}
          <div style={{ display: "flex", gap: 64, alignItems: "flex-start", flexWrap: "wrap" }}>
            <Reveal delay={0.4} style={{ flex: "1 1 400px" }}>
              <p style={{ fontSize: 18, color: "var(--mist)", lineHeight: 1.8, maxWidth: 480, marginBottom: 40 }}>
                Stop sending WhatsApp messages one by one. ZedPing broadcasts, automates replies, and deploys AI agents for your business — priced in Kwacha, supported in Lusaka.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
                <a className="btn-cin" href="https://zed-ping-dashboard.vercel.app?signup=true">Explore Free →</a>
                <a className="btn-ghost-cin" href="#features">See How It Works</a>
              </div>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[["Airtel Money", "📱"], ["MTN Money", "📱"], ["Zamtel Money", "📱"], ["Visa / Mastercard", "💳"], ["Support in Lusaka", "🇿🇲"]].map(([t, e]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 13 }}>{e}</span>
                    <span className="mono" style={{ fontSize: 11, color: "var(--mist)", letterSpacing: 1 }}>{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.5} style={{ flex: "0 1 auto" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[["4s", "To send 300+ personalised messages"], ["24/7", "AI agent handles enquiries"], ["K650", "Starting price. In Kwacha. Always."]].map(([v, l]) => (
                  <div key={v} className="stat-block">
                    <div className="display" style={{ fontSize: 48, color: "var(--smoke)", lineHeight: 1, marginBottom: 4 }}>{v}</div>
                    <div style={{ fontSize: 13, color: "var(--mist)", maxWidth: 200 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Corner markers */}
        {[{t:68,l:0},{t:68,r:0},{b:0,l:0},{b:0,r:0}].map((pos,i) => (
          <div key={i} style={{ position: "absolute", width: 20, height: 20, ...pos, borderTop: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none", borderBottom: i >= 2 ? "1px solid rgba(255,255,255,0.08)" : "none", borderLeft: i % 2 === 0 ? "1px solid rgba(255,255,255,0.08)" : "none", borderRight: i % 2 === 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }} />
        ))}
      </section>

      {/* ── TICKER ─────────────────────────────────────────────────────────── */}
      <div style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "14px 0", overflow: "hidden" }}>
        <div className="ticker-inner">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="mono" style={{ color: i % 3 === 0 ? "var(--cyan)" : "rgba(255,255,255,0.2)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", padding: "0 32px", whiteSpace: "nowrap" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── PROBLEM ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--black)", padding: "120px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 24, height: 1, background: "var(--amber)" }} />
              <span className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "var(--amber)", textTransform: "uppercase" }}>The Problem</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(48px, 7vw, 96px)", color: "var(--smoke)", marginBottom: 80, maxWidth: 800, lineHeight: 0.95 }}>
              EVERY ZAMBIAN BUSINESS OWNER KNOWS THIS.
            </h2>
          </Reveal>
          <div className="before-after-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 1, background: "var(--border)" }}>
            {[
              { b: "Sending messages all day, one by one", a: "One click sends to your entire list, personalised" },
              { b: '"How much, where are you located" — all day, every day', a: "AI agent answers instantly. 24/7. No human needed." },
              { b: "Appointments forgotten. Revenue lost.", a: "Auto-confirmation fires the moment it's booked." },
              { b: "Chasing payments manually each month.", a: "Reminders sent to everyone in seconds." },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ background: "var(--black)" }}>
                  <div style={{ padding: "28px 24px", borderBottom: "1px solid var(--border)" }}>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: 2, color: "#EF4444", marginBottom: 12, textTransform: "uppercase" }}>Before</div>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15, lineHeight: 1.65, textDecoration: "line-through" }}>{p.b}</p>
                  </div>
                  <div style={{ padding: "28px 24px" }}>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: 2, color: "var(--cyan)", marginBottom: 12, textTransform: "uppercase" }}>After ZedPing</div>
                    <p style={{ color: "var(--smoke)", fontSize: 15, lineHeight: 1.65, fontWeight: 500 }}>{p.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section id="features" style={{ background: "var(--deep)", padding: "120px 32px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72, flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 24, height: 1, background: "var(--cyan)" }} />
                  <span className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "var(--cyan)", textTransform: "uppercase" }}>Features</span>
                </div>
                <h2 className="display" style={{ fontSize: "clamp(48px, 6vw, 84px)", color: "var(--smoke)", lineHeight: 0.95 }}>EVERYTHING<br />YOU NEED.</h2>
              </div>
              <a className="btn-ghost-cin" href="#pricing">View Pricing →</a>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 1, background: "var(--border)" }}>
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="feat-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <span style={{ fontSize: 28 }}>{f.icon}</span>
                    <span className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", letterSpacing: 2 }}>{f.num}</span>
                  </div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: 2.5, color: "var(--cyan)", textTransform: "uppercase", marginBottom: 10 }}>{f.label}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--smoke)", marginBottom: 12, lineHeight: 1.3 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--mist)", lineHeight: 1.75 }}>{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAT DEMO ────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--black)", padding: "120px 32px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 80, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 360px" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 24, height: 1, background: "var(--amber)" }} />
                <span className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "var(--amber)", textTransform: "uppercase" }}>AI Sales Agent</span>
              </div>
              <h2 className="display" style={{ fontSize: "clamp(48px, 6vw, 80px)", color: "var(--smoke)", lineHeight: 0.95, marginBottom: 24 }}>YOUR SHOP.<br /><span style={{ color: "var(--cyan)", WebkitTextStroke: "1px var(--cyan)", WebkitTextFillColor: "transparent" }}>OPEN 24/7.</span></h2>
              <p style={{ fontSize: 17, color: "var(--mist)", lineHeight: 1.8, marginBottom: 32 }}>Your AI agent takes orders, recommends products, collects payment, and confirms delivery — all inside WhatsApp. While you sleep.</p>
              <a className="btn-cin" href="https://zed-ping-dashboard.vercel.app?signup=true">See It In Action →</a>
            </Reveal>
          </div>

          {/* Chat mockup */}
          <Reveal delay={0.2} style={{ flex: "0 0 360px" }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 20, position: "relative" }}>
              {/* Corner accents */}
              {[[0,0,"top","left"],[0,"auto","top","right"],["auto",0,"bottom","left"],["auto","auto","bottom","right"]].map(([t,b,tb,lr],i) => (
                <div key={i} style={{ position: "absolute", [tb]: t, [lr]: b === "auto" ? 0 : 0, width: 12, height: 12, borderTop: tb === "top" ? "1px solid var(--cyan)" : "none", borderBottom: tb === "bottom" ? "1px solid var(--cyan)" : "none", borderLeft: lr === "left" ? "1px solid var(--cyan)" : "none", borderRight: lr === "right" ? "1px solid var(--cyan)" : "none" }} />
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: 36, height: 36, background: "var(--indigo)", clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🛍️</div>
                <div>
                  <div style={{ color: "var(--smoke)", fontSize: 13, fontWeight: 600 }}>Lusaka Boutique</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", display: "inline-block", boxShadow: "0 0 5px #22C55E" }} />
                    <span className="mono" style={{ color: "#22C55E", fontSize: 10 }}>AI AGENT · ONLINE</span>
                  </div>
                </div>
              </div>
              {[
                { from: "c", text: "Hi, looking for a dress under K500" },
                { from: "a", text: "Hey! 👗 Here are 3 options for you:", products: true },
                { from: "c", text: "Red one, size medium please 🙏" },
                { from: "a", text: "✅ Red wrap dress, size M — K420\n\nPay via Airtel Money: 0977 000 000\n\nOut for delivery within 24 hours 🚀" },
                { from: "c", text: "Payment sent! Thank you 😊" },
                { from: "a", text: "Perfect! Order confirmed ✓ See you soon!" },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.from === "c" ? "flex-end" : "flex-start", marginBottom: 8 }}>
                  <div className={m.from === "c" ? "bubble-out" : "bubble-in"} style={{ maxWidth: "76%", fontSize: 12, lineHeight: 1.65, color: "var(--smoke)", whiteSpace: "pre-line" }}>
                    {m.products && (
                      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                        {[["🔴","K420"],["⚫","K380"],["🔵","K490"]].map(([e,p],pi) => (
                          <div key={pi} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 6, padding: "6px 8px", textAlign: "center", flex: 1 }}>
                            <div style={{ fontSize: 16 }}>{e}</div>
                            <div className="mono" style={{ color: "var(--cyan)", fontSize: 10 }}>{p}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── INDUSTRIES ──────────────────────────────────────────────────────── */}
      <section id="industries" style={{ background: "var(--deep)", padding: "120px 32px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 24, height: 1, background: "var(--cyan)" }} />
              <span className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "var(--cyan)", textTransform: "uppercase" }}>Who It's For</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(48px, 6vw, 84px)", color: "var(--smoke)", lineHeight: 0.95, marginBottom: 16 }}>BUILT FOR EVERY<br />ZAMBIAN SME.</h2>
            <p style={{ fontSize: 17, color: "var(--mist)", marginBottom: 64, maxWidth: 500, lineHeight: 1.7 }}>If your business communicates with customers on WhatsApp, ZedPing is for you.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 1, background: "var(--border)" }}>
            {INDUSTRIES.map((v, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div style={{ background: "var(--deep)", padding: "24px 20px", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--deep)"}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{v.e}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--smoke)", marginBottom: 6 }}>{v.n}</div>
                  <div style={{ fontSize: 13, color: "var(--mist)", lineHeight: 1.55 }}>{v.t}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────────────── */}
      <section id="pricing" style={{ background: "var(--black)", padding: "120px 32px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 24, height: 1, background: "var(--amber)" }} />
              <span className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "var(--amber)", textTransform: "uppercase" }}>Pricing</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(48px, 6vw, 84px)", color: "var(--smoke)", lineHeight: 0.95, marginBottom: 16 }}>PRICED IN KWACHA.<br /><span style={{ color: "var(--cyan)" }}>NO USD SURPRISES.</span></h2>
            <p style={{ fontSize: 17, color: "var(--mist)", marginBottom: 20, maxWidth: 560, lineHeight: 1.7 }}>Competitors charge $40–$70/month in USD — that's roughly K900–K1,600/month. Every time the exchange rate moves, so does their bill. ZedPing? K650/month. In Kwacha. Fixed. Always.</p>
            <p style={{ fontSize: 14, color: "var(--mist)", marginBottom: 64, opacity: 0.6 }}>Pay via Airtel Money · MTN Money · Zamtel Money · Visa & Mastercard</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 1, background: "var(--border)", alignItems: "start" }}>
            {PLANS.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`plan ${p.featured ? "featured" : ""}`} style={{ position: "relative" }}>
                  {p.featured && (
                    <div style={{ position: "absolute", top: -1, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--cyan), transparent)" }} />
                  )}
                  {p.featured && (
                    <div className="mono" style={{ position: "absolute", top: -14, left: 24, background: "var(--cyan)", color: "var(--black)", fontSize: 9, fontWeight: 700, padding: "3px 12px", letterSpacing: 2 }}>MOST POPULAR</div>
                  )}
                  <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: p.featured ? "var(--cyan)" : "var(--mist)", marginBottom: 20 }}>{p.name}</div>
                  <div className="display" style={{ fontSize: 64, color: "var(--smoke)", lineHeight: 1, marginBottom: 4 }}>{p.price}</div>
                  <div className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>/month · or {p.annual}/mo annually</div>
                  <div className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginBottom: 8 }}>{p.setup} once-off setup</div>
                  <div style={{ color: p.featured ? "var(--cyan)" : "var(--mist)", fontSize: 13, fontWeight: 500, marginBottom: 28, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: p.featured ? "var(--cyan)" : "var(--mist)", display: "inline-block" }} />
                    {p.msg}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                    {p.features.map((f, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ color: p.featured ? "var(--cyan)" : "var(--mist)", fontSize: 12 }}>→</span>
                        <span style={{ fontSize: 14, color: j === 0 && i > 0 ? "var(--mist)" : "var(--smoke)", fontStyle: j === 0 && i > 0 ? "italic" : "normal" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a className={p.featured ? "btn-cin" : "btn-ghost-cin"} href="https://zed-ping-dashboard.vercel.app?signup=true" style={{ display: "flex", justifyContent: "center", fontSize: 11, letterSpacing: 2 }}>
                    Get Started →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <p className="mono" style={{ textAlign: "center", color: "var(--mist)", fontSize: 11, marginTop: 24, letterSpacing: 1.5, opacity: 0.6 }}>
              FREE TO EXPLORE · PAY TO ACTIVATE YOUR WHATSAPP NUMBER · CANCEL ANYTIME
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--deep)", padding: "120px 32px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 24, height: 1, background: "var(--cyan)" }} />
              <span className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "var(--cyan)", textTransform: "uppercase" }}>Beta Testers</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(48px, 6vw, 84px)", color: "var(--smoke)", lineHeight: 0.95, marginBottom: 64 }}>REAL BUSINESSES.<br />REAL RESULTS.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 1, background: "var(--border)" }}>
            {[
              { quote: "Before ZedPing I was manually sending fee reminders to over 300 parents every term. Now it takes seconds. The time saved in the accounts office alone is remarkable.", name: "Accounts Manager", org: "Beta Tester · School, Lusaka", i: "A" },
              { quote: "Our customers get instant replies even at night. We haven't missed a single lead since activating the AI agent. It's like having a receptionist that never sleeps.", name: "Business Owner", org: "Beta Tester · Workshop, Lusaka", i: "B" },
              { quote: "Priced in Kwacha, paid via Airtel Money. No USD stress. No bank transfers. Just a local product that actually works for us.", name: "Manager", org: "Beta Tester · SME, Lusaka", i: "M" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ background: "var(--deep)", padding: "36px 28px" }}>
                  <div className="display" style={{ fontSize: 72, color: "var(--indigo)", lineHeight: 0.8, marginBottom: 20, opacity: 0.4 }}>"</div>
                  <p style={{ color: "var(--smoke)", fontSize: 15, lineHeight: 1.85, marginBottom: 28, fontStyle: "italic" }}>{t.quote}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, background: "var(--indigo)", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "white" }}>{t.i}</div>
                    <div>
                      <div style={{ color: "var(--smoke)", fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                      <div className="mono" style={{ color: "var(--mist)", fontSize: 10, letterSpacing: 1, marginTop: 2 }}>{t.org}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ background: "var(--black)", padding: "120px 32px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 24, height: 1, background: "var(--amber)" }} />
              <span className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "var(--amber)", textTransform: "uppercase" }}>FAQ</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(48px, 6vw, 84px)", color: "var(--smoke)", lineHeight: 0.95, marginBottom: 64 }}>QUESTIONS<br />ANSWERED.</h2>
          </Reveal>
          <div>
            {FAQS.map((f, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", gap: 20 }}>
                    <span style={{ color: "var(--smoke)", fontSize: 16, fontWeight: 500, lineHeight: 1.4 }}>{f.q}</span>
                    <span className="display" style={{ color: openFaq === i ? "var(--cyan)" : "var(--mist)", fontSize: 24, flexShrink: 0, transition: "all 0.3s" }}>{openFaq === i ? "−" : "+"}</span>
                  </div>
                  {openFaq === i && (
                    <div style={{ paddingBottom: 22 }}>
                      <p style={{ color: "var(--mist)", fontSize: 15, lineHeight: 1.8 }}>{f.a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--deep)", padding: "120px 32px", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div className="spotlight" style={{ width: 1000, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.6 }} />
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 24, height: 1, background: "var(--cyan)" }} />
              <span className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "var(--cyan)", textTransform: "uppercase" }}>Now Available in Zambia</span>
              <div style={{ width: 24, height: 1, background: "var(--cyan)" }} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display" style={{ fontSize: "clamp(60px, 10vw, 130px)", color: "var(--smoke)", lineHeight: 0.92, marginBottom: 24 }}>
              STOP LOSING<br />
              <span style={{ color: "var(--cyan)", WebkitTextStroke: "1px var(--cyan)", WebkitTextFillColor: "transparent" }}>SALES TO</span><br />
              SLOW REPLIES.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 18, color: "var(--mist)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 48px" }}>
              Explore the ZedPing dashboard for free. Pay only when you're ready to go live. No credit card. No USD billing.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a className="btn-cin" href="https://zed-ping-dashboard.vercel.app?signup=true" style={{ fontSize: 13, padding: "18px 48px", letterSpacing: 2 }}>
              Get Started Free →
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ background: "var(--black)", borderTop: "1px solid var(--border)", padding: "60px 32px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
            <div style={{ maxWidth: 260 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, background: "var(--indigo)", clipPath: "polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "white", fontFamily: "Bebas Neue", fontSize: 18, letterSpacing: 1 }}>Z</span>
                </div>
                <span className="display" style={{ fontSize: 20, color: "var(--smoke)", letterSpacing: 2 }}>ZED<span style={{ color: "var(--cyan)" }}>PING</span></span>
              </div>
              <p className="mono" style={{ color: "var(--mist)", fontSize: 11, lineHeight: 1.8, letterSpacing: 0.5, opacity: 0.6 }}>ZAMBIA'S FIRST WHATSAPP AUTOMATION PLATFORM. BUILT FOR SMES. PRICED IN KWACHA.</p>
            </div>
            <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
              {[
                ["Product", ["Features", "Pricing", "Industries", "FAQ"]],
                ["Company", ["About", "Contact", "LinkedIn", "WhatsApp Us"]],
                ["Legal", ["Privacy Policy", "Terms of Service"]],
              ].map(([title, links]) => (
                <div key={title}>
                  <div className="mono" style={{ color: "var(--cyan)", fontSize: 9, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>{title}</div>
                  {links.map(l => <div key={l} style={{ marginBottom: 10 }}><a href="#" style={{ color: "var(--mist)", fontSize: 13, opacity: 0.6 }}>{l}</a></div>)}
                </div>
              ))}
            </div>
          </div>
          <div className="rule" style={{ marginBottom: 22 }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <p className="mono" style={{ color: "var(--mist)", fontSize: 10, opacity: 0.4, letterSpacing: 1 }}>© 2026 ZEDPING · A PRODUCT OF CORELINE SYSTEMS · LUSAKA, ZAMBIA</p>
            <p className="mono" style={{ color: "var(--mist)", fontSize: 10, opacity: 0.25, letterSpacing: 1 }}>YOUR BUSINESS, ON AUTOPILOT.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
