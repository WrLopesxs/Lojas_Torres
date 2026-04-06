import { products } from "../_lib/data.js";
import { buildFiltersMeta } from "../_lib/filters.js";
import { allowMethods } from "../_lib/response.js";

export default function handler(request, response) {
  if (!allowMethods(request, response, ["GET"])) {
    return;
  }

  response.status(200).json(buildFiltersMeta(products));
}
