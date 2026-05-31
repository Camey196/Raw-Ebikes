import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Petals } from "@/components/petals";
import { Instagram, Twitter, Youtube, Mail, Plus, Minus, ArrowRight, ShoppingBag, Star, Check } from "lucide-react";
import { useState } from "react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import sakuraTree from "@/assets/sakura-tree.png";
import { useCart } from "@/context/cart";
import { ProductModal, type ProductVariant } from "@/components/product-modal";
import { CurrencySelector } from "@/components/currency-selector";
import { DeliveryBanner, usePastHero } from "@/components/delivery-banner";
import { useCurrency } from "@/context/currency";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RAW EBIKES — Baja Light" },
      { name: "description", content: "RAW EBIKES — premium baja lights for ebikes." },
      { property: "og:title", content: "RAW EBIKES — Baja Light" },
      { property: "og:description", content: "The best light at the price." },
    ],
  }),
  component: Index,
});

const STORE = "RAW EBIKES";
const HERO_YOUTUBE_ID = "rP6nZ2NdTBQ";
const HERO_VIDEO_SRC = `https://www.youtube.com/embed/${HERO_YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_YOUTUBE_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1`;

type VariantWithExtras = ProductVariant & {
  limitedStock?: boolean;
  highlight?: boolean;
  pricesByRegion: { gbp: number; usd: number; aud: number };
  stripeLinks?: { uk: string; us: string; au: string };
};

const VARIANTS: VariantWithExtras[] = [
  {
    id: "raw-noir",
    name: "Baja Light + Battery pack + horn",
    variant: "Baja Light + Battery pack + horn",
    price: 49.99,
    pricesByRegion: { gbp: 49.99, usd: 59.99, aud: 89.99 },
    image: product1,
    description:
      "Baja Light with a horn kit and 8-slot AA battery pack. Next day delivery for UK users.",
    features: [
      "Bright Baja Light",
      "Handle bar buttons included",
      "8 AA battery pack — long rides",
      "Loud Horn",
    ],
    limitedStock: true,
    highlight: true,
    stripeLinks: {
      uk: "https://buy.stripe.com/5kQeV68Mt0DX3ihag83VC07",
      us: "https://buy.stripe.com/6oUbIUgeV1I14ml8803VC09",
      au: "https://buy.stripe.com/00w9AM8Mt0DXdWVcog3VC08",
    },
  },
  {
    id: "raw-bloom",
    name: "Baja Light + battery pack",
    variant: "Baja Light + battery pack",
    price: 39.99,
    pricesByRegion: { gbp: 39.99, usd: 49.99, aud: 79.99 },
    image: product2,
    description:
      "Baja light with an 8-slot AA battery pack. Same quality light, simpler kit.",
    features: [
      "Bright Baja Light",
      "8 AA battery pack — long rides",
      "Easy install",
      "UK shipping",
    ],
    stripeLinks: {
      uk: "https://buy.stripe.com/aFa4gsbYF9at7yx5ZS3VC0a",
      us: "https://buy.stripe.com/dRmaEQ3s95YhbON0Fy3VC0c",
      au: "https://buy.stripe.com/cNibIU0fX86pg53dsk3VC0b",
    },
  },
];

const REVIEWS = [
  { name: "Jake", stars: 5, text: "came rlly quick ngl" },
  { name: "Mia", stars: 5, text: "cheap asf for what u get 🔥" },
  { name: "Tom", stars: 4, text: "support actually replied fast which was nice" },
  { name: "Lily", stars: 5, text: "easiest checkout ever lol" },
  { name: "Ben", stars: 4, text: "box was a bit beat up but stuff inside fine" },
  { name: "Ruby", stars: 5, text: "lowkey better than i thought" },
  { name: "Alfie", stars: 4, text: "shipping was sound" },
];

