import { Link, Outlet, useLocation } from "react-router-dom";
import rentbuywiseLogoUrl from "./assets/rentbuywise_logo.svg";
import { INK, PAPER, RULE } from "./theme";

export default function Layout() {
  const isHome = useLocation().pathname === "/";

  return (
    <div className="rvb-app-root" style={{ background: PAPER, color: INK, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      <header style={{ borderBottom: `1px solid ${RULE}`, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10, background: PAPER }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src={rentbuywiseLogoUrl} alt="RentBuyWise" style={{ height: 28, width: "auto", display: "block" }} />
        </Link>
        {isHome ? (
          <div className="rvb-no-print" style={{ display: "flex", gap: 28, fontSize: 13, opacity: 0.7 }}>
            <a href="#calculator" style={{ color: "inherit", textDecoration: "none" }}>
              Calculator
            </a>
          </div>
        ) : (
          <div className="rvb-no-print" style={{ display: "flex", gap: 28, fontSize: 13, opacity: 0.7 }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Calculator
            </Link>
          </div>
        )}
      </header>

      <Outlet />

      <footer
        className="rvb-site-footer"
        style={{
          borderTop: `1px solid ${RULE}`,
          padding: "28px 40px 48px",
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          fontSize: 13,
          lineHeight: 1.6,
          opacity: 0.72,
          textAlign: "center",
        }}
      >
        <nav aria-label="Legal and contact" style={{ flexWrap: "wrap", display: "flex", justifyContent: "center" }}>
          <Link to="/privacy-policy" style={{ color: "inherit", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <span aria-hidden="true" style={{ margin: "0 10px", opacity: 0.5 }}>
            |
          </span>
          <Link to="/terms-of-use" style={{ color: "inherit", textDecoration: "none" }}>
            Terms of Use
          </Link>
          <span aria-hidden="true" style={{ margin: "0 10px", opacity: 0.5 }}>
            |
          </span>
          <Link to="/disclaimer" style={{ color: "inherit", textDecoration: "none" }}>
            Disclaimer
          </Link>
          <span aria-hidden="true" style={{ margin: "0 10px", opacity: 0.5 }}>
            |
          </span>
          <a href="mailto:i@inenad.com" style={{ color: "inherit", textDecoration: "none" }}>
            Contact
          </a>
        </nav>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.92 }}>Nenad Milicevic, 2026 all rights reserved</p>
      </footer>
    </div>
  );
}
