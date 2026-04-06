import { products } from "./data.js";

const channelConfig = {
  "sorocaba-geral": {
    label: "Torres Sorocaba",
    whatsappNumber: process.env.WHATSAPP_PHONE_GENERAL ?? "5515981131643"
  },
  "sorocaba-fusiveis": {
    label: "Torres Fusíveis Sorocaba",
    whatsappNumber: process.env.WHATSAPP_PHONE_FUSES ?? "5515981132621"
  }
};

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

function buildWhatsAppMessage(quote) {
  const lines = quote.items.map((item, index) => {
    return `${index + 1}. ${item.product.name} | Qtd: ${item.quantity} | Unit: ${formatCurrency(item.unitPrice)} | Total: ${formatCurrency(item.lineTotal)}`;
  });

  return [
    `Olá, equipe ${quote.channelLabel}!`,
    "Gostaria de solicitar este orçamento:",
    "",
    ...lines,
    "",
    `Subtotal estimado: ${formatCurrency(quote.subtotal)}`,
    `Observação logística: ${quote.estimatedFreightNote}`,
    "",
    "Podem confirmar disponibilidade, prazo e condição comercial?"
  ].join("\n");
}

export function generateQuote(items, channel = "sorocaba-geral") {
  const selectedChannel = channelConfig[channel] ?? channelConfig["sorocaba-geral"];
  const sanitizedItems = items.filter((item) => item.quantity > 0);

  const lines = sanitizedItems
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);

      if (!product) {
        return null;
      }

      return {
        product,
        quantity: item.quantity,
        unitPrice: product.price,
        lineTotal: Number((product.price * item.quantity).toFixed(2))
      };
    })
    .filter(Boolean);

  const subtotal = Number(lines.reduce((sum, line) => sum + line.lineTotal, 0).toFixed(2));
  const estimatedFreightNote =
    subtotal >= 1500
      ? "Pedido com potencial para frete consultivo e composição comercial especial."
      : "Frete e condições finais sujeitos à validação comercial da equipe.";

  const quoteWithoutMessage = {
    items: lines,
    subtotal,
    estimatedFreightNote,
    whatsappMessage: "",
    whatsappUrl: "",
    channel,
    channelLabel: selectedChannel.label,
    whatsappNumber: selectedChannel.whatsappNumber
  };

  const whatsappMessage = buildWhatsAppMessage(quoteWithoutMessage);
  const whatsappUrl = `https://wa.me/${selectedChannel.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return {
    ...quoteWithoutMessage,
    whatsappMessage,
    whatsappUrl
  };
}
