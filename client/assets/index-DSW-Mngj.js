import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useEffect, useState } from "react";
import { P as Petals } from "./petals-Bq3oDkeo.js";
import { X, Check, ArrowRight, Minus, Plus, Instagram, Twitter, Youtube, Mail, ShoppingBag } from "lucide-react";
import { c as cn, u as useCart, a as useCurrency, f as formatShippingOptionLabel, C as CURRENCY_OPTIONS } from "./router-DogVJQv4.js";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
const product1 = "/assets/product-1-C6fF432u.jpg";
const product2 = "/assets/product-2-CPH61LKT.jpg";
const product3 = "/assets/product-3-DTcAtQts.jpg";
const sakuraTree = "/assets/sakura-tree-8Lof3Pea.png";
const Dialog = SheetPrimitive.Root;
const DialogPortal = SheetPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = SheetPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = SheetPrimitive.Content.displayName;
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = SheetPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = SheetPrimitive.Description.displayName;
function ProductModal({
  product,
  open,
  onClose
}) {
  const { add, open: openCart, shippingOptions } = useCart();
  const { formatPrice, formatMoney } = useCurrency();
  const [added, setAdded] = useState(false);
  if (!product) return null;
  const handleAdd = () => {
    add({
      id: product.id,
      name: product.name,
      variant: product.variant,
      price: product.price,
      image: product.image
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      openCart();
    }, 700);
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: (o) => o ? null : onClose(), children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-4xl gap-0 overflow-hidden bg-background p-0 sm:rounded-2xl", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2", children: [
    /* @__PURE__ */ jsx("div", { className: "relative aspect-square bg-muted md:aspect-auto", children: /* @__PURE__ */ jsx("img", { src: product.image, alt: product.name, className: "h-full w-full object-cover" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-8 md:p-10", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-sakura", children: product.variant }),
      /* @__PURE__ */ jsx(DialogTitle, { className: "mt-3 font-display text-3xl font-black uppercase tracking-tight md:text-4xl", children: product.name }),
      /* @__PURE__ */ jsx(DialogDescription, { className: "mt-4 text-sm leading-relaxed text-muted-foreground", children: product.description }),
      /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-2 border-t border-border pt-6 text-sm", children: product.features.map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-sakura" }),
        /* @__PURE__ */ jsx("span", { children: f })
      ] }, f)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "font-serif text-3xl tabular-nums", children: formatPrice(product.price) }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: shippingOptions.map((option) => /* @__PURE__ */ jsxs("li", { children: [
            "+ ",
            formatShippingOptionLabel(option, formatMoney)
          ] }, option.id)) })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleAdd,
            className: "mt-6 inline-flex w-full items-center justify-center gap-3 bg-foreground px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-background transition-all hover:bg-sakura hover:text-foreground",
            children: [
              added ? "Added to Bag" : "Add to Cart",
              !added && /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })
            ]
          }
        )
      ] })
    ] })
  ] }) }) });
}
function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-sakura", children: "Currency" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "inline-flex flex-wrap gap-1 rounded-sm border border-background/25 p-1",
        role: "group",
        "aria-label": "Choose currency",
        children: CURRENCY_OPTIONS.map(({ code, label }) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setCurrency(code),
            "aria-pressed": currency === code,
            className: `px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors ${currency === code ? "bg-sakura text-foreground" : "text-background/80 hover:bg-background/10 hover:text-background"}`,
            children: label
          },
          code
        ))
      }
    )
  ] });
}
function usePastHero() {
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return pastHero;
}
function DeliveryBanner({ hidden }) {
  const { currency } = useCurrency();
  const message = currency === "GBP" ? "Next Day Delivery — Order by 12pm" : currency === "USD" ? "Express Delivery — 5–9 Days" : "Priority Delivery — 5–10 Days";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "fixed top-0 left-0 right-0 z-[60] border-b border-foreground/10 bg-sakura text-center transition-all duration-300 ease-out",
        hidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      ),
      role: "status",
      "aria-hidden": hidden,
      children: /* @__PURE__ */ jsx("p", { className: "px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground", children: message })
    }
  );
}
const STORE = "RAW EBIKES";
const HERO_YOUTUBE_ID = "rP6nZ2NdTBQ";
const HERO_VIDEO_SRC = `https://www.youtube.com/embed/${HERO_YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_YOUTUBE_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1`;
const VARIANTS = [{
  id: "raw-noir",
  name: "RAW EBIKE",
  variant: "Noir Edition",
  price: 3420,
  image: product1,
  description: "The original — matte black frame, blacked-out hardware, and a quiet 750W mid-drive motor. Built for the city after dark.",
  features: ["750W mid-drive motor — 28mph top speed", "85km range on a single charge", "Hydraulic disc brakes", "Carbon belt drive — zero maintenance", "Integrated front + rear lights"]
}, {
  id: "raw-bloom",
  name: "RAW EBIKE",
  variant: "Bloom Edition",
  price: 3680,
  image: product2,
  description: "Matte black frame with creamy pink hardware — bell, grips, and saddle accents. The signature Sakura colorway.",
  features: ["Sakura pink anodized hardware kit", "750W mid-drive motor — 28mph top speed", "85km range on a single charge", "Brooks leather saddle in cream", "Limited release — 200 units"]
}, {
  id: "raw-petal",
  name: "RAW EBIKE",
  variant: "Petal Edition",
  price: 3920,
  image: product3,
  description: "Full creamy pink frame, matte black components. The boldest expression of the RAW silhouette.",
  features: ["Hand-finished sakura pink frame", "750W mid-drive motor — 28mph top speed", "100km extended range battery", "Carbon fiber fork", "Made-to-order — 6 week lead time"]
}];
const TESTIMONIALS = [{
  quote: "Effortless quality. The Noir feels considered, nothing wasted.",
  name: "Eliot R.",
  role: "Designer, Berlin"
}, {
  quote: "The Bloom turned my commute into the best part of the day.",
  name: "Mira S.",
  role: "Architect, Tokyo"
}, {
  quote: "Sharp, restrained, built to last. The Petal is my favorite bike, period.",
  name: "Jonas K.",
  role: "Photographer, NYC"
}];
const FAQ = [{
  q: "Where do you ship?",
  a: "We ship worldwide from our studio in Antwerp. Shipping rates and delivery times depend on your region — see options in your bag at checkout."
}, {
  q: "What is your return policy?",
  a: "Free 30-day returns on unridden bikes. We collect from your door."
}, {
  q: "How are the editions different?",
  a: "Same frame, same drivetrain. The Noir, Bloom and Petal editions differ only in finish and hardware colorway."
}, {
  q: "Do you restock sold-out editions?",
  a: "Noir is restocked monthly. Bloom and Petal are limited runs and may sell out for the season."
}];
function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
function Index() {
  useReveal();
  const [modalProduct, setModalProduct] = useState(null);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(ProductsStack, { onSelect: setModalProduct }),
    /* @__PURE__ */ jsx(BrandStory, {}),
    /* @__PURE__ */ jsx(Testimonials, {}),
    /* @__PURE__ */ jsx(Faq, {}),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(ProductModal, { product: modalProduct, open: !!modalProduct, onClose: () => setModalProduct(null) })
  ] });
}
function SiteHeader() {
  const pastHero = usePastHero();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DeliveryBanner, { hidden: pastHero }),
    /* @__PURE__ */ jsx(Nav, { pastHero })
  ] });
}
function Nav({
  pastHero
}) {
  const {
    open,
    count
  } = useCart();
  return /* @__PURE__ */ jsx("header", { className: cn("fixed left-0 right-0 z-50 mix-blend-difference transition-[top] duration-300 ease-out", pastHero ? "top-0" : "top-10"), children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-white md:px-10", children: [
    /* @__PURE__ */ jsx("a", { href: "#top", className: "text-xs font-bold uppercase tracking-[0.25em]", children: STORE }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden gap-8 text-xs uppercase tracking-[0.18em] md:flex", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => smoothScrollTo("shop"), className: "hover:opacity-70", children: "Shop" }),
      /* @__PURE__ */ jsx("button", { onClick: () => smoothScrollTo("story"), className: "hover:opacity-70", children: "Story" }),
      /* @__PURE__ */ jsx("button", { onClick: () => smoothScrollTo("faq"), className: "hover:opacity-70", children: "FAQ" })
    ] }),
    /* @__PURE__ */ jsxs("button", { onClick: open, className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] hover:opacity-70", children: [
      /* @__PURE__ */ jsx(ShoppingBag, { className: "h-3.5 w-3.5" }),
      "Bag (",
      count,
      ")"
    ] })
  ] }) });
}
function Hero() {
  return /* @__PURE__ */ jsxs("section", { id: "top", className: "relative h-screen min-h-[640px] w-full overflow-hidden bg-foreground", children: [
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden opacity-70", children: [
      /* @__PURE__ */ jsx("iframe", { title: "Hero background video", className: "absolute top-1/2 left-1/2 hidden h-[56.25vw] w-full min-h-full min-w-[177.78vh] max-w-none -translate-x-1/2 -translate-y-1/2 border-0 md:block", src: HERO_VIDEO_SRC, allow: "autoplay; encrypted-media; picture-in-picture", referrerPolicy: "strict-origin-when-cross-origin" }),
      /* @__PURE__ */ jsx("iframe", { title: "Hero background video", className: "absolute top-1/2 left-1/2 h-full w-[177.78vh] max-w-none -translate-x-1/2 -translate-y-1/2 border-0 md:hidden", src: HERO_VIDEO_SRC, allow: "autoplay; encrypted-media; picture-in-picture", referrerPolicy: "strict-origin-when-cross-origin" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/80" }),
    /* @__PURE__ */ jsx("img", { src: sakuraTree, alt: "", "aria-hidden": "true", className: "pointer-events-none absolute -top-10 -right-20 z-[1] h-[70vh] w-auto max-w-[70vw] opacity-90 animate-sway drop-shadow-[0_10px_40px_rgba(244,160,190,0.35)] md:-right-10 md:h-[90vh]" }),
    /* @__PURE__ */ jsx("img", { src: sakuraTree, alt: "", "aria-hidden": "true", className: "pointer-events-none absolute -bottom-16 -left-24 z-[1] h-[45vh] w-auto rotate-180 opacity-60 md:h-[55vh]" }),
    /* @__PURE__ */ jsx(Petals, { density: 45, className: "z-[2]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-background", children: [
      /* @__PURE__ */ jsxs("p", { className: "reveal mb-6 text-[10px] uppercase tracking-[0.4em] text-sakura", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-sakura align-middle mr-2" }),
        "Spring Drop — 2026"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "reveal reveal-delay-1 font-display text-6xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[10rem]", children: STORE }),
      /* @__PURE__ */ jsx("p", { className: "reveal reveal-delay-2 mt-6 max-w-md text-sm leading-relaxed opacity-80 md:text-base", children: "Designed with raw materials, for a refined product" }),
      /* @__PURE__ */ jsxs("div", { className: "reveal reveal-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => smoothScrollTo("shop"), className: "group inline-flex items-center justify-center gap-3 bg-sakura px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition-all hover:bg-background hover:shadow-[0_0_50px_var(--sakura-deep)]", style: {
          borderRadius: "2px"
        }, children: [
          "View All Products",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => smoothScrollTo("story"), className: "inline-flex items-center justify-center border border-background/40 bg-transparent px-8 py-4 text-xs uppercase tracking-[0.25em] text-background backdrop-blur transition-all hover:border-sakura hover:text-sakura", style: {
          borderRadius: "2px"
        }, children: "Our Story" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-background/70", children: "@5kw_hitta" })
  ] });
}
function ProductsStack({
  onSelect
}) {
  const {
    formatPrice
  } = useCurrency();
  return /* @__PURE__ */ jsxs("section", { id: "shop", className: "relative bg-background px-6 py-28 md:py-40 md:px-10 overflow-hidden", children: [
    /* @__PURE__ */ jsx(Petals, { density: 15, onBackground: true, className: "opacity-50" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "reveal text-[10px] uppercase tracking-[0.3em] text-sakura", children: "01 — The Product" }),
          /* @__PURE__ */ jsx("h2", { className: "reveal reveal-delay-1 mt-4 font-display text-5xl font-black uppercase tracking-tight md:text-6xl", children: "Three Editions" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "reveal reveal-delay-2 max-w-sm text-sm leading-relaxed text-muted-foreground", children: "One frame, three finishes. Tap a card to see specs, gallery and add your edition to the bag." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-24 md:space-y-32", children: VARIANTS.map((p, i) => /* @__PURE__ */ jsxs("article", { className: `reveal relative grid grid-cols-12 items-center gap-y-6 ${i % 2 === 1 ? "md:[&>.img]:col-start-6" : ""}`, children: [
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => onSelect(p), className: "img relative col-span-12 cursor-pointer text-left md:col-span-7 md:row-start-1", "aria-label": `View ${p.variant}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "hover-sakura-glow relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted", children: [
            /* @__PURE__ */ jsx("img", { src: p.image, alt: `${p.name} ${p.variant}`, loading: "lazy", width: 1024, height: 1280, className: "h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.05]" }),
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center px-4", children: /* @__PURE__ */ jsx("h3", { className: "font-display text-5xl font-black uppercase leading-none tracking-tight text-background mix-blend-difference sm:text-7xl md:text-8xl lg:text-[7rem] text-center", children: p.variant }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `col-span-12 flex flex-col gap-3 md:col-span-4 md:row-start-1 ${i % 2 === 1 ? "md:col-start-2" : "md:col-start-9"}`, children: [
          /* @__PURE__ */ jsxs("p", { className: "text-[10px] uppercase tracking-[0.3em] text-sakura", children: [
            "0",
            i + 1,
            " / 03"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-serif text-2xl", children: p.variant }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground tabular-nums", children: formatPrice(p.price) }),
          /* @__PURE__ */ jsxs("button", { onClick: () => onSelect(p), className: "group mt-4 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.25em] underline decoration-sakura decoration-2 underline-offset-8 hover:text-sakura", children: [
            "View Product",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-3 w-3 transition-transform group-hover:translate-x-1" })
          ] })
        ] })
      ] }, p.id)) })
    ] })
  ] });
}
function BrandStory() {
  return /* @__PURE__ */ jsxs("section", { id: "story", className: "relative bg-foreground px-6 py-28 text-background md:py-40 md:px-10 overflow-hidden", children: [
    /* @__PURE__ */ jsx(Petals, { density: 20, className: "opacity-40" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-4xl text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "reveal text-[10px] uppercase tracking-[0.3em] text-sakura", children: "02 — The Studio" }),
      /* @__PURE__ */ jsxs("h2", { className: "reveal reveal-delay-1 mt-6 font-display text-4xl font-black uppercase leading-tight tracking-tight md:text-6xl", children: [
        "Built raw. Ride ",
        /* @__PURE__ */ jsx("span", { className: "text-sakura", children: "soft" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "reveal reveal-delay-2 mx-auto mt-8 max-w-2xl text-base leading-relaxed opacity-70 md:text-lg", children: "RAW EBIKES is an independent studio making electric bikes for the city and the open road. Every frame is welded in small batches, every component chosen to outlive the season. Hard edges. Soft landings." })
    ] })
  ] });
}
function Testimonials() {
  return /* @__PURE__ */ jsx("section", { className: "border-y border-border bg-background px-6 py-28 md:py-40 md:px-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsx("p", { className: "reveal text-[10px] uppercase tracking-[0.3em] text-sakura", children: "04 — Ridden By" }),
    /* @__PURE__ */ jsx("h2", { className: "reveal reveal-delay-1 mt-4 font-display text-5xl font-black uppercase tracking-tight md:text-6xl", children: "Notes from the street." }),
    /* @__PURE__ */ jsx("div", { className: "mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxs("figure", { className: `reveal reveal-delay-${i + 1} flex flex-col gap-8 border-t border-foreground pt-8`, children: [
      /* @__PURE__ */ jsxs("blockquote", { className: "font-serif text-2xl leading-snug md:text-3xl", children: [
        "“",
        t.quote,
        "”"
      ] }),
      /* @__PURE__ */ jsxs("figcaption", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
        t.name,
        " — ",
        /* @__PURE__ */ jsx("span", { className: "normal-case tracking-normal", children: t.role })
      ] })
    ] }, t.name)) })
  ] }) });
}
function Faq() {
  const [open, setOpen] = useState(0);
  return /* @__PURE__ */ jsx("section", { id: "faq", className: "bg-background px-6 py-28 md:py-40 md:px-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-4", children: [
      /* @__PURE__ */ jsx("p", { className: "reveal text-[10px] uppercase tracking-[0.3em] text-sakura", children: "05 — FAQ" }),
      /* @__PURE__ */ jsx("h2", { className: "reveal reveal-delay-1 mt-4 font-display text-5xl font-black uppercase leading-tight tracking-tight md:text-6xl", children: "Questions, answered." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "md:col-span-8", children: FAQ.map((item, i) => {
      const isOpen = open === i;
      return /* @__PURE__ */ jsxs("div", { className: "reveal border-b border-border", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => setOpen(isOpen ? null : i), className: "flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-sakura", children: [
          /* @__PURE__ */ jsx("span", { className: "font-serif text-xl md:text-2xl", children: item.q }),
          isOpen ? /* @__PURE__ */ jsx(Minus, { className: "h-4 w-4 shrink-0 text-sakura" }) : /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 shrink-0" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid overflow-hidden transition-all duration-500", style: {
          gridTemplateRows: isOpen ? "1fr" : "0fr"
        }, children: /* @__PURE__ */ jsx("div", { className: "min-h-0", children: /* @__PURE__ */ jsx("p", { className: "pb-6 pr-10 text-sm leading-relaxed text-muted-foreground", children: item.a }) }) })
      ] }, item.q);
    }) })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "relative bg-foreground px-6 py-20 text-background md:px-10 overflow-hidden", children: [
    /* @__PURE__ */ jsx(Petals, { density: 18, className: "opacity-30" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-12 md:grid-cols-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display text-5xl font-black uppercase tracking-tight md:text-7xl", children: STORE }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-sm text-sm leading-relaxed opacity-70", children: "Premium electric bikes for the modern city. Built raw, finished soft. Shipped worldwide." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-sakura", children: "Shop" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-6 space-y-3 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#shop", className: "hover:text-sakura", children: "All Editions" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-sakura", children: "New Arrivals" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-sakura", children: "Archive" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-sakura", children: "Contact" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-6 space-y-3 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: "studio@rawebikes.co" }),
            /* @__PURE__ */ jsx("li", { children: "+32 3 555 0142" }),
            /* @__PURE__ */ jsx("li", { children: "Kloosterstraat 14, Antwerp" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex gap-5", children: [
            /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Instagram", className: "hover:text-sakura", children: /* @__PURE__ */ jsx(Instagram, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Twitter", className: "hover:text-sakura", children: /* @__PURE__ */ jsx(Twitter, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "YouTube", className: "hover:text-sakura", children: /* @__PURE__ */ jsx(Youtube, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsx("a", { href: "mailto:studio@rawebikes.co", "aria-label": "Email", className: "hover:text-sakura", children: /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 border-t border-background/20 pt-8", children: /* @__PURE__ */ jsx(CurrencySelector, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-4 text-xs uppercase tracking-[0.2em] opacity-50 md:flex-row md:justify-between", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "© 2026 ",
          STORE,
          " Studio"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "hover:opacity-80", children: "Privacy" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "hover:opacity-80", children: "Terms" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "hover:opacity-80", children: "Shipping" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Index as component
};
