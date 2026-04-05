import { useEffect, useState } from "react";

import { PageHero } from "../components/PageHero";
import { ProductCard } from "../components/ProductCard";
import { ProductModal } from "../components/ProductModal";
import { COMPANY } from "../config/company";
import { useQuote } from "../context/QuoteContext";
import { fetchProducts } from "../services/api";
import type { Product } from "../types";

const fuseFamilies = [
  {
    title: "Industriais",
    description: "Para painéis, motores e proteção pesada."
  },
  {
    title: "Residenciais",
    description: "Para reposição e manutenção do dia a dia."
  },
  {
    title: "Automotivos",
    description: "Linha para oficinas e autoelétrica."
  }
];

export function FusiveisPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useQuote();

  useEffect(() => {
    fetchProducts({ segment: "Fusiveis" })
      .then((response) => setProducts(response.items))
      .catch(() => setProducts([]));
  }, []);

  const fusesUnit = COMPANY.units.find((unit) => unit.id === "sorocaba-fusiveis");

  return (
    <>
      <PageHero
        eyebrow="Fusíveis"
        title="A especialidade da Lojas Torres."
        description="Pesquise o item, veja os dados principais e fale com o canal especializado."
      >
        <div className="stack compact">
          <strong>Canal recomendado</strong>
          <p className="muted">
            {fusesUnit?.title} | {fusesUnit?.whatsappDisplay}
          </p>
        </div>
      </PageHero>

      <section className="section">
        <div className="container process-grid">
          {fuseFamilies.map((family) => (
            <article key={family.title} className="glass-card process-card">
              <p className="eyebrow">Linha</p>
              <h3>{family.title}</h3>
              <p className="muted">{family.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="feature-band">
            <div>
              <p className="eyebrow">Consulta rápida</p>
              <h2>Mais contexto no pedido. Menos ida e volta no WhatsApp.</h2>
            </div>
            <p className="muted">Se não achou o item, envie a referência ou uma foto.</p>
          </div>

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
