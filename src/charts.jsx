export const fmt$ = (n) => {
  const abs = Math.abs(n);
  if (abs >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `$${Math.round(n / 1e3)}k`;
  return `$${Math.round(n)}`;
};

export const fmt$0 = (n) => `$${Math.round(n).toLocaleString()}`;

export function CumulativeChart({ data, accent }) {
  const W = 720;
  const H = 320;
  const PAD_L = 56;
  const PAD_R = 24;
  const PAD_T = 24;
  const PAD_B = 36;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const maxY = Math.max(...data.map((d) => Math.max(d.buyCumCost, d.rentCumCost)));
  const maxX = data[data.length - 1].year;
  const x = (yr) => PAD_L + (yr / maxX) * innerW;
  const y = (val) => PAD_T + innerH - (val / maxY) * innerH;
  const linePath = (key) => data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(d.year)} ${y(d[key])}`).join(" ");
  const areaPath = (key) => `${linePath(key)} L ${x(maxX)} ${PAD_T + innerH} L ${PAD_L} ${PAD_T + innerH} Z`;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * maxY);
  const xTicks = [];
  for (let i = 0; i <= maxX; i += 5) xTicks.push(i);
  if (xTicks[xTicks.length - 1] !== maxX) xTicks.push(maxX);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="buyArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rentArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F0F0E" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#0F0F0E" stopOpacity="0" />
        </linearGradient>
      </defs>
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={PAD_L} x2={W - PAD_R} y1={y(t)} y2={y(t)} stroke="#0F0F0E" strokeOpacity="0.08" />
          <text x={PAD_L - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#0F0F0E" opacity="0.55" fontFamily="Inter, sans-serif">
            {fmt$(t)}
          </text>
        </g>
      ))}
      {xTicks.map((t, i) => (
        <text key={i} x={x(t)} y={H - 14} textAnchor="middle" fontSize="11" fill="#0F0F0E" opacity="0.55" fontFamily="Inter, sans-serif">
          Yr {t}
        </text>
      ))}
      <path d={areaPath("rentCumCost")} fill="url(#rentArea)" />
      <path d={areaPath("buyCumCost")} fill="url(#buyArea)" />
      <path d={linePath("rentCumCost")} fill="none" stroke="#0F0F0E" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={linePath("buyCumCost")} fill="none" stroke={accent} strokeWidth="2.5" strokeLinejoin="round" />
      <g>
        <circle cx={x(maxX)} cy={y(data[data.length - 1].buyCumCost)} r="4" fill={accent} />
        <text x={x(maxX) - 8} y={y(data[data.length - 1].buyCumCost) - 8} textAnchor="end" fontSize="12" fontWeight="600" fill={accent} fontFamily="Inter, sans-serif">
          Buy {fmt$(data[data.length - 1].buyCumCost)}
        </text>
        <circle cx={x(maxX)} cy={y(data[data.length - 1].rentCumCost)} r="4" fill="#0F0F0E" />
        <text x={x(maxX) - 8} y={y(data[data.length - 1].rentCumCost) - 8} textAnchor="end" fontSize="12" fontWeight="600" fill="#0F0F0E" fontFamily="Inter, sans-serif">
          Rent {fmt$(data[data.length - 1].rentCumCost)}
        </text>
      </g>
    </svg>
  );
}

export function NetWorthChart({ data, accent, breakEvenYear }) {
  const W = 720;
  const H = 320;
  const PAD_L = 56;
  const PAD_R = 24;
  const PAD_T = 24;
  const PAD_B = 36;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const allVals = data.flatMap((d) => [d.buyWealth, d.rentWealth]);
  const minY = Math.min(0, ...allVals);
  const maxY = Math.max(...allVals);
  const maxX = data[data.length - 1].year;
  const x = (yr) => PAD_L + (yr / maxX) * innerW;
  const y = (val) => PAD_T + innerH - ((val - minY) / (maxY - minY)) * innerH;
  const linePath = (key) => data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(d.year)} ${y(d[key])}`).join(" ");
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => minY + t * (maxY - minY));
  const xTicks = [];
  for (let i = 0; i <= maxX; i += 5) xTicks.push(i);
  if (xTicks[xTicks.length - 1] !== maxX) xTicks.push(maxX);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={PAD_L} x2={W - PAD_R} y1={y(t)} y2={y(t)} stroke="#0F0F0E" strokeOpacity="0.08" />
          <text x={PAD_L - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#0F0F0E" opacity="0.55" fontFamily="Inter, sans-serif">
            {fmt$(t)}
          </text>
        </g>
      ))}
      {xTicks.map((t, i) => (
        <text key={i} x={x(t)} y={H - 14} textAnchor="middle" fontSize="11" fill="#0F0F0E" opacity="0.55" fontFamily="Inter, sans-serif">
          Yr {t}
        </text>
      ))}
      {breakEvenYear && (
        <g>
          <line x1={x(breakEvenYear)} x2={x(breakEvenYear)} y1={PAD_T} y2={PAD_T + innerH} stroke={accent} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
          <rect x={x(breakEvenYear) - 36} y={PAD_T - 4} width="72" height="20" rx="4" fill={accent} />
          <text x={x(breakEvenYear)} y={PAD_T + 10} textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff" fontFamily="Inter, sans-serif">
            Break-even
          </text>
        </g>
      )}
      <path d={linePath("rentWealth")} fill="none" stroke="#0F0F0E" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={linePath("buyWealth")} fill="none" stroke={accent} strokeWidth="2.5" strokeLinejoin="round" />
      <g>
        <circle cx={x(maxX)} cy={y(data[data.length - 1].buyWealth)} r="4" fill={accent} />
        <text x={x(maxX) - 8} y={y(data[data.length - 1].buyWealth) - 8} textAnchor="end" fontSize="12" fontWeight="600" fill={accent} fontFamily="Inter, sans-serif">
          Buy {fmt$(data[data.length - 1].buyWealth)}
        </text>
        <circle cx={x(maxX)} cy={y(data[data.length - 1].rentWealth)} r="4" fill="#0F0F0E" />
        <text x={x(maxX) - 8} y={y(data[data.length - 1].rentWealth) - 8} textAnchor="end" fontSize="12" fontWeight="600" fill="#0F0F0E" fontFamily="Inter, sans-serif">
          Rent {fmt$(data[data.length - 1].rentWealth)}
        </text>
      </g>
    </svg>
  );
}

