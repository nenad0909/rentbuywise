import { memo, useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisclaimerPage from "./Disclaimer";
import Layout from "./Layout";
import PrivacyPolicyPage from "./PrivacyPolicy";
import ScrollToTop from "./ScrollToTop";
import TermsOfUsePage from "./TermsOfUse";
import { simulate } from "./calc";
import { BreakdownChart, CumulativeChart, NetWorthChart, fmt$, fmt$0 } from "./charts";
import { ACCENT, INK, PAPER, RULE } from "./theme";

const DIVIDER_GUTTER = 24;
const MAIN_TOP_BELOW_HEADER = 32;

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

const VERDICT_PRINT_BUTTON_STYLE = {
  ...SECTION_EYEBROW_STYLE,
  justifyContent: "flex-start",
  background: INK,
  cursor: "pointer",
  border: "none",
  fontFamily: "Inter, system-ui, sans-serif",
};

const DEFAULT_INPUTS = {
  homePrice: 650000,
  downPaymentPct: 20,
  mortgageRate: 6.75,
  mortgageYears: 30,
  propertyTaxRate: 1.1,
  hoaMonthly: 0,
  maintenancePct: 1.0,
  insuranceMonthly: 150,
  closingCostPct: 3,
  sellingCostPct: 6,
  appreciationRate: 3.5,
  rent: 2900,
  rentGrowthRate: 3.5,
  inflationRate: 2.5,
  investmentReturn: 7,
  marginalTaxRate: 24,
  deductionsItemized: false,
  horizon: 30,
};

const SIM_DEBOUNCE_MS = 48;

function useDebouncedSimInputs(inputs, ms) {
  const [debounced, setDebounced] = useState(inputs);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(inputs), ms);
    return () => window.clearTimeout(id);
  }, [inputs, ms]);
  return debounced;
}

function NumberInput({ label, value, onChange, prefix, suffix, step = 1, hint }) {
  const committed = typeof value === "number" && Number.isFinite(value) ? value : 0;
  const focusedRef = useRef(false);
  const [text, setText] = useState(String(committed));

  useEffect(() => {
    if (!focusedRef.current) setText(String(committed));
  }, [committed]);

  const commitParsed = () => {
    const raw = text.trim().replace(/,/g, "");
    if (raw === "" || raw === "-" || raw === "." || /^-?\.$/.test(raw)) {
      onChange(committed);
      setText(String(committed));
      return;
    }
    const n = Number(raw);
    if (Number.isFinite(n)) {
      onChange(n);
      setText(String(n));
    } else {
      setText(String(committed));
    }
  };

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", opacity: 0.6, fontWeight: 500 }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", background: "#fff", border: `1px solid ${RULE}`, borderRadius: 6, padding: "0 12px", height: 40 }}>
        {prefix && <span style={{ opacity: 0.5, fontSize: 14, marginRight: 4 }}>{prefix}</span>}
        <input
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={text}
          onFocus={(e) => {
            focusedRef.current = true;
            if (typeof e.target.select === "function") e.target.select();
            else setText(String(committed));
          }}
          onBlur={() => {
            focusedRef.current = false;
            commitParsed();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, "");
            if (raw !== "" && !/^-?\d*\.?\d*$/.test(raw)) return;
            setText(raw);
          }}
          style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 15, fontWeight: 500, fontFamily: "inherit", minWidth: 0, color: INK, fontVariantNumeric: "tabular-nums" }}
        />
        {suffix && <span style={{ opacity: 0.5, fontSize: 14, marginLeft: 4 }}>{suffix}</span>}
      </div>
      {hint && <span style={{ fontSize: 11, opacity: 0.5 }}>{hint}</span>}
    </label>
  );
}

function SliderInput({ label, value, onChange, min, max, step, suffix, hint }) {
  return (
    <label className="rvb-slider-row" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", opacity: 0.6, fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
          {value}
          {suffix}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="rvb-slider" />
      {hint && <span style={{ fontSize: 11, opacity: 0.5 }}>{hint}</span>}
    </label>
  );
}

