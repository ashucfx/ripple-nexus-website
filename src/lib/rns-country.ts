// Pricing + budget options per country
import type { CountryInfo } from './scheduler-types';

export const INR_BUDGET_OPTIONS = [
  { label: '₹50,000 – ₹1,50,000',         value: '50k_150k',     numericValue: 100000  },
  { label: '₹1,50,000 – ₹5,00,000',       value: '150k_500k',    numericValue: 325000  },
  { label: '₹5,00,000 – ₹15,00,000',      value: '500k_1500k',   numericValue: 1000000 },
  { label: '₹15,00,000+',                 value: 'above_1500k',  numericValue: 1500001 },
];

export const USD_BUDGET_OPTIONS = [
  { label: '$1,000 – $5,000',             value: '1k_5k',        numericValue: 2500 },
  { label: '$5,000 – $20,000',            value: '5k_20k',       numericValue: 10000 },
  { label: '$20,000 – $50,000',           value: '20k_50k',      numericValue: 35000 },
  { label: '$50,000+',                    value: 'above_50k',    numericValue: 50001 },
];

export function buildCountryInfo(
  countryCode: string,
  countryName: string,
  feesFromSettings?: { usd?: number; inr?: number }
): CountryInfo {
  const isIndia = countryCode === 'IN';

  if (isIndia) {
    return {
      country: countryName,
      countryCode,
      isIndia: true,
      currency: 'INR',
      symbol: '₹',
      consultationFee: feesFromSettings?.inr ?? 1999,
      budgetOptions: INR_BUDGET_OPTIONS,
      minBudgetUsdEquivalent: 900, // ≈ ₹75,000 threshold enforced server-side
    };
  }

  return {
    country: countryName,
    countryCode,
    isIndia: false,
    currency: 'USD',
    symbol: '$',
    consultationFee: feesFromSettings?.usd ?? 199,
    budgetOptions: USD_BUDGET_OPTIONS,
    minBudgetUsdEquivalent: 1000,
  };
}

export const URGENCY_OPTIONS = [
  { value: 'immediate',  label: 'Immediate — this is blocking growth right now' },
  { value: '1-3months',  label: 'Within 1–3 months' },
  { value: '3-6months',  label: 'Within 3–6 months' },
  { value: 'exploring',  label: 'Just exploring options' },
] as const;
