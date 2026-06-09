import React, { useState, useEffect, useRef, useCallback } from "react";

// ── ZEDPING ELITE ────────────────────────────────────────────────────────────
// Aesthetic: Old money tech · Editorial luxury · Bold & minimal · Zambian class
// Fonts: Cormorant Garant (editorial display) + DM Sans (clean body)
// Palette: Near-black · Warm cream · Deep gold · Whisper green
// 3D: Subtle elevation, gentle parallax, breathing depth — not performing

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

    :root {
    --bg:     #FFFFFF;
    --bg2:    #F8F5F0;
    --bg3:    #F2EDE4;
    --card:   #FFFFFF;
    --card2:  #FAF8F5;
    --text1:  #111111;
    --text2:  #444444;
    --text3:  #777777;
    --gold:   #9A7420;
    --gold2:  #B8922A;
    --goldbg: #FBF6EC;
    --green:  #1A3A2A;
    --line:   rgba(0,0,0,0.08);
    --line2:  rgba(154,116,32,0.3);
    --inkbg:  #111111;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', sans-serif;
    background: var(--ink);
    color: var(--cream);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  a { text-decoration: none; color: inherit; }

  /* ── TYPOGRAPHY ── */
  .editorial { font-family: 'Cormorant Garant', serif; line-height: 0.92; }
  .mono { font-family: 'DM Mono', monospace; }

  /* ── SUBTLE 3D CARD ── */
  .card-elite {
    background: var(--card);
    border: 1px solid var(--line);
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.3s;
    will-change: transform;
  }
  .card-elite:hover {
    transform: translateY(-8px) perspective(1000px) rotateX(2deg);
    box-shadow: 0 24px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(184,146,42,0.2);
    border-color: var(--line2);
  }

  /* ── FLOATING ── */
  @keyframes breathe {
    0%, 100% { transform: translateY(0px) rotateZ(0deg); }
    33% { transform: translateY(-10px) rotateZ(0.3deg); }
    66% { transform: translateY(-5px) rotateZ(-0.2deg); }
  }

  /* ── TICKER ── */
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .marquee-inner { display: flex; animation: marquee 32s linear infinite; width: max-content; }

  /* ── REVEAL ── */
  .rise { opacity: 0; transform: translateY(32px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
  .rise.show { opacity: 1; transform: translateY(0); }

  /* ── BUTTONS ── */
  .btn-elite {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--inkbg); color: #FFFFFF;
    padding: 14px 32px;
    font-family: 'DM Mono', monospace;
    font-size: 18px; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; border: none; cursor: pointer;
    transition: all 0.3s;
  }
  .btn-elite:hover { background: var(--green); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.15); }

  .btn-wire {
    display: inline-flex; align-items: center; gap: 10px;
    background: transparent; color: var(--text1);
    padding: 13px 28px;
    font-family: 'DM Mono', monospace;
    font-size: 18px; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase;
    border: 1px solid var(--line); cursor: pointer;
    transition: all 0.3s;
  }
  .btn-wire:hover { border-color: var(--gold2); color: var(--gold); background: var(--goldbg); }

  /* ── NAV ── */
  .nav-link-e {
    font-family: 'DM Mono', monospace;
    font-size: 20px; font-weight: 500; letter-spacing: 0px;
    text-transform: none; color: var(--text2);
    transition: color 0.2s;
  }
  .nav-link-e:hover { color: var(--text1); }

  /* ── FEATURE CARD ── */
  .feat-elite {
    background: var(--card2); border: 1px solid var(--line);
    padding: 32px 28px; position: relative; overflow: hidden;
    transition: all 0.3s;
  }
  .feat-elite::after {
    content: ''; position: absolute; bottom: 0; left: 0;
    width: 100%; height: 1px;
    background: linear-gradient(90deg, var(--gold), transparent);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.5s ease;
  }
  .feat-elite:hover::after { transform: scaleX(0.5); }
  .feat-elite:hover { border-color: var(--line2); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }

  /* ── PLAN CARD ── */
  .plan-elite { padding: 36px 30px; position: relative; transition: all 0.4s; }
  .plan-elite:hover { transform: translateY(-8px) perspective(800px) rotateX(1.5deg); }
  .plan-elite.featured { background: var(--green); border: 1px solid var(--green); }
  .plan-elite:not(.featured) { background: var(--card2); border: 1px solid var(--line); }

  /* ── FAQ ── */
  .faq-elite { border-bottom: 1px solid var(--line); cursor: pointer; transition: all 0.2s; }
  .faq-elite:hover { background: var(--bg2); }

  /* ── INDUSTRY ── */
  .industry-elite {
    background: var(--card2); border: 1px solid var(--line);
    padding: 22px 18px;
    transition: all 0.3s;
  }
  .industry-elite:hover {
    background: var(--goldbg);
    border-color: var(--line2);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  }

  /* ── BADGE ── */
  .badge-e { display: inline-flex; align-items: center; padding: 3px 10px; font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 1px; text-transform: uppercase; }
  .badge-gold { background: rgba(184,146,42,0.1); color: var(--gold2); border: 1px solid rgba(184,146,42,0.2); }
  .badge-green { background: rgba(34,197,94,0.08); color: #86EFAC; border: 1px solid rgba(34,197,94,0.15); }
  .badge-cream { background: rgba(242,237,228,0.06); color: var(--cream2); border: 1px solid var(--wire); }

  /* ── INPUT ── */
  .input-e { background: var(--bg2); border: 1px solid var(--line); padding: 12px 14px; font-size: 14px; color: var(--text1); outline: none; font-family: 'Inter', sans-serif; transition: all 0.2s; width: 100%; }
  .input-e:focus { border-color: var(--gold); box-shadow: 0 0 0 2px rgba(184,146,42,0.15); }
  .input-e::placeholder { color: #999; }

  /* ── GOLD LINE DIVIDER ── */
  .gold-line { height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: 0.4; }

  /* ── MOBILE ── */
    /* Force mobile-first large text on all screens */
  @media (max-width: 1024px) {
    body { font-size: 24px !important; }
    p, span, div, li, a { font-size: inherit; }
    .mono { font-size: 18px !important; }
  }

  @media (max-width: 768px) {
    .hide-m { display: none !important; }
    .m-stack { flex-direction: column !important; gap: 20px !important; }
    .m-full { width: 100% !important; justify-content: center !important; }
    .m-pad { padding-left: 24px !important; padding-right: 24px !important; }
    .m-text-sm { font-size: clamp(52px, 12vw, 80px) !important; }
    body { font-size: 20px !important; line-height: 1.85 !important; }
    p { font-size: 20px !important; }
    .before-after-grid { grid-template-columns: 1fr !important; }
    .feat-grid { grid-template-columns: 1fr !important; }
    .industry-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .testimonial-grid { grid-template-columns: 1fr !important; }
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--ink); }
  ::-webkit-scrollbar-thumb { background: var(--gold); opacity: 0.3; }
`;

// ── SUBTLE TILT ───────────────────────────────────────────────────────────────
function useTilt(strength = 6) {
  const ref = useRef(null);
  const move = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) translateZ(6px)`;
    ref.current.style.transition = "transform 0.1s ease";
  }, [strength]);
  const leave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    ref.current.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
  }, []);
  return { ref, move, leave };
}

