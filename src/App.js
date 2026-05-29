{/* ── HERO ── */}
<section style={{
  display: "flex",
  alignItems: "center",
  paddingTop: 64,
  paddingBottom: 40,
  position: "relative",
  overflow: "hidden",
  background: BG
}}>
  {/* Radial glows */}
  <div style={{
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 800,
    height: 400,
    background: `radial-gradient(ellipse, rgba(91,91,214,0.18) 0%, transparent 65%)`,
    pointerEvents: "none"
  }} />

  <div style={{
    position: "absolute",
    bottom: "5%",
    right: "10%",
    width: 400,
    height: 400,
    background: `radial-gradient(circle, rgba(94,230,255,0.08) 0%, transparent 60%)`,
    pointerEvents: "none"
  }} />

  {/* Grid */}
  <div style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
    backgroundSize: "64px 64px"
  }} />

  <div style={{
    maxWidth: 1160,
    margin: "0 auto",
    padding: "0px 24px 30px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 64,
    flexWrap: "wrap"
  }}>
    {/* Left */}
    <div style={{ flex: "1 1 480px" }}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div className="chip">
            <span className="glow-dot" />
            Zambia's First WhatsApp Automation Platform
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1 style={{
          fontSize: "clamp(44px, 6vw, 78px)",
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: -3.5,
          marginBottom: 20,
          color: TEXT1
        }}>
          Your whole<br />
          <span className="gradient-text">contact list.</span><br />
          One click.
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p style={{
          fontSize: 18,
          color: TEXT2,
          lineHeight: 1.75,
          marginBottom: 32,
          maxWidth: 500
        }}>
          Stop typing WhatsApp messages one by one. ZedPing broadcasts, automates replies, and deploys AI agents -- priced in Kwacha, supported in Lusaka.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 36
        }}>
          <a className="btn-glow" href="#pricing">
            Start 7-Day Free Trial
          </a>

          <a className="btn-ghost" href="#features">
            See Features →
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[["💳", "No credit card"], ["📱", "Airtel / MTN Money"], ["🇿🇲", "Support in Lusaka"]].map(([e, t]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontSize: 14 }}>{e}</span>
              <span style={{ fontSize: 13, color: TEXT2, fontWeight: 500 }}>
                {t}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>

    {/* Right -- mockup */}
    <FadeIn delay={0.2} style={{ flex: "0 0 300px" }}>
      <div
        className="float glass"
        style={{
          padding: 18,
          maxWidth: 300,
          margin: "0 auto",
          boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(91,91,214,0.2), inset 0 1px 0 rgba(255,255,255,0.06)`
        }}
      >
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${INDIGO}, #7B6FE8)`,
          borderRadius: 14,
          padding: "12px 14px",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 10
        }}>
          <div style={{
            width: 34,
            height: 34,
            background: "rgba(255,255,255,0.15)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16
          }}>
            🏫
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ color: WHITE, fontWeight: 700, fontSize: 12 }}>
              Sunrise Academy
            </div>

            <div style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 10
            }}>
              342 contacts · just now
            </div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: 100,
            padding: "3px 9px"
          }}>
            <span style={{
              color: WHITE,
              fontSize: 9,
              fontWeight: 800
            }}>
              SENT ✓
            </span>
          </div>
        </div>

        {/* Messages */}
        {[
          { t: "Hi Mrs Mwanza, Kutimba has outstanding fees of K3,500 due 30 May. Call 0977 000 000.", me: true },
          { t: "Thank you! Paying today 🙏", me: false },
          { t: "Hi Mr Banda, Chanda has outstanding fees of K2,200 due 30 May.", me: true },
          { t: "Receipt sent ✓", me: false },
        ].map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.me ? "flex-start" : "flex-end",
              marginBottom: 7
            }}
          >
            <div
              style={{
                background: m.me
                  ? "rgba(91,91,214,0.12)"
                  : "rgba(255,255,255,0.05)",
                border: m.me
                  ? "1px solid rgba(91,91,214,0.2)"
                  : "1px solid rgba(255,255,255,0.07)",
                borderRadius: m.me
                  ? "14px 14px 14px 4px"
                  : "14px 14px 4px 14px",
                padding: "9px 12px",
                fontSize: 12,
                lineHeight: 1.5,
                maxWidth: 220,
                color: TEXT1
              }}
            >
              {m.t}
            </div>
          </div>
        ))}

        {/* Stats */}
        <div style={{
          background: "rgba(91,91,214,0.12)",
          border: "1px solid rgba(91,91,214,0.2)",
          borderRadius: 12,
          padding: "10px 14px",
          marginTop: 10,
          display: "flex",
          justifyContent: "space-around"
        }}>
          {[["342", "Sent"], ["98%", "Delivered"], ["4s", "Time"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{
                color: CYAN,
                fontWeight: 800,
                fontSize: 16,
                letterSpacing: -0.5
              }}>
                {v}
              </div>

              <div style={{
                color: TEXT2,
                fontSize: 9,
                marginTop: 1
              }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  </div>
</section>