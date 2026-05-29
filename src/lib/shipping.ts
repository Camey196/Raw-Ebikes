import type { CurrencyCode } from "@/context/currency";

export type ShippingOption = {
  id: string;
  label: string;
  eta: string;
  amount: number;
};

export const SHIPPING_BY_CURRENCY: Record<CurrencyCode, ShippingOption[]> = {
  GBP: [{ id: "uk-next", label: "Next Day", eta: "Next Day", amount: 4.12 }],
  USD: [
    { id: "us-fast", label: "Express", eta: "5–9 days", amount: 13.49 },
    { id: "us-standard", label: "Standard", eta: "7–12 days", amount: 10.89 },
  ],
  AUD: [
    { id: "au-standard", label: "Standard", eta: "7–13 days", amount: 10.59 },
    { id: "au-priority", label: "Priority", eta: "5–10 days", amount: 14.99 },
  ],
};

export function getShippingOptions(currency: CurrencyCode): ShippingOption[] {
  return SHIPPING_BY_CURRENCY[currency];
}

export function getDefaultShippingId(currency: CurrencyCode): string {
  return getShippingOptions(currency)[0]?.id ?? "";
}

export function getShippingOption(currency: CurrencyCode, id: string): ShippingOption | undefined {
  return getShippingOptions(currency).find((o) => o.id === id);
}

export function formatShippingOptionLabel(option: ShippingOption, formatMoney: (n: number) => string): string {
  if (option.label === option.eta) return `${option.label} — ${formatMoney(option.amount)}`;
  return `${option.label} · ${option.eta} — ${formatMoney(option.amount)}`;
}
