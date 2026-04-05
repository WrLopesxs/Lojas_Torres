import { PageHero } from "../components/PageHero";

const historyBlocks = [
  {
    eyebrow: "Origem",
    title: "Uma história que começou em 1948.",
    description:
      "A Lojas Torres nasceu com Arnaldo Torres, em uma pequena oficina de conserto de rádios."
  },
  {
    eyebrow: "Crescimento",
    title: "A empresa acompanhou o mercado.",
    description:
      "Com o apoio de Antônio, o negócio cresceu com a chegada da televisão, passou a ser conhecido como Torres Rádio e TV e ampliou a venda de peças e componentes."
  },
  {
    eyebrow: "Momento atual",
    title: "Hoje, tradição e atendimento técnico andam juntos.",
    description:
      "A Lojas Torres segue forte em fusíveis, materiais elétricos e automação, com atendimento próximo e conhecimento de balcão."
  }
];

const values = [
  "Comprometimento",
  "Confiança",
  "Honestidade",
  "Respeito no relacionamento com clientes e parceiros"
];

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Quem somos"
        title="Tradição, atendimento próximo e conhecimento técnico."
        description="Desde 1948, a Lojas Torres evolui junto com o mercado e segue atendendo com confiança."
      >
        <div className="stack compact">
          <strong>Nossa história</strong>
          <p className="muted">Da oficina de rádios a uma referência em fusíveis, elétrica e automação.</p>
        </div>
      </PageHero>

      <section className="section">
        <div className="container timeline">
          {historyBlocks.map((item) => (
            <article key={item.title} className="glass-card timeline-card">
              <p className="eyebrow">{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container feature-band">
          <div>
            <p className="eyebrow">Nossa história</p>
            <h2>Em 1991, a Torres deu mais um passo importante.</h2>
          </div>
          <p className="muted">
            Com o crescimento da demanda, a empresa mudou para o prédio próprio e ampliou a operação.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container showcase-grid">
          <article className="glass-card spotlight-card">
            <p className="eyebrow">Missão</p>
            <h3>Oferecer soluções técnicas com qualidade, agilidade e confiança.</h3>
          </article>

          <article className="glass-card spotlight-card">
            <p className="eyebrow">Valores</p>
            <ul className="simple-list">
              {values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
