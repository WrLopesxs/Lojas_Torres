import { products } from "../_lib/data.js";
import { buildFiltersMeta, filterProducts } from "../_lib/filters.js";
import { allowMethods } from "../_lib/response.js";

export default function handler(request, response) {
  if (!allowMethods(request, response, ["GET"])) {
    return;
  }

  const filteredProducts = filterProducts(products, request.query ?? {});

  response.status(200).json({
    total: filteredProducts.length,
    filters: buildFiltersMeta(products),
    items: filteredProducts
  });
}