function Toggle({ label, value, onChange, hint }) {
  return (
    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, cursor: "pointer" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", opacity: 0.6, fontWeight: 500 }}>{label}</span>
        {hint && <span style={{ fontSize: 11, opacity: 0.5 }}>{hint}</span>}
      </div>
      <button type="button" onClick={() => onChange(!value)} style={{ width: 44, height: 24, borderRadius: 999, border: "none", background: value ? ACCENT : "rgba(15,15,14,0.2)", position: "relative" }}>
        <span style={{ position: "absolute", top: 2, left: value ? 22 : 2, width: 20, height: 20, borderRadius: 999, background: "#fff" }} />
      </button>
    </label>
  );
}

function InputSection({ title, gap, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      <div className="rvb-input-section-title" style={{ fontFamily: "Instrument Serif, serif", fontSize: 22, fontWeight: 400, letterSpacing: "-0.01em" }}>{title}</div>
      {children}
    </div>
  );
}

function InputsPanel({ inputs, setInputs }) {
  const set = (k) => (v) => setInputs((s) => ({ ...s, [k]: v }));
  const gap = 22;
  const sectionGap = 36;

  return (
    <div className="rvb-inputs-panel" style={{ display: "flex", flexDirection: "column", gap: sectionGap }}>
      <InputSection title="The home you'd buy" gap={gap}>
        <NumberInput label="Home price" value={inputs.homePrice} onChange={set("homePrice")} prefix="$" step={5000} />
        <SliderInput label="Down payment" value={inputs.downPaymentPct} onChange={set("downPaymentPct")} min={0} max={50} step={1} suffix="%" hint={`${fmt$0((inputs.homePrice * inputs.downPaymentPct) / 100)} cash`} />
        <SliderInput label="Mortgage rate" value={inputs.mortgageRate} onChange={set("mortgageRate")} min={2} max={10} step={0.05} suffix="%" />
        <SliderInput label="Loan term" value={inputs.mortgageYears} onChange={set("mortgageYears")} min={10} max={30} step={5} suffix=" yrs" />
      </InputSection>
      <InputSection title="Ownership costs" gap={gap}>
        <SliderInput label="Property tax" value={inputs.propertyTaxRate} onChange={set("propertyTaxRate")} min={0} max={3} step={0.05} suffix="%" hint="Of home value, per year" />
        <SliderInput label="Maintenance" value={inputs.maintenancePct} onChange={set("maintenancePct")} min={0} max={3} step={0.1} suffix="%" hint="Of home value, per year" />
        <NumberInput label="Insurance" value={inputs.insuranceMonthly} onChange={set("insuranceMonthly")} prefix="$" suffix="/mo" step={10} />
        <NumberInput label="HOA" value={inputs.hoaMonthly} onChange={set("hoaMonthly")} prefix="$" suffix="/mo" step={10} />
        <SliderInput label="Closing cost" value={inputs.closingCostPct} onChange={set("closingCostPct")} min={0} max={6} step={0.25} suffix="%" hint="One-time, on purchase" />
      </InputSection>
      <InputSection title="The rental alternative" gap={gap}>
        <NumberInput label="Rent today" value={inputs.rent} onChange={set("rent")} prefix="$" suffix="/mo" step={50} />
        <SliderInput label="Rent growth" value={inputs.rentGrowthRate} onChange={set("rentGrowthRate")} min={0} max={8} step={0.1} suffix="%/yr" />
      </InputSection>
      <InputSection title="Markets & taxes" gap={gap}>
        <SliderInput label="Home appreciation" value={inputs.appreciationRate} onChange={set("appreciationRate")} min={0} max={8} step={0.1} suffix="%/yr" />
        <SliderInput label="Investment return" value={inputs.investmentReturn} onChange={set("investmentReturn")} min={0} max={12} step={0.1} suffix="%/yr" hint="If you invested the down payment instead" />
        <SliderInput label="Tax bracket" value={inputs.marginalTaxRate} onChange={set("marginalTaxRate")} min={10} max={37} step={1} suffix="%" />
        <Toggle label="Itemize deductions" value={inputs.deductionsItemized} onChange={set("deductionsItemized")} hint="Deduct mortgage interest & property tax" />
      </InputSection>
      <InputSection title="Time horizon" gap={gap}>
        <SliderInput label="How long you'd stay" value={inputs.horizon} onChange={set("horizon")} min={3} max={30} step={1} suffix=" yrs" hint="Where do you see yourself living?" />
      </InputSection>
    </div>
  );
}

