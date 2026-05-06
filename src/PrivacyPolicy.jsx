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
const h3 = { fontSize: 15, fontWeight: 600, margin: "18px 0 8px", color: INK };
const p = { margin: "0 0 12px", fontSize: 15, lineHeight: 1.65, color: INK };
const ul = { margin: "0 0 16px", paddingLeft: 22, fontSize: 15, lineHeight: 1.6, color: INK };

export default function PrivacyPolicyPage() {
  return (
    <main
      className="rvb-privacy-main"
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
        Privacy Policy
      </h1>

      <div style={{ background: "#fff", border: `1px solid ${RULE}`, borderRadius: 8, padding: "28px 32px" }}>
        <p style={{ ...p, opacity: 0.75, fontSize: 14 }}>Effective Date: May 5, 2026</p>
        <p style={{ ...p, opacity: 0.75, fontSize: 14, marginBottom: 20 }}>Last Updated: May 5, 2026</p>

        <p style={p}>
          RentBuyWise (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates RentBuyWise.com, a rent-versus-buy calculator and informational web application.
        </p>
        <p style={p}>
          This Privacy Policy explains how we collect, use, store, and protect information when you use RentBuyWise.com. By using our website or calculator, you agree to the practices described in this
          Privacy Policy.
        </p>

        <h2 style={h2}>1. Information We Collect</h2>
        <p style={p}>We may collect the following types of information:</p>

        <h3 style={h3}>Information You Enter Into the Calculator</h3>
        <p style={p}>When you use the rent-versus-buy calculator, you may enter information such as:</p>
        <ul style={ul}>
          <li style={{ marginBottom: 6 }}>Monthly rent</li>
          <li style={{ marginBottom: 6 }}>Home purchase price</li>
          <li style={{ marginBottom: 6 }}>Down payment amount</li>
          <li style={{ marginBottom: 6 }}>Mortgage interest rate</li>
          <li style={{ marginBottom: 6 }}>Loan term</li>
          <li style={{ marginBottom: 6 }}>Property taxes</li>
          <li style={{ marginBottom: 6 }}>Insurance estimates</li>
          <li style={{ marginBottom: 6 }}>Homeowners association fees</li>
          <li style={{ marginBottom: 6 }}>Maintenance estimates</li>
          <li style={{ marginBottom: 6 }}>Expected home appreciation</li>
          <li style={{ marginBottom: 6 }}>Investment return assumptions</li>
          <li style={{ marginBottom: 6 }}>Location or market-related assumptions, if provided</li>
        </ul>
        <p style={p}>
          This information is used to generate estimated calculations and comparisons. Unless we specifically tell you otherwise, calculator inputs are used only to provide results and improve the
          functionality of the website.
        </p>

        <h3 style={h3}>Information You Voluntarily Provide</h3>
        <p style={p}>You may voluntarily provide personal information when you:</p>
        <ul style={ul}>
          <li style={{ marginBottom: 6 }}>Contact us through a contact form</li>
          <li style={{ marginBottom: 6 }}>Subscribe to updates or a newsletter</li>
          <li style={{ marginBottom: 6 }}>Send us an email</li>
          <li style={{ marginBottom: 6 }}>Request support</li>
          <li style={{ marginBottom: 6 }}>Submit feedback</li>
        </ul>
        <p style={p}>This information may include your name, email address, message content, and any other information you choose to provide.</p>

        <h3 style={h3}>Automatically Collected Information</h3>
        <p style={p}>When you visit RentBuyWise.com, certain information may be collected automatically, such as:</p>
        <ul style={ul}>
          <li style={{ marginBottom: 6 }}>IP address</li>
          <li style={{ marginBottom: 6 }}>Browser type</li>
          <li style={{ marginBottom: 6 }}>Device type</li>
          <li style={{ marginBottom: 6 }}>Operating system</li>
          <li style={{ marginBottom: 6 }}>Referring website</li>
          <li style={{ marginBottom: 6 }}>Pages visited</li>
          <li style={{ marginBottom: 6 }}>Time spent on the site</li>
          <li style={{ marginBottom: 6 }}>General location information based on IP address</li>
          <li style={{ marginBottom: 6 }}>Interaction data, such as clicks or calculator usage patterns</li>
        </ul>
        <p style={p}>This information helps us understand how users interact with the website and improve the user experience.</p>

        <h2 style={h2}>2. Cookies and Tracking Technologies</h2>
        <p style={p}>
          RentBuyWise may use cookies, local storage, analytics tools, or similar technologies to improve the website, remember preferences, analyze traffic, and understand how visitors use the site. A
          cookie is information saved by your browser, and online services commonly use cookies and similar technologies for analytics and functionality.
        </p>
        <p style={p}>We may use third-party services such as:</p>
        <ul style={ul}>
          <li style={{ marginBottom: 6 }}>Google Analytics</li>
          <li style={{ marginBottom: 6 }}>Google Search Console</li>
          <li style={{ marginBottom: 6 }}>Advertising or affiliate tracking tools</li>
          <li style={{ marginBottom: 6 }}>Website hosting and performance tools</li>
        </ul>
        <p style={p}>These third-party services may collect information according to their own privacy policies.</p>
        <p style={p}>
          You can usually disable cookies through your browser settings. However, some features of the website may not work properly if cookies are disabled.
        </p>

        <h2 style={h2}>3. How We Use Information</h2>
        <p style={p}>We may use collected information to:</p>
        <ul style={ul}>
          <li style={{ marginBottom: 6 }}>Provide rent-versus-buy calculations</li>
          <li style={{ marginBottom: 6 }}>Improve calculator accuracy and usability</li>
          <li style={{ marginBottom: 6 }}>Respond to messages or support requests</li>
          <li style={{ marginBottom: 6 }}>Send updates if you subscribe to a newsletter</li>
          <li style={{ marginBottom: 6 }}>Analyze website traffic and performance</li>
          <li style={{ marginBottom: 6 }}>Detect, prevent, or address technical issues</li>
          <li style={{ marginBottom: 6 }}>Protect the security of the website</li>
          <li style={{ marginBottom: 6 }}>Comply with legal obligations</li>
          <li style={{ marginBottom: 6 }}>Develop new features, tools, and content</li>
        </ul>
        <p style={p}>We do not use calculator results to make lending, mortgage, insurance, tax, legal, or real estate decisions.</p>

        <h2 style={h2}>4. How We Share Information</h2>
        <p style={p}>We do not sell your personal information.</p>
        <p style={p}>We may share limited information with trusted service providers who help us operate the website, such as:</p>
        <ul style={ul}>
          <li style={{ marginBottom: 6 }}>Website hosting providers</li>
          <li style={{ marginBottom: 6 }}>Analytics providers</li>
          <li style={{ marginBottom: 6 }}>Email or newsletter platforms</li>
          <li style={{ marginBottom: 6 }}>Security and performance tools</li>
          <li style={{ marginBottom: 6 }}>Customer support tools</li>
        </ul>
        <p style={p}>These providers may process information only as needed to provide services to us.</p>
        <p style={p}>
          We may also disclose information if required to do so by law, regulation, legal process, or government request, or if we believe disclosure is necessary to protect our rights, users, website,
          or the public.
        </p>

        <h2 style={h2}>5. Financial and Calculator Information</h2>
        <p style={p}>
          RentBuyWise is an informational calculator only. We do not require users to submit Social Security numbers, bank account numbers, credit card numbers, tax returns, mortgage applications, or
          formal loan information.
        </p>
        <p style={p}>You should avoid entering sensitive personal information into calculator fields or contact forms.</p>
        <p style={p}>
          Calculator results are estimates only and depend on the assumptions and information you provide. RentBuyWise does not provide financial, legal, tax, mortgage, investment, or real estate advice.
        </p>

        <h2 style={h2}>6. Data Retention</h2>
        <p style={p}>
          We keep personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.
        </p>
        <p style={p}>
          Contact form submissions, emails, analytics data, and newsletter information may be retained as needed to provide services, respond to users, maintain business records, and improve the website.
        </p>

        <h2 style={h2}>7. Data Security</h2>
        <p style={p}>
          We use reasonable technical and organizational measures to protect information from unauthorized access, loss, misuse, alteration, or disclosure.
        </p>
        <p style={p}>
          However, no website, internet transmission, or electronic storage system is completely secure. We cannot guarantee absolute security of your information.
        </p>

        <h2 style={h2}>8. Your Choices</h2>
        <p style={p}>
          Depending on your location, you may have rights regarding your personal information, including the right to:
        </p>
        <ul style={ul}>
          <li style={{ marginBottom: 6 }}>Request access to personal information we have about you</li>
          <li style={{ marginBottom: 6 }}>Request correction of inaccurate information</li>
          <li style={{ marginBottom: 6 }}>Request deletion of your personal information</li>
          <li style={{ marginBottom: 6 }}>Opt out of certain data sharing or marketing communications</li>
          <li style={{ marginBottom: 6 }}>Withdraw consent where applicable</li>
        </ul>
        <p style={p}>
          To make a privacy request, contact us at:
        </p>
        <p style={p}>
          Email:{" "}
          <a href="mailto:i@inenad.com" style={{ color: ACCENT, fontWeight: 600 }}>
            i@inenad.com
          </a>
        </p>
        <p style={p}>We may need to verify your identity before responding to certain requests.</p>

        <h2 style={h2}>9. California Privacy Rights</h2>
        <p style={p}>
          California residents may have additional rights under California privacy laws, including the right to know what personal information is collected, used, shared, or sold, and the right to request
          deletion or correction of personal information.
        </p>
        <p style={p}>RentBuyWise does not sell personal information.</p>
        <p style={p}>To exercise California privacy rights, contact us at:</p>
        <p style={p}>
          Email:{" "}
          <a href="mailto:i@inenad.com" style={{ color: ACCENT, fontWeight: 600 }}>
            i@inenad.com
          </a>
        </p>

        <h2 style={h2}>10. International Users</h2>
        <p style={p}>
          RentBuyWise is operated from the United States. If you access the website from outside the United States, your information may be processed and stored in the United States or other countries
          where our service providers operate.
        </p>
        <p style={p}>By using RentBuyWise.com, you understand that your information may be transferred to locations outside your country of residence.</p>

        <h2 style={h2}>11. Children&apos;s Privacy</h2>
        <p style={p}>RentBuyWise is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.</p>
        <p style={p}>If we learn that we have collected personal information from a child under 13, we will take reasonable steps to delete that information.</p>

        <h2 style={h2}>12. Third-Party Links</h2>
        <p style={p}>
          RentBuyWise may contain links to third-party websites, tools, calculators, mortgage providers, real estate resources, or advertisers.
        </p>
        <p style={p}>
          We are not responsible for the privacy practices, content, or policies of third-party websites. You should review the privacy policies of any third-party sites you visit.
        </p>

        <h2 style={h2}>13. Advertising and Affiliate Links</h2>
        <p style={p}>
          RentBuyWise may display advertisements or include affiliate links in the future. If you click an advertisement or affiliate link, third parties may collect information according to their own
          privacy policies.
        </p>
        <p style={p}>If we earn compensation from affiliate links, we may disclose that relationship near the relevant content or link.</p>

        <h2 style={h2}>14. Changes to This Privacy Policy</h2>
        <p style={p}>
          We may update this Privacy Policy from time to time. When we make changes, we will update the &quot;Last Updated&quot; date at the top of this page.
        </p>
        <p style={p}>Your continued use of RentBuyWise.com after changes are posted means you accept the updated Privacy Policy.</p>

        <h2 style={{ ...h2, marginBottom: 0 }}>15. Contact Us</h2>
        <p style={{ ...p, marginTop: 12 }}>
          If you have questions about this Privacy Policy or how your information is handled, you can contact us at:
        </p>
        <p style={p}>
          <strong>RentBuyWise</strong>
          <br />
          Website:{" "}
          <a href="https://rentbuywise.com" style={{ color: ACCENT, fontWeight: 600 }}>
            RentBuyWise.com
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
