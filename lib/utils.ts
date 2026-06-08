export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

// Deterministic accent colour per category, used as a graceful image fallback.
export function categoryTint(category: string): string {
  const map: Record<string, string> = {
    apparel: "#2C5340",
    footwear: "#C2622E",
    accessories: "#1B3A2B",
    living: "#7E8B6B",
  };
  return map[category] ?? "#1B3A2B";
}
