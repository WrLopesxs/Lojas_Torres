import { PageHero } from "../components/PageHero";
import { COMPANY } from "../config/company";

const contactGuides = [
  {
    title: "Atendimento geral",
    description: "Para elétrica, ferramentas e pedidos mais amplos."
  },
  {
    title: "Fusíveis",
    description: "Para seleção, reposição e cotação técnica."
  },
  {
    title: "São Paulo",
    description: "Para atendimento regional e demandas corporativas."
  }
];

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Fale com a unidade certa."
        description="Cada canal atende um tipo de demanda. Aqui fica mais fácil escolher."
      >
        <div className="stack compact">
          <strong>Horário</strong>
          <p className="muted">{COMPANY.businessHours}</p>
        </div>
      </PageHero>

      <section className="section">
        <div className="container support-grid">
          {contactGuides.map((guide) => (
            <article key={guide.title} className="glass-card support-card">
              <p className="eyebrow">Quando usar</p>
              <h3>{guide.title}</h3>
              <p className="muted">{guide.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container unit-grid">
          {COMPANY.units.map((unit) => (
            <article key={unit.id} className="glass-card contact-card">
              <p className="eyebrow">{unit.subtitle}</p>
              <h3>{unit.title}</h3>
              <p className="muted">{unit.description}</p>
              <div className="support-meta">
                <span>{unit.city}</span>
                <span>Telefones: {unit.phones.join(" | ")}</span>
                <span>E-mail: {unit.email}</span>
                {unit.whatsappDisplay ? <span>WhatsApp: {unit.whatsappDisplay}</span> : null}
              </div>

              <div className="cta-row">
                {unit.whatsappNumber ? (
                  <a
                    className="primary-button"
                    href={`https://wa.me/${unit.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {unit.primaryCtaLabel}
                  </a>
                ) : (
                  <a className="primary-button" href={`mailto:${unit.email}`}>
                    {unit.primaryCtaLabel}
                  </a>
                )}
                <a className="secondary-button" href={`mailto:${unit.email}`}>
                  Enviar e-mail
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
