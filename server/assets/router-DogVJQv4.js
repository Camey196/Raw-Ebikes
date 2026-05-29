import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useNavigate, createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect, useMemo, createContext, useContext } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const appCss = "/assets/styles-DOFgVbpF.css";
const favicon = "/assets/favicon-BThCN3Hi.png";
const CURRENCY_OPTIONS = [
  { code: "AUD", label: "AUS" },
  { code: "USD", label: "American" },
  { code: "GBP", label: "UK" }
];
const STORAGE_KEY$1 = "raw-ebikes-currency";
const RATES = {
  USD: 1,
  AUD: 1.55,
  GBP: 0.79
};
const LOCALES = {
  USD: "en-US",
  AUD: "en-AU",
  GBP: "en-GB"
};
function detectCurrency() {
  const locale = navigator.language.toLowerCase();
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (locale.endsWith("-au") || tz.startsWith("Australia/")) return "AUD";
  if (locale.endsWith("-gb") || locale.includes("-uk") || tz === "Europe/London") return "GBP";
  if (locale.endsWith("-us") || tz.startsWith("America/")) return "USD";
  return "USD";
}
const Ctx$1 = createContext(null);
function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState("USD");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY$1);
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
  const setCurrency = (code) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY$1, code);
    } catch {
    }
  };
  const value = useMemo(() => {
    const convertUsd = (amountUsd) => Math.round(amountUsd * RATES[currency]);
    const formatMoney = (amount) => new Intl.NumberFormat(LOCALES[currency], {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
    return {
      currency,
      setCurrency,
      convertUsd,
      formatMoney,
      formatPrice: (amountUsd) => new Intl.NumberFormat(LOCALES[currency], {
        style: "currency",
        currency,
        maximumFractionDigits: 0
      }).format(convertUsd(amountUsd))
    };
  }, [currency]);
  if (!hydrated) {
    return /* @__PURE__ */ jsx(Ctx$1.Provider, { value, children });
  }
  return /* @__PURE__ */ jsx(Ctx$1.Provider, { value, children });
}
function useCurrency() {
  const c = useContext(Ctx$1);
  if (!c) throw new Error("useCurrency must be used inside CurrencyProvider");
  return c;
}
const SHIPPING_BY_CURRENCY = {
  GBP: [{ id: "uk-next", label: "Next Day", eta: "Next Day", amount: 4.12 }],
  USD: [
    { id: "us-fast", label: "Express", eta: "5–9 days", amount: 13.49 },
    { id: "us-standard", label: "Standard", eta: "7–12 days", amount: 10.89 }
  ],
  AUD: [
    { id: "au-standard", label: "Standard", eta: "7–13 days", amount: 10.59 },
    { id: "au-priority", label: "Priority", eta: "5–10 days", amount: 14.99 }
  ]
};
function getShippingOptions(currency) {
  return SHIPPING_BY_CURRENCY[currency];
}
function getDefaultShippingId(currency) {
  return getShippingOptions(currency)[0]?.id ?? "";
}
function getShippingOption(currency, id) {
  return getShippingOptions(currency).find((o) => o.id === id);
}
function formatShippingOptionLabel(option, formatMoney) {
  if (option.label === option.eta) return `${option.label} — ${formatMoney(option.amount)}`;
  return `${option.label} · ${option.eta} — ${formatMoney(option.amount)}`;
}
const Ctx = createContext(null);
const STORAGE_KEY = "raw-ebikes-cart";
const SHIPPING_STORAGE_KEY = "raw-ebikes-shipping";
function CartProvider({ children }) {
  const { currency, convertUsd } = useCurrency();
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [shippingId, setShippingIdState] = useState(() => getDefaultShippingId(currency));
  const shippingOptions = useMemo(() => getShippingOptions(currency), [currency]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
    }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
    }
  }, [items, hydrated]);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SHIPPING_STORAGE_KEY) || "{}");
      const stored = saved[currency];
      const valid = stored && shippingOptions.some((o) => o.id === stored);
      setShippingIdState(valid ? stored : getDefaultShippingId(currency));
    } catch {
      setShippingIdState(getDefaultShippingId(currency));
    }
  }, [currency, shippingOptions]);
  const setShippingId = (id) => {
    setShippingIdState(id);
    try {
      const saved = JSON.parse(localStorage.getItem(SHIPPING_STORAGE_KEY) || "{}");
      saved[currency] = id;
      localStorage.setItem(SHIPPING_STORAGE_KEY, JSON.stringify(saved));
    } catch {
    }
  };
  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
    const selectedShipping = getShippingOption(currency, shippingId) ?? shippingOptions[0];
    const shipping = items.length > 0 ? selectedShipping?.amount ?? 0 : 0;
    const subtotalNative = convertUsd(subtotal);
    const total = items.length > 0 ? subtotalNative + shipping : 0;
    return {
      items,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add: (item, qty = 1) => setItems((prev) => {
        const found = prev.find((p) => p.id === item.id);
        if (found) return prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + qty } : p);
        return [...prev, { ...item, qty }];
      }),
      remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
      setQty: (id, qty) => setItems(
        (prev) => qty <= 0 ? prev.filter((p) => p.id !== id) : prev.map((p) => p.id === id ? { ...p, qty } : p)
      ),
      clear: () => setItems([]),
      count,
      subtotal,
      shipping,
      total,
      shippingOptions,
      shippingId,
      setShippingId,
      selectedShipping
    };
  }, [items, isOpen, currency, shippingId, shippingOptions, convertUsd]);
  return /* @__PURE__ */ jsx(Ctx.Provider, { value, children });
}
function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Sheet = SheetPrimitive.Root;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(SheetPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
function ShippingOptions({ className, compact = false }) {
  const { shippingOptions, shippingId, setShippingId, items } = useCart();
  const { formatMoney } = useCurrency();
  if (items.length === 0 && compact) return null;
  if (shippingOptions.length === 0) return null;
  const single = shippingOptions.length === 1;
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-2", className), children: [
    /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Shipping" }),
    /* @__PURE__ */ jsx("div", { className: cn("flex flex-col gap-2", single && "gap-0"), role: "radiogroup", "aria-label": "Shipping method", children: shippingOptions.map((option) => {
      const selected = shippingId === option.id;
      const label = formatShippingOptionLabel(option, formatMoney);
      if (single) {
        return /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground tabular-nums", children: label }, option.id);
      }
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": selected,
          onClick: () => setShippingId(option.id),
          className: cn(
            "flex w-full items-center justify-between gap-3 border px-3 py-2.5 text-left text-xs transition-colors",
            selected ? "border-foreground bg-foreground/5" : "border-border hover:border-foreground/40"
          ),
          children: [
            /* @__PURE__ */ jsxs("span", { className: "leading-snug", children: [
              /* @__PURE__ */ jsx("span", { className: "block font-medium uppercase tracking-[0.12em]", children: option.label }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: option.eta })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "shrink-0 tabular-nums", children: formatMoney(option.amount) })
          ]
        },
        option.id
      );
    }) })
  ] });
}
function CartDrawer() {
  const { isOpen, close, items, setQty, remove, subtotal, shipping, total, clear } = useCart();
  const { formatPrice, formatMoney } = useCurrency();
  const navigate = useNavigate();
  const checkout = () => {
    close();
    clear();
    navigate({ to: "/checkout/success" });
  };
  return /* @__PURE__ */ jsx(Sheet, { open: isOpen, onOpenChange: (o) => o ? null : close(), children: /* @__PURE__ */ jsxs(SheetContent, { side: "right", className: "flex w-full flex-col bg-background sm:max-w-md", children: [
    /* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsxs(SheetTitle, { className: "font-display text-xs uppercase tracking-[0.3em]", children: [
      "Your Bag (",
      items.length,
      ")"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "-mx-6 mt-6 flex-1 overflow-y-auto px-6", children: items.length === 0 ? /* @__PURE__ */ jsx("p", { className: "mt-20 text-center text-sm text-muted-foreground", children: "Your bag is empty." }) : /* @__PURE__ */ jsx("ul", { className: "space-y-6", children: items.map((i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4 border-b border-border pb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "h-24 w-20 shrink-0 overflow-hidden rounded-md bg-muted", children: /* @__PURE__ */ jsx("img", { src: i.image, alt: i.name, className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-serif text-lg leading-tight", children: i.name }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: i.variant })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => remove(i.id),
              className: "text-muted-foreground hover:text-foreground",
              "aria-label": "Remove",
              children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border border-border", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setQty(i.id, i.qty - 1), className: "px-2 py-1 hover:bg-sakura-soft", "aria-label": "Decrease", children: /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsx("span", { className: "w-6 text-center text-sm tabular-nums", children: i.qty }),
            /* @__PURE__ */ jsx("button", { onClick: () => setQty(i.id, i.qty + 1), className: "px-2 py-1 hover:bg-sakura-soft", "aria-label": "Increase", children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" }) })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm tabular-nums", children: formatPrice(i.price * i.qty) })
        ] })
      ] })
    ] }, i.id)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-6", children: [
      items.length > 0 && /* @__PURE__ */ jsx(ShippingOptions, { className: "mb-4" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "uppercase tracking-[0.25em] text-muted-foreground", children: "Subtotal" }),
          /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: formatPrice(subtotal) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "uppercase tracking-[0.25em] text-muted-foreground", children: "Shipping" }),
          /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: items.length > 0 ? formatMoney(shipping) : "—" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-border pt-2", children: [
          /* @__PURE__ */ jsx("span", { className: "uppercase tracking-[0.25em] text-foreground", children: "Total" }),
          /* @__PURE__ */ jsx("span", { className: "font-serif text-2xl tabular-nums", children: items.length > 0 ? formatMoney(total) : "—" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          disabled: items.length === 0,
          onClick: checkout,
          className: "mt-6 inline-flex w-full items-center justify-center gap-3 bg-foreground px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-background transition-all hover:bg-sakura hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
          children: [
            "Checkout",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: close,
          className: "mt-3 w-full text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground",
          children: "Continue Shopping"
        }
      )
    ] })
  ] }) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$2 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Raw Ebikes" },
      { name: "description", content: "RAW ebikes is a modern, black and white ebike storefront with a Sleek Sakura theme." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Raw Ebikes" },
      { property: "og:description", content: "RAW ebikes is a modern, black and white ebike storefront with a Sleek Sakura theme." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Raw Ebikes" },
      { name: "twitter:description", content: "RAW ebikes is a modern, black and white ebike storefront with a Sleek Sakura theme." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/755e8ef1-c0ba-4ef5-bb3d-ac5a30364186/id-preview-b435bad7--f7164980-f74a-4c11-98aa-ad24e4b8b17e.lovable.app-1780035742814.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/755e8ef1-c0ba-4ef5-bb3d-ac5a30364186/id-preview-b435bad7--f7164980-f74a-4c11-98aa-ad24e4b8b17e.lovable.app-1780035742814.png" }
    ],
    links: [
      { rel: "icon", type: "image/png", href: favicon },
      { rel: "apple-touch-icon", href: favicon },
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$2.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(CurrencyProvider, { children: /* @__PURE__ */ jsxs(CartProvider, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(CartDrawer, {})
  ] }) }) });
}
const $$splitComponentImporter$1 = () => import("./index-DSW-Mngj.js");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "RAW EBIKES — Sleek Sakura"
    }, {
      name: "description",
      content: "RAW EBIKES — premium electric bikes engineered with a sleek sakura streetwear aesthetic."
    }, {
      property: "og:title",
      content: "RAW EBIKES — Sleek Sakura"
    }, {
      property: "og:description",
      content: "Premium electric bikes. Black, white, and creamy pink."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./checkout.success-JNx8Tbue.js");
const Route = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [{
      title: "Order Confirmed — RAW EBIKES"
    }, {
      name: "description",
      content: "Your RAW EBIKES order has been placed."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const CheckoutSuccessRoute = Route.update({
  id: "/checkout/success",
  path: "/checkout/success",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  CheckoutSuccessRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  CURRENCY_OPTIONS as C,
  useCurrency as a,
  cn as c,
  formatShippingOptionLabel as f,
  router as r,
  useCart as u
};
