import { products } from "../_lib/data.js";
import { allowMethods } from "../_lib/response.js";

export default function handler(request, response) {
  if (!allowMethods(request, response, ["GET"])) {
    return;
  }

  const product = products.find((entry) => entry.id === request.query.id);

  if (!product) {
    response.status(404).json({ message: "Produto não encontrado." });
    return;
  }

  response.status(200).json(product);
}
