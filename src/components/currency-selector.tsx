import { CURRENCY_OPTIONS, useCurrency } from "@/context/currency";

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <p className="text-[10px] uppercase tracking-[0.3em] text-sakura">Currency</p>
      <div
        className="inline-flex flex-wrap gap-1 rounded-sm border border-background/25 p-1"
        role="group"
        aria-label="Choose currency"
      >
        {CURRENCY_OPTIONS.map(({ code, label }) => (
          <button
            key={code}
            type="button"
            onClick={() => setCurrency(code)}
            aria-pressed={currency === code}
            className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors ${
              currency === code
                ? "bg-sakura text-foreground"
                : "text-background/80 hover:bg-background/10 hover:text-background"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
