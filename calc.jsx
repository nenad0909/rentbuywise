// Rent vs Buy financial math.
// All calculations done in monthly granularity, summarized to yearly for display.

const MONTHS = 12;

function monthlyMortgagePayment(principal, annualRate, years) {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRate / 100 / MONTHS;
  const n = years * MONTHS;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// Returns array of yearly snapshots over `horizon` years.
// Each snapshot: { year, buyMonthly, rentMonthly, buyCumCost, rentCumCost,
//   homeEquity, investedRentSavings, buyNetWorth, rentNetWorth }
function simulate(inputs) {
  const {
    homePrice, downPaymentPct, mortgageRate, mortgageYears,
    propertyTaxRate, hoaMonthly, maintenancePct, insuranceMonthly,
    closingCostPct, sellingCostPct,
    appreciationRate, rent, rentGrowthRate, inflationRate,
    investmentReturn, marginalTaxRate, deductionsItemized,
    horizon,
  } = inputs;

  const downPayment = homePrice * (downPaymentPct / 100);
  const loanPrincipal = homePrice - downPayment;
  const closingCosts = homePrice * (closingCostPct / 100);
  const monthlyMtg = monthlyMortgagePayment(loanPrincipal, mortgageRate, mortgageYears);

  // Up-front cost for buying = down + closing. The renter has this same cash, invested.
  const upFrontBuy = downPayment + closingCosts;

  let loanBalance = loanPrincipal;
  let homeValue = homePrice;
  let rentNow = rent;
  let buyCumCost = upFrontBuy; // total out-of-pocket buy
  let rentCumCost = 0;
  let rentInvestmentBalance = upFrontBuy; // renter starts by investing the same cash
  let yearlyData = [];

  // Store first-year monthly snapshots
  let firstYearMonthlyBuy = 0;
  let firstYearMonthlyRent = rent;

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
      // Buy: mortgage P&I
      let interest = 0;
      let principalPay = 0;
      if (loanBalance > 0 && y <= mortgageYears) {
        interest = loanBalance * monthlyRate;
        principalPay = Math.min(loanBalance, monthlyMtg - interest);
        loanBalance -= principalPay;
      }
      const propertyTax = (homeValue * (propertyTaxRate / 100)) / MONTHS;
      const maintenance = (homeValue * (maintenancePct / 100)) / MONTHS;
      const buyMonthly = (loanBalance > 0 || y <= mortgageYears ? monthlyMtg : 0)
        + propertyTax + maintenance + insuranceMonthly + hoaMonthly;
      // Net cost = total outflow - principal paydown (principal becomes equity)
      // For "true cost" we count outflow minus principal (since principal is savings),
      // but we also subtract tax savings on interest+property tax (if itemized).
      const taxSavings = deductionsItemized
        ? (interest + propertyTax) * (marginalTaxRate / 100)
        : 0;
      const buyTrueMonthly = buyMonthly - principalPay - taxSavings;

      yearBuyCost += buyTrueMonthly;
      interestPaidThisYear += interest;
      propertyTaxThisYear += propertyTax;

      // Rent
      yearRentCost += rentNow;

      // Renter invests the difference (if buy outflow > rent, renter has nothing extra; if rent > buy outflow, renter would have to dip into savings)
      const rentInvestContribution = (buyMonthly - rentNow);
      rentInvestmentBalance = rentInvestmentBalance * (1 + monthlyInvest) + rentInvestContribution;

      // Appreciation & rent growth
      homeValue *= (1 + monthlyAppr);
      rentNow *= (1 + monthlyRentGrowth);

      if (y === 1 && m === 0) firstYearMonthlyBuy = buyMonthly;
    }

    buyCumCost += yearBuyCost;
    rentCumCost += yearRentCost;

    // Home equity = market value - loan balance
    const homeEquity = homeValue - loanBalance;
    // If sold today, net = equity - selling costs
    const sellingCosts = homeValue * (sellingCostPct / 100);
    const buyNetWorth = homeEquity - sellingCosts - buyCumCost + upFrontBuy;
    // ^ subtract cumulative non-equity costs from the equity gained.
    // Simpler: net wealth from buying = (home value - loan - selling costs) - total cash spent on buying
    // total cash spent = upFrontBuy + sum of monthly outflows (not "true cost")

    const rentNetWorth = rentInvestmentBalance - rentCumCost;
    // ^ similarly: rent net wealth = invested savings - total rent paid... but rent paid is consumed,
    // so really: net wealth = invested balance (the upfront + saved differences, grown).
    // To make the comparison apples-to-apples, we report "wealth at year Y assuming you sold and walked away":
    //   buy: home sale proceeds - remaining loan - selling costs - cumulative non-equity outflows + cumulative principal paid (which we already counted)
    // Cleaner: just compare invested wealth (rent) vs (home sale proceeds net of loan/selling costs) for buy,
    // assuming both started with the same upfront cash. We'll use that.
    const buyWealth = (homeValue - loanBalance) - sellingCosts;
    const rentWealth = rentInvestmentBalance;

    yearlyData.push({
      year: y,
      buyMonthly: yearBuyCost / MONTHS, // avg true monthly buy cost
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

  // Find break-even year (first year where buyWealth >= rentWealth)
  let breakEvenYear = null;
  for (const d of yearlyData) {
    if (d.buyWealth >= d.rentWealth) { breakEvenYear = d.year; break; }
  }

  // First-month cost breakdown for the bar chart
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
    rent: rent,
  };

  // Final-year wealth delta
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
    inputs,
  };
}

window.RvB = { simulate, monthlyMortgagePayment };
