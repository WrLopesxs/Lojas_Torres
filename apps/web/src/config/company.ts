import type { QuoteChannel } from "../types";

export interface CompanyUnit {
  id: string;
  title: string;
  subtitle: string;
  city: string;
  phones: string[];
  whatsappNumber?: string;
  whatsappDisplay?: string;
  email: string;
  description: string;
  primaryCtaLabel: string;
}

export interface QuoteChannelOption {
  id: QuoteChannel;
  label: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  description: string;
}

export const COMPANY = {
  name: "Lojas Torres",
  legacyTitle: "Desde 1948 com segurança e confiança",
  city: "Sorocaba - SP",
  tagline: "Fusíveis, materiais elétricos, automação e atendimento técnico especializado.",
  businessHours: "Segunda a sexta, das 8h às 18h",
  units: [
    {
      id: "sorocaba-geral",
      title: "Torres Sorocaba",
      subtitle: "Matriz e atendimento geral",
      city: "Sorocaba - SP",
      phones: ["(15) 3232-9158", "(15) 3232-4722"],
      whatsappNumber: "5515981131643",
      whatsappDisplay: "(15) 98113-1643",
      email: "torres@torresradioetv.com.br",
      description: "Canal principal para materiais elétricos, eletrônicos, ferramentas, conectores e atendimento geral.",
      primaryCtaLabel: "Falar com a matriz"
    },
    {
      id: "sorocaba-fusiveis",
      title: "Torres Fusíveis Sorocaba",
      subtitle: "Especialista em fusíveis",
      city: "Sorocaba - SP",
      phones: ["(15) 3232-9158"],
      whatsappNumber: "5515981132621",
      whatsappDisplay: "(15) 98113-2621",
      email: "torres.fusiveis.sorocaba@gmail.com",
      description: "Atendimento especializado para fusíveis industriais, residenciais e automotivos.",
      primaryCtaLabel: "Falar com especialista"
    },
    {
      id: "sao-paulo-fusiveis",
      title: "Torres Fusíveis São Paulo",
      subtitle: "Atendimento regional em São Paulo",
      city: "São Paulo - SP",
      phones: ["(11) 3311-0376"],
      email: "torres.fusiveis@torresradioetv.com.br",
      description: "Unidade voltada ao atendimento regional e corporativo em São Paulo.",
      primaryCtaLabel: "Solicitar atendimento"
    }
  ] satisfies CompanyUnit[],
  quoteChannels: [
    {
      id: "sorocaba-geral",
      label: "Torres Sorocaba",
      whatsappNumber: "5515981131643",
      whatsappDisplay: "(15) 98113-1643",
      description: "Ideal para materiais elétricos, ferramentas, conectores e atendimento geral."
    },
    {
      id: "sorocaba-fusiveis",
      label: "Torres Fusíveis Sorocaba",
      whatsappNumber: "5515981132621",
      whatsappDisplay: "(15) 98113-2621",
      description: "Canal recomendado para fusíveis industriais, residenciais e automotivos."
    }
  ] satisfies QuoteChannelOption[],
  businessAreas: [
    {
      title: "Fusíveis",
      description: "Linha forte da loja, com opções para aplicações industriais, residenciais e automotivas."
    },
    {
      title: "Materiais elétricos",
      description: "Itens de reposição, manutenção e atendimento de balcão para o dia a dia."
    },
    {
      title: "Automação elétrica",
      description: "Componentes de comando e controle para painéis, manutenção e modernização."
    },
    {
      title: "Ferramentas e conectores",
      description: "Categorias de apoio para eletricistas, manutenção e montagem."
    }
  ]
} as const;
