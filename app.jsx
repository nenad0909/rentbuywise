// Main App: Rent vs Buy
const { useState, useMemo, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "spacious"
}/*EDITMODE-END*/;

const ACCENT = '#D7472A';
const INK = '#0F0F0E';
const PAPER = '#F5F0E8';
const PAPER_2 = '#EDE5D7';
const RULE = 'rgba(15,15,14,0.12)';

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

// ---------- Reusable controls ----------
function NumberInput({ label, value, onChange, prefix, suffix, step = 1, hint }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 500 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: `1px solid ${RULE}`, borderRadius: 6, padding: '0 12px', height: 40 }}>
        {prefix && <span style={{ opacity: 0.5, fontSize: 14, marginRight: 4 }}>{prefix}</span>}
        <input
          type="number"
          value={value}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 15, fontWeight: 500, fontFamily: 'inherit', minWidth: 0, color: INK }}
        />
        {suffix && <span style={{ opacity: 0.5, fontSize: 14, marginLeft: 4 }}>{suffix}</span>}
      </div>
      {hint && <span style={{ fontSize: 11, opacity: 0.5 }}>{hint}</span>}
    </label>
  );
}

function SliderInput({ label, value, onChange, min, max, step, suffix, hint }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="rvb-slider"
      />
      {hint && <span style={{ fontSize: 11, opacity: 0.5 }}>{hint}</span>}
    </label>
  );
}

function Toggle({ label, value, onChange, hint }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, cursor: 'pointer' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 500 }}>{label}</span>
        {hint && <span style={{ fontSize: 11, opacity: 0.5 }}>{hint}</span>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        style={{
          width: 44, height: 24, borderRadius: 999, border: 'none',
          background: value ? ACCENT : 'rgba(15,15,14,0.2)',
          position: 'relative', cursor: 'pointer', transition: 'background 0.18s', flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute', top: 2, left: value ? 22 : 2,
          width: 20, height: 20, borderRadius: 999, background: '#fff',
          transition: 'left 0.18s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        }} />
      </button>
    </label>
  );
}

// ---------- Sections ----------
function InputsPanel({ inputs, setInputs, density }) {
  const set = (k) => (v) => setInputs((s) => ({ ...s, [k]: v }));
  const gap = density === 'compact' ? 14 : 22;
  const sectionGap = density === 'compact' ? 24 : 36;

  const Section = ({ title, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em' }}>{title}</div>
      {children}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: sectionGap }}>
      <Section title="The home you'd buy">
        <NumberInput label="Home price" value={inputs.homePrice} onChange={set('homePrice')} prefix="$" step={5000} />
        <SliderInput label="Down payment" value={inputs.downPaymentPct} onChange={set('downPaymentPct')} min={0} max={50} step={1} suffix="%" hint={`${fmt$0(inputs.homePrice * inputs.downPaymentPct / 100)} cash`} />
        <SliderInput label="Mortgage rate" value={inputs.mortgageRate} onChange={set('mortgageRate')} min={2} max={10} step={0.05} suffix="%" />
        <SliderInput label="Loan term" value={inputs.mortgageYears} onChange={set('mortgageYears')} min={10} max={30} step={5} suffix=" yrs" />
      </Section>

      <Section title="Ownership costs">
        <SliderInput label="Property tax" value={inputs.propertyTaxRate} onChange={set('propertyTaxRate')} min={0} max={3} step={0.05} suffix="%" hint="Of home value, per year" />
        <SliderInput label="Maintenance" value={inputs.maintenancePct} onChange={set('maintenancePct')} min={0} max={3} step={0.1} suffix="%" hint="Of home value, per year" />
        <NumberInput label="Insurance" value={inputs.insuranceMonthly} onChange={set('insuranceMonthly')} prefix="$" suffix="/mo" step={10} />
        <NumberInput label="HOA" value={inputs.hoaMonthly} onChange={set('hoaMonthly')} prefix="$" suffix="/mo" step={10} />
        <SliderInput label="Closing cost" value={inputs.closingCostPct} onChange={set('closingCostPct')} min={0} max={6} step={0.25} suffix="%" hint="One-time, on purchase" />
      </Section>

      <Section title="The rental alternative">
        <NumberInput label="Rent today" value={inputs.rent} onChange={set('rent')} prefix="$" suffix="/mo" step={50} />
        <SliderInput label="Rent growth" value={inputs.rentGrowthRate} onChange={set('rentGrowthRate')} min={0} max={8} step={0.1} suffix="%/yr" />
      </Section>

      <Section title="Markets & taxes">
        <SliderInput label="Home appreciation" value={inputs.appreciationRate} onChange={set('appreciationRate')} min={0} max={8} step={0.1} suffix="%/yr" />
        <SliderInput label="Investment return" value={inputs.investmentReturn} onChange={set('investmentReturn')} min={0} max={12} step={0.1} suffix="%/yr" hint="If you invested the down payment instead" />
        <SliderInput label="Tax bracket" value={inputs.marginalTaxRate} onChange={set('marginalTaxRate')} min={10} max={37} step={1} suffix="%" />
        <Toggle label="Itemize deductions" value={inputs.deductionsItemized} onChange={set('deductionsItemized')} hint="Deduct mortgage interest & property tax" />
      </Section>

      <Section title="Time horizon">
        <SliderInput label="How long you'd stay" value={inputs.horizon} onChange={set('horizon')} min={3} max={30} step={1} suffix=" yrs" hint="Where do you see yourself living?" />
      </Section>
    </div>
  );
}

