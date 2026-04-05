import { useEffect, useMemo, useState } from "react";

import { COMPANY } from "../config/company";
import { useQuote } from "../context/QuoteContext";
import { createQuote } from "../services/api";
import type { QuoteResponse } from "../types";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

export function QuotePanel() {
  const {
    items,
    itemCount,
    isPanelOpen,
    preferredChannel,
    togglePanel,
    closePanel,
    setQuantity,
    removeItem,
    clearItems,
    setPreferredChannel
  } = useQuote();
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedChannel = useMemo(
    () => COMPANY.quoteChannels.find((channel) => channel.id === preferredChannel),
    [preferredChannel]
  );

  const hasFuseItems = quote?.items.some((item) => item.product.segment === "Fusiveis");

  useEffect(() => {
    let isMounted = true;

    if (items.length === 0) {
      setQuote(null);
      return;
    }

    setIsLoading(true);
    createQuote(items, preferredChannel)
      .then((response) => {
        if (isMounted) {
          setQuote(response);
        }
      })
      .catch(() => {
        if (isMounted) {
          setQuote(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [items, preferredChannel]);

  return (
    <>
      <button type="button" className="quote-fab" onClick={togglePanel}>
        <span>Pré-orçamento</span>
        <strong>{itemCount}</strong>
      </button>

      <div className={`quote-overlay ${isPanelOpen ? "visible" : ""}`} onClick={closePanel} />

      <aside className={`quote-panel ${isPanelOpen ? "open" : ""}`}>
        <div className="quote-panel-header">
          <div>
            <p className="eyebrow">Pedido rápido</p>
            <h3>Seu orçamento</h3>
          </div>
          <button type="button" className="ghost-button" onClick={closePanel}>
            Fechar
          </button>
        </div>

        <div className="field quote-channel-field">
          <label htmlFor="quote-channel">Enviar para</label>
          <select
            id="quote-channel"
            value={preferredChannel}
            onChange={(event) => setPreferredChannel(event.target.value as typeof preferredChannel)}
          >
            {COMPANY.quoteChannels.map((channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.label}
              </option>
            ))}
          </select>
          <p className="muted small">
            {selectedChannel?.description ?? "Escolha a equipe que vai receber o pedido."}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="quote-empty">
            <h4>Nenhum item ainda</h4>
            <p className="muted">Adicione produtos para montar o pedido.</p>
          </div>
        ) : null}

        <div className="quote-list">
          {quote?.items.map((item) => (
            <article key={item.product.id} className="quote-line">
              <div>
                <strong>{item.product.name}</strong>
                <p className="muted">
                  {item.product.type} | {item.product.amperage}A | {item.product.voltage}V
                </p>
              </div>

              <div className="quote-line-controls">
                <button type="button" onClick={() => setQuantity(item.product.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => setQuantity(item.product.id, item.quantity + 1)}>
                  +
                </button>
              </div>

              <div className="quote-line-footer">
                <strong>{formatCurrency(item.lineTotal)}</strong>
                <button type="button" className="text-button" onClick={() => removeItem(item.product.id)}>
                  remover
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="quote-summary">
          <div className="quote-total">
            <span>Total estimado</span>
            <strong>{quote ? formatCurrency(quote.subtotal) : "Calculando..."}</strong>
          </div>

          {hasFuseItems && preferredChannel !== "sorocaba-fusiveis" ? (
            <p className="notice-card">Seu pedido tem fusíveis. Se quiser, envie direto para o canal especializado.</p>
          ) : null}

          <p className="muted small">{quote?.estimatedFreightNote ?? "O valor final será confirmado pela equipe."}</p>

          <div className="quote-actions">
            <button type="button" className="ghost-button" onClick={clearItems}>
              Limpar
            </button>
            <button
              type="button"
              className="primary-button"
              disabled={!quote || isLoading}
              onClick={() => {
                if (quote) {
                  window.open(quote.whatsappUrl, "_blank", "noopener,noreferrer");
                }
              }}
            >
              {isLoading ? "Atualizando..." : "Enviar para o WhatsApp"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