export function BreakdownChart({ breakdown, accent }) {
  const buyParts = [
    { label: "Principal", value: breakdown.principal, color: accent, note: "Builds equity" },
    { label: "Interest", value: breakdown.interest, color: "#0F0F0E", note: "To the bank" },
    { label: "Property tax", value: breakdown.propertyTax, color: "#7A6A5A", note: "" },
    { label: "Maintenance", value: breakdown.maintenance, color: "#A89685", note: "" },
    { label: "Insurance", value: breakdown.insurance, color: "#C9B9A8", note: "" },
    { label: "HOA", value: breakdown.hoa, color: "#DDD0C0", note: "" },
  ].filter((p) => p.value > 0);

  const buyTotal = buyParts.reduce((s, p) => s + p.value, 0);
  const rentTotal = breakdown.rent;
  const max = Math.max(buyTotal, rentTotal);

  const Bar = ({ parts, total, label, single }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", opacity: 0.6 }}>{label}</div>
        <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 28, fontWeight: 400 }}>
          {fmt$0(total)}
          <span style={{ fontSize: 13, opacity: 0.5, marginLeft: 4 }}>/mo</span>
        </div>
      </div>
      <div style={{ display: "flex", height: 44, width: `${(total / max) * 100}%`, minWidth: 60, borderRadius: 4, overflow: "hidden" }}>
        {single ? (
          <div style={{ flex: 1, background: "#0F0F0E", display: "flex", alignItems: "center", paddingLeft: 12, color: "#fff", fontSize: 12, fontWeight: 500 }}>
            Rent payment
          </div>
        ) : (
          parts.map((p, i) => (
            <div key={i} style={{ width: `${(p.value / total) * 100}%`, background: p.color, position: "relative" }} title={`${p.label}: ${fmt$0(p.value)}`}>
              {p.value / total > 0.12 && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", paddingLeft: 8, color: "#fff", fontSize: 11, fontWeight: 500 }}>
                  {p.label}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {!single && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", fontSize: 12, opacity: 0.7, marginTop: 4 }}>
          {parts.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, background: p.color, borderRadius: 2, display: "inline-block" }} />
              <span>
                {p.label} {fmt$0(p.value)}
                {p.note && <span style={{ opacity: 0.6 }}> · {p.note}</span>}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Bar parts={buyParts} total={buyTotal} label="Buying — month 1" />
      <Bar parts={[]} total={rentTotal} label="Renting — month 1" single />
    </div>
  );
}
