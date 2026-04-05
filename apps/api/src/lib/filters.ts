import type { Product } from "../types.js";

export function buildFiltersMeta(products: Product[]) {
  return {
    categories: [...new Set(products.map((product) => product.category))].sort(),
    types: [...new Set(products.map((product) => product.type))].sort(),
    amperages: [...new Set(products.map((product) => product.amperage))].sort((a, b) => a - b),
    voltages: [...new Set(products.map((product) => product.voltage))].sort((a, b) => a - b)
  };
}

export function filterProducts(products: Product[], query: Record<string, string | undefined>) {
  const search = query.search?.toLowerCase().trim();
  const category = query.category?.trim();
  const type = query.type?.trim();
  const amperage = Number(query.amperage);
  const voltage = Number(query.voltage);
  const featured = query.featured === "true";
  const segment = query.segment?.trim();

  return products.filter((product) => {
    if (featured && !product.featured) {
      return false;
    }

    if (segment && product.segment !== segment) {
      return false;
    }

    if (category && product.category !== category) {
      return false;
    }

    if (type && product.type !== type) {
      return false;
    }

    if (query.amperage && product.amperage !== amperage) {
      return false;
    }

    if (query.voltage && product.voltage !== voltage) {
      return false;
    }

    if (search) {
      const haystack = [
        product.name,
        product.category,
        product.type,
        product.sku,
        ...product.applications
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(search)) {
        return false;
      }
    }

    return true;
  });
}
