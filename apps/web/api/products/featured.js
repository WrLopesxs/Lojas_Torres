import { products } from "../_lib/data.js";
import { allowMethods } from "../_lib/response.js";

export default function handler(request, response) {
  if (!allowMethods(request, response, ["GET"])) {
    return;
  }

  response.status(200).json(products.filter((product) => product.featured));
}
