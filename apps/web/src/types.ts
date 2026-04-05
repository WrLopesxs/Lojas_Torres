export type ProductSegment = "Fusiveis" | "Automacao";
export type QuoteChannel = "sorocaba-geral" | "sorocaba-fusiveis";

export interface ProductTechnicalSheet {
  construction: string;
  mounting: string;
  breakingCapacity: string;
  standard: string;
  notes: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  category: string;
  segment: ProductSegment;
  type: string;
  amperage: number;
  voltage: number;
  price: number;
  brand: string;
  leadTime: string;
  featured: boolean;
  description: string;
  applications: string[];
  technicalSheet: ProductTechnicalSheet;
}

export interface ProductFiltersMeta {
  categories: string[];
  types: string[];
  amperages: number[];
  voltages: number[];
}

export interface ProductsPayload {
  total: number;
  filters: ProductFiltersMeta;
  items: Product[];
}

export interface QuoteDraftItem {
  productId: string;
  quantity: number;
}

export interface QuoteLineItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface QuoteResponse {
  items: QuoteLineItem[];
  subtotal: number;
  estimatedFreightNote: string;
  whatsappMessage: string;
  whatsappUrl: string;
  channel: QuoteChannel;
  channelLabel: string;
  whatsappNumber: string;
}
