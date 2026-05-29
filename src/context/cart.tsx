import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useCurrency } from "@/context/currency";
import {
  getDefaultShippingId,
  getShippingOption,
  getShippingOptions,
  type ShippingOption,
} from "@/lib/shipping";

export type CartItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  image: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  shippingOptions: ShippingOption[];
  shippingId: string;
  setShippingId: (id: string) => void;
  selectedShipping: ShippingOption | undefined;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "raw-ebikes-cart";
const SHIPPING_STORAGE_KEY = "raw-ebikes-shipping";

export function CartProvider({ children }: { children: ReactNode }) {
  const { currency, convertUsd } = useCurrency();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [shippingId, setShippingIdState] = useState(() => getDefaultShippingId(currency));

  const shippingOptions = useMemo(() => getShippingOptions(currency), [currency]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SHIPPING_STORAGE_KEY) || "{}") as Record<
        string,
        string
      >;
      const stored = saved[currency];
      const valid = stored && shippingOptions.some((o) => o.id === stored);
      setShippingIdState(valid ? stored : getDefaultShippingId(currency));
    } catch {
      setShippingIdState(getDefaultShippingId(currency));
    }
  }, [currency, shippingOptions]);

  const setShippingId = (id: string) => {
    setShippingIdState(id);
    try {
      const saved = JSON.parse(localStorage.getItem(SHIPPING_STORAGE_KEY) || "{}") as Record<
        string,
        string
      >;
      saved[currency] = id;
      localStorage.setItem(SHIPPING_STORAGE_KEY, JSON.stringify(saved));
    } catch {}
  };

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
    const selectedShipping = getShippingOption(currency, shippingId) ?? shippingOptions[0];
    const shipping = items.length > 0 ? (selectedShipping?.amount ?? 0) : 0;
    const subtotalNative = convertUsd(subtotal);
    const total = items.length > 0 ? subtotalNative + shipping : 0;

    return {
      items,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add: (item, qty = 1) =>
        setItems((prev) => {
          const found = prev.find((p) => p.id === item.id);
          if (found) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + qty } : p));
          return [...prev, { ...item, qty }];
        }),
      remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
      setQty: (id, qty) =>
        setItems((prev) =>
          qty <= 0 ? prev.filter((p) => p.id !== id) : prev.map((p) => (p.id === id ? { ...p, qty } : p)),
        ),
      clear: () => setItems([]),
      count,
      subtotal,
      shipping,
      total,
      shippingOptions,
      shippingId,
      setShippingId,
      selectedShipping,
    };
  }, [items, isOpen, currency, shippingId, shippingOptions, convertUsd]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