function VerdictBlock({ result, inputs }) {
  const { breakEvenYear, wealthDelta, final, yearlyData } = result;
  const buyWins = wealthDelta > 0;
  const horizon = inputs.horizon;

  // Build a plain-English narrative.
  const reasons = [];
  if (buyWins) {
    if (breakEvenYear && breakEvenYear <= horizon) {
      reasons.push(`Buying breaks even in year ${breakEvenYear}. After that, every month builds wealth that renting can't match.`);
    }
    if (inputs.appreciationRate >= inputs.investmentReturn - 1) {
      reasons.push(`Home appreciation (${inputs.appreciationRate}%/yr) is keeping pace with what you'd earn investing the down payment elsewhere (${inputs.investmentReturn}%/yr).`);
    }
    if (inputs.rentGrowthRate >= 3) {
      reasons.push(`Rents are climbing ${inputs.rentGrowthRate}% a year. A fixed mortgage payment becomes a relative bargain over time.`);
    }
  } else {
    if (!breakEvenYear || breakEvenYear > horizon) {
      reasons.push(`Buying never breaks even within ${horizon} years. The upfront costs and interest dominate at this time horizon.`);
    }
    if (inputs.investmentReturn > inputs.appreciationRate + 1) {
      reasons.push(`Investing your down payment at ${inputs.investmentReturn}%/yr beats home appreciation (${inputs.appreciationRate}%/yr). The opportunity cost is real money.`);
    }
    if (inputs.mortgageRate >= 6.5) {
      const y1 = yearlyData[0];
      const y1Mtg = result.monthlyMtg * 12;
      const interestShare = y1Mtg > 0 ? Math.round((y1.interestPaidYear / y1Mtg) * 100) : 0;
      reasons.push(`At a ${inputs.mortgageRate}% mortgage rate, roughly ${interestShare}% of your first-year payments go to interest rather than equity. That's money you don't get back.`);
    }
    if (inputs.horizon < 7) {
      reasons.push(`At only ${horizon} years, you don't stay long enough for equity and appreciation to outrun closing & selling costs (${inputs.closingCostPct + inputs.sellingCostPct}% combined).`);
    }
  }
  if (reasons.length === 0) {
    reasons.push(`The numbers are close — within ${fmt$0(Math.abs(wealthDelta))} after ${horizon} years. Lifestyle factors may matter more than math.`);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 500 }}>The verdict</div>
      <h1 style={{
        fontFamily: 'Instrument Serif, serif',
        fontSize: 'clamp(56px, 9vw, 132px)',
        lineHeight: 0.92,
        fontWeight: 400,
        letterSpacing: '-0.02em',
        margin: 0,
      }}>
        <span style={{ color: buyWins ? ACCENT : INK }}>{buyWins ? 'Buy.' : 'Keep renting.'}</span>
        <br />
        <span style={{ opacity: 0.4 }}>For now, anyway.</span>
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, background: RULE, border: `1px solid ${RULE}`, borderRadius: 8, overflow: 'hidden' }}>
        <Stat
          label={buyWins ? 'You come out ahead by' : 'Renting saves you'}
          value={fmt$0(Math.abs(wealthDelta))}
          sub={`over ${horizon} years`}
          accent
        />
        <Stat
          label="Break-even point"
          value={breakEvenYear && breakEvenYear <= horizon ? `Year ${breakEvenYear}` : 'Never*'}
          sub={breakEvenYear && breakEvenYear <= horizon ? 'Buying pulls ahead' : 'Within your horizon'}
        />
        <Stat
          label="Net worth if you buy"
          value={fmt$(final.buyWealth)}
          sub={`In year ${horizon}, after sale costs`}
        />
        <Stat
          label="Net worth if you rent"
          value={fmt$(final.rentWealth)}
          sub={`Down payment invested @ ${inputs.investmentReturn}%`}
        />
      </div>
      <div style={{ background: '#fff', border: `1px solid ${RULE}`, borderRadius: 8, padding: 28 }}>
        <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 500, marginBottom: 12 }}>Here's why</div>
        <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.4, fontWeight: 400 }}>
          {reasons.map((r, i) => <p key={i} style={{ margin: i === 0 ? 0 : '14px 0 0', textWrap: 'pretty' }}>{r}</p>)}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, accent }) {
  return (
    <div style={{ background: PAPER, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 500 }}>{label}</div>
      <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 36, fontWeight: 400, letterSpacing: '-0.01em', color: accent ? ACCENT : INK, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, opacity: 0.55 }}>{sub}</div>}
    </div>
  );
}

