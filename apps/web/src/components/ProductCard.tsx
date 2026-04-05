import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAdd: (productId: string) => void;
  onDetails: (product: Product) => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

export function ProductCard({ product, onAdd, onDetails }: ProductCardProps) {
  const segmentLabel = product.segment === "Fusiveis" ? "Fusíveis" : "Automação";

  return (
    <article className="product-card">
      <div className="badge-row">
        <span className="badge">{segmentLabel}</span>
        <span className="badge subdued">{product.type}</span>
      </div>

      <div className="stack compact">
        <h3>{product.name}</h3>
        <p className="muted">{product.description}</p>
      </div>

      <div className="spec-inline">
        <span>{product.amperage}A</span>
        <span>{product.voltage}V</span>
        <span>{product.category}</span>
      </div>

      <div className="product-footer">
        <div>
          <strong>{formatCurrency(product.price)}</strong>
          <p className="muted">{product.leadTime}</p>
        </div>

        <div className="product-actions">
          <button type="button" className="ghost-button" onClick={() => onDetails(product)}>
            Ver detalhes
          </button>
          <button type="button" className="primary-button" onClick={() => onAdd(product.id)}>
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
