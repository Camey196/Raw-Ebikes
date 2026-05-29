import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CurrencyCode = "USD" | "AUD" | "GBP";

export const CURRENCY_OPTIONS: { code: CurrencyCode; label: string }[] = [
  { code: "AUD", label: "AUS" },
  { code: "USD", label: "American" },
  { code: "GBP", label: "UK" },
];

const STORAGE_KEY = "raw-ebikes-currency";

/** Base prices are stored in USD; these are approximate display rates. */
const RATES: Record<CurrencyCode, number> = {
  USD: 1,
  AUD: 1.55,
  GBP: 0.79,
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
  if (locale.endsWith("-gb") || locale.includes("-uk") || tz === "Europe/London") return "GBP";
  if (locale.endsWith("-us") || tz.startsWith("America/")) return "USD";

  return "USD";
}

type CurrencyCtx = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  /** Product prices stored in USD */
  formatPrice: (amountUsd: number) => string;
  /** Fixed amounts already in the selected currency (e.g. shipping) */
  formatMoney: (amount: number) => string;
  convertUsd: (amountUsd: number) => number;
};

const Ctx = createContext<CurrencyCtx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [hydrated, setHydrated] = useState(false);

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
    setHydrated(true);
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {}
  };

  const value = useMemo<CurrencyCtx>(() => {
    const convertUsd = (amountUsd: number) => Math.round(amountUsd * RATES[currency]);
    const formatMoney = (amount: number) =>
      new Intl.NumberFormat(LOCALES[currency], {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);

    return {
      currency,
      setCurrency,
      convertUsd,
      formatMoney,
      formatPrice: (amountUsd: number) =>
        new Intl.NumberFormat(LOCALES[currency], {
          style: "currency",
          currency,
          maximumFractionDigits: 0,
        }).format(convertUsd(amountUsd)),
    };
  }, [currency]);

  if (!hydrated) {
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurrency() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCurrency must be used inside CurrencyProvider");
  return c;
}
