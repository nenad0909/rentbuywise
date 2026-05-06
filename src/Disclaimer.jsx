import { Link } from "react-router-dom";
import { ACCENT, INK, RULE } from "./theme";

const SECTION_EYEBROW_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-start",
  boxSizing: "border-box",
  width: 248,
  fontSize: 13,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 600,
  lineHeight: 1.2,
  color: "#fff",
  background: ACCENT,
  padding: "8px 14px",
  borderRadius: 6,
};

export default function DisclaimerPage() {
  return (
    <main
      className="rvb-disclaimer-main"
      style={{
        flex: "1 0 auto",
        padding: "32px 40px 80px",
        maxWidth: 720,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <p style={{ margin: "0 0 20px", fontSize: 14 }}>
        <Link to="/" style={{ color: INK, opacity: 0.55, textDecoration: "none", fontWeight: 500 }}>
          ← Back to calculator
        </Link>
      </p>

      <div className="rvb-eyebrow" style={{ ...SECTION_EYEBROW_STYLE, marginBottom: 20 }}>
        Disclaimer
      </div>

      <h1 style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(36px, 5vw, 48px)", fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 24px", color: INK, lineHeight: 1.15 }}>
        Disclaimer
      </h1>

      <div style={{ background: "#fff", border: `1px solid ${RULE}`, borderRadius: 8, padding: "28px 32px" }}>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: INK }}>
          RentBuyWise provides estimates for educational and informational purposes only. Results are based on the information entered by the user and may not reflect actual costs, market conditions,
          taxes, insurance, loan terms, or future home values. RentBuyWise does not provide financial, legal, tax, mortgage, investment, or real estate advice. Please consult a qualified professional
          before making a major housing or financial decision.
        </p>
      </div>
    </main>
  );
}
