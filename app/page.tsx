import Image from "next/image";
import Link from "next/link";

const personas = [
  {
    number: "01",
    name: "GCC / Enterprise",
    eyebrow: "For teams building capability",
    title: "Hire for readiness, not just resumes.",
    description:
      "Translate role demand into clear skills, then review talent with visible readiness evidence.",
    cta: "Enter as GCC",
    href: "/gcc",
    className: "persona-gcc",
    icon: "building"
  },
  {
    number: "02",
    name: "Talent",
    eyebrow: "For people ready to grow",
    title: "See your gap. Build your next step.",
    description:
      "Understand the skills a role needs, strengthen what is missing and show what you can do.",
    cta: "Enter as Talent",
    href: "/talent",
    className: "persona-talent",
    icon: "spark"
  },
  {
    number: "03",
    name: "System Integrator",
    eyebrow: "For delivery and talent partners",
    title: "Turn the bench into deployable capability.",
    description:
      "Connect confirmed demand with candidate pipelines, focused preparation and readiness tracking.",
    cta: "Enter as SI",
    href: "/si",
    className: "persona-si",
    icon: "network"
  }
];

const tickerMessages = [
  "Demand first. Source against real roles.",
  "Skill maps that make the gap visible.",
  "Recognise prior learning as evidence.",
  "Prepare people for the work ahead.",
  "Readiness built around GCC requirements.",
  "Rural talent. Global impact."
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="arrow-icon">
      <path d="M4.75 12h14.5M13 5.75 19.25 12 13 18.25" />
    </svg>
  );
}