function Rise({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("show"); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="rise" style={{ transitionDelay: `${delay}s`, ...style }}>{children}</div>;
}

// ── LOGO ──────────────────────────────────────────────────────────────────────
function Logo({ size = 20 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ position: "relative" }}>
        <div style={{ width: size * 1.8, height: size * 1.8, background: "var(--bg)", border: "1px solid var(--wire2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="editorial" style={{ color: "var(--cream)", fontSize: size * 1.1, fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>Z</span>
        </div>
        <div style={{ position: "absolute", top: -3, right: -3, width: 7, height: 7, background: "var(--gold2)", borderRadius: "50%", boxShadow: "0 0 8px rgba(212,168,67,0.6)" }} />
      </div>
      <span style={{ fontFamily: "Cormorant Garant, serif", fontWeight: 600, fontSize: size, color: "var(--cream)", letterSpacing: 1 }}>
        Zed<span style={{ color: "var(--gold2)" }}>Ping</span>
      </span>
    </div>
  );
}

// ── PHONE MOCKUP ──────────────────────────────────────────────────────────────
function PhoneMockup() {
  const { ref, move, leave } = useTilt(5);
  const msgs = [
    { c: true, t: "Hi, I need a dress under K500" },
    { c: false, t: "Good afternoon! 👗 Here are 3 beautiful options:", p: true },
    { c: true, t: "The red one in size medium, please" },
    { c: false, t: "Lovely choice ✓\n\nRed wrap dress · Size M · K420\n\nKindly send payment to Airtel Money 0977 000 000\n\nYour order will be delivered within 24 hours." },
    { c: true, t: "Payment sent. Thank you! 😊" },
    { c: false, t: "Order confirmed ✓ We appreciate your business." },
  ];

  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave}
      style={{ animation: "breathe 7s ease-in-out infinite", maxWidth: 280, margin: "0 auto" }}>
      {/* Glow behind phone */}
      <div style={{ position: "absolute", inset: -30, background: "radial-gradient(ellipse, rgba(184,146,42,0.08) 0%, transparent 65%)", borderRadius: 60, filter: "blur(20px)", pointerEvents: "none" }} />
      {/* Phone */}
      <div style={{ background: "var(--panel)", border: "1px solid var(--wire2)", borderRadius: 24, padding: 3, boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(184,146,42,0.08), inset 0 1px 0 rgba(255,255,255,0.04)", position: "relative" }}>
        <div style={{ background: "var(--bg)", borderRadius: 20, padding: 14, overflow: "hidden" }}>
          {/* Status */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span className="mono" style={{ fontSize: 28, color: "var(--mist)" }}>09:41</span>
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              {[3,4,4,3].map((h,i) => <div key={i} style={{ width: 2, height: h, background: "var(--mist)", borderRadius: 1 }} />)}
            </div>
          </div>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ width: 30, height: 30, background: "var(--green)", border: "1px solid var(--wire2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🛍️</div>
            <div>
              <div style={{ color: "var(--cream)", fontSize: 26, fontWeight: 600 }}>Lusaka Boutique</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
                <span className="mono" style={{ color: "#22C55E", fontSize: 8 }}>AI Online</span>
              </div>
            </div>
          </div>
          {/* Messages */}
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.c ? "flex-end" : "flex-start", marginBottom: 7 }}>
              <div style={{
                background: m.c ? "var(--green)" : "rgba(255,255,255,0.04)",
                border: m.c ? "1px solid var(--wire2)" : "1px solid rgba(255,255,255,0.05)",
                borderRadius: m.c ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                padding: "8px 11px", maxWidth: "82%",
              }}>
                {m.p && (
                  <div style={{ display: "flex", gap: 5, marginBottom: 7 }}>
                    {[["#8B0000","K420"],["#1a1a1a","K380"],["#1B3A6B","K490"]].map(([bg,p],pi) => (
                      <div key={pi} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden", flex: 1, textAlign: "center" }}>
                        <div style={{ background: bg, height: 42, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="14" height="22" viewBox="0 0 28 44"><path d="M14 2C14 2 10 4 7 8L2 14L8 16L6 42L22 42L20 16L26 14L21 8C18 4 14 2 14 2Z" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/></svg>
                        </div>
                        <div style={{ padding: "3px 2px" }}>
                          <div className="mono" style={{ color: "var(--gold2)", fontSize: 8, fontWeight: 500 }}>{p}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ color: "var(--cream)", fontSize: 10, lineHeight: 1.65, whiteSpace: "pre-line" }}>{m.t}</div>
              </div>
            </div>
          ))}
          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: 10, background: "rgba(184,146,42,0.06)", border: "1px solid var(--wire2)", borderRadius: 8, padding: "7px 0" }}>
            {[["342","Sent"],["98%","Delivered"],["4s","Time"]].map(([v,l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div className="editorial" style={{ color: "var(--gold2)", fontSize: 25, fontWeight: 700 }}>{v}</div>
                <div style={{ color: "var(--mist)", fontSize: 8 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DATA ──────────────────────────────────────────────────────────────────────
const FEATURES = [
  { n:"01", title:"Broadcast to everyone.", body:"One click sends personalised messages to your entire contact list. What took hours now takes seconds.", icon:"⚡" },
  { n:"02", title:"Instant keyword replies.", body:"Customers text QUOTE or HOURS and receive a perfect, immediate response. No human required. No delay.", icon:"🤖" },
  { n:"03", title:"AI agent that sells.", body:"A GPT-powered assistant holds full natural conversations — collecting leads, handling objections, closing sales. Day and night.", icon:"🧠" },
  { n:"04", title:"Schedule and forget.", body:"Set your broadcasts in advance. ZedPing delivers at precisely the right moment, every time, without you lifting a finger.", icon:"📅" },
  { n:"05", title:"Your tools, connected.", body:"Airtable booking confirmed? WhatsApp fires instantly. POS update? Your entire list knows. Seamless.", icon:"🔗" },
  { n:"06", title:"Every message, logged.", body:"Full conversation history. Delivery tracking. The intelligence to understand what your customers need.", icon:"📊" },
];

const PLANS = [
  { name:"Starter", price:"K650", annual:"K450", setup:"K850", msg:"500 msgs / month", features:["1 WhatsApp number","Unlimited broadcasts","2 keyword automations","Message log","CSV contact upload"], featured:false },
  { name:"Business", price:"K1,500", annual:"K1,000", setup:"K2,000", msg:"3,000 msgs / month", features:["Everything in Starter","Unlimited automations","Keyword chatbot","1 AI agent (GPT-4o)","Broadcast scheduler"], featured:true },
  { name:"Pro", price:"K2,500", annual:"K2,000", setup:"K3,500", msg:"Unlimited messages", features:["Everything in Business","3 WhatsApp numbers","Multi-step chatbot","Multiple AI agents","Airtable & POS integration"], featured:false },
];

const INDUSTRIES = [
  {e:"🏫",n:"Schools",t:"Fee reminders to every parent. One click."},
  {e:"🏥",n:"Clinics",t:"Confirmations sent on every booking."},
  {e:"✂️",n:"Salons",t:"Promotions, reminders, stock alerts."},
  {e:"🍽️",n:"Restaurants",t:"Daily specials to your entire contact list."},
  {e:"🏘️",n:"Accommodation",t:"Rent reminders to every tenant."},
  {e:"🔧",n:"Workshops",t:"Job status by keyword. No calls needed."},
  {e:"💰",n:"Microfinance",t:"Loan reminders, disbursement alerts."},
  {e:"✈️",n:"Airlines",t:"Flight alerts, gate changes, confirmations."},
  {e:"🛍️",n:"Retail",t:"AI agent closes sales 24/7."},
  {e:"🏠",n:"Real Estate",t:"New listings to interested buyers instantly."},
];

const FAQS = [
  { q:"Do I need to download anything?", a:"No. ZedPing is entirely browser-based. Log in from any device — phone, tablet, or laptop." },
  { q:"Do my customers need to do anything different?", a:"Nothing at all. They use WhatsApp exactly as they always have. The automation is invisible to them." },
  { q:"How do I connect my WhatsApp number?", a:"Once you activate your plan, our team in Lusaka personally connects your WhatsApp Business number and sets everything up for you." },
  { q:"What is an AI agent?", a:"A GPT-powered assistant trained on your business that holds real conversations with your customers — answering questions, collecting leads, and closing sales around the clock." },
  { q:"What payment methods do you accept?", a:"Airtel Money, MTN Money, Zamtel Money, and card payments (Visa & Mastercard). All billed in Zambian Kwacha. No USD. No exchange rate surprises." },
  { q:"I'm not technical — can I still use ZedPing?", a:"Absolutely. ZedPing was built for business owners, not developers. Our Lusaka team handles every technical aspect of your setup." },
  { q:"Can I cancel at any time?", a:"Yes. No penalties. Your account remains active until the end of your current billing period." },
];

const TICKER = ["Broadcasts","AI Agents","Chatbots","Kwacha Billing","Local Support","Schools","Clinics","Salons","Restaurants","Workshops","Airlines","Real Estate","Accommodation"];

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--line)",
        transition: "all 0.4s",
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo />
          <div className="hide-m" style={{ display: "flex", gap: 40, alignItems: "center" }}>
            {["Features","Pricing","Industries","FAQ"].map(l => (
              <a key={l} className="nav-link-e" href={`#${l.toLowerCase()}`}>{l}</a>
            ))}
          </div>
          <a className="btn-elite" href="https://zed-ping-dashboard.vercel.app?signup=true" style={{ padding: "10px 24px", fontSize: 10 }}>Get Started</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: "var(--bg)", display: "flex", alignItems: "center", paddingTop: 68, position: "relative", overflow: "hidden" }}>
        {/* Subtle warm glow */}
        <div style={{ position: "absolute", top: "20%", right: "0%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(184,146,42,0.08) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,58,42,0.05) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />
        {/* Subtle vertical lines */}
        {[25,50,75].map(x => (
          <div key={x} style={{ position: "absolute", top: 0, bottom: 0, left: `${x}%`, width: 1, background: "rgba(0,0,0,0.04)", pointerEvents: "none" }} />
        ))}

        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(60px,8vw,100px) 40px clamp(60px,8vw,100px)", position: "relative", zIndex: 1, width: "100%", display: "flex", alignItems: "center", gap: 80, flexWrap: "wrap" }}>
          {/* Left */}
          <div style={{ flex: "1 1 400px" }}>
            <Rise>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
                <div style={{ width: 28, height: 1, background: "var(--gold)", opacity: 0.8 }} />
                <span className="mono" style={{ fontSize: 28, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase" }}>Zambia's First WhatsApp Automation Platform</span>
              </div>
            </Rise>
            <Rise delay={0.1}>
              <h1 className="editorial m-text-sm" style={{ fontSize: "clamp(52px, 8vw, 100px)", color: "var(--cream)", letterSpacing: -1, marginBottom: 0 }}>
                Your whole
              </h1>
              <h1 className="editorial m-text-sm" style={{ fontSize: "clamp(52px, 8vw, 100px)", color: "var(--gold)", letterSpacing: -1, marginBottom: 0, fontStyle: "italic" }}>
                contact list.
              </h1>
              <h1 className="editorial m-text-sm" style={{ fontSize: "clamp(52px, 8vw, 100px)", color: "var(--cream)", letterSpacing: -1, marginBottom: 36 }}>
                One click.
              </h1>
            </Rise>
            <Rise delay={0.2}>
              <p style={{ fontSize: "clamp(16px,2vw,18px)", color: "var(--cream2)", lineHeight: 1.85, maxWidth: 500, marginBottom: 40 }}>
                Stop sending WhatsApp messages one by one. ZedPing broadcasts to your entire contact list, automates replies, and deploys AI agents — priced in Kwacha, supported in Lusaka.
              </p>
            </Rise>
            <Rise delay={0.3}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }} className="m-stack">
                <a className="btn-elite m-full" href="https://zed-ping-dashboard.vercel.app?signup=true" style={{ background: "var(--inkbg)", color: "#FFFFFF" }}>Explore Free</a>
                <a className="btn-wire m-full" href="#features" style={{ color: "var(--text1)", borderColor: "var(--line)" }}>See How It Works →</a>
              </div>
            </Rise>
            <Rise delay={0.4}>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {["📱 Airtel Money","📱 MTN Money","📱 Zamtel Money","💳 Visa / Mastercard","🇿🇲 Lusaka Support"].map(t => (
                  <span key={t} style={{ fontSize: 26, color: "var(--text3)" }}>{t}</span>
                ))}
              </div>
            </Rise>
          </div>

          {/* Right — Stats */}
          <Rise delay={0.3} style={{ flex: "0 1 280px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--wire)" }}>
              {[
                { value: "4s", label: "To reach 300+ contacts", sub: "Personalised. Simultaneously." },
                { value: "24/7", label: "AI agent never sleeps", sub: "Handles enquiries around the clock." },
                { value: "K650", label: "Starting price", sub: "In Kwacha. Fixed. Always." },
              ].map((s, i) => (
                <div key={i} style={{ background: "var(--bg2)", padding: "22px 24px", borderLeft: "3px solid var(--gold)", border: "1px solid var(--line)" }}>
                  <div className="editorial" style={{ fontSize: 44, color: "var(--cream)", lineHeight: 1, letterSpacing: -1, fontWeight: 600, marginBottom: 6 }}>{s.value}</div>
                  <div className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>{s.label}</div>
                  <div style={{ fontSize: 27, color: "var(--cream2)" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </Rise>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background: "var(--panel)", borderTop: "1px solid var(--wire)", borderBottom: "1px solid var(--wire)", padding: "12px 0", overflow: "hidden" }}>
        <div className="marquee-inner">
          {[...TICKER,...TICKER].map((t,i) => (
            <span key={i} style={{ color: i%3===0 ? "var(--gold)" : "var(--text3)", fontSize: 26, fontWeight: 500, fontFamily: "DM Mono, monospace", letterSpacing: 2, textTransform: "uppercase", padding: "0 32px", whiteSpace: "nowrap" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── PROBLEM ── */}
      <section style={{ background: "var(--bg)", padding: "clamp(64px,8vw,120px) 40px" }} className="m-pad">
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Rise>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 28, height: 1, background: "var(--gold2)" }} />
              <span className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 2, textTransform: "uppercase" }}>The Problem</span>
            </div>
            <h2 className="editorial" style={{ fontSize: "clamp(36px,6vw,80px)", color: "var(--cream)", letterSpacing: -1, marginBottom: 56, maxWidth: 800, lineHeight: 0.95 }}>
              Every Zambian business owner<br />
              <span style={{ color: "var(--gold2)", fontStyle: "italic" }}>knows this feeling.</span>
            </h2>
          </Rise>
          <div className="before-after-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {[
              { b: "Sending messages all day, one by one", a: "One click sends to your entire list, personalised" },
              { b: '"How much, where are you located" — all day, every day', a: "AI agent answers instantly. 24/7. No human needed." },
              { b: "Appointments forgotten. Revenue lost.", a: "Auto-confirmation fires the moment it's booked." },
              { b: "Chasing payments manually each month.", a: "Reminders sent to everyone in seconds." },
            ].map((p,i) => (
              <Rise key={i} delay={i*0.08} style={{ minWidth: 260, flex: "1 1 260px" }}>
                <div style={{ background: "var(--bg)", height: "100%", border: "1px solid var(--line)" }}>
                  <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--wire)" }}>
                    <div className="mono" style={{ fontSize: 28, color: "rgba(0,0,0,0.35)", letterSpacing: 1.5, marginBottom: 10, textTransform: "uppercase", textDecoration: "line-through" }}>Before</div>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 27, lineHeight: 1.7, textDecoration: "line-through" }}>{p.b}</p>
                  </div>
                  <div style={{ padding: "24px 28px" }}>
                    <div className="mono" style={{ fontSize: 28, color: "var(--gold)", letterSpacing: 1.5, marginBottom: 10, textTransform: "uppercase" }}>With ZedPing</div>
                    <p style={{ color: "var(--text1)", fontSize: 25, lineHeight: 1.7, fontWeight: 600 }}>{p.a}</p>
                  </div>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ background: "var(--bg2)", padding: "clamp(64px,8vw,120px) 40px", borderTop: "1px solid var(--wire)" }} className="m-pad">
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Rise>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 28, height: 1, background: "var(--gold)", opacity: 0.8 }} />
                  <span className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 2, textTransform: "uppercase" }}>Features</span>
                </div>
                <h2 className="editorial" style={{ fontSize: "clamp(36px,6vw,80px)", color: "var(--cream)", letterSpacing: -1, lineHeight: 0.95 }}>
                  Everything your<br /><span style={{ color: "var(--gold2)", fontStyle: "italic" }}>business needs.</span>
                </h2>
              </div>
              <a className="btn-wire" href="#pricing" style={{ fontSize: 10 }}>View Pricing →</a>
            </div>
          </Rise>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {FEATURES.map((f,i) => (
              <Rise key={i} delay={i*0.07}>
                <div className="feat-elite">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <span style={{ fontSize: 24 }}>{f.icon}</span>
                    <span className="mono" style={{ fontSize: 26, color: "rgba(255,255,255,0.08)", fontWeight: 500 }}>{f.n}</span>
                  </div>
                  <h3 className="editorial" style={{ fontSize: 28, color: "var(--cream)", marginBottom: 10, lineHeight: 1.2, fontWeight: 600 }}>{f.title}</h3>
                  <p style={{ fontSize: 26, color: "var(--text2)", lineHeight: 1.8 }}>{f.body}</p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" style={{ background: "var(--bg2)", padding: "clamp(64px,8vw,120px) 40px", borderTop: "1px solid var(--wire)" }} className="m-pad">
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Rise>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 28, height: 1, background: "var(--gold2)" }} />
              <span className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 2, textTransform: "uppercase" }}>Who It's For</span>
            </div>
            <h2 className="editorial" style={{ fontSize: "clamp(36px,6vw,80px)", color: "var(--text1)", letterSpacing: -1, marginBottom: 16, lineHeight: 0.95 }}>
              Built for every<br /><span style={{ color: "var(--gold2)", fontStyle: "italic" }}>Zambian SME.</span>
            </h2>
            <p style={{ fontSize: 25, color: "var(--mist)", marginBottom: 56, maxWidth: 480, lineHeight: 1.8 }}>If your business communicates with customers on WhatsApp, ZedPing was built for you.</p>
          </Rise>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {INDUSTRIES.map((v,i) => (
              <Rise key={i} delay={i*0.04}>
                <div className="industry-elite">
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{v.e}</div>
                  <div style={{ fontSize: 25, fontWeight: 700, color: "var(--text1)", marginBottom: 6 }}>{v.n}</div>
                  <div style={{ fontSize: 26, color: "var(--mist)", lineHeight: 1.6 }}>{v.t}</div>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>


      {/* ── AI AGENT DEMO ── */}
      <section style={{ background: "var(--bg)", padding: "clamp(64px,8vw,120px) 40px", borderTop: "1px solid var(--line)" }} className="m-pad">
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", gap: 80, alignItems: "center", flexWrap: "wrap" }} className="m-stack">
          <div style={{ flex: "1 1 380px" }}>
            <Rise>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 28, height: 1, background: "var(--gold)", opacity: 0.8 }} />
                <span className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 2, textTransform: "uppercase" }}>AI Sales Agent</span>
              </div>
              <h2 className="editorial" style={{ fontSize: "clamp(36px,5vw,72px)", color: "var(--text1)", letterSpacing: -1, lineHeight: 0.95, marginBottom: 24 }}>
                Your shop.<br /><span style={{ color: "var(--gold2)", fontStyle: "italic" }}>Open 24/7.</span>
              </h2>
              <p style={{ fontSize: 25, color: "var(--mist)", lineHeight: 1.85, marginBottom: 32, maxWidth: 420 }}>
                Your AI agent takes orders, recommends products, collects payment, and confirms delivery — all inside WhatsApp. While you rest.
              </p>
              <a className="btn-elite" href="https://zed-ping-dashboard.vercel.app?signup=true" style={{ background: "var(--green)", color: "var(--cream)" }}>Start for Free</a>
            </Rise>
          </div>
          <Rise delay={0.2} style={{ flex: "0 0 280px", position: "relative" }}>
            <PhoneMockup />
          </Rise>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: "var(--bg)", padding: "clamp(64px,8vw,120px) 40px", borderTop: "1px solid var(--wire)" }} className="m-pad">
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Rise>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 28, height: 1, background: "var(--gold2)" }} />
              <span className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 2, textTransform: "uppercase" }}>Pricing</span>
            </div>
            <h2 className="editorial" style={{ fontSize: "clamp(36px,6vw,80px)", color: "var(--text1)", letterSpacing: -1, marginBottom: 16, lineHeight: 0.95 }}>
              Priced in Kwacha.<br /><span style={{ color: "var(--gold2)", fontStyle: "italic" }}>No USD surprises.</span>
            </h2>
            <p style={{ fontSize: 25, color: "var(--cream2)", marginBottom: 14, maxWidth: 560, lineHeight: 1.85 }}>
              Competitors charge $40–$70/month in USD — roughly K900–K1,600. Every time the exchange rate moves, so does their bill. ZedPing? K650/month. In Kwacha. Fixed. Always.
            </p>
            <p style={{ fontSize: 27, color: "var(--mist)", marginBottom: 56, opacity: 0.6, fontFamily: "DM Mono, monospace", letterSpacing: 1 }}>
              Airtel Money · MTN Money · Zamtel Money · Visa / Mastercard
            </p>
          </Rise>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, alignItems: "start" }}>
            {PLANS.map((p,i) => (
              <Rise key={i} delay={i*0.1}>
                <div className={`plan-elite ${p.featured ? "featured" : ""}`} style={{ position: "relative" }}>
                  {p.featured && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--gold2), transparent)" }} />}
                  {p.featured && <div className="mono" style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--gold)", color: "var(--ink)", fontSize: 28, fontWeight: 600, padding: "3px 14px", letterSpacing: 2, whiteSpace: "nowrap" }}>MOST POPULAR</div>}
                  <div className="mono" style={{ fontSize: 28, color: p.featured ? "var(--gold2)" : "var(--text3)", fontSize: 27, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16 }}>{p.name}</div>
                  <div className="editorial" style={{ fontSize: 56, color: "var(--cream)", letterSpacing: -1, lineHeight: 1, marginBottom: 4 }}>{p.price}</div>
                  <div className="mono" style={{ color: "rgba(255,255,255,0.95)", fontSize: 26, marginBottom: 4 }}>/month · or {p.annual}/mo annually</div>
                  <div className="mono" style={{ color: "rgba(255,255,255,0.7)", fontSize: 26, marginBottom: 8 }}>{p.setup} once-off setup</div>
                  <div className="mono" style={{ color: p.featured ? "var(--gold2)" : "#E0E0E0", fontSize: 26, marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: p.featured ? "var(--gold2)" : "var(--mist)", display: "inline-block" }} />
                    {p.msg}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                    {p.features.map((f,j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ color: p.featured ? "var(--gold2)" : "var(--text2)", fontSize: 12 }}>—</span>
                        <span style={{ fontSize: 26, color: j===0&&i>0 ? "#CCCCCC" : "var(--cream)", fontStyle: j===0&&i>0 ? "italic" : "normal" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="https://zed-ping-dashboard.vercel.app?signup=true" className={p.featured ? "btn-elite" : "btn-wire"} style={{ display: "flex", justifyContent: "center", width: "100%", fontSize: 10 }}>
                    Get Started →
                  </a>
                </div>
              </Rise>
            ))}
          </div>
          <Rise delay={0.4}>
            <p className="mono" style={{ textAlign: "center", color: "var(--text2)", fontSize: 27, marginTop: 24, letterSpacing: 1.5, opacity: 0.5 }}>
              Free to explore · Pay to activate · No USD billing · Cancel anytime
            </p>
          </Rise>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: "var(--bg2)", padding: "clamp(64px,8vw,120px) 40px", borderTop: "1px solid var(--line)" }} className="m-pad">
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Rise>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 28, height: 1, background: "var(--gold2)" }} />
              <span className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 2, textTransform: "uppercase" }}>Beta Testers</span>
            </div>
            <h2 className="editorial" style={{ fontSize: "clamp(36px,6vw,80px)", color: "var(--text1)", letterSpacing: -1, marginBottom: 48, lineHeight: 0.95 }}>
              Real businesses.<br /><span style={{ color: "var(--gold2)", fontStyle: "italic" }}>Real results.</span>
            </h2>
          </Rise>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {[
              { q: "Before ZedPing I was manually sending fee reminders to over 300 parents every term. Now it takes seconds. The time saved in the accounts office is remarkable.", n: "Accounts Manager", o: "Beta Tester · School, Lusaka" },
              { q: "Our customers get instant replies even at night. We haven't missed a single lead since activating the AI agent. It works around the clock without complaint.", n: "Business Owner", o: "Beta Tester · Workshop, Lusaka" },
              { q: "Priced in Kwacha, paid via Airtel Money. No USD stress, no bank transfers. A local product built to the standard of any international platform.", n: "Manager", o: "Beta Tester · SME, Lusaka" },
            ].map((t,i) => (
              <Rise key={i} delay={i*0.1}>
                <div className="card-elite" style={{ padding: "36px 28px", background: "var(--bg2)" }}>
                  <div className="editorial" style={{ fontSize: 56, color: "var(--gold2)", lineHeight: 0.7, marginBottom: 20, opacity: 0.6, fontStyle: "italic" }}>"</div>
                  <p style={{ color: "var(--text1)", fontSize: 26, lineHeight: 1.9, marginBottom: 28, fontStyle: "italic" }}>{t.q}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 36, height: 36, background: "var(--green)", border: "1px solid var(--wire2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "var(--gold2)", fontFamily: "Cormorant Garant, serif" }}>{t.n.charAt(0)}</div>
                    <div>
                      <div style={{ color: "var(--text1)", fontSize: 27, fontWeight: 600 }}>{t.n}</div>
                      <div className="mono" style={{ color: "var(--text2)", fontSize: 27, marginTop: 2 }}>{t.o}</div>
                    </div>
                  </div>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ background: "var(--bg)", padding: "clamp(64px,8vw,120px) 40px", borderTop: "1px solid var(--wire)" }} className="m-pad">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Rise>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 28, height: 1, background: "var(--gold2)" }} />
              <span className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 2, textTransform: "uppercase" }}>FAQ</span>
            </div>
            <h2 className="editorial" style={{ fontSize: "clamp(36px,6vw,72px)", color: "var(--text1)", letterSpacing: -1, marginBottom: 48, lineHeight: 0.95 }}>
              Questions<br /><span style={{ color: "var(--gold2)", fontStyle: "italic" }}>answered.</span>
            </h2>
          </Rise>
          {FAQS.map((f,i) => (
            <Rise key={i} delay={i*0.04}>
              <div className="faq-elite" onClick={() => setOpenFaq(openFaq===i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", gap: 20 }}>
                  <span style={{ color: "var(--cream)", fontSize: 25, fontWeight: 400, lineHeight: 1.4 }}>{f.q}</span>
                  <span className="editorial" style={{ color: openFaq===i ? "var(--gold2)" : "var(--mist)", fontSize: 28, fontWeight: 300, flexShrink: 0, transition: "all 0.3s" }}>{openFaq===i ? "−" : "+"}</span>
                </div>
                {openFaq===i && (
                  <div style={{ paddingBottom: 20 }}>
                    <p style={{ color: "var(--text2)", fontSize: 27, lineHeight: 1.85 }}>{f.a}</p>
                  </div>
                )}
              </div>
            </Rise>
          ))}
        </div>
      </section>


      {/* ── ABOUT ── */}
      <section id="about" style={{ background: "var(--bg2)", padding: "clamp(64px,8vw,120px) 40px", borderTop: "1px solid var(--wire)" }} className="m-pad">
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", gap: 80, alignItems: "flex-start", flexWrap: "wrap" }} >
          <div style={{ flex: "1 1 380px" }}>
            <Rise>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 28, height: 1, background: "var(--gold)", opacity: 0.8 }} />
                <span className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 2, textTransform: "uppercase" }}>About</span>
              </div>
              <h2 className="editorial" style={{ fontSize: "clamp(36px,6vw,72px)", color: "var(--text1)", letterSpacing: -1, marginBottom: 24, lineHeight: 0.95 }}>
                Built in Lusaka.<br /><span style={{ color: "var(--gold2)", fontStyle: "italic" }}>Built for Zambia.</span>
              </h2>
              <p style={{ fontSize: 27, color: "var(--text2)", lineHeight: 1.9, marginBottom: 20 }}>
                ZedPing is Zambia's first WhatsApp automation platform built specifically for local SMEs. We exist because Zambian businesses deserve world-class communication tools — priced in Kwacha, supported locally, and built to understand the way businesses here actually operate.
              </p>
              <p style={{ fontSize: 27, color: "var(--text2)", lineHeight: 1.9, marginBottom: 32 }}>
                Before ZedPing, the only options were expensive international platforms billed in USD with no local support and no understanding of the Zambian market. ZedPing changes that. From school fee reminders to AI-powered sales agents — every feature was designed with Zambian businesses in mind.
              </p>
              <div style={{ background: "var(--bg2)", border: "1px solid var(--line)", padding: "20px 24px", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", opacity: 0.4 }} />
                <div className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>A product of</div>
                <div className="editorial" style={{ fontSize: 28, color: "var(--green)", fontWeight: 700, marginBottom: 6 }}>Coreline Systems</div>
                <p style={{ fontSize: 27, color: "var(--mist)", lineHeight: 1.7 }}>Coreline Systems is a business systems consultancy based in Lusaka, Zambia — helping businesses build structured systems and streamlined operations. ZedPing is our first SaaS product.</p>
              </div>
            </Rise>
          </div>
          <Rise delay={0.2} style={{ flex: "1 1 300px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { label: "Founded", value: "2026", sub: "Lusaka, Zambia" },
                { label: "Mission", value: "Local tools", sub: "For local businesses" },
                { label: "Pricing", value: "Kwacha only", sub: "No USD billing. Ever." },
                { label: "Support", value: "In Lusaka", sub: "Real people, local time zone" },
                { label: "Payments", value: "Mobile money", sub: "Airtel · MTN · Zamtel · Card" },
              ].map((s,i) => (
                <div key={i} style={{ background: "var(--panel)", padding: "18px 22px" }}>
                  <div className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 27, fontWeight: 700, color: "var(--text1)", marginBottom: 3 }}>{s.value}</div>
                  <div style={{ fontSize: 27, color: "var(--cream2)" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </Rise>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: "var(--bg)", padding: "clamp(64px,8vw,120px) 40px", borderTop: "1px solid var(--wire)" }} className="m-pad">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Rise>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 28, height: 1, background: "var(--gold2)" }} />
              <span className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 2, textTransform: "uppercase" }}>Get in Touch</span>
            </div>
            <h2 className="editorial" style={{ fontSize: "clamp(36px,6vw,72px)", color: "var(--text1)", letterSpacing: -1, marginBottom: 16, lineHeight: 0.95 }}>
              Contact us.
            </h2>
            <p style={{ fontSize: 25, color: "var(--cream2)", lineHeight: 1.8, marginBottom: 48 }}>We're based in Lusaka and we actually answer. Reach out for support, sales enquiries, or to book a demo.</p>
          </Rise>
          <Rise delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 32 }}>
              {[
                { label: "Email", value: "hello@zedping.com", sub: "We respond within 24 hours", icon: "📧" },
                { label: "WhatsApp", value: "+260 [number coming soon]", sub: "Customer support & demos", icon: "📱" },
                { label: "Phone", value: "+260 [number coming soon]", sub: "Mon – Fri · 08:00 – 17:00 CAT", icon: "☎️" },
                { label: "Location", value: "Lusaka, Zambia", sub: "Central African Time (UTC+2)", icon: "📍" },
                { label: "LinkedIn", value: "ZedPing", sub: "Follow us for updates and news", icon: "💼" },
              ].map((c,i) => (
                <div key={i} style={{ background: "var(--bg2)", padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, border: "1px solid var(--line)", marginBottom: 1 }}>
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{c.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontSize: 25, color: "var(--text1)", fontWeight: 600, marginBottom: 2 }}>{c.value}</div>
                    <div style={{ fontSize: 27, color: "var(--text2)" }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Rise>
        </div>
      </section>

      {/* ── LEGAL ── */}
      <section id="legal" style={{ background: "var(--bg2)", padding: "clamp(64px,8vw,120px) 40px", borderTop: "1px solid var(--wire)" }} className="m-pad">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Rise>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 28, height: 1, background: "var(--gold2)" }} />
              <span className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 2, textTransform: "uppercase" }}>Legal</span>
            </div>
            <h2 className="editorial" style={{ fontSize: "clamp(32px,5vw,60px)", color: "var(--text1)", letterSpacing: -1, marginBottom: 48, lineHeight: 0.95 }}>
              Privacy Policy &<br /><span style={{ color: "var(--gold2)", fontStyle: "italic" }}>Terms of Service.</span>
            </h2>
          </Rise>

          {/* Privacy Policy */}
          <Rise delay={0.1}>
            <div className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Privacy Policy</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
              {[
                { title: "What we collect", body: "ZedPing collects business name, email address, phone number, and subscription details when you sign up. We also store message logs and contact lists that you upload to the platform. We do not collect personal data beyond what is necessary to operate the service." },
                { title: "How we use your data", body: "Your data is used solely to provide the ZedPing service — sending messages, managing automations, and maintaining your account. We do not sell, rent, or share your personal data with third parties for marketing purposes." },
                { title: "Your customers' data", body: "Contact lists you upload (names, phone numbers) are stored securely and used only to send messages on your instruction. You remain the data controller for your customers' information. ZedPing acts as the data processor." },
                { title: "Data protection", body: "ZedPing operates in compliance with Zambia's Data Protection Act No. 3 of 2021. We are registered as a Data Controller with the Data Protection Commission of Zambia. All data is stored securely using industry-standard encryption." },
                { title: "WhatsApp & Meta compliance", body: "ZedPing uses the official Meta WhatsApp Business API. All messaging activity must comply with Meta's WhatsApp Business Policy. You are responsible for ensuring your contacts have opted in to receive messages from your business." },
                { title: "Data retention", body: "Message logs are retained for 12 months. Account data is retained while your account is active. On account closure, data is deleted within 30 days unless legal obligations require longer retention." },
                { title: "Contact", body: "For privacy-related queries, contact us at hello@zedping.com." },
              ].map((s,i) => (
                <div key={i}>
                  <div style={{ fontSize: 25, fontWeight: 600, color: "var(--text1)", marginBottom: 6 }}>{s.title}</div>
                  <p style={{ fontSize: 27, color: "var(--text2)", fontSize: 25, lineHeight: 1.85 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </Rise>

          <div className="gold-rule" style={{ marginBottom: 48 }} />

          {/* Terms of Service */}
          <Rise delay={0.2}>
            <div className="mono" style={{ fontSize: 28, color: "var(--gold2)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Terms of Service</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { title: "1. Acceptance", body: "By creating a ZedPing account, you agree to these Terms of Service. These terms form a binding agreement between you and Coreline Systems, trading as ZedPing. If you do not agree, do not use the platform." },
                { title: "2. The service", body: "ZedPing provides a WhatsApp automation platform for business use. Features include broadcast messaging, keyword automations, AI agents, and message logging. Features are available according to your subscription plan." },
                { title: "3. Acceptable use", body: "You may only use ZedPing for lawful business communication. You must not send spam, harass, mislead, or contact individuals who have not opted in to receive your messages. ZedPing may suspend accounts that violate this clause without notice." },
                { title: "4. WhatsApp compliance", body: "All messaging activity must comply with Meta's WhatsApp Business Policy. You are solely responsible for ensuring your contact lists are opted in. ZedPing is not responsible for messages you send or their consequences." },
                { title: "5. Subscriptions and billing", body: "Subscriptions are billed monthly in Zambian Kwacha via Airtel Money, MTN Money, Zamtel Money, or card payment. Subscriptions renew automatically. Cancellation takes effect at the end of the current billing period. No refunds are issued for partial months." },
                { title: "6. Data and confidentiality", body: "You retain ownership of your data. ZedPing processes your data as a data processor under your instruction. You are the data controller and are responsible for compliance with Zambia's Data Protection Act in respect of your customers' data." },
                { title: "7. Limitation of liability", body: "ZedPing is provided as-is. To the fullest extent permitted by Zambian law, Coreline Systems is not liable for indirect, incidental, or consequential damages arising from your use of the platform." },
                { title: "8. Governing law", body: "These terms are governed by the laws of the Republic of Zambia. Any disputes shall be resolved through the courts of Zambia." },
                { title: "9. Changes", body: "ZedPing may update these terms with 14 days notice by email. Continued use of the platform after changes take effect constitutes acceptance of the revised terms." },
                { title: "10. Contact", body: "For queries about these terms, contact hello@zedping.com. ZedPing is a product of Coreline Systems, Lusaka, Zambia." },
              ].map((s,i) => (
                <div key={i}>
                  <div style={{ fontSize: 25, fontWeight: 600, color: "var(--text1)", marginBottom: 6 }}>{s.title}</div>
                  <p style={{ fontSize: 27, color: "var(--text2)", fontSize: 25, lineHeight: 1.85 }}>{s.body}</p>
                </div>
              ))}
            </div>
            <p className="mono" style={{ fontSize: 28, color: "var(--text3)", marginTop: 32, letterSpacing: 1 }}>Last updated: June 2026 · ZedPing · A product of Coreline Systems · Lusaka, Zambia</p>
          </Rise>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--bg2)", padding: "clamp(80px,10vw,140px) 40px", position: "relative", overflow: "hidden" }} className="m-pad">
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(184,146,42,0.1) 0%, transparent 60%)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Rise>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 28, height: 1, background: "var(--gold)", opacity: 0.8 }} />
              <span className="mono" style={{ fontSize: 28, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase" }}>Now Available in Zambia</span>
              <div style={{ width: 28, height: 1, background: "var(--gold)", opacity: 0.8 }} />
            </div>
          </Rise>
          <Rise delay={0.1}>
            <h2 className="editorial" style={{ fontSize: "clamp(48px,8vw,100px)", color: "var(--cream)", letterSpacing: -2, lineHeight: 0.92, marginBottom: 24 }}>
              Stop losing sales<br />
              <span style={{ color: "var(--gold2)", fontStyle: "italic" }}>to slow replies.</span>
            </h2>
          </Rise>
          <Rise delay={0.2}>
            <p style={{ fontSize: 26, color: "var(--text1)", lineHeight: 1.85, maxWidth: 520, margin: "0 auto 48px" }}>
              Explore the ZedPing dashboard for free. Pay only when you're ready to go live. No USD billing.
            </p>
          </Rise>
          <Rise delay={0.3}>
            <a className="btn-elite" href="https://zed-ping-dashboard.vercel.app?signup=true" style={{ fontSize: 27, padding: "16px 48px", background: "var(--inkbg)", color: "#FFFFFF" }}>
              Get Started Free →
            </a>
          </Rise>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--bg2)", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "56px 40px 28px" }} className="m-pad">
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 40 }}>
            <div style={{ maxWidth: 260 }}>
              <div style={{ marginBottom: 16 }}><Logo /></div>
              <p style={{ color: "var(--text2)", fontSize: 27, lineHeight: 1.8 }}>
                Zambia's first WhatsApp automation platform. Built for SMEs. Priced in Kwacha.
              </p>
            </div>
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              {[["Product",["Features","Pricing","Industries","FAQ"]],["Company",["About ZedPing","Contact Us","LinkedIn","WhatsApp Us"]],["Legal",["Privacy Policy","Terms of Service"]]].map(([title,links]) => (
                <div key={title}>
                  <div className="mono" style={{ color: "var(--gold)", fontSize: 28, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 16 }}>{title}</div>
                  {links.map(l => {
                  const anchors = {"Features":"#features","Pricing":"#pricing","Industries":"#industries","FAQ":"#faq","About ZedPing":"#about","Contact Us":"#contact","Privacy Policy":"#legal","Terms of Service":"#legal"};
                  return <div key={l} style={{ marginBottom: 10 }}><a href={anchors[l]||"#"} style={{ color: "var(--text2)", fontSize: 15 }}>{l}</a></div>;
                })}
                </div>
              ))}
            </div>
          </div>
          <div className="gold-line" style={{ marginBottom: 20 }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <p className="mono" style={{ color: "var(--text2)", fontSize: 27, letterSpacing: 1 }}>© 2026 ZedPing · A product of Coreline Systems · Lusaka, Zambia</p>
            <p className="editorial" style={{ color: "var(--text2)", fontSize: 26, fontStyle: "italic" }}>Your business, on autopilot.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
