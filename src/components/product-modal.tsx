import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCart } from "@/context/cart";
import { useCurrency } from "@/context/currency";
import { formatShippingOptionLabel } from "@/lib/shipping";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

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
      <DialogContent className="max-w-4xl gap-0 overflow-hidden bg-background p-0 sm:rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square bg-muted md:aspect-auto">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col p-8 md:p-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-sakura">{product.variant}</p>
            <DialogTitle className="mt-3 font-['Newsreader'] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              {product.name}
            </DialogTitle>
            <DialogDescription className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </DialogDescription>

            <ul className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sakura" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="font-serif text-3xl tabular-nums">{formatPrice(product.price)}</span>
                <ul className="space-y-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {shippingOptions.map((option) => (
                    <li key={option.id}>+ {formatShippingOptionLabel(option, formatMoney)}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={handleAdd}
                className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-foreground px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-background transition-all hover:bg-sakura hover:text-foreground"
              >
                {added ? "Added to Bag" : "Add to Cart"}
                {!added && <ArrowRight className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
