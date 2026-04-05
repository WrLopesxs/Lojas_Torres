import cors from "cors";
import express from "express";

import { products } from "./data/products.js";
import { buildFiltersMeta, filterProducts } from "./lib/filters.js";
import { generateQuote } from "./lib/quote.js";
import type { QuoteChannel, QuoteRequestItem } from "./types.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "torres-api",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/products", (request, response) => {
  const filteredProducts = filterProducts(products, request.query as Record<string, string | undefined>);

  response.json({
    total: filteredProducts.length,
    filters: buildFiltersMeta(products),
    items: filteredProducts
  });
});

app.get("/api/products/featured", (_request, response) => {
  response.json(products.filter((product) => product.featured));
});

app.get("/api/products/:id", (request, response) => {
  const product = products.find((entry) => entry.id === request.params.id);

  if (!product) {
    response.status(404).json({ message: "Produto não encontrado." });
    return;
  }

  response.json(product);
});

app.get("/api/meta/filters", (_request, response) => {
  response.json(buildFiltersMeta(products));
});

app.post("/api/quote", (request, response) => {
  const items = (request.body?.items ?? []) as QuoteRequestItem[];
  const channel = (request.body?.channel ?? "sorocaba-geral") as QuoteChannel;

  if (!Array.isArray(items) || items.length === 0) {
    response.status(400).json({ message: "Envie ao menos um item para gerar o orçamento." });
    return;
  }

  response.json(generateQuote(items, channel));
});

app.listen(port, () => {
  console.log(`Torres API running on http://localhost:${port}`);
});
