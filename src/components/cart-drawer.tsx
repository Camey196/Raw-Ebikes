import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ShippingOptions } from "@/components/shipping-options";
import { useCart } from "@/context/cart";
import { useCurrency } from "@/context/currency";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function CartDrawer() {
  const { isOpen, close, items, setQty, remove, subtotal, shipping, total, clear } = useCart();
  const { formatPrice, formatMoney } = useCurrency();
  const navigate = useNavigate();

  const checkout = () => {
    close();
    clear();
    navigate({ to: "/checkout/success" });
  };

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <SheetContent side="right" className="flex w-full flex-col bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-xs uppercase tracking-[0.3em]">Your Bag ({items.length})</SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-6 flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <p className="mt-20 text-center text-sm text-muted-foreground">Your bag is empty.</p>
          ) : (
            <ul className="space-y-6">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4 border-b border-border pb-6">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                    <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-serif text-lg leading-tight">{i.name}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{i.variant}</p>
                      </div>
                      <button
                        onClick={() => remove(i.id)}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-border">
                        <button onClick={() => setQty(i.id, i.qty - 1)} className="px-2 py-1 hover:bg-sakura-soft" aria-label="Decrease">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)} className="px-2 py-1 hover:bg-sakura-soft" aria-label="Increase">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm tabular-nums">{formatPrice(i.price * i.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border pt-6">
          {items.length > 0 && <ShippingOptions className="mb-4" />}
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-[0.25em] text-muted-foreground">Subtotal</span>
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-[0.25em] text-muted-foreground">Shipping</span>
              <span className="tabular-nums">{items.length > 0 ? formatMoney(shipping) : "—"}</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2">
              <span className="uppercase tracking-[0.25em] text-foreground">Total</span>
              <span className="font-serif text-2xl tabular-nums">{items.length > 0 ? formatMoney(total) : "—"}</span>
            </div>
          </div>
          <button
            disabled={items.length === 0}
            onClick={checkout}
            className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-foreground px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-background transition-all hover:bg-sakura hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            Checkout
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={close}
            className="mt-3 w-full text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
          >
            Continue Shopping
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
