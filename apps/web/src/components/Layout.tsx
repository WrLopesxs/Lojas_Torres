import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { QuotePanel } from "./QuotePanel";

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Header />
      <main className="page-shell">
        <div key={location.pathname} className="route-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
      <QuotePanel />
    </div>
  );
}
