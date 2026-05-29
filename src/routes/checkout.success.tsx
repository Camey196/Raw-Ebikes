import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Petals } from "@/components/petals";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — RAW EBIKES" },
      { name: "description", content: "Your RAW EBIKES order has been placed." },
    ],
  }),
  component: Success,
});

function Success() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-center">
      <Petals density={30} onBackground className="opacity-60" />
      <div className="relative z-10 max-w-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sakura">
          <Check className="h-8 w-8 text-foreground" strokeWidth={2.5} />
        </div>
        <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-sakura">Order Confirmed</p>
        <h1 className="mt-4 font-display text-5xl font-black uppercase tracking-tight md:text-6xl">
          Thank you.
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
          Your RAW EBIKE is being prepared in the Antwerp studio. We've sent the
          confirmation to your email — tracking follows within 48 hours.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center justify-center gap-3 border border-foreground px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition-all hover:bg-foreground hover:text-background"
        >
          Back to Store
        </Link>
      </div>
    </main>
  );
}
