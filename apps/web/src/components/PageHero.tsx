import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div className="stack">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{description}</p>
        </div>
        {children ? <div className="glass-card hero-side-card">{children}</div> : null}
      </div>
    </section>
  );
}
