import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCart } from "@/context/cart";
import { useCurrency } from "@/context/currency";
import { formatShippingOptionLabel } from "@/lib/shipping";
import { ArrowRight, Check, Sparkles, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Petals } from "@/components/petals";

export type ProductVariant = {
  id: string;
  name: string;
  variant: string;
  price: number;
  image: string;
  description: string;
  features: string[];
  stripeLinks?: {
    uk: string;
    us: string;
    au: string;
  };
};

type Region = {
  id: "uk" | "us" | "au";
  flag: string;
  country: string;
  shipping: string;
  delivery: string;
};

const REGIONS: Region[] = [
  {
    id: "uk",
    flag: "🇬🇧",
    country: "United Kingdom",
    shipping: "£4.99",
    delivery: "2-3 business days",
  },
  {
    id: "us",
    flag: "🇺🇸",
    country: "United States",
    shipping: "$14.99",
    delivery: "7-10 business days",
  },
  {
    id: "au",
    flag: "🇦🇺",
    country: "Australia",
    shipping: "$19.99 AUD",
    delivery: "10-14 business days",
  },
];

export function ProductModal({
  product,
  open,
  onClose,
}: {
  product: ProductVariant | null;
  open: boolean;
  onClose: () => void;
}) {
  const { add, open: openCart, shippingOptions } = useCart();
  const { formatPrice, formatMoney } = useCurrency();
  const [added, setAdded] = useState(false);
  const [showRegionPicker, setShowRegionPicker] = useState(false);

  if (!product) return null;

  const handleBuyClick = () => {
    if (product.stripeLinks) {
      // Show country picker if Stripe links exist
      setShowRegionPicker(true);
    } else {
      // Fallback to cart
      add({
        id: product.id,
        name: product.name,
        variant: product.variant,
        price: product.price,
        image: product.image,
      });
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        onClose();
        openCart();
      }, 700);
    }
  };

  const handleRegionSelect = (region: Region) => {
    if (product.stripeLinks) {
      window.location.href = product.stripeLinks[region.id];
    }
  };

  const handleClose = () => {
    setShowRegionPicker(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? null : handleClose())}>
      <DialogContent className="max-w-5xl gap-0 overflow-hidden bg-background p-0 sm:rounded-3xl border-0 shadow-2xl">
        {showRegionPicker ? (
          <RegionPicker
            product={product}
            onSelect={handleRegionSelect}
            onBack={() => setShowRegionPicker(false)}
            formatPrice={formatPrice}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 relative">
            <div className="relative aspect-square md:aspect-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-sakura/20" />
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-foreground via-purple-900/10 to-foreground">
              <Petals density={8} className="opacity-30 absolute inset-0 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-sakura" />
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-sakura">{product.variant}</p>
                </div>
                <DialogTitle className="font-display text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl drop-shadow-lg">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="mt-4 text-base leading-relaxed text-muted-foreground font-medium">
                  {product.description}
                </DialogDescription>

                <ul className="mt-8 space-y-4 border-t border-border/50 pt-8">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-4">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sakura/20 ring-2 ring-sakura/40">
                        <Check className="h-3 w-3 text-sakura" />
                      </div>
                      <span className="text-base font-medium">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <span className="font-mono text-5xl font-bold tabular-nums tracking-tight text-sakura drop-shadow-[0_0_30px_rgba(244,160,190,0.6)]">
                        {formatPrice(product.price)}
                      </span>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">one-time payment</p>
                    </div>
                    <ul className="space-y-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {shippingOptions.map((option) => (
                        <li key={option.id} className="flex items-center gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-sakura" />
                          + {formatShippingOptionLabel(option, formatMoney)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={handleBuyClick}
                    className="mt-8 group/btn relative inline-flex w-full items-center justify-center gap-3 overflow-hidden border-2 border-sakura bg-sakura px-8 py-5 text-xs font-bold uppercase tracking-[0.25em] text-foreground transition-all duration-300 hover:bg-background hover:text-foreground hover:shadow-[0_0_40px_rgba(244,160,190,0.7)] hover:scale-[1.02]"
                  >
                    <span className="relative z-10">
                      {added ? "Added to Bag" : product.stripeLinks ? "Buy Now" : "Add to Cart"}
                    </span>
                    {!added && <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function RegionPicker({
  product,
  onSelect,
  onBack,
  formatPrice,
}: {
  product: ProductVariant;
  onSelect: (region: Region) => void;
  onBack: () => void;
  formatPrice: (n: number) => string;
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-foreground via-purple-900/10 to-foreground p-8 md:p-12">
      <Petals density={15} className="opacity-30 absolute inset-0 pointer-events-none" />

      <div className="relative z-10">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-sakura"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-sakura" />
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-sakura">Step 2 / 2</p>
        </div>

        <DialogTitle className="font-display text-3xl font-black uppercase leading-tight tracking-tight md:text-4xl drop-shadow-lg">
          Select Your Country
        </DialogTitle>
        <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Shipping price and delivery times vary by region. Pick yours to continue to secure checkout.
        </DialogDescription>

        <div className="mt-8 grid gap-3">
          {REGIONS.map((region) => (
            <button
              key={region.id}
              onClick={() => onSelect(region)}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border/50 bg-background/40 p-5 text-left backdrop-blur transition-all hover:border-sakura hover:bg-sakura/5 hover:shadow-[0_0_40px_rgba(244,160,190,0.3)]"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{region.flag}</span>
                <div>
                  <p className="font-display text-lg font-bold uppercase tracking-tight">
                    {region.country}
                  </p>
                  <p className="text-xs text-muted-foreground">{region.delivery}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-xl font-bold tabular-nums tracking-tight text-sakura">
                  {region.shipping}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">shipping</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 border-t border-border/50 pt-6">
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Product price</span>
            <span className="font-mono text-2xl font-bold tabular-nums tracking-tight text-sakura">
              {formatPrice(product.price)}
            </span>
          </div>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Total shown at checkout • Secure payment via Stripe 🔒
          </p>
        </div>
      </div>
    </div>
  );
}