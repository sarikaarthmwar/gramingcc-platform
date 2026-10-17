import Link from "next/link";
import Image from "next/image";

type PersonaPortalProps = {
  persona: "GCC / Enterprise" | "Talent" | "System Integrator";
  description: string;
  features: string[];
};

export default function PersonaPortal({
  persona,
  description,
  features
}: PersonaPortalProps) {
  return (
    <main className="portal-shell">
      <header className="site-header portal-header">
        <Link className="brand" href="/" aria-label="GraminGCC home">
          <Image src="/gramingcc-mark.svg" alt="" width={46} height={46} priority className="brand-mark" />
          <span className="brand-copy">
            <span className="brand-name">Gramin<span>GCC</span></span>
            <span className="brand-tagline">RURAL TALENT. GLOBAL IMPACT.</span>
          </span>
        </Link>
        <Link href="/" className="portal-home-link">← Back to homepage</Link>
      </header>
      <section className="portal-preview">
        <span className="portal-kicker"><span className="eyebrow-dot" /> PERSONA WORKSPACE PREVIEW</span>
        <div className="portal-mark"><Image src="/gramingcc-mark.svg" alt="" width={76} height={76} /></div>
        <h1>{persona}</h1>
        <p className="portal-description">{description}</p>
        <div className="portal-status"><span /> Workspace in progress</div>
        <div className="portal-feature-list">
          {features.map((feature, index) => (
            <div className="portal-feature" key={feature}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{feature}</p>
              <span className="portal-feature-arrow">↗</span>
            </div>
          ))}
        </div>
        <p className="portal-disclaimer">This preview uses no live candidate data, authentication or external integrations yet.</p>
        <Link href="/" className="button button-primary"><span>Return to GraminGCC</span><span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}