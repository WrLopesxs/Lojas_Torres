import type { Product } from "../types";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (productId: string) => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

export function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  if (!product) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">{product.category}</p>
            <h2>{product.name}</h2>
          </div>
          <button type="button" className="ghost-button" onClick={onClose}>
            Fechar
          </button>
        </div>

        <div className="spec-grid">
          <div className="spec-block">
            <span>Tipo</span>
            <strong>{product.type}</strong>
          </div>
          <div className="spec-block">
            <span>Amperagem</span>
            <strong>{product.amperage}A</strong>
          </div>
          <div className="spec-block">
            <span>Tensão</span>
            <strong>{product.voltage}V</strong>
          </div>
          <div className="spec-block">
            <span>Preço</span>
            <strong>{formatCurrency(product.price)}</strong>
          </div>
        </div>

        <div className="modal-content-grid">
          <div className="glass-card">
            <h3>Aplicações</h3>
            <ul className="simple-list">
              {product.applications.map((application) => (
                <li key={application}>{application}</li>
              ))}
            </ul>
          </div>

          <div className="glass-card">
            <h3>Ficha técnica</h3>
            <div className="details-table">
              <div>
                <span>Construção</span>
                <strong>{product.technicalSheet.construction}</strong>
              </div>
              <div>
                <span>Montagem</span>
                <strong>{product.technicalSheet.mounting}</strong>
              </div>
              <div>
                <span>Capacidade</span>
                <strong>{product.technicalSheet.breakingCapacity}</strong>
              </div>
              <div>
                <span>Norma</span>
                <strong>{product.technicalSheet.standard}</strong>
              </div>
              <div>
                <span>Observações</span>
                <strong>{product.technicalSheet.notes}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="muted">SKU {product.sku} | {product.brand} | {product.leadTime}</div>
          <button type="button" className="primary-button" onClick={() => onAdd(product.id)}>
            Adicionar ao orçamento
          </button>
        </div>
      </div>
    </div>
  );
}
