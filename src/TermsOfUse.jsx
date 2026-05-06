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

const h2 = { fontFamily: '"Instrument Serif", serif', fontSize: 22, fontWeight: 400, margin: "28px 0 12px", color: INK, letterSpacing: "-0.01em" };
const p = { margin: "0 0 12px", fontSize: 15, lineHeight: 1.65, color: INK };
const ul = { margin: "0 0 16px", paddingLeft: 22, fontSize: 15, lineHeight: 1.6, color: INK };

export default function TermsOfUsePage() {
  return (
    <main
      className="rvb-terms-main"
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
        Legal
      </div>

      <h1 style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(36px, 5vw, 48px)", fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 8px", color: INK, lineHeight: 1.15 }}>
        Terms of Use for RentBuyWise
      </h1>

      <div style={{ background: "#fff", border: `1px solid ${RULE}`, borderRadius: 8, padding: "28px 32px" }}>
        <p style={{ ...p, opacity: 0.75, fontSize: 14 }}>Effective Date: May 5, 2026</p>
        <p style={{ ...p, opacity: 0.75, fontSize: 14, marginBottom: 20 }}>Last Updated: May 5, 2026</p>

        <p style={p}>
          Welcome to RentBuyWise.app. These Terms of Use (&quot;Terms&quot;) govern your access to and use of RentBuyWise, including our rent-versus-buy calculator, website, content, tools, and related
          services.
        </p>
        <p style={p}>By using RentBuyWise.app, you agree to these Terms. If you do not agree with these Terms, please do not use the website.</p>

        <h2 style={h2}>1. About RentBuyWise</h2>
        <p style={p}>RentBuyWise is an informational web application designed to help users compare the estimated financial impact of renting versus buying a home.</p>
        <p style={p}>
          The calculator may use information entered by the user, such as rent amount, home price, mortgage rate, down payment, taxes, insurance, maintenance costs, appreciation assumptions, and other
          estimated expenses to generate comparison results.
        </p>
        <p style={p}>RentBuyWise is intended for educational and informational purposes only.</p>

        <h2 style={h2}>2. No Financial, Legal, Tax, Mortgage, Investment, or Real Estate Advice</h2>
        <p style={p}>RentBuyWise does not provide financial, legal, tax, mortgage, investment, insurance, or real estate advice.</p>
        <p style={p}>
          The information and calculator results provided on RentBuyWise.app are estimates only and should not be relied on as professional advice. Your actual costs, mortgage terms, tax obligations,
          insurance costs, property value, market conditions, and personal financial situation may vary significantly.
        </p>
        <p style={p}>
          Before making any housing, mortgage, investment, legal, or financial decision, you should consult a qualified professional, such as a financial advisor, mortgage lender, real estate professional,
          attorney, tax advisor, or insurance provider.
        </p>

        <h2 style={h2}>3. Calculator Results Are Estimates Only</h2>
        <p style={p}>
          RentBuyWise calculations are based on the information and assumptions entered by the user. We do not independently verify the accuracy of the information you enter.
        </p>
        <p style={p}>Calculator results may be affected by many factors, including but not limited to:</p>
        <ul style={ul}>
          <li style={{ marginBottom: 6 }}>Incorrect or incomplete user inputs</li>
          <li style={{ marginBottom: 6 }}>Changes in mortgage rates</li>
          <li style={{ marginBottom: 6 }}>Property tax differences</li>
          <li style={{ marginBottom: 6 }}>Insurance costs</li>
          <li style={{ marginBottom: 6 }}>Homeowners association fees</li>
          <li style={{ marginBottom: 6 }}>Maintenance and repair costs</li>
          <li style={{ marginBottom: 6 }}>Local market conditions</li>
          <li style={{ marginBottom: 6 }}>Home appreciation or depreciation</li>
          <li style={{ marginBottom: 6 }}>Inflation</li>
          <li style={{ marginBottom: 6 }}>Investment returns</li>
          <li style={{ marginBottom: 6 }}>Closing costs</li>
          <li style={{ marginBottom: 6 }}>Selling costs</li>
          <li style={{ marginBottom: 6 }}>Tax treatment</li>
          <li style={{ marginBottom: 6 }}>Personal financial circumstances</li>
        </ul>
        <p style={p}>
          RentBuyWise does not guarantee that any calculation, projection, estimate, or comparison is accurate, complete, current, or suitable for your specific situation.
        </p>

        <h2 style={h2}>4. User Responsibility</h2>
        <p style={p}>You are responsible for your own decisions and for verifying any information before relying on it.</p>
        <p style={p}>By using RentBuyWise, you agree that:</p>
        <ul style={ul}>
          <li style={{ marginBottom: 6 }}>You will use the website for lawful purposes only.</li>
          <li style={{ marginBottom: 6 }}>You will provide accurate information when using the calculator.</li>
          <li style={{ marginBottom: 6 }}>You understand that calculator results are estimates.</li>
          <li style={{ marginBottom: 6 }}>You will not rely solely on RentBuyWise to make major financial or housing decisions.</li>
          <li style={{ marginBottom: 6 }}>You will consult appropriate professionals before making important decisions.</li>
        </ul>

        <h2 style={h2}>5. No Guarantee of Availability</h2>
        <p style={p}>
          We try to keep RentBuyWise available and functioning properly, but we do not guarantee that the website will always be available, uninterrupted, secure, or error-free.
        </p>
        <p style={p}>We may update, modify, suspend, or discontinue any part of the website at any time without notice.</p>

        <h2 style={h2}>6. Intellectual Property</h2>
        <p style={p}>
          All content on RentBuyWise.app, including the website design, text, graphics, logo, calculator structure, layout, branding, and other materials, is owned by RentBuyWise or used with
          permission.
        </p>
        <p style={p}>
          You may use the website for personal, non-commercial purposes. You may not copy, reproduce, distribute, modify, sell, resell, or exploit any part of the website without our prior written
          permission.
        </p>

        <h2 style={h2}>7. Prohibited Uses</h2>
        <p style={p}>You agree not to:</p>
        <ul style={ul}>
          <li style={{ marginBottom: 6 }}>Use RentBuyWise for illegal or unauthorized purposes</li>
          <li style={{ marginBottom: 6 }}>Attempt to interfere with the website&apos;s operation or security</li>
          <li style={{ marginBottom: 6 }}>Attempt to access systems, data, or accounts without permission</li>
          <li style={{ marginBottom: 6 }}>Copy, scrape, harvest, or extract data from the website without permission</li>
          <li style={{ marginBottom: 6 }}>Use automated tools, bots, or scripts to overload or misuse the website</li>
          <li style={{ marginBottom: 6 }}>Upload or transmit malicious code, viruses, or harmful content</li>
          <li style={{ marginBottom: 6 }}>Misrepresent your identity or affiliation with any person or organization</li>
          <li style={{ marginBottom: 6 }}>Use the website in a way that could damage RentBuyWise or other users</li>
        </ul>

        <h2 style={h2}>8. Third-Party Links and Services</h2>
        <p style={p}>
          RentBuyWise may contain links to third-party websites, services, tools, mortgage providers, real estate platforms, advertisers, or affiliate partners.
        </p>
        <p style={p}>
          We do not control and are not responsible for third-party websites, services, content, privacy practices, or terms. Accessing third-party links is at your own risk.
        </p>
        <p style={p}>
          If we include affiliate links or sponsored content, we may receive compensation when users click those links or purchase services through them.
        </p>

        <h2 style={h2}>9. Privacy</h2>
        <p style={p}>Your use of RentBuyWise is also governed by our Privacy Policy.</p>
        <p style={p}>Please review our Privacy Policy to understand how we collect, use, and protect information.</p>
        <p style={p}>
          Privacy Policy:{" "}
          <Link to="/privacy-policy" style={{ color: ACCENT, fontWeight: 600 }}>
            RentBuyWise.app/privacy-policy
          </Link>
        </p>

        <h2 style={h2}>10. Disclaimer of Warranties</h2>
        <p style={p}>RentBuyWise is provided on an &quot;as is&quot; and &quot;as available&quot; basis.</p>
        <p style={p}>
          To the fullest extent permitted by law, we disclaim all warranties, express or implied, including warranties of accuracy, reliability, availability, merchantability, fitness for a particular
          purpose, and non-infringement.
        </p>
        <p style={p}>We do not warrant that:</p>
        <ul style={ul}>
          <li style={{ marginBottom: 6 }}>The website will meet your expectations</li>
          <li style={{ marginBottom: 6 }}>The calculator results will be accurate or complete</li>
          <li style={{ marginBottom: 6 }}>The website will be uninterrupted or error-free</li>
          <li style={{ marginBottom: 6 }}>Any defects will be corrected</li>
          <li style={{ marginBottom: 6 }}>The website will be free from viruses or harmful components</li>
        </ul>

        <h2 style={h2}>11. Limitation of Liability</h2>
        <p style={p}>
          To the fullest extent permitted by law, RentBuyWise, its owners, operators, affiliates, employees, contractors, or service providers shall not be liable for any direct, indirect, incidental,
          consequential, special, punitive, or other damages arising from or related to your use of the website.
        </p>
        <p style={p}>This includes, but is not limited to, damages related to:</p>
        <ul style={ul}>
          <li style={{ marginBottom: 6 }}>Financial decisions</li>
          <li style={{ marginBottom: 6 }}>Housing decisions</li>
          <li style={{ marginBottom: 6 }}>Mortgage decisions</li>
          <li style={{ marginBottom: 6 }}>Real estate transactions</li>
          <li style={{ marginBottom: 6 }}>Investment decisions</li>
          <li style={{ marginBottom: 6 }}>Lost income</li>
          <li style={{ marginBottom: 6 }}>Lost profits</li>
          <li style={{ marginBottom: 6 }}>Data loss</li>
          <li style={{ marginBottom: 6 }}>Website errors</li>
          <li style={{ marginBottom: 6 }}>Inaccurate calculations</li>
          <li style={{ marginBottom: 6 }}>Reliance on calculator results</li>
        </ul>
        <p style={p}>You agree that your use of RentBuyWise is at your own risk.</p>

        <h2 style={h2}>12. Indemnification</h2>
        <p style={p}>
          You agree to defend, indemnify, and hold harmless RentBuyWise, its owners, operators, affiliates, employees, contractors, and service providers from any claims, damages, losses, liabilities,
          costs, or expenses arising from:
        </p>
        <ul style={ul}>
          <li style={{ marginBottom: 6 }}>Your use of the website</li>
          <li style={{ marginBottom: 6 }}>Your violation of these Terms</li>
          <li style={{ marginBottom: 6 }}>Your violation of any law or third-party right</li>
          <li style={{ marginBottom: 6 }}>Your reliance on calculator results</li>
          <li style={{ marginBottom: 6 }}>Information you submit through the website</li>
        </ul>

        <h2 style={h2}>13. Changes to the Website</h2>
        <p style={p}>
          We may change, update, improve, or remove features from RentBuyWise at any time. We may also limit access to certain parts of the website or discontinue the website entirely.
        </p>
        <p style={p}>We are not responsible for any loss or inconvenience caused by changes, interruptions, or discontinuation of the website.</p>

        <h2 style={h2}>14. Changes to These Terms</h2>
        <p style={p}>
          We may update these Terms from time to time. When we make changes, we will update the &quot;Last Updated&quot; date at the top of this page.
        </p>
        <p style={p}>Your continued use of RentBuyWise.app after updated Terms are posted means you accept the revised Terms.</p>

        <h2 style={h2}>15. Termination</h2>
        <p style={p}>
          We may suspend or terminate your access to RentBuyWise at any time if we believe you violated these Terms, misused the website, or created risk for RentBuyWise or other users.
        </p>

        <h2 style={h2}>16. Governing Law</h2>
        <p style={p}>
          These Terms are governed by the laws of the State of California, without regard to conflict of law principles.
        </p>
        <p style={p}>
          Any disputes related to these Terms or RentBuyWise.app shall be handled in the state and federal courts located in California, unless otherwise required by law.
        </p>

        <h2 style={{ ...h2, marginBottom: 0 }}>17. Contact Us</h2>
        <p style={{ ...p, marginTop: 12 }}>If you have questions about these Terms, you can contact us at:</p>
        <p style={p}>
          <strong>RentBuyWise</strong>
          <br />
          Website:{" "}
          <a href="https://RentBuyWise.app" style={{ color: ACCENT, fontWeight: 600 }}>
            RentBuyWise.app
          </a>
          <br />
          Email:{" "}
          <a href="mailto:i@inenad.com" style={{ color: ACCENT, fontWeight: 600 }}>
            i@inenad.com
          </a>
          <br />
          Location: California, USA
        </p>
      </div>
    </main>
  );
}
