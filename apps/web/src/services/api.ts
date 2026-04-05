import type {
  Product,
  ProductFiltersMeta,
  ProductsPayload,
  QuoteChannel,
  QuoteDraftItem,
  QuoteResponse
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error("Não foi possível concluir a requisição.");
  }

  return response.json() as Promise<T>;
}

export async function fetchProducts(params?: Record<string, string>) {
  const query = new URLSearchParams(params);
  const path = query.toString() ? `/api/products?${query.toString()}` : "/api/products";
  const response = await fetch(`${API_BASE_URL}${path}`);
  return handleResponse<ProductsPayload>(response);
}

export async function fetchFeaturedProducts() {
  const response = await fetch(`${API_BASE_URL}/api/products/featured`);
  return handleResponse<Product[]>(response);
}

export async function fetchFiltersMeta() {
  const response = await fetch(`${API_BASE_URL}/api/meta/filters`);
  return handleResponse<ProductFiltersMeta>(response);
}

export async function createQuote(items: QuoteDraftItem[], channel: QuoteChannel) {
  const response = await fetch(`${API_BASE_URL}/api/quote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ items, channel })
  });

  return handleResponse<QuoteResponse>(response);
}
