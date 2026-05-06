const MONTHS = 12;

export function monthlyMortgagePayment(principal, annualRate, years) {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRate / 100 / MONTHS;
  const n = years * MONTHS;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function simulate(inputs) {
  const {
    homePrice,
    downPaymentPct,
    mortgageRate,
    mortgageYears,
    propertyTaxRate,
    hoaMonthly,
    maintenancePct,
    insuranceMonthly,
    closingCostPct,
    sellingCostPct,
    appreciationRate,
    rent,
    rentGrowthRate,
    investmentReturn,
    marginalTaxRate,
    deductionsItemized,
    horizon,
  } = inputs;

  const downPayment = homePrice * (downPaymentPct / 100);
  const loanPrincipal = homePrice - downPayment;
  const closingCosts = homePrice * (closingCostPct / 100);
  const monthlyMtg = monthlyMortgagePayment(loanPrincipal, mortgageRate, mortgageYears);
  const upFrontBuy = downPayment + closingCosts;

  let loanBalance = loanPrincipal;
  let homeValue = homePrice;
  let rentNow = rent;
  let buyCumCost = upFrontBuy;
  let rentCumCost = 0;
  let rentInvestmentBalance = upFrontBuy;
  const yearlyData = [];

  let firstYearMonthlyBuy = 0;

  const monthlyRate = mortgageRate / 100 / MONTHS;
  const monthlyAppr = Math.pow(1 + appreciationRate / 100, 1 / MONTHS) - 1;
  const monthlyRentGrowth = Math.pow(1 + rentGrowthRate / 100, 1 / MONTHS) - 1;
  const monthlyInvest = Math.pow(1 + investmentReturn / 100, 1 / MONTHS) - 1;

  for (let y = 1; y <= horizon; y++) {
    let yearBuyCost = 0;
    let yearRentCost = 0;
    let interestPaidThisYear = 0;
    let propertyTaxThisYear = 0;

    for (let m = 0; m < MONTHS; m++) {
      let interest = 0;
      let principalPay = 0;
      if (loanBalance > 0 && y <= mortgageYears) {
        interest = loanBalance * monthlyRate;
        principalPay = Math.min(loanBalance, monthlyMtg - interest);
        loanBalance -= principalPay;
      }
      const propertyTax = (homeValue * (propertyTaxRate / 100)) / MONTHS;
      const maintenance = (homeValue * (maintenancePct / 100)) / MONTHS;
      const buyMonthly =
        (loanBalance > 0 || y <= mortgageYears ? monthlyMtg : 0) +
        propertyTax +
        maintenance +
        insuranceMonthly +
        hoaMonthly;

      const taxSavings = deductionsItemized ? (interest + propertyTax) * (marginalTaxRate / 100) : 0;
      const buyTrueMonthly = buyMonthly - principalPay - taxSavings;

      yearBuyCost += buyTrueMonthly;
      interestPaidThisYear += interest;
      propertyTaxThisYear += propertyTax;
      yearRentCost += rentNow;

      const rentInvestContribution = buyMonthly - rentNow;
      rentInvestmentBalance = rentInvestmentBalance * (1 + monthlyInvest) + rentInvestContribution;

      homeValue *= 1 + monthlyAppr;
      rentNow *= 1 + monthlyRentGrowth;

      if (y === 1 && m === 0) firstYearMonthlyBuy = buyMonthly;
    }

    buyCumCost += yearBuyCost;
    rentCumCost += yearRentCost;

    const homeEquity = homeValue - loanBalance;
    const sellingCosts = homeValue * (sellingCostPct / 100);
    const buyWealth = homeValue - loanBalance - sellingCosts;
    const rentWealth = rentInvestmentBalance;

    yearlyData.push({
      year: y,
      buyMonthly: yearBuyCost / MONTHS,
      rentMonthly: yearRentCost / MONTHS,
      buyCumCost,
      rentCumCost,
      homeValue,
      loanBalance,
      homeEquity,
      buyWealth,
      rentWealth,
      rentInvestmentBalance,
      interestPaidYear: interestPaidThisYear,
      propertyTaxYear: propertyTaxThisYear,
    });
  }

  let breakEvenYear = null;
  for (const d of yearlyData) {
    if (d.buyWealth >= d.rentWealth) {
      breakEvenYear = d.year;
      break;
    }
  }

  const dp = homePrice * (downPaymentPct / 100);
  const lp = homePrice - dp;
  const m1Mtg = monthlyMortgagePayment(lp, mortgageRate, mortgageYears);
  const m1Interest = lp * (mortgageRate / 100 / MONTHS);
  const m1Principal = m1Mtg - m1Interest;
  const breakdown = {
    principal: m1Principal,
    interest: m1Interest,
    propertyTax: (homePrice * (propertyTaxRate / 100)) / MONTHS,
    maintenance: (homePrice * (maintenancePct / 100)) / MONTHS,
    insurance: insuranceMonthly,
    hoa: hoaMonthly,
    rent,
  };

  const final = yearlyData[yearlyData.length - 1];
  const wealthDelta = final.buyWealth - final.rentWealth;

  return {
    yearlyData,
    breakEvenYear,
    breakdown,
    wealthDelta,
    monthlyMtg,
    upFrontBuy,
    firstYearMonthlyBuy,
    final,
  };
}