const FAQ = [
  {
    q: "Where do you ship?",
    a: "We ship to USA, AUS, and England. Shipping rates and delivery times depend on your region — see options at checkout.",
  },
  { q: "How are the editions different?", a: "Same Baja Light core. The premium version adds a loud horn + handlebar buttons." },
  { q: "Do you restock sold-out editions?", a: "We restock monthly when possible. Some runs are limited." },
];

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Index() {
  useReveal();
  const [modalProduct, setModalProduct] = useState<ProductVariant | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <ProductsStack onSelect={setModalProduct} />
      <BrandStory />
      <Reviews />
      <Faq />
      <Footer />
      <ProductModal product={modalProduct} open={!!modalProduct} onClose={() => setModalProduct(null)} />
    </div>
  );
}

function SiteHeader() {
  const pastHero = usePastHero();
  return (
    <>
      <DeliveryBanner hidden={pastHero} />
      <Nav pastHero={pastHero} />
    </>
  );
}

function Nav({ pastHero }: { pastHero: boolean }) {
  const { open, count } = useCart();
  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 mix-blend-difference transition-[top] duration-300 ease-out",
        pastHero ? "top-0" : "top-10",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-white md:px-10">
        <a href="#top" className="text-xs font-bold uppercase tracking-[0.25em]">{STORE}</a>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.18em] md:flex">
          <button onClick={() => smoothScrollTo("shop")} className="hover:opacity-70">Shop</button>
          <button onClick={() => smoothScrollTo("story")} className="hover:opacity-70">Story</button>
          <button onClick={() => smoothScrollTo("faq")} className="hover:opacity-70">FAQ</button>
        </nav>
        <button onClick={open} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] hover:opacity-70">
          <ShoppingBag className="h-3.5 w-3.5" />
          Bag ({count})
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden bg-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
        <iframe
          title="Hero background video"
          className="absolute top-1/2 left-1/2 hidden h-[56.25vw] w-full min-h-full min-w-[177.78vh] max-w-none -translate-x-1/2 -translate-y-1/2 border-0 md:block"
          src={HERO_VIDEO_SRC}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <iframe
          title="Hero background video"
          className="absolute top-1/2 left-1/2 h-full w-[177.78vh] max-w-none -translate-x-1/2 -translate-y-1/2 border-0 md:hidden"
          src={HERO_VIDEO_SRC}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/80" />
      <img
        src={sakuraTree}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-20 z-[1] h-[70vh] w-auto max-w-[70vw] opacity-90 animate-sway drop-shadow-[0_10px_40px_rgba(244,160,190,0.35)] md:-right-10 md:h-[90vh]"
      />
      <img
        src={sakuraTree}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-24 z-[1] h-[45vh] w-auto rotate-180 opacity-60 md:h-[55vh]"
      />
      <Petals density={45} className="z-[2]" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-background">
        <p className="reveal mb-6 text-[10px] uppercase tracking-[0.4em] text-sakura">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-sakura align-middle mr-2" />
          Spring Drop — 2026
        </p>
        <h1 className="reveal reveal-delay-1 font-display text-6xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[10rem]">
          {STORE}
        </h1>
        <p className="reveal reveal-delay-2 mt-6 max-w-md text-sm leading-relaxed opacity-80 md:text-base">
          Designed with raw materials, for a refined product
        </p>
        <div className="reveal reveal-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={() => smoothScrollTo("shop")}
            className="group inline-flex items-center justify-center gap-3 bg-sakura px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition-all hover:bg-background hover:shadow-[0_0_50px_var(--sakura-deep)]"
            style={{ borderRadius: "2px" }}
          >
            View All Products
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => smoothScrollTo("story")}
            className="inline-flex items-center justify-center border border-background/40 bg-transparent px-8 py-4 text-xs uppercase tracking-[0.25em] text-background backdrop-blur transition-all hover:border-sakura hover:text-sakura"
            style={{ borderRadius: "2px" }}
          >
            Our Story
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-background/70">
        @5kw_hitta
      </div>
    </section>
  );
}

