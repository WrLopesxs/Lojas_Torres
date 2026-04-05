import { Link } from "react-router-dom";

import { COMPANY } from "../config/company";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <img className="footer-logo" src="/torres-logo.svg" alt="Torres desde 1948" />
            <div className="footer-brand-copy">
              <p className="eyebrow">Lojas Torres</p>
              <h3>Atendimento técnico com resposta rápida.</h3>
              <p className="muted">Veja o catálogo, monte o pedido e fale com a unidade certa.</p>
            </div>
          </div>

          <div className="footer-section">
            <p className="footer-heading">Navegação</p>
            <div className="footer-links">
              <Link to="/produtos">Produtos</Link>
              <Link to="/fusiveis">Fusíveis</Link>
              <Link to="/automacao">Automação</Link>
              <Link to="/sobre">Quem somos</Link>
              <Link to="/contato">Contato</Link>
            </div>
          </div>

          <div className="footer-section">
            <p className="footer-heading">Atendimento</p>
            <div className="footer-links">
              {COMPANY.quoteChannels.map((channel) => (
                <a
                  key={channel.id}
                  href={`https://wa.me/${channel.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <strong>{channel.label}</strong>
                  <span>{channel.whatsappDisplay}</span>
                </a>
              ))}
              <a href={`mailto:${COMPANY.units[0].email}`}>
                <strong>E-mail</strong>
                <span>{COMPANY.units[0].email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{COMPANY.city}</span>
          <span>{COMPANY.businessHours}</span>
          <span>{COMPANY.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
