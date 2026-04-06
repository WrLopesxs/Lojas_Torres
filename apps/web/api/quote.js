import { generateQuote } from "./_lib/quote.js";
import { allowMethods } from "./_lib/response.js";

export default function handler(request, response) {
  if (!allowMethods(request, response, ["POST"])) {
    return;
  }

  const items = Array.isArray(request.body?.items) ? request.body.items : [];
  const channel = request.body?.channel ?? "sorocaba-geral";

  if (items.length === 0) {
    response.status(400).json({ message: "Envie ao menos um item para gerar o orçamento." });
    return;
  }

  response.status(200).json(generateQuote(items, channel));
}
