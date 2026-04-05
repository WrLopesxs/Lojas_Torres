import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PageHero } from "../components/PageHero";
import { ProductCard } from "../components/ProductCard";
import { ProductModal } from "../components/ProductModal";
import { COMPANY } from "../config/company";
import { useQuote } from "../context/QuoteContext";
import { fetchProducts } from "../services/api";
import type { Product, ProductFiltersMeta } from "../types";

const defaultFilters: ProductFiltersMeta = {
  categories: [],
  types: [],
  amperages: [],
  voltages: []
};

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFiltersMeta>(defaultFilters);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [type, setType] = useState("Todos");
  const [amperage, setAmperage] = useState("Todos");
  const [voltage, setVoltage] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem, openPanel } = useQuote();

  useEffect(() => {
    fetchProducts()
      .then((response) => {
        setProducts(response.items);
        setFilters(response.filters);
      })
      .catch(() => {
        setProducts([]);
        setFilters(defaultFilters);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const searchTerm = search.trim().toLowerCase();

    if (searchTerm) {
      const content = [product.name, product.category, product.type, product.sku, ...product.applications]
        .join(" ")
        .toLowerCase();

      if (!content.includes(searchTerm)) {
        return false;
      }
    }

    if (category !== "Todos" && product.category !== category) {
      return false;
    }

    if (type !== "Todos" && product.type !== type) {
      return false;
    }

    if (amperage !== "Todos" && product.amperage !== Number(amperage)) {
      return false;
    }

    if (voltage !== "Todos" && product.voltage !== Number(voltage)) {
      return false;
    }

    return true;
  });

  return (
    <>
      <PageHero
        eyebrow="Produtos"
        title="Encontre o produto e envie seu pedido rápido."
        description="Busque a referência, filtre o que precisa e fale com a equipe."
      >
        <div className="stack compact">
          <strong>Não achou?</strong>
          <p className="muted">Envie a referência ou uma foto pelo WhatsApp.</p>
          <button type="button" className="secondary-button" onClick={openPanel}>
            Montar pedido
          </button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="support-grid">
            {COMPANY.businessAreas.map((area) => (
              <article key={area.title} className="glass-card support-card">
                <p className="eyebrow">Categoria</p>
                <h3>{area.title}</h3>
                <p className="muted">{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-panel">
            <div className="field field-search">
              <label htmlFor="search">Buscar produto</label>
              <input
                id="search"
                type="text"
                placeholder="Ex.: NH 160A, Diazed, contator"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="filters-grid">
              <div className="field">
                <label htmlFor="category">Categoria</label>
                <select id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option>Todos</option>
                  {filters.categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="type">Tipo</label>
                <select id="type" value={type} onChange={(event) => setType(event.target.value)}>
                  <option>Todos</option>
                  {filters.types.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="amperage">Amperagem</label>
                <select id="amperage" value={amperage} onChange={(event) => setAmperage(event.target.value)}>
                  <option>Todos</option>
                  {filters.amperages.map((item) => (
                    <option key={item} value={item}>
                      {item}A
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="voltage">Tensão</label>
                <select id="voltage" value={voltage} onChange={(event) => setVoltage(event.target.value)}>
                  <option>Todos</option>
                  {filters.voltages.map((item) => (
                    <option key={item} value={item}>
                      {item}V
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="tag-row">
              <span className="chip">{filteredProducts.length} itens</span>
              <Link to="/contato" className="text-link">
                Ver contatos
              </Link>
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setSearch("");
                  setCategory("Todos");
                  setType("Todos");
                  setAmperage("Todos");
                  setVoltage("Todos");
                }}
              >
                Limpar filtros
              </button>
            </div>
          </div>

          <div className="feature-band">
            <div>
              <p className="eyebrow">Catálogo</p>
              <h2>Veja o item, monte o pedido e siga para o atendimento.</h2>
            </div>
            <p className="muted">A equipe confirma estoque, prazo e condição comercial.</p>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
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