function CostCards({ result, inputs }) {
  const { final, yearlyData, upFrontBuy } = result;
  const totalBuyOutflow = upFrontBuy + yearlyData.reduce((s, d) => s + (d.buyMonthly * 12), 0);
  // Reconstruct outflow: better is sum of actual non-true cost. Approximate: use buyCumCost which already includes upfront and true cost.
  // For display, we want gross cash spent on housing.
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
      <Card
        title="If you buy"
        accent
        rows={[
          ['Upfront cash', fmt$0(upFrontBuy)],
          ['Monthly mortgage (P&I)', fmt$0(result.monthlyMtg)],
          ['Total interest over life of loan', fmt$0(yearlyData.reduce((s, d) => s + d.interestPaidYear, 0))],
          [`Home value in year ${inputs.horizon}`, fmt$0(final.homeValue)],
          [`Equity in year ${inputs.horizon}`, fmt$0(final.homeEquity)],
        ]}
      />
      <Card
        title="If you rent"
        rows={[
          ['Rent today', `${fmt$0(inputs.rent)}/mo`],
          [`Rent in year ${inputs.horizon}`, `${fmt$0(inputs.rent * Math.pow(1 + inputs.rentGrowthRate/100, inputs.horizon))}/mo`],
          [`Total rent paid by year ${inputs.horizon}`, fmt$0(yearlyData[yearlyData.length-1].rentCumCost)],
          [`Down payment invested @ ${inputs.investmentReturn}%`, fmt$0(final.rentInvestmentBalance)],
          ['Net wealth (invested)', fmt$0(final.rentWealth)],
        ]}
      />
    </div>
  );
}

