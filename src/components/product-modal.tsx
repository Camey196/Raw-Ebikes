import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCart } from "@/context/cart";
import { useCurrency } from "@/context/currency";
import { formatShippingOptionLabel } from "@/lib/shipping";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { Petals } from "@/components/petals";
import { cn } from "@/lib/utils";

export type ProductVariant = {
  id: string;
  name: string;
  variant: string;
  price: number;
  image: string;
  description: string;
  features: string[];
};

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

  if (!product) return null;

  const handleAdd = () => {
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
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? null : onClose())}>
      <DialogContent className="max-w-5xl gap-0 overflow-hidden bg-background p-0 sm:rounded-3xl border-0 shadow-2xl">
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
                  onClick={handleAdd}
                  className="mt-8 group/btn relative inline-flex w-full items-center justify-center gap-3 overflow-hidden border-2 border-sakura bg-sakura px-8 py-5 text-xs font-bold uppercase tracking-[0.25em] text-foreground transition-all duration-300 hover:bg-background hover:text-foreground hover:shadow-[0_0_40px_rgba(244,160,190,0.7)] hover:scale-[1.02]"
                >
                  <span className="relative z-10">{added ? "Added to Bag" : "Add to Cart"}</span>
                  {!added && <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
