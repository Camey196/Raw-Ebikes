import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { P as Petals } from "./petals-Bq3oDkeo.js";
import "react";
function Success() {
  return /* @__PURE__ */ jsxs("main", { className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-center", children: [
    /* @__PURE__ */ jsx(Petals, { density: 30, onBackground: true, className: "opacity-60" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-lg", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sakura", children: /* @__PURE__ */ jsx(Check, { className: "h-8 w-8 text-foreground", strokeWidth: 2.5 }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 text-[10px] uppercase tracking-[0.4em] text-sakura", children: "Order Confirmed" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 font-display text-5xl font-black uppercase tracking-tight md:text-6xl", children: "Thank you." }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm leading-relaxed text-muted-foreground md:text-base", children: "Your RAW EBIKE is being prepared in the Antwerp studio. We've sent the confirmation to your email — tracking follows within 48 hours." }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "mt-10 inline-flex items-center justify-center gap-3 border border-foreground px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition-all hover:bg-foreground hover:text-background", children: "Back to Store" })
    ] })
  ] });
}
export {
  Success as component
};
