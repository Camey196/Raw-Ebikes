import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Petals } from "@/components/petals";
import { Instagram, Twitter, Youtube, Mail, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
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

const VARIANTS: (ProductVariant & { limitedStock?: boolean; accentClass?: string })[] = [
  {
    id: "raw-noir",
    name: "Baja Light + Battery pack + horn",
    variant: "Noir Edition",
    price: 59.99,
    image: product1,
    description:
      "Its a Baja Light with a horn kit which has a 8 slot AA battery pack. Next day delivery for UK users.",
    features: [
      "Bright Baja Light",
      "Comes with handle bar buttons",
      "Battery pack with 8 AA built for long rides",
      "Loud Horn",
    ],
    limitedStock: true,
  },
  {
    id: "raw-bloom",
    name: "Baja Light + battery pack",
    variant: "Bloom Edition",
    price: 49.99,
    image: product2,
    description:
      "Baja light with an 8-slot AA battery pack. Same quality light, simpler kit.",
    features: [
      "Bright Baja Light",
      "Battery pack with 8 AA built for long rides",
      "Easy install",
      "UK shipping",
    ],
    accentClass: "yellow",
  },
];

const TESTIMONIALS = [
  { quote: "Effortless quality. The Noir feels considered, nothing wasted.", name: "Eliot R.", role: "Designer, Berlin" },
  { quote: "The Bloom turned my commute into the best part of the day.", name: "Mira S.", role: "Architect, Tokyo" },
  { quote: "Sharp, restrained, built to last. The Petal is my favorite bike, period.", name: "Jonas K.", role: "Photographer, NYC" },
];

const FAQ = [
  {
    q: "Where do you ship?",
    a: "We ship worldwide from our studio in Antwerp. Shipping rates and delivery times depend on your region — see options in your bag at checkout.",
  },
  { q: "What is your return policy?", a: "Free 30-day returns on unridden bikes. We collect from your door." },
  { q: "How are the editions different?", a: "Same frame, same drivetrain. The Noir and Bloom editions differ only in finish and hardware colorway." },
  { q: "Do you restock sold-out editions?", a: "Noir is restocked monthly. Bloom is a limited run and may sell out for the season." },
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
      <Testimonials />
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
  const { formatPrice } = useCurrency();

  return (
    <section id="shop" className="relative bg-background px-6 py-28 md:py-40 md:px-10 overflow-hidden">
      <Petals density={15} onBackground className="opacity-50" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="reveal text-[10px] uppercase tracking-[0.3em] text-sakura">01 — The Product</p>
            <h2 className="reveal reveal-delay-1 mt-4 font-display text-5xl font-black uppercase tracking-tight md:text-6xl">
              Baja Light
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            the best light at the price
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {VARIANTS.map((p, i) => {
            const isYellow = p.accentClass === "yellow";
            return (
              <article
                key={p.id}
                className={`reveal relative grid grid-cols-12 items-center gap-y-6 ${
                  i % 2 === 1 ? "md:[&>.img]:col-start-6" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(p)}
                  className="img relative col-span-12 cursor-pointer text-left md:col-span-7 md:row-start-1"
                  aria-label={`View ${p.variant}`}
                >
                  <div className="hover-sakura-glow relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={p.image}
                      alt={`${p.name} ${p.variant}`}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                    {p.limitedStock && (
                      <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        Limited Stock
                      </div>
                    )}
                  </div>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
                    <h3
                      className={`font-display text-5xl font-black uppercase leading-none tracking-tight mix-blend-difference sm:text-7xl md:text-8xl lg:text-[7rem] text-center ${
                        isYellow ? "text-yellow-400" : "text-background"
                      }`}
                    >
                      {p.variant}
                    </h3>
                  </div>
                </button>
                <div
                  className={`col-span-12 flex flex-col gap-3 md:col-span-4 md:row-start-1 ${
                    i % 2 === 1 ? "md:col-start-2" : "md:col-start-9"
                  }`}
                >
                  <p
                    className={`text-[10px] uppercase tracking-[0.3em] ${
                      isYellow ? "text-yellow-500" : "text-sakura"
                    }`}
                  >
                    0{i + 1} / 02
                  </p>
                  <p className="font-serif text-2xl">{p.variant}</p>
                  <p
                    className={`font-mono text-4xl font-bold tabular-nums tracking-tight ${
                      isYellow ? "text-yellow-500" : "text-foreground"
                    }`}
                  >
                    {formatPrice(p.price)}
                  </p>
                  <button
                    onClick={() => onSelect(p)}
                    className={`group mt-4 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.25em] underline decoration-2 underline-offset-8 ${
                      isYellow
                        ? "decoration-yellow-500 hover:text-yellow-500"
                        : "decoration-sakura hover:text-sakura"
                    }`}
                  >
                    View Product
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            );
          })}
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
        <p className="reveal reveal-delay-2 mx-auto mt-8 max-w-2xl text-base leading-relaxed opacity-70 md:text-lg">
          RAW EBIKES is an independent studio making electric bikes for the city
          and the open road. Every frame is welded in small batches, every
          component chosen to outlive the season. Hard edges. Soft landings.
        </p>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="border-y border-border bg-background px-6 py-28 md:py-40 md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="reveal text-[10px] uppercase tracking-[0.3em] text-sakura">04 — Ridden By</p>
        <h2 className="reveal reveal-delay-1 mt-4 font-display text-5xl font-black uppercase tracking-tight md:text-6xl">Notes from the street.</h2>
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name} className={`reveal reveal-delay-${i + 1} flex flex-col gap-8 border-t border-foreground pt-8`}>
              <blockquote className="font-serif text-2xl leading-snug md:text-3xl">
                "{t.quote}"
              </blockquote>
              <figcaption className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t.name} — <span className="normal-case tracking-normal">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-background px-6 py-28 md:py-40 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-12">
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
                <div
                  className="grid overflow-hidden transition-all duration-500"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
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
              Premium electric bikes for the modern city. Built raw, finished
              soft. Shipped worldwide.
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
          <div className="md:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-sakura">Contact</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>studio@rawebikes.co</li>
              <li>+32 3 555 0142</li>
              <li>Kloosterstraat 14, Antwerp</li>
            </ul>
            <div className="mt-8 flex gap-5">
              <a href="#" aria-label="Instagram" className="hover:text-sakura"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-sakura"><Twitter className="h-5 w-5" /></a>
              <a href="#" aria-label="YouTube" className="hover:text-sakura"><Youtube className="h-5 w-5" /></a>
              <a href="mailto:studio@rawebikes.co" aria-label="Email" className="hover:text-sakura"><Mail className="h-5 w-5" /></a>
            </div>
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
