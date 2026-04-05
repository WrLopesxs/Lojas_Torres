import { useEffect, useState } from "react";

import { PageHero } from "../components/PageHero";
import { ProductCard } from "../components/ProductCard";
import { ProductModal } from "../components/ProductModal";
import { useQuote } from "../context/QuoteContext";
import { fetchProducts } from "../services/api";
import type { Product } from "../types";

const automationSteps = ["Entenda a aplicação.", "Monte o pedido.", "Envie para o comercial."];

export function AutomacaoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useQuote();

  useEffect(() => {
    fetchProducts({ segment: "Automacao" })
      .then((response) => setProducts(response.items))
      .catch(() => setProducts([]));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Automação"
        title="Componentes para comando, controle e manutenção."
        description="Consulte os itens e envie seu pedido com mais clareza para o comercial."
      >
        <div className="stack compact">
          <strong>Fluxo</strong>
          <ul className="simple-list">
            {automationSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </PageHero>

      <section className="section">
        <div className="container showcase-grid">
          <div className="glass-card spotlight-card">
            <p className="eyebrow">Aplicação</p>
            <h3>Itens para painéis, manutenção e modernização.</h3>
            <p className="muted">CLPs, contatores, fontes e proteção de motores.</p>
          </div>
          <div className="glass-card spotlight-card">
            <p className="eyebrow">Atendimento</p>
            <h3>Mais contexto no pedido.</h3>
            <p className="muted">Você chega no comercial com a demanda mais clara.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addItem}
                onDetails={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addItem} />
    </>
  );
}
