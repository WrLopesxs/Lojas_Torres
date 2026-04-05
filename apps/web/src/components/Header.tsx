import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useQuote } from "../context/QuoteContext";
import { useTheme } from "../context/ThemeContext";

const navigationItems = [
  { to: "/", label: "Início" },
  { to: "/produtos", label: "Produtos" },
  { to: "/fusiveis", label: "Fusíveis" },
  { to: "/automacao", label: "Automação" },
  { to: "/sobre", label: "Quem somos" },
  { to: "/contato", label: "Contato" }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount, openPanel } = useQuote();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <div className="container header-bar">
        <NavLink to="/" className="brand-mark" onClick={() => setIsMenuOpen(false)}>
          <img className="brand-logo" src="/torres-logo.svg" alt="Torres desde 1948" />
        </NavLink>

        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setIsMenuOpen((currentState) => !currentState)}
        >
          Menu
        </button>

        <nav className={`main-nav ${isMenuOpen ? "is-open" : ""}`}>
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
            title={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {theme === "light" ? "🌙" : "☀️"}
            </span>
          </button>
          <button type="button" className="header-quote-button" onClick={openPanel}>
            Pré-orçamento
            <span>{itemCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