function ProductsStack({ onSelect }: { onSelect: (p: ProductVariant) => void }) {
  const { formatRegionalPrice } = useCurrency();

  return (
    <section id="shop" className="relative bg-background px-6 py-28 md:py-40 md:px-10 overflow-hidden">
      <Petals density={15} onBackground className="opacity-50" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="reveal text-[10px] uppercase tracking-[0.3em] text-sakura">01 — The Product</p>
            <h2 className="reveal reveal-delay-1 mt-4 font-display text-5xl font-black uppercase tracking-tight md:text-7xl">
              Baja Light
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            the best light at the price — pick your build
          </p>
        </div>

        <div className="reveal grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {VARIANTS.map((p, i) => {
            const isHighlight = p.highlight;

            return (
              <div
                key={p.id}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]",
                  isHighlight
                    ? "bg-gradient-to-br from-foreground via-purple-900/20 to-foreground border-sakura shadow-[0_0_80px_rgba(244,160,190,0.5)] hover:shadow-[0_0_120px_rgba(244,160,190,0.8)]"
                    : "bg-gradient-to-br from-foreground via-pink-900/20 to-foreground border-sakura/40 hover:border-sakura hover:shadow-[0_0_80px_rgba(244,160,190,0.35)]",
                )}
              >
                {isHighlight && (
                  <div className="absolute right-4 top-4 z-20">
                    <div className="flex items-center gap-1.5 bg-sakura px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-foreground shadow-md">
                      <Star className="h-3 w-3 fill-foreground" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={cn(
                  "pointer-events-none absolute -left-4 top-4 z-0 font-display text-[10rem] font-black leading-none md:text-[12rem] bg-clip-text",
                  isHighlight
                    ? "bg-gradient-to-br from-sakura/30 via-purple-400/20 to-transparent"
                    : "bg-gradient-to-br from-sakura/30 via-pink-400/20 to-transparent"
                )}>
                  0{i + 1}
                </div>

                <button
                  type="button"
                  onClick={() => onSelect(p)}
                  className="relative aspect-square overflow-hidden bg-foreground"
                  aria-label={`View ${p.name}`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition-all duration-[1200ms] group-hover:scale-110 group-hover:opacity-100 group-hover:brightness-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                  {p.limitedStock && (
                    <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      Only 1 Left
                    </div>
                  )}

                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-sakura">0{i + 1} / 02</p>
                    <h3 className="mt-2 font-display text-2xl font-black uppercase leading-tight tracking-tight text-background md:text-3xl drop-shadow-lg">
                      {p.name}
                    </h3>
                  </div>
                </button>

                <div className="relative z-10 flex flex-1 flex-col gap-6 p-6 md:p-8">
                  <div className="flex items-baseline justify-between border-b border-background/10 pb-5">
                    <span className="font-mono text-5xl font-bold tabular-nums tracking-tight text-sakura drop-shadow-[0_0_20px_rgba(244,160,190,0.5)]">
                      {formatRegionalPrice(p.pricesByRegion)}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-background/60">
                      one-time
                    </span>
                  </div>

                  <ul className="space-y-3 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sakura/20 ring-2 ring-sakura/30">
                          <Check className="h-3 w-3 text-sakura" />
                        </div>
                        <span className="text-background/90 font-medium">{f}</span>
                      </li>
                    ))}
                    {!isHighlight && (
                      <li className="flex items-start gap-3 opacity-40">
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-background/10">
                          <span className="text-[10px]">—</span>
                        </div>
                        <span className="line-through text-background/60">No horn included</span>
                      </li>
                    )}
                  </ul>

                  <button
                    onClick={() => onSelect(p)}
                    className={cn(
                      "group/btn relative mt-auto inline-flex items-center justify-center gap-3 overflow-hidden border-2 px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300",
                      "border-sakura bg-sakura text-foreground hover:bg-background hover:text-foreground hover:shadow-[0_0_30px_rgba(244,160,190,0.6)] hover:scale-105",
                    )}
                  >
                    <span className="relative z-10">Buy Now</span>
                    <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reveal mt-20 grid grid-cols-2 gap-6 border-t border-border pt-12 text-center md:grid-cols-3">
          {[
            { icon: "🔒", title: "Secure Checkout", sub: "Powered by Stripe" },
            { icon: "📦", title: "Fast Shipping", sub: "UK Next Day Available" },
            { icon: "🇬🇧", title: "UK Based", sub: "Real support" },
          ].map((t) => (
            <div key={t.title} className="flex flex-col items-center gap-2">
              <div className="text-3xl">{t.icon}</div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em]">{t.title}</p>
              <p className="text-[10px] text-muted-foreground">{t.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section id="story" className="relative bg-foreground px-6 py-28 text-background md:py-40 md:px-10 overflow-hidden">
      <Petals density={20} className="opacity-40" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="reveal text-[10px] uppercase tracking-[0.3em] text-sakura">02 — The Studio</p>
        <h2 className="reveal reveal-delay-1 mt-6 font-display text-4xl font-black uppercase leading-tight tracking-tight md:text-6xl">
          Built raw. Ride <span className="text-sakura">soft</span>.
        </h2>
      </div>
    </section>
  );
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn(
            "h-4 w-4",
            n <= count ? "fill-yellow-400 text-yellow-400" : "fill-none text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}

function Reviews() {
  const loop = [...REVIEWS, ...REVIEWS, ...REVIEWS];
  return (
    <section className="border-y border-border bg-background px-6 py-28 md:py-40 md:px-10 overflow-hidden relative">
      <Petals density={20} className="opacity-40" />
      <div className="mx-auto max-w-7xl relative z-10">
        <p className="reveal text-[10px] uppercase tracking-[0.3em] text-sakura">Reviews</p>
        <h2 className="reveal reveal-delay-1 mt-4 font-display text-5xl font-black uppercase tracking-tight md:text-6xl">
          Reviews
        </h2>
        <div className="mt-16 relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee gap-8">
            {loop.map((r, i) => (
              <div
                key={i}
                className="flex h-40 w-80 shrink-0 flex-col justify-between rounded-xl border border-border bg-background/50 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-muted-foreground/60">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-serif text-sm font-medium">{r.name}</p>
                    <StarRow count={r.stars} />
                  </div>
                </div>
                <p className="text-sm leading-snug text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-background px-6 py-28 md:py-40 md:px-10 relative overflow-hidden">
      <Petals density={15} className="opacity-35" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-12 relative z-10">
        <div className="md:col-span-4">
          <p className="reveal text-[10px] uppercase tracking-[0.3em] text-sakura">05 — FAQ</p>
          <h2 className="reveal reveal-delay-1 mt-4 font-display text-5xl font-black uppercase leading-tight tracking-tight md:text-6xl">Questions, answered.</h2>
        </div>
        <div className="md:col-span-8">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="reveal border-b border-border">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-sakura"
                >
                  <span className="font-serif text-xl md:text-2xl">{item.q}</span>
                  {isOpen ? <Minus className="h-4 w-4 shrink-0 text-sakura" /> : <Plus className="h-4 w-4 shrink-0" />}
                </button>
                <div className="grid overflow-hidden transition-all duration-500" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="min-h-0">
                    <p className="pb-6 pr-10 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-foreground px-6 py-20 text-background md:px-10 overflow-hidden">
      <Petals density={18} className="opacity-30" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h3 className="font-display text-5xl font-black uppercase tracking-tight md:text-7xl">{STORE}</h3>
            <p className="mt-6 max-w-sm text-sm leading-relaxed opacity-70">
              Premium electric bike lights. Built raw, finished soft. Shipped worldwide.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-sakura">Shop</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li><a href="#shop" className="hover:text-sakura">All Editions</a></li>
              <li><a href="#" className="hover:text-sakura">New Arrivals</a></li>
              <li><a href="#" className="hover:text-sakura">Archive</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-background/20 pt-8">
          <CurrencySelector />
        </div>
        <div className="mt-8 flex flex-col gap-4 text-xs uppercase tracking-[0.2em] opacity-50 md:flex-row md:justify-between">
          <p>© 2026 {STORE} Studio</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-80">Privacy</a>
            <a href="#" className="hover:opacity-80">Terms</a>
            <a href="#" className="hover:opacity-80">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}