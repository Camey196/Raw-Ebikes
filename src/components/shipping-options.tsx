import { useCart } from "@/context/cart";
import { useCurrency } from "@/context/currency";
import { formatShippingOptionLabel } from "@/lib/shipping";
import { cn } from "@/lib/utils";

type ShippingOptionsProps = {
  className?: string;
  compact?: boolean;
};

export function ShippingOptions({ className, compact = false }: ShippingOptionsProps) {
  const { shippingOptions, shippingId, setShippingId, items } = useCart();
  const { formatMoney } = useCurrency();

  if (items.length === 0 && compact) return null;
  if (shippingOptions.length === 0) return null;

  const single = shippingOptions.length === 1;

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Shipping</p>
      <div className={cn("flex flex-col gap-2", single && "gap-0")} role="radiogroup" aria-label="Shipping method">
        {shippingOptions.map((option) => {
          const selected = shippingId === option.id;
          const label = formatShippingOptionLabel(option, formatMoney);

          if (single) {
            return (
              <p key={option.id} className="text-sm text-foreground tabular-nums">
                {label}
              </p>
            );
          }

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setShippingId(option.id)}
              className={cn(
                "flex w-full items-center justify-between gap-3 border px-3 py-2.5 text-left text-xs transition-colors",
                selected
                  ? "border-foreground bg-foreground/5"
                  : "border-border hover:border-foreground/40",
              )}
            >
              <span className="leading-snug">
                <span className="block font-medium uppercase tracking-[0.12em]">{option.label}</span>
                <span className="text-muted-foreground">{option.eta}</span>
              </span>
              <span className="shrink-0 tabular-nums">{formatMoney(option.amount)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
