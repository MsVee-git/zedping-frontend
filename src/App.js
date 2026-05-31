import { useState, useEffect, useRef } from "react";

const BG      = "#0B1020";
const SURFACE = "#121A2B";
const INDIGO  = "#5B5BD6";
const CYAN    = "#5EE6FF";
const TEXT1   = "#F5F7FA";
const TEXT2   = "#9CA3AF";
const WHITE   = "#FFFFFF";
const BORDER  = "rgba(255,255,255,0.07)";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: ${BG}; color: ${TEXT1}; -webkit-font-smoothing: antialiased; }
  a { text-decoration: none; color: inherit; }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: ${INDIGO}; color: ${WHITE};
    padding: 12px 24px; border-radius: 10px;
    font-weight: 600; font-size: 14px; letter-spacing: -0.1px;
    transition: all 0.2s; border: none; cursor: pointer;
  }
  .btn-primary:hover { background: #4A4ABF; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(91,91,214,0.35); }

  .btn-glow {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, ${INDIGO}, #7B6FE8);
    color: ${WHITE}; padding: 14px 28px; border-radius: 12px;
    font-weight: 700; font-size: 15px; letter-spacing: -0.2px;
    transition: all 0.25s; border: none; cursor: pointer;
    box-shadow: 0 0 0 0 rgba(91,91,214,0.4);
  }
  .btn-glow:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(91,91,214,0.45); }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.06);
    color: ${TEXT1}; padding: 13px 24px; border-radius: 12px;
    font-weight: 600; font-size: 14px;
    border: 1px solid ${BORDER};
    transition: all 0.2s; cursor: pointer;
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.15); }

  .chip {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(91,91,214,0.12);
    border: 1px solid rgba(91,91,214,0.25);
    color: #A5A5FF; font-size: 11px; font-weight: 600;
    letter-spacing: 0.8px; text-transform: uppercase;
    padding: 6px 14px; border-radius: 100px;
  }

  .glass {
    background: ${SURFACE};
    border: 1px solid ${BORDER};
    border-radius: 20px;
  }

  .feature-card {
    background: ${SURFACE}; border: 1px solid ${BORDER};
    border-radius: 16px; padding: 28px;
    transition: all 0.25s;
  }
  .feature-card:hover {
    border-color: rgba(91,91,214,0.4);
    box-shadow: 0 0 0 1px rgba(91,91,214,0.15), 0 8px 32px rgba(91,91,214,0.1);
    transform: translateY(-2px);
  }

  .vert-card {
    background: ${SURFACE}; border: 1px solid ${BORDER};
    border-radius: 14px; padding: 22px;
    transition: all 0.2s;
  }
  .vert-card:hover {
    border-color: rgba(94,230,255,0.3);
    background: rgba(94,230,255,0.04);
  }

  .plan-card { border-radius: 20px; padding: 32px; }

  .nav-link { color: ${TEXT2}; font-size: 14px; font-weight: 500; transition: color 0.2s; }
  .nav-link:hover { color: ${TEXT1}; }

  .fade { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .fade.in { opacity: 1; transform: translateY(0); }

  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  .float { animation: float 5s ease-in-out infinite; }

  @keyframes slide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .marquee { display: flex; gap: 0; animation: slide 24s linear infinite; width: max-content; }

  @keyframes glow-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

  .gradient-text {
    background: linear-gradient(135deg, ${WHITE} 0%, ${CYAN} 60%, ${INDIGO} 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .glow-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #22C55E; display: inline-block;
    box-shadow: 0 0 8px #22C55E;
    animation: glow-pulse 2s ease-in-out infinite;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${BG}; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
`;

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("in"); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="fade" style={{ transitionDelay: `${delay}s`, ...style }}>{children}</div>;
}

const FEATURES = [
  { icon: "⚡", label: "Broadcasts", title: "One click. Your entire list.", desc: "Send personalised WhatsApp messages to your entire contact list simultaneously. Every contact receives their name — automatically." },
  { icon: "🤖", label: "Chatbot", title: "Instant keyword replies.", desc: "Customers type QUOTE, HOURS, or BOOK and get an instant, accurate reply. No human. No delay. No missed leads." },
  { icon: "🧠", label: "AI Agent", title: "Conversations that close.", desc: "A GPT-powered assistant that holds full natural conversations, handles objections, and completes sales — 24/7." },
  { icon: "📅", label: "Scheduler", title: "Set it. Forget it.", desc: "Schedule broadcasts days in advance. The right message goes out at exactly the right time, every time." },
  { icon: "🔗", label: "Integrations", title: "Your tools, connected.", desc: "Airtable, Google Sheets, POS systems. New booking? Automatic WhatsApp confirmation. Zero manual work." },
  { icon: "📊", label: "Analytics", title: "Every message, logged.", desc: "Full message history across all contacts. See what customers ask, what converts, and what to improve." },
];

const PLANS = [
  {
    name: "Starter", price: "K650", annual: "K450", setup: "K2,000 setup", msg: "500 msgs/month",
    features: ["1 WhatsApp number", "Unlimited broadcasts", "2 keyword automations", "Message log", "7-day free trial"],
    highlight: false,
  },
  {
    name: "Business", price: "K1,500", annual: "K1,000", setup: "K2,000 setup", msg: "3,000 msgs/month",
    features: ["1 WhatsApp number", "Unlimited automations", "Full keyword chatbot", "1 AI agent (GPT-4o)", "7-day free trial"],
    highlight: true,
  },
  {
    name: "Pro", price: "K2,500", annual: "K2,000", setup: "K2,000 setup", msg: "Unlimited messages",
    features: ["3 WhatsApp numbers", "Multi-step chatbot flows", "Multiple AI agents", "Airtable + POS integration", "Priority Lusaka support"],
    highlight: false,
  },
];

const VERTICALS = [
  { e: "🏫", n: "Schools", t: "Send fee reminders to every parent at once." },
  { e: "🏥", n: "Clinics", t: "Appointment confirmations, auto-sent." },
  { e: "✂️", n: "Salons", t: "Promos, bookings, new stock alerts." },
  { e: "🍽️", n: "Restaurants", t: "Daily specials to your entire contact list." },
  { e: "🏠", n: "Real Estate", t: "Share new listings instantly with interested buyers." },
  { e: "🚌", n: "Bus Operators", t: "Boarding reminders with seat reference." },
  { e: "✈️", n: "Airlines", t: "Flight alerts, gate changes, confirmations." },
  { e: "🔧", n: "Workshops", t: "Job status by keyword. No calls needed." },
  { e: "💰", n: "Microfinance", t: "Loan reminders, disbursement alerts." },
  { e: "🛍️", n: "Retail", t: "AI sales agent. Closes deals while you sleep." },
  { e: "🏘️", n: "Accommodation", t: "Rent reminders to tenants. Payment confirmations. Vacancy alerts." },
];

const TICKER = ["Schools","Clinics","Salons","Restaurants","Real Estate","Workshops","Airlines","Retail","Churches","Gyms","Microfinance","Bus Operators"];

const BEFORE_AFTER = [
  { b: "Sending messages all day, one by one", a: "One click sends to your entire list, personalised" },
  { b: "'How much, where are you located' — all day, every day", a: "AI agent answers instantly. 24/7. No human needed." },
  { b: "Appointments forgotten. Revenue lost.", a: "Auto-confirmation when it's booked." },
  { b: "Chasing payments manually each month.", a: "Reminders sent to everyone in seconds." },
];

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: scrolled ? "rgba(11,16,32,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: INDIGO, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <span style={{ color: WHITE, fontWeight: 900, fontSize: 18, letterSpacing: -1, fontFamily: "Inter, sans-serif" }}>Z</span>
              <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, borderRadius: "50%", background: CYAN, boxShadow: `0 0 8px ${CYAN}` }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: 18, color: TEXT1, letterSpacing: -0.5 }}>
              Zed<span style={{ color: CYAN }}>Ping</span>
            </span>
          </div>
          {/* Links */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["Features", "Pricing", "Industries"].map(l => (
              <a key={l} className="nav-link" href={`#${l.toLowerCase()}`}>{l}</a>
            ))}
            <a className="btn-primary" href="https://zed-ping-dashboard.vercel.app?signup=true" style={{ padding: "9px 20px", fontSize: 13 }}>Get Started →</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section" style={{ display: "flex", alignItems: "center", paddingTop: 64, position: "relative", overflow: "hidden", background: BG }}>
        {/* Radial glows */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 800, height: 400, background: `radial-gradient(ellipse, rgba(91,91,214,0.18) 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "10%", width: 400, height: 400, background: `radial-gradient(circle, rgba(94,230,255,0.08) 0%, transparent 60%)`, pointerEvents: "none" }} />
        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "40px 24px 60px", position: "relative", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          {/* Left */}
          <div style={{ flex: "1 1 480px" }}>
            <FadeIn>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
                <div className="chip">
                  <span className="glow-dot" />
                  Zambia's First WhatsApp Automation Platform
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 style={{ fontSize: "clamp(36px, 10vw, 78px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: -3.5, marginBottom: 24, color: TEXT1 }}>
                Your whole<br />
                <span className="gradient-text">contact list.</span><br />
                One click.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontSize: "clamp(16px, 4vw, 18px)", color: TEXT2, lineHeight: 1.75, marginBottom: 40, maxWidth: 500 }}>
                Stop sending WhatsApp messages one by one. ZedPing broadcasts to your entire contact list, automates replies, and deploys AI agents — priced in Kwacha, supported in Lusaka.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
                <a className="btn-glow" href="https://zed-ping-dashboard.vercel.app?signup=true">Start 7-Day Free Trial</a>
                <a className="btn-ghost" href="#features">See Features →</a>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[["📱", "Airtel Money"], ["📱", "MTN Money"], ["📱", "Zamtel Money"], ["🇿🇲", "Support in Lusaka"]].map(([e, t]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 14 }}>{e}</span>
                    <span style={{ fontSize: 13, color: TEXT2, fontWeight: 500 }}>{t}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — mockup */}
          <FadeIn delay={0.2} style={{ flex: "0 0 300px" }}>
            <div className="float glass" style={{ padding: 18, maxWidth: 300, margin: "0 auto", boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(91,91,214,0.2), inset 0 1px 0 rgba(255,255,255,0.06)` }}>
              {/* Header */}
              <div style={{ background: `linear-gradient(135deg, ${INDIGO}, #7B6FE8)`, borderRadius: 14, padding: "12px 14px", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏫</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: WHITE, fontWeight: 700, fontSize: 12 }}>Sunrise Academy</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>342 contacts · just now</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 100, padding: "3px 9px" }}>
                  <span style={{ color: WHITE, fontSize: 9, fontWeight: 800 }}>SENT ✓</span>
                </div>
              </div>
              {/* Messages */}
              {[
                { t: "Hi Mrs Mwanza, Kutimba has outstanding fees of K3,500 due 30 May. Call 0977 000 000.", me: true },
                { t: "Thank you! Paying today 🙏", me: false },
                { t: "Payment sent ✓", me: false },
                { t: "Thank you Mrs Mwanza! Payment received. Have a great day 😊", me: true },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.me ? "flex-start" : "flex-end", marginBottom: 7 }}>
                  <div style={{
                    background: m.me ? "rgba(91,91,214,0.12)" : "rgba(255,255,255,0.05)",
                    border: m.me ? "1px solid rgba(91,91,214,0.2)" : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: m.me ? "14px 14px 14px 4px" : "14px 14px 4px 14px",
                    padding: "9px 12px", fontSize: 12, lineHeight: 1.5,
                    maxWidth: 220, color: TEXT1,
                  }}>{m.t}</div>
                </div>
              ))}
              {/* Stats */}
              <div style={{ background: "rgba(91,91,214,0.12)", border: "1px solid rgba(91,91,214,0.2)", borderRadius: 12, padding: "10px 14px", marginTop: 10, display: "flex", justifyContent: "space-around" }}>
                {[["✓✓✓", "Sent"], ["98%", "Delivered"], ["Fast", "Speed"]].map(([v, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ color: CYAN, fontWeight: 800, fontSize: 16, letterSpacing: -0.5 }}>{v}</div>
                    <div style={{ color: TEXT2, fontSize: 9, marginTop: 1 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "13px 0", overflow: "hidden" }}>
        <div className="marquee">
          {[...TICKER, ...TICKER].map((l, i) => (
            <span key={i} style={{ color: TEXT2, fontSize: 11, fontWeight: 700, letterSpacing: 2, whiteSpace: "nowrap", padding: "0 28px", textTransform: "uppercase" }}>
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* ── PAIN / GAIN ── */}
      <section style={{ background: BG, padding: "clamp(48px, 8vw, 96px) 20px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="chip" style={{ marginBottom: 20, display: "inline-flex" }}>The Problem</div>
              <h2 style={{ fontSize: "clamp(28px, 7vw, 50px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.1, color: TEXT1 }}>
                Every Zambian SME owner<br />knows this feeling.
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {BEFORE_AFTER.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${BORDER}` }}>
                  <div style={{ background: "rgba(220,38,38,0.06)", padding: "20px 22px", borderBottom: "1px solid rgba(220,38,38,0.1)" }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#EF4444", letterSpacing: 1.2, marginBottom: 8, textTransform: "uppercase" }}>Before ZedPing</div>
                    <div style={{ fontSize: 14, color: TEXT2, lineHeight: 1.6, textDecoration: "line-through", opacity: 0.7 }}>{p.b}</div>
                  </div>
                  <div style={{ background: "rgba(91,91,214,0.06)", padding: "20px 22px" }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#A5A5FF", letterSpacing: 1.2, marginBottom: 8, textTransform: "uppercase" }}>With ZedPing</div>
                    <div style={{ fontSize: 14, color: TEXT1, lineHeight: 1.6, fontWeight: 600 }}>{p.a}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ background: SURFACE, padding: "clamp(48px, 8vw, 96px) 20px", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 20 }}>
              <div>
                <div className="chip" style={{ marginBottom: 16, display: "inline-flex" }}>Features</div>
                <h2 style={{ fontSize: "clamp(28px, 7vw, 50px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.1, color: TEXT1 }}>
                  Everything your<br />business needs.
                </h2>
              </div>
              <a className="btn-ghost" href="https://zed-ping-dashboard.vercel.app?signup=true">View Pricing →</a>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            {FEATURES.map((f, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="feature-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                    <div style={{ width: 42, height: 42, background: "rgba(91,91,214,0.12)", border: "1px solid rgba(91,91,214,0.2)", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{f.icon}</div>
                    <span style={{ color: "#A5A5FF", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{f.label}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: TEXT1, letterSpacing: -0.3, marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: TEXT2, lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERTICALS ── */}
      <section id="industries" style={{ background: BG, padding: "clamp(48px, 8vw, 96px) 20px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="chip" style={{ marginBottom: 20, display: "inline-flex" }}>Who Is It For?</div>
              <h2 style={{ fontSize: "clamp(28px, 7vw, 50px)", fontWeight: 900, letterSpacing: -2, color: TEXT1 }}>Built for every Zambian SME.</h2>
              <p style={{ fontSize: 17, color: TEXT2, marginTop: 14, maxWidth: 420, margin: "14px auto 0", lineHeight: 1.7 }}>
                If your business communicates with customers on WhatsApp, ZedPing is for you.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 }}>
            {VERTICALS.map((v, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="vert-card">
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{v.e}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TEXT1, marginBottom: 6, letterSpacing: -0.2 }}>{v.n}</div>
                  <div style={{ fontSize: 13, color: TEXT2, lineHeight: 1.55 }}>{v.t}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: SURFACE, padding: "clamp(48px, 8vw, 96px) 20px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="chip" style={{ marginBottom: 20, display: "inline-flex" }}>Pricing</div>
              <h2 style={{ fontSize: "clamp(28px, 7vw, 50px)", fontWeight: 900, letterSpacing: -2, color: TEXT1 }}>
                Priced in Kwacha.<br />No USD surprises.
              </h2>
              <p style={{ fontSize: 17, color: TEXT2, marginTop: 14, maxWidth: 440, margin: "14px auto 0", lineHeight: 1.7 }}>
                Competitors charge $40–70/month in USD. ZedPing starts at K650. Pay via Airtel Money or MTN Money.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, alignItems: "start" }}>
            {PLANS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="plan-card" style={{
                  background: p.highlight ? `linear-gradient(160deg, #1A1F3A 0%, #1E1645 100%)` : BG,
                  border: p.highlight ? `1px solid rgba(91,91,214,0.4)` : `1px solid ${BORDER}`,
                  boxShadow: p.highlight ? "0 20px 60px rgba(91,91,214,0.2), 0 0 0 1px rgba(91,91,214,0.1)" : "none",
                  position: "relative",
                }}>
                  {p.highlight && (
                    <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: INDIGO, color: WHITE, fontSize: 10, fontWeight: 800, padding: "4px 16px", borderRadius: 100, letterSpacing: 1.2, textTransform: "uppercase", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(91,91,214,0.4)" }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ color: TEXT2, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 4 }}>
                    <span style={{ fontSize: 52, fontWeight: 900, color: TEXT1, letterSpacing: -3, lineHeight: 1 }}>{p.price}</span>
                    <span style={{ color: TEXT2, fontSize: 14 }}>/mo</span>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, marginBottom: 6 }}>{p.setup} · <span style={{color: CYAN}}>K{p.annual}/mo annually</span></div>
                  <div style={{ color: p.highlight ? CYAN : "#A5A5FF", fontSize: 13, fontWeight: 600, marginBottom: 26, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.highlight ? CYAN : INDIGO, display: "inline-block" }} />
                    {p.msg}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                    {p.features.map((f, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: p.highlight ? "rgba(91,91,214,0.2)" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: p.highlight ? CYAN : "#A5A5FF", flexShrink: 0 }}>✓</div>
                        <span style={{ fontSize: 14, color: TEXT1, opacity: 0.85 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#" className={p.highlight ? "btn-glow" : "btn-ghost"} style={{ width: "100%", justifyContent: "center" }}>
                    Get Started →
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <p style={{ textAlign: "center", color: TEXT2, fontSize: 13, marginTop: 28 }}>
              All plans include a 7-day free trial · Pay via Airtel Money, MTN Money or Zamtel Money · Cancel anytime
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: BG, padding: "clamp(48px, 8vw, 96px) 20px", position: "relative", overflow: "hidden", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 400, background: `radial-gradient(ellipse, rgba(91,91,214,0.15) 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <FadeIn>
            <div className="chip" style={{ marginBottom: 24, display: "inline-flex" }}>
              <span className="glow-dot" />
              Now Available in Zambia
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 900, color: TEXT1, letterSpacing: -2.5, lineHeight: 1.05, marginBottom: 20 }}>
              Stop losing sales<br />
              <span className="gradient-text">to slow replies.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 18, color: TEXT2, lineHeight: 1.75, marginBottom: 40, maxWidth: 520, margin: "0 auto 40px" }}>
              Join Zambian businesses already automating their WhatsApp. Start your 7-day free trial — pay via Airtel Money, MTN Money or Zamtel Money. No USD billing.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <a className="btn-glow" href="https://zed-ping-dashboard.vercel.app?signup=true" style={{ fontSize: 16, padding: "16px 36px" }}>
              Start Free Trial — 7 Days Free
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, padding: "60px 24px 32px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
            <div style={{ maxWidth: 240 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, background: INDIGO, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: WHITE, fontWeight: 900, fontSize: 15 }}>Z</span>
                </div>
                <span style={{ fontWeight: 800, fontSize: 17, color: TEXT1 }}>Zed<span style={{ color: CYAN }}>Ping</span></span>
              </div>
              <p style={{ color: TEXT2, fontSize: 13, lineHeight: 1.7, opacity: 0.7 }}>
                Zambia's first WhatsApp automation platform. Built for SMEs. Priced in Kwacha.
              </p>
            </div>
            <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
              {[
                ["Product", ["Features", "Pricing", "How It Works", "Templates"]],
                ["Company", ["About", "Contact", "LinkedIn", "WhatsApp Us"]],
                ["Legal", ["Privacy Policy", "Terms of Service"]],
              ].map(([title, links]) => (
                <div key={title}>
                  <div style={{ color: "#A5A5FF", fontSize: 10, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase", marginBottom: 16 }}>{title}</div>
                  {links.map(l => <div key={l} style={{ marginBottom: 10 }}><a href="#" style={{ color: TEXT2, fontSize: 13, opacity: 0.7 }}>{l}</a></div>)}
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <p style={{ color: TEXT2, fontSize: 12, opacity: 0.5 }}>© 2026 ZedPing · A product of Coreline Systems · Lusaka, Zambia</p>
            <p style={{ color: TEXT2, fontSize: 12, opacity: 0.35 }}>Zambia-first · Kwacha billing · Local support</p>
          </div>
        </div>
      </footer>
    </>
  );
}
