import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CurrencyCode = "USD" | "AUD" | "GBP";

export const CURRENCY_OPTIONS: { code: CurrencyCode; label: string }[] = [
  { code: "GBP", label: "UK" },
  { code: "USD", label: "American" },
  { code: "AUD", label: "AUS" },
];

const STORAGE_KEY = "raw-ebikes-currency";

/** Conversion rates from GBP (base) — used for shipping/fixed amounts only */
const RATES: Record<CurrencyCode, number> = {
  GBP: 1,
  USD: 1.27,
  AUD: 1.91,
};

const LOCALES: Record<CurrencyCode, string> = {
  USD: "en-US",
  AUD: "en-AU",
  GBP: "en-GB",
};

function detectCurrency(): CurrencyCode {
  const locale = navigator.language.toLowerCase();
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (locale.endsWith("-au") || tz.startsWith("Australia/")) return "AUD";
  if (locale.endsWith("-us") || tz.startsWith("America/")) return "USD";
  if (locale.endsWith("-gb") || locale.includes("-uk") || tz === "Europe/London") return "GBP";

  return "GBP";
}

type CurrencyCtx = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  /** Product prices — pass GBP and it shows correct currency */
  formatPrice: (amountGbp: number) => string;
  /** Pass an object { gbp, usd, aud } and it shows the right one */
  formatRegionalPrice: (prices: { gbp: number; usd: number; aud: number }) => string;
  /** Get raw price number for current region */
  getRegionalPrice: (prices: { gbp: number; usd: number; aud: number }) => number;
  /** Fixed amounts (e.g. shipping) — pass GBP, converts to current currency */
  formatMoney: (amountGbp: number) => string;
};

const Ctx = createContext<CurrencyCtx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("GBP");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (stored && stored in RATES) {
        setCurrencyState(stored);
      } else {
        setCurrencyState(detectCurrency());
      }
    } catch {
      setCurrencyState(detectCurrency());
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {}
  };

  const value = useMemo<CurrencyCtx>(() => {
    const format = (amount: number) =>
      new Intl.NumberFormat(LOCALES[currency], {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);

    const formatMoney = (amountGbp: number) => format(amountGbp * RATES[currency]);

    const getRegionalPrice = (prices: { gbp: number; usd: number; aud: number }) => {
      if (currency === "USD") return prices.usd;
      if (currency === "AUD") return prices.aud;
      return prices.gbp;
    };

    const formatRegionalPrice = (prices: { gbp: number; usd: number; aud: number }) =>
      format(getRegionalPrice(prices));

    const formatPrice = (amountGbp: number) => format(amountGbp * RATES[currency]);

    return {
      currency,
      setCurrency,
      formatPrice,
      formatRegionalPrice,
      getRegionalPrice,
      formatMoney,
    };
  }, [currency]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurrency() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCurrency must be used inside CurrencyProvider");
  return c;
}