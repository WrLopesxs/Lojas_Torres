import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import { ProductModal } from "../components/ProductModal";
import { COMPANY } from "../config/company";
import { useQuote } from "../context/QuoteContext";
import { fetchFeaturedProducts } from "../services/api";
import type { Product } from "../types";

const serviceFlow = [
  {
    title: "Encontre a referência",
    description: "Busque por nome, tipo, amperagem ou tensão."
  },
  {
    title: "Monte o pedido",
    description: "Selecione os itens e ajuste as quantidades."
  },
  {
    title: "Envie para a equipe",
    description: "Leve tudo pronto para o WhatsApp certo."
  }
];

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem, openPanel } = useQuote();

  useEffect(() => {
    fetchFeaturedProducts().then(setFeaturedProducts).catch(() => setFeaturedProducts([]));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="stack">
            <p className="eyebrow">{COMPANY.legacyTitle}</p>
            <h1>Fusíveis, elétrica e automação com atendimento rápido.</h1>
            <p className="lead">Encontre o item, monte o pedido e fale com a unidade certa.</p>

            <div className="cta-row">
              <button type="button" className="primary-button" onClick={openPanel}>
                Montar pedido
              </button>
              <Link to="/produtos" className="secondary-button">
                Ver produtos
              </Link>
            </div>

            <div className="metric-grid">
              <div className="metric-card">
                <strong>3 unidades</strong>
                <span>Sorocaba, Fusíveis Sorocaba e São Paulo</span>
              </div>
              <div className="metric-card">
                <strong>75+ anos</strong>
                <span>Tradição em atendimento técnico</span>
              </div>
              <div className="metric-card">
                <strong>WhatsApp direto</strong>
                <span>Mais agilidade no primeiro contato</span>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-panel-top">
              <span className="signal-dot" />
              <p>Atendimento prático e sem enrolação</p>
            </div>

            <div className="hero-panel-grid">
              <div className="hero-stat">
                <span>Especialidade</span>
                <strong>Fusíveis industriais, residenciais e automotivos</strong>
              </div>
              <div className="hero-stat">
                <span>Catálogo</span>
                <strong>Busca rápida para chegar mais preparado no atendimento</strong>
              </div>
              <div className="hero-stat">
                <span>Comercial</span>
                <strong>Pedido organizado para ganhar tempo no WhatsApp</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Como funciona</p>
              <h2>O site ajuda você a chegar mais rápido ao atendimento.</h2>
            </div>
          </div>

          <div className="process-grid">
            {serviceFlow.map((step) => (
              <article key={step.title} className="glass-card process-card">
                <p className="eyebrow">Etapa</p>
                <h3>{step.title}</h3>
                <p className="muted">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Categorias</p>
              <h2>As linhas mais procuradas da loja.</h2>
            </div>
          </div>

          <div className="support-grid">
            {COMPANY.businessAreas.map((area) => (
              <article key={area.title} className="glass-card support-card">
                <p className="eyebrow">Linha</p>
                <h3>{area.title}</h3>
                <p className="muted">{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Destaques</p>
              <h2>Itens para começar seu pedido.</h2>
            </div>
            <Link to="/produtos" className="text-link">
              Ver catálogo
            </Link>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => (
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

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Unidades</p>
              <h2>Escolha o canal certo.</h2>
            </div>
          </div>

          <div className="unit-grid">
            {COMPANY.units.map((unit) => (
              <article key={unit.id} className="glass-card support-card">
                <p className="eyebrow">{unit.subtitle}</p>
                <h3>{unit.title}</h3>
                <p className="muted">{unit.description}</p>
                <div className="support-meta">
                  <span>{unit.city}</span>
                  <span>{unit.phones.join(" | ")}</span>
                  <span>{unit.email}</span>
                  {unit.whatsappDisplay ? <span>WhatsApp: {unit.whatsappDisplay}</span> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addItem} />
    </>
  );
}
