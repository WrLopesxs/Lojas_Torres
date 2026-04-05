import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { QuoteProvider } from "./context/QuoteContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AboutPage } from "./pages/AboutPage";
import { AutomacaoPage } from "./pages/AutomacaoPage";
import { ContactPage } from "./pages/ContactPage";
import { FusiveisPage } from "./pages/FusiveisPage";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";

export default function App() {
  return (
    <ThemeProvider>
      <QuoteProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/produtos" element={<ProductsPage />} />
              <Route path="/fusiveis" element={<FusiveisPage />} />
              <Route path="/automacao" element={<AutomacaoPage />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/contato" element={<ContactPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QuoteProvider>
    </ThemeProvider>
  );
}