function Stat({ label, value, sub, accent }) {
  return (
    <div className="rvb-stat" style={{ background: PAPER, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.55, fontWeight: 500 }}>{label}</div>
      <div className="rvb-stat-value" style={{ fontFamily: "Instrument Serif, serif", fontSize: 36, fontWeight: 400, letterSpacing: "-0.01em", color: accent ? ACCENT : INK, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, opacity: 0.55 }}>{sub}</div>}
    </div>
  );
}

function VerdictBlock({ result, inputs }) {
  const { breakEvenYear, wealthDelta, final } = result;
  const buyWins = wealthDelta > 0;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
        <div className="rvb-eyebrow" style={SECTION_EYEBROW_STYLE}>The verdict</div>
        <button type="button" className="rvb-no-print" aria-label="Print page" style={VERDICT_PRINT_BUTTON_STYLE} onClick={() => window.print()}>
          Print
        </button>
      </div>
      <h1 className="rvb-verdict-title" style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(56px, 9vw, 132px)", lineHeight: 0.92, fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 16px 0" }}>
        <span style={{ color: buyWins ? ACCENT : INK }}>{buyWins ? "Buy." : "Keep renting."}</span>
        <br />
        <span style={{ opacity: 0.4 }}>For now, anyway.</span>
      </h1>
      <div className="rvb-verdict-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 1, background: RULE, border: `1px solid ${RULE}`, borderRadius: 8, overflow: "hidden" }}>
        <Stat label={buyWins ? "You come out ahead by" : "Renting saves you"} value={fmt$0(Math.abs(wealthDelta))} sub={`over ${inputs.horizon} years`} accent />
        <Stat label="Break-even point" value={breakEvenYear && breakEvenYear <= inputs.horizon ? `Year ${breakEvenYear}` : "Never*"} sub={breakEvenYear && breakEvenYear <= inputs.horizon ? "Buying pulls ahead" : "Within your horizon"} />
        <Stat label="Net worth if you buy" value={fmt$(final.buyWealth)} sub={`In year ${inputs.horizon}, after sale costs`} />
        <Stat label="Net worth if you rent" value={fmt$(final.rentWealth)} sub={`Down payment invested @ ${inputs.investmentReturn}%`} />
      </div>
    </div>
  );
}

