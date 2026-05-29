import { useCurrency } from "@/context/currency";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function usePastHero() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return pastHero;
}

export function DeliveryBanner({ hidden }: { hidden: boolean }) {
  const { currency } = useCurrency();

  const message =
    currency === "GBP"
      ? "Next Day Delivery — Order by 12pm"
      : currency === "USD"
        ? "Express Delivery — 5–9 Days"
        : "Priority Delivery — 5–10 Days";

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] border-b border-foreground/10 bg-sakura text-center transition-all duration-300 ease-out",
        hidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100",
      )}
      role="status"
      aria-hidden={hidden}
    >
      <p className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground">
        {message}
      </p>
    </div>
  );
}