function PersonaIcon({ type }: { type: string }) {
  if (type === "building") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className="persona-icon">
        <path d="M8 39V16l12-7v30M20 39V5l20 8v26M4 39h40" />
        <path d="M13 21h2m-2 6h2m-2 6h2M26 17h3m-3 7h3m-3 7h3m6-12h2m-2 7h2m-2 7h2" />
      </svg>
    );
  }
  if (type === "spark") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className="persona-icon">
        <path d="M24 5 28.7 18.3 42 23l-13.3 4.7L24 41l-4.7-13.3L6 23l13.3-4.7L24 5Z" />
        <path d="m38 4 1.6 4.4L44 10l-4.4 1.6L38 16l-1.6-4.4L32 10l4.4-1.6L38 4Z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="persona-icon">
      <circle cx="24" cy="9" r="5" />
      <circle cx="9" cy="35" r="5" />
      <circle cx="39" cy="35" r="5" />
      <path d="M24 14v8M9 30v-8h30v8M9 22l15 7 15-7" />
    </svg>
  );
}

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="GraminGCC home">
      <Image
        src="/gramingcc-mark.svg"
        alt=""
        width={46}
        height={46}
        priority
        className="brand-mark"
      />
      <span className="brand-copy">
        <span className="brand-name">
          Gramin<span>GCC</span>
        </span>
        <span className="brand-tagline">RURAL TALENT. GLOBAL IMPACT.</span>
      </span>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#approach">Our approach</a>
          <a href="#personas">Choose your path</a>
          <a className="nav-cta" href="#personas">
            Explore the platform <ArrowIcon />
          </a>
        </nav>
        <a className="mobile-menu-link" href="#personas">
          Choose your path <ArrowIcon />
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> THE GCC READINESS PLATFORM</div>
          <h1 id="hero-title">
            Talent is everywhere.
            <span>Readiness is the bridge.</span>
          </h1>
          <p className="hero-description">
            We connect real GCC demand with people who are prepared to meet it —
            through skill mapping, focused preparation and evidence of readiness.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#personas">
              Find your workspace <ArrowIcon />
            </a>
            <a className="text-link" href="#approach">See how it works <span>↓</span></a>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars" aria-hidden="true">
              <span>G</span><span>T</span><span>S</span>
            </div>
            <p><strong>One connected journey.</strong><br />Three perspectives. Shared readiness.</p>
          </div>
        </div>

        <div className="hero-art" aria-label="Illustration of talent, skills and global work connected together">
          <div className="art-glow" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="art-label label-demand"><span className="label-dot dot-orange" /> REAL DEMAND</div>
          <div className="art-label label-skills"><span className="label-dot dot-lime" /> PROVEN SKILLS</div>
          <div className="art-label label-opportunity"><span className="label-dot dot-mint" /> GLOBAL OPPORTUNITY</div>
          <div className="landscape">
            <div className="landscape-sun" />
            <div className="hill hill-back" />
            <div className="hill hill-front" />
            <div className="city city-back"><i /><i /><i /><i /><i /></div>
            <div className="city city-front"><i /><i /><i /></div>
            <div className="tree tree-one"><b /><b /><b /><b /><em /></div>
            <div className="tree tree-two"><b /><b /><b /><em /></div>
            <div className="person person-one"><i /><b /></div>
            <div className="person person-two"><i /><b /></div>
            <div className="pathway" />
          </div>
          <div className="readiness-card">
            <div className="readiness-card-top">
              <span className="readiness-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg></span>
              <span>THE READINESS LOOP</span>
              <span className="live-dot" />
            </div>
            <div className="readiness-steps">
              <div><span>01</span><b>Map skills</b></div>
              <div><span>02</span><b>Close gaps</b></div>
              <div><span>03</span><b>Show readiness</b></div>
            </div>
            <div className="readiness-progress"><span /></div>
            <p>Built around the role. Not just the résumé.</p>
          </div>
          <span className="art-spark spark-a">✳</span>
          <span className="art-spark spark-b">✳</span>
        </div>
        <div className="hero-index"><span>01</span><span className="index-line" /><span>READINESS, REIMAGINED</span></div>
      </section>

      <section className="persona-section" id="personas" aria-labelledby="personas-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">START WHERE YOU BELONG</div>
            <h2 id="personas-title">What brings you here?</h2>
          </div>
          <p>Choose your role to enter a workspace built around your goals.</p>
        </div>
        <div className="persona-grid">
          {personas.map((persona) => (
            <article className={`persona-card ${persona.className}`} key={persona.href}>
              <div className="persona-card-top">
                <span className="persona-number">{persona.number}</span>
                <span className="persona-symbol"><PersonaIcon type={persona.icon} /></span>
              </div>
              <p className="persona-eyebrow">{persona.eyebrow}</p>
              <h3>{persona.name}</h3>
              <h4>{persona.title}</h4>
              <p className="persona-description">{persona.description}</p>
              <Link className="persona-link" href={persona.href}>
                {persona.cta} <ArrowIcon />
              </Link>
              <span className="card-decoration" aria-hidden="true" />
            </article>
          ))}
        </div>
        <p className="persona-note"><span className="note-lock">↗</span> This is a demo experience. Persona workspaces are being built; sign-in and live integrations are not enabled yet.</p>
      </section>

      <section className="approach-section" id="approach" aria-labelledby="approach-title">
        <div className="approach-intro">
          <div className="eyebrow eyebrow-light">A DIFFERENT KIND OF TALENT PLATFORM</div>
          <h2 id="approach-title">We don’t just find talent.<br /><span>We help make talent ready.</span></h2>
          <p>Access is not the whole problem. The missing link is deployment-readiness — made visible, built deliberately and connected to confirmed demand.</p>
          <a href="#personas" className="approach-link">Explore the three workspaces <ArrowIcon /></a>
        </div>
        <div className="approach-flow">
          <div className="flow-step">
            <span className="flow-number">01</span>
            <span className="flow-icon">⌕</span>
            <h3>Start with demand</h3>
            <p>Understand the role and the skills it really needs.</p>
          </div>
          <div className="flow-connector" aria-hidden="true">→</div>
          <div className="flow-step">
            <span className="flow-number">02</span>
            <span className="flow-icon">⌘</span>
            <h3>Map the gap</h3>
            <p>Compare requirements with skills and existing evidence.</p>
          </div>
          <div className="flow-connector" aria-hidden="true">→</div>
          <div className="flow-step">
            <span className="flow-number">03</span>
            <span className="flow-icon">↗</span>
            <h3>Build readiness</h3>
            <p>Focus preparation on the capability that is missing.</p>
          </div>
          <div className="flow-connector" aria-hidden="true">→</div>
          <div className="flow-step">
            <span className="flow-number">04</span>
            <span className="flow-icon">◎</span>
            <h3>Connect to work</h3>
            <p>Make readiness easier to review across the journey.</p>
          </div>
        </div>
        <div className="approach-footnote"><span>DEMAND-LED</span><span>SKILL-BASED</span><span>EVIDENCE-INFORMED</span><span>BUILT FOR CONTINUOUS GROWTH</span></div>
      </section>

      <section className="closing-section">
        <div className="closing-mark"><Image src="/gramingcc-mark.svg" alt="" width={58} height={58} /></div>
        <div>
          <div className="eyebrow">THE FUTURE OF GCC READINESS</div>
          <h2>Where you start should not limit <span>where you can go.</span></h2>
        </div>
        <a href="#personas" className="button button-dark">Choose your path <ArrowIcon /></a>
      </section>

      <footer className="site-footer">
        <Brand />
        <p>Skills have no pin code. Opportunity shouldn’t either.</p>
        <span>© 2026 GraminGCC · MVP preview</span>
      </footer>

      <div className="ticker" role="region" aria-label="GraminGCC platform highlights">
        <div className="ticker-label"><span className="ticker-star">✳</span> THE GRAMINGCC DIFFERENCE</div>
        <div className="ticker-window">
          <div className="ticker-track">
            {[...tickerMessages, ...tickerMessages].map((message, index) => (
              <span className="ticker-item" key={`${message}-${index}`}>
                <span className="ticker-bullet">✳</span>{message}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}