function Card({ title, rows, accent }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${RULE}`, borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${RULE}`, background: accent ? ACCENT : INK, color: '#fff' }}>
        <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 28, fontWeight: 400, letterSpacing: '-0.01em' }}>{title}</div>
      </div>
      <div>
        {rows.map(([k, v], i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            padding: '14px 24px',
            borderBottom: i < rows.length - 1 ? `1px solid ${RULE}` : 'none',
            gap: 16,
          }}>
            <span style={{ fontSize: 13, opacity: 0.7 }}>{k}</span>
            <span style={{ fontSize: 16, fontWeight: 600, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartBlock({ eyebrow, title, sub, children }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${RULE}`, borderRadius: 8, padding: 28 }}>
      <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 500, marginBottom: 8 }}>{eyebrow}</div>
      <h3 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 32, fontWeight: 400, margin: '0 0 6px', letterSpacing: '-0.01em' }}>{title}</h3>
      {sub && <p style={{ fontSize: 14, opacity: 0.65, margin: '0 0 20px', maxWidth: 640, lineHeight: 1.5 }}>{sub}</p>}
      {children}
    </div>
  );
}

function EduSection() {
  const items = [
    {
      title: 'The 5% rule, simplified',
      body: 'A common shorthand: total non-recoverable costs of owning come to about 5% of home value per year — roughly 1% property tax, 1% maintenance, and ~3% mortgage interest after deductions. If yearly rent is below 5% of the home price, renting is mathematically winning. Above it, buying probably is.',
    },
    {
      title: 'Why year 5–7 is the usual hinge',
      body: "Buying carries large fixed costs: closing fees on the way in, agent commissions on the way out. Spread over 3 years, that's catastrophic. Spread over 15, it's a rounding error. Most break-evens land in the 5–7 year window, which is why housing advice obsesses over how long you'll stay.",
    },
    {
      title: 'The opportunity cost no one mentions',
      body: 'A down payment isn\'t free money — it\'s capital that could be earning ~7% in an index fund. This calculator handles that honestly: the renter "invests" the same upfront cash, and we compare wealth, not just cost. That\'s the only fair comparison.',
    },
    {
      title: 'What we don\'t calculate',
      body: 'Stability. The freedom to repaint a wall. The cost of a broken water heater on a Tuesday night. Whether you\'ll be in the same job, the same city, the same relationship in ten years. The math is one input, not the answer.',
    },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 500, marginBottom: 12 }}>The fine print, in plain English</div>
        <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 400, margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>What the math misses.</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: RULE, border: `1px solid ${RULE}`, borderRadius: 8, overflow: 'hidden' }} className="rvb-edu-grid">
        {items.map((it, i) => (
          <div key={i} style={{ background: PAPER, padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 26, fontWeight: 400, letterSpacing: '-0.01em' }}>{it.title}</div>
            <p style={{ fontSize: 15, lineHeight: 1.55, opacity: 0.78, margin: 0, textWrap: 'pretty' }}>{it.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Main App ----------
function App() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const tweaks = useTweaks(TWEAK_DEFAULTS);
  const result = useMemo(() => window.RvB.simulate(inputs), [inputs]);

  const buyWins = result.wealthDelta > 0;

  return (
    <div style={{ background: PAPER, color: INK, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Topbar */}
      <header style={{
        borderBottom: `1px solid ${RULE}`,
        padding: '20px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 10, background: PAPER,
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 28, height: 28, background: ACCENT, borderRadius: 4, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 6, background: PAPER, borderRadius: 1 }}></div>
          </div>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22, letterSpacing: '-0.01em' }}>Rent <span style={{ opacity: 0.4 }}>vs</span> Buy</div>
        </div>
        <div style={{ display: 'flex', gap: 28, fontSize: 13, opacity: 0.7 }}>
          <a href="#calculator" style={{ color: 'inherit', textDecoration: 'none' }}>Calculator</a>
          <a href="#charts" style={{ color: 'inherit', textDecoration: 'none' }}>Charts</a>
          <a href="#why" style={{ color: 'inherit', textDecoration: 'none' }}>Why</a>
        </div>
      </header>

      {/* Hero band */}
      <section style={{ padding: '64px 40px 48px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 500, marginBottom: 24 }}>An honest calculator · {new Date().getFullYear()}</div>
        <h1 style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 'clamp(56px, 11vw, 168px)',
          lineHeight: 0.9,
          fontWeight: 400,
          letterSpacing: '-0.03em',
          margin: 0,
          textWrap: 'balance',
        }}>
          Should you <span style={{ fontStyle: 'italic', color: ACCENT }}>rent</span><br />
          or should you <span style={{ fontStyle: 'italic' }}>buy?</span>
        </h1>
        <p style={{ fontSize: 'clamp(18px, 1.6vw, 22px)', lineHeight: 1.5, maxWidth: 720, marginTop: 32, opacity: 0.75, textWrap: 'pretty' }}>
          Most calculators give you a monthly payment and call it a day.
          This one compares the wealth you'd actually have — counting opportunity cost, appreciation,
          taxes, and the unglamorous expense of owning a roof. Type your numbers in. We'll be direct.
        </p>
      </section>

      {/* Main two-column layout */}
      <main id="calculator" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 380px) 1fr',
        gap: 40,
        padding: '0 40px 80px',
        maxWidth: 1400, margin: '0 auto',
        alignItems: 'start',
      }} className="rvb-main">
        {/* Inputs (sticky) */}
        <aside style={{ position: 'sticky', top: 88, maxHeight: 'calc(100vh - 108px)', overflowY: 'auto', paddingRight: 8 }} className="rvb-inputs">
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 500, marginBottom: 16 }}>Your numbers</div>
          <InputsPanel inputs={inputs} setInputs={setInputs} density={tweaks.density} />
        </aside>

        {/* Results */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
          <VerdictBlock result={result} inputs={inputs} />

          <div id="charts" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <CostCards result={result} inputs={inputs} />

            <ChartBlock
              eyebrow="Wealth over time"
              title={`Your net worth, ${inputs.horizon} years from now`}
              sub="If you sold the home in any given year (after agent fees and remaining mortgage), how much would you have? And how much would the renter — who invested the same down payment — have? This is the comparison that matters."
            >
              <NetWorthChart data={result.yearlyData} accent={ACCENT} breakEvenYear={result.breakEvenYear && result.breakEvenYear <= inputs.horizon ? result.breakEvenYear : null} />
            </ChartBlock>

            <ChartBlock
              eyebrow="Cumulative outflow"
              title="What you'll pay, total"
              sub="The headline number. Buying front-loads cost (down payment, closing) and then settles into a fixed payment. Renting starts cheap and rises forever."
            >
              <CumulativeChart data={result.yearlyData} accent={ACCENT} />
            </ChartBlock>

            <ChartBlock
              eyebrow="Where the money goes"
              title="Month-one anatomy"
              sub="A rent check is one thing. A mortgage payment is six things stacked together — only one of which (principal) is actually saving for you."
            >
              <BreakdownChart breakdown={result.breakdown} accent={ACCENT} />
            </ChartBlock>
          </div>

          <div id="why">
            <EduSection />
          </div>

          <footer style={{ borderTop: `1px solid ${RULE}`, paddingTop: 32, fontSize: 12, opacity: 0.55, lineHeight: 1.6, textWrap: 'pretty' }}>
            <p style={{ margin: 0 }}>
              All figures are estimates. We assume you reinvest tax savings, that markets behave smoothly,
              and that nothing in your life changes for {inputs.horizon} years. Reality varies. This is decision support,
              not financial advice. Talk to a person about taxes.
            </p>
          </footer>
        </section>
      </main>

      {/* Tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection title="Density">
          <TweakRadio
            label="Layout density"
            value={tweaks.density}
            onChange={(v) => tweaks.set('density', v)}
            options={[{ label: 'Compact', value: 'compact' }, { label: 'Spacious', value: 'spacious' }]}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