function Card({ title, rows, accent }) {
  return (
    <div className="rvb-cost-card" style={{ background: "#fff", border: `1px solid ${RULE}`, borderRadius: 8, overflow: "hidden" }}>
      <div className="rvb-cost-card-head" style={{ padding: "20px 24px", borderBottom: `1px solid ${RULE}`, background: accent ? ACCENT : INK, color: "#fff" }}>
        <div className="rvb-cost-card-title" style={{ fontFamily: "Instrument Serif, serif", fontSize: 28, fontWeight: 400, letterSpacing: "-0.01em" }}>{title}</div>
      </div>
      <div>
        {rows.map(([k, v], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 24px", borderBottom: i < rows.length - 1 ? `1px solid ${RULE}` : "none", gap: 16 }}>
            <span style={{ fontSize: 13, opacity: 0.7 }}>{k}</span>
            <span style={{ fontSize: 16, fontWeight: 600, fontVariantNumeric: "tabular-nums", textAlign: "right" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CostCards({ result, inputs }) {
  const { final, yearlyData, upFrontBuy } = result;
  return (
    <div className="rvb-cost-cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
      <Card
        title="If you buy"
        accent
        rows={[
          ["Upfront cash", fmt$0(upFrontBuy)],
          ["Monthly mortgage (P&I)", fmt$0(result.monthlyMtg)],
          ["Total interest over life of loan", fmt$0(yearlyData.reduce((s, d) => s + d.interestPaidYear, 0))],
          [`Home value in year ${inputs.horizon}`, fmt$0(final.homeValue)],
          [`Equity in year ${inputs.horizon}`, fmt$0(final.homeEquity)],
        ]}
      />
      <Card
        title="If you rent"
        rows={[
          ["Rent today", `${fmt$0(inputs.rent)}/mo`],
          [`Rent in year ${inputs.horizon}`, `${fmt$0(inputs.rent * Math.pow(1 + inputs.rentGrowthRate / 100, inputs.horizon))}/mo`],
          [`Total rent paid by year ${inputs.horizon}`, fmt$0(yearlyData[yearlyData.length - 1].rentCumCost)],
          [`Down payment invested @ ${inputs.investmentReturn}%`, fmt$0(final.rentInvestmentBalance)],
          ["Net wealth (invested)", fmt$0(final.rentWealth)],
        ]}
      />
    </div>
  );
}

function ChartBlock({ eyebrow, title, sub, children }) {
  return (
    <div className="rvb-chart-block" style={{ background: "#fff", border: `1px solid ${RULE}`, borderRadius: 8, padding: 28 }}>
      <div className="rvb-chart-eyebrow" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.55, fontWeight: 500, marginBottom: 8 }}>{eyebrow}</div>
      <h3 className="rvb-chart-title" style={{ fontFamily: "Instrument Serif, serif", fontSize: 32, fontWeight: 400, margin: "0 0 6px", letterSpacing: "-0.01em" }}>{title}</h3>
      {sub && <p style={{ fontSize: 14, opacity: 0.65, margin: "0 0 20px", maxWidth: 640, lineHeight: 1.5 }}>{sub}</p>}
      {children}
    </div>
  );
}

const ResultsPane = memo(function ResultsPane({ result, inputs }) {
  return (
    <section className="rvb-calculator-col-results rvb-results-pane" style={{ display: "flex", flexDirection: "column", gap: 56, paddingLeft: DIVIDER_GUTTER, minWidth: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <VerdictBlock result={result} inputs={inputs} />
        <p
          className="rvb-results-disclaimer"
          style={{
            margin: 0,
            maxWidth: 640,
            fontSize: 13,
            lineHeight: 1.55,
            color: INK,
            opacity: 0.55,
          }}
        >
          Estimate only. RentBuyWise does not provide financial, tax, mortgage, legal, or real estate advice. Please consult a qualified professional before making a major housing decision.
        </p>
      </div>
      <div id="charts" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <CostCards result={result} inputs={inputs} />
        <ChartBlock eyebrow="Wealth over time" title={`Your net worth, ${inputs.horizon} years from now`}>
          <NetWorthChart data={result.yearlyData} accent={ACCENT} breakEvenYear={result.breakEvenYear && result.breakEvenYear <= inputs.horizon ? result.breakEvenYear : null} />
        </ChartBlock>
        <ChartBlock eyebrow="Cumulative outflow" title="What you'll pay, total">
          <CumulativeChart data={result.yearlyData} accent={ACCENT} />
        </ChartBlock>
        <ChartBlock eyebrow="Where the money goes" title="Month-one anatomy">
          <BreakdownChart breakdown={result.breakdown} accent={ACCENT} />
        </ChartBlock>
      </div>
    </section>
  );
}, (prev, next) => prev.result === next.result && prev.inputs === next.inputs);

export function CalculatorPage() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const simInputs = useDebouncedSimInputs(inputs, SIM_DEBOUNCE_MS);

  const result = useMemo(() => simulate(simInputs), [simInputs]);

  return (
    <>
      {/* Visually hidden h1 for crawlers — the visible headline lives inside VerdictBlock */}
      <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
        Rent vs Buy Calculator — Should you rent or buy?
      </h1>

      <main
        id="calculator"
        className="rvb-main"
        style={{
          flex: "1 0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(320px, 380px) 1fr",
          gap: 0,
          padding: `${MAIN_TOP_BELOW_HEADER}px 40px 80px`,
          maxWidth: 1400,
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        <aside
          className="rvb-inputs rvb-calculator-col-inputs"
          style={{
            position: "sticky",
            top: 88,
            maxHeight: "calc(100vh - 108px)",
            overflowY: "auto",
            paddingRight: DIVIDER_GUTTER,
            borderRight: `1px solid ${RULE}`,
            alignSelf: "stretch",
          }}
        >
          <div className="rvb-eyebrow" style={{ ...SECTION_EYEBROW_STYLE, marginBottom: 16 }}>
            Your numbers
          </div>
          <InputsPanel inputs={inputs} setInputs={setInputs} />
        </aside>
        <ResultsPane result={result} inputs={simInputs} />
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CalculatorPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
