import { useState, useEffect } from "react";

const AZUL = "#0D2B45";
const TERRACOTA = "#C8774F";
const VERDE = "#2D6A4F";
const CREMA = "#F7F5F0";
const BLANCO = "#FFFFFF";

const globalStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @media (max-width: 768px) {
    .grid-2 { grid-template-columns: 1fr !important; gap: 40px !important; }
    .grid-3 { grid-template-columns: 1fr !important; }
    .grid-4 { grid-template-columns: 1fr 1fr !important; }
    .grid-2-partners { grid-template-columns: 1fr !important; }
    .grid-footer { grid-template-columns: 1fr !important; gap: 32px !important; }
    .nav-links { display: none !important; }
    .section-pad { padding: 60px 16px !important; }
    .hero-pad { padding: 100px 16px 100px !important; }
    .hero-h1 { font-size: 36px !important; }
  }
  @media (max-width: 1024px) and (min-width: 769px) {
    .grid-3 { grid-template-columns: 1fr 1fr !important; }
    .grid-4 { grid-template-columns: 1fr 1fr !important; }
    .grid-footer { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
  }
`;

const content = {
  es: {
    nav: { about: "Nosotros", programs: "Programas", destinations: "Destinos", partners: "Partners", contact: "Contacto" },
    hero: {
      tag: "TURISMO CIENTÍFICO Y ACADÉMICO",
      headline: "Donde la Ciencia Encuentra su Territorio",
      subheadline: "Conectamos universidades, centros de investigación y académicos de todo el mundo con los laboratorios naturales únicos de Chile, donde la investigación, los proyectos y la ciencia se encuentran con el estudio y el futuro.",
      cta: "Diseñar Mi Programa",
      ctaSecondary: "Explorar Programas",
    },
    stats: [
      { value: "50+", label: "Años de Legado Familiar" },
      { value: "3", label: "Generaciones en Turismo" },
      { value: "Chile", label: "Laboratorio Natural Único" },
      { value: "360°", label: "Servicio Integrado" },
    ],
    about: {
      tag: "NUESTRA HISTORIA",
      title: "Tres Generaciones Conectando el Conocimiento con Chile",
      p1: "Australis Connections nace de una tradición familiar de más de 50 años en turismo receptivo chileno. Nuestro legado comenzó con Sergio Nin (Sergio Nin de Cardona Valenzuela), co-fundador de Sportstour, uno de los operadores de turismo receptivo más importantes de Chile en su época.",
      p2: "Hoy, Alcides (hijo) y Sergio (nieto) lideran un proyecto que integra esa experiencia con una visión innovadora: transformar Chile en el destino número uno para programas académicos y científicos internacionales, conectando universidades e investigadores extranjeros con los laboratorios naturales únicos del país.",
      p3: "Nuestro modelo es simple y poderoso: diseñamos, coordinamos y garantizamos la excelencia de cada programa. Tercerizamos la operación con los mejores proveedores del país, con quienes tenemos tarifas preferenciales construidas durante décadas de relación profesional.",
      features: [
        "Red de proveedores con tarifas preferenciales negociadas",
        "Acceso a observatorios NOIRLab, ESO La Silla y CEAZA",
        "Programas de fauna silvestre con monitoreo científico activo",
        "Diseño curricular a medida para cada institución",
        "Cotización automática con sistema IA propio",
        "Servicio de excelencia en cada detalle del programa",
      ],
    },
    programs: {
      tag: "PROGRAMAS ACADÉMICOS",
      title: "Ciencia Viva en el Territorio Más Diverso del Planeta",
      subtitle: "Cada programa es diseñado a medida, integrando acceso exclusivo a sitios de investigación, expertos locales y la red académica más sólida de Chile.",
      items: [
        {
          icon: "🦊",
          title: "Zorro Chilote",
          subtitle: "Conservación y Fauna Silvestre",
          description: "Programa insignia de Australis Connections. Monitoreo activo del Zorro Chilote (Lycalopex fulvipes), una de las especies más raras y amenazadas del mundo. Trabajo en terreno con nuestro equipo científico en Chiloé.",
          highlight: "Programa exclusivo en el mundo",
        },
        {
          icon: "🔭",
          title: "Astronomía Austral",
          subtitle: "Observatorios de Clase Mundial",
          description: "Visitas diurnas coordinadas a NOIRLab/Cerro Tololo, ESO La Silla y observatorios privados en el norte de Chile. Reuniones con astrónomos activos, recorridos por las instalaciones y observación nocturna en telescopios privados habilitados para visitas.",
          highlight: "El cielo más limpio del planeta",
        },
        {
          icon: "🌋",
          title: "Geología & Vulcanología",
          subtitle: "Laboratorios Naturales a Cielo Abierto",
          description: "Desde el desierto de Atacama hasta los volcanes activos del sur. Muestreo en terreno, monitoreo sísmico y trabajo conjunto con geólogos del SERNAGEOMIN en zonas de acceso restringido.",
          highlight: "Acceso a zonas de investigación activa",
        },
        {
          icon: "🌊",
          title: "Oceanografía & Biodiversidad Marina",
          subtitle: "Corriente de Humboldt",
          description: "Expediciones en uno de los sistemas oceánicos más productivos del planeta. Colaboración con CEAZA, ESMOI y centros de investigación marina en los fiordos patagónicos y el Archipiélago de Humboldt.",
          highlight: "Ecosistema marino único en el mundo",
        },
        {
          icon: "🌿",
          title: "Ecosistemas & Medio Ambiente",
          subtitle: "Desde Atacama hasta la Patagonia",
          description: "Programas de campo en los ecosistemas más extremos y diversos del planeta: bosque valdiviano, desierto florido, glaciares patagónicos, bosque de araucarias y ecosistemas costeros.",
          highlight: "4.300 km de diversidad ecológica",
        },
        {
          icon: "🏛️",
          title: "Programas Taylor Made",
          subtitle: "Diseño a Medida Total",
          description: "Para grupos FIT (2 a 4 personas), investigadores independientes o instituciones con requerimientos específicos. Desde expediciones a la Antártida hasta programas interdisciplinarios que combinan múltiples áreas científicas. Cada programa, diseñado desde cero.",
          highlight: "Sin límites en el diseño del programa",
        },
      ],
    },
    destinations: {
      tag: "TERRITORIO DE ESTUDIO",
      title: "Chile: El Laboratorio Natural Más Diverso del Planeta",
      subtitle: "4.300 kilómetros que concentran desiertos, volcanes, glaciares, fiordos, bosques templados y cielos de clase mundial.",
      items: [
        { name: "Desierto de Atacama", desc: "Astronomía, geología extrema, salares y el cielo más limpio del mundo.", emoji: "🌵" },
        { name: "Región de Coquimbo", desc: "Observatorios mundiales, ecosistemas semiáridos, fauna costera y CEAZA.", emoji: "⭐" },
        { name: "Zona Central", desc: "Geología andina, viñedos científicos, geomorfología y bosques nativos.", emoji: "🍇" },
        { name: "Chiloé & Los Lagos", desc: "Fauna silvestre endémica, ecosistemas húmedos y el Zorro Chilote.", emoji: "🦊" },
        { name: "Patagonia", desc: "Glaciares, geología del granito, ecología de estepa y biodiversidad única.", emoji: "🏔️" },
        { name: "Antártida", desc: "Expediciones científicas al continente blanco. Programa Taylor Made exclusivo.", emoji: "🧊" },
      ],
    },
    partners: {
      tag: "ALIANZAS CIENTÍFICAS",
      title: "Conectados con la Ciencia de Clase Mundial",
      subtitle: "Nuestros programas están respaldados por alianzas con las instituciones científicas más importantes de Chile.",
      items: [
        { name: "NOIRLab / Cerro Tololo", desc: "Observatorio inter-americano. Acceso a telescopios de clase mundial en el norte de Chile.", status: "Conversaciones avanzadas" },
        { name: "ESO La Silla", desc: "Observatorio Europeo Austral. Programas de astronomía con acceso a instalaciones únicas.", status: "Conversaciones iniciales" },
        { name: "CEAZA", desc: "Centro de Estudios Avanzados en Zonas Áridas. Investigación ambiental y climática regional.", status: "Acercamiento institucional" },
        { name: "CEDUC UCN", desc: "Centro de Educación Continua. Programa Travesía activo. Entidad patrocinadora CORFO.", status: "Alianza activa" },
      ],
    },
    model: {
      tag: "NUESTRO MODELO",
      title: "Simple, Eficiente y de Alta Calidad",
      steps: [
        { n: "01", title: "Diseñamos", desc: "Creamos el programa académico a medida según los objetivos de aprendizaje de tu institución." },
        { n: "02", title: "Coordinamos", desc: "Activamos nuestra red de proveedores con tarifas preferenciales y expertos científicos locales." },
        { n: "03", title: "Garantizamos", desc: "Supervisamos cada detalle de la operación para asegurar una experiencia de excelencia absoluta." },
        { n: "04", title: "Cotizamos", desc: "Nuestro sistema con IA genera cotizaciones automáticas en minutos, precisas y competitivas." },
      ],
    },
    cta: {
      headline: "Tu Próximo Programa Académico Comienza Aquí",
      paragraph: "No dejes tu próximo programa de campo en manos de un operador convencional. Conversemos sobre tus objetivos académicos y diseñemos juntos una experiencia que tus estudiantes, profesores e investigadores recordarán toda la vida.",
      button: "Contactar un Especialista",
      trust: "Respuesta en menos de 24 horas. Cotización sin compromiso.",
    },
    footer: {
      desc: "Conectando universidades, investigadores y académicos de todo el mundo con los laboratorios naturales únicos de Chile. Tres generaciones de legado al servicio de la ciencia.",
      email: "info@australisconnections.com",
      phone: "+56 9 9163 0884",
      address: "Ovalle, Región de Coquimbo, Chile",
      rights: "© 2026 Australis Connections. Todos los derechos reservados.",
    },
    contact: {
      title: "Diseñemos Tu Programa",
      subtitle: "Cuéntanos sobre tu institución y objetivos académicos.",
      name: "Nombre",
      lastname: "Apellido",
      email: "Email institucional",
      institution: "Universidad / Institución",
      interest: "Área de interés",
      message: "Cuéntanos sobre tu programa",
      send: "Enviar Solicitud",
      thanks: "¡Gracias! Nos contactaremos pronto.",
      interests: ["Astronomía", "Zorro Chilote / Fauna Silvestre", "Geología & Vulcanología", "Oceanografía & Biodiversidad Marina", "Ecosistemas & Medio Ambiente", "Programa Taylor Made"],
    },
  },
  en: {
    nav: { about: "About", programs: "Programs", destinations: "Destinations", partners: "Partners", contact: "Contact" },
    hero: {
      tag: "SCIENTIFIC & ACADEMIC TRAVEL",
      headline: "Where Science Meets Its Territory",
      subheadline: "We connect universities, research centers and academics worldwide with Chile's unique natural laboratories, where investigation, projects and science meets the studies and future.",
      cta: "Design My Program",
      ctaSecondary: "Explore Programs",
    },
    stats: [
      { value: "50+", label: "Years of Family Legacy" },
      { value: "3", label: "Generations in Tourism" },
      { value: "Chile", label: "Unique Natural Laboratory" },
      { value: "360°", label: "Integrated Service" },
    ],
    about: {
      tag: "OUR STORY",
      title: "Three Generations Connecting Knowledge with Chile",
      p1: "Australis Connections was born from a family tradition of more than 50 years in Chilean incoming tourism. Our legacy began with Sergio Nin (Sergio Nin de Cardona Valenzuela), co-founder of Sportstour, one of Chile's most important incoming tourism operators of its era.",
      p2: "Today, Alcides (son) and Sergio (grandson) lead a project that integrates that experience with an innovative vision: making Chile the number one destination for international academic and scientific programs, connecting foreign universities, researchers and academics with the country's unique natural laboratories.",
      p3: "Our model is simple and powerful: we design, coordinate and guarantee the excellence of every program. We outsource operations to the country's best providers, with whom we hold preferential rates built over decades of professional relationships.",
      features: [
        "Provider network with negotiated preferential rates",
        "Access to NOIRLab, ESO La Silla and CEAZA observatories",
        "Wildlife programs with active scientific monitoring",
        "Custom curriculum design for each institution",
        "Automatic quoting with proprietary AI system",
        "Excellence in every detail of your program",
      ],
    },
    programs: {
      tag: "ACADEMIC PROGRAMS",
      title: "Living Science in the Planet's Most Diverse Territory",
      subtitle: "Every program is tailor-made, integrating exclusive access to research sites, local experts and Chile's most solid academic network.",
      items: [
        {
          icon: "🦊",
          title: "Darwin's Fox",
          subtitle: "Conservation & Wildlife",
          description: "Australis Connections' flagship program. Active monitoring of the Darwin's Fox (Lycalopex fulvipes), one of the rarest and most endangered species in the world. Field work with our scientific team in Chiloé.",
          highlight: "Exclusive program in the world",
        },
        {
          icon: "🔭",
          title: "Austral Astronomy",
          subtitle: "World-Class Observatories",
          description: "Daytime coordinated visits to NOIRLab/Cerro Tololo, ESO La Silla and private observatories in northern Chile. Meetings with active astronomers, facility tours and night observation at private telescopes enabled for educational visits.",
          highlight: "The cleanest sky on the planet",
        },
        {
          icon: "🌋",
          title: "Geology & Volcanology",
          subtitle: "Open-Air Natural Laboratories",
          description: "From the Atacama Desert to the active volcanoes of the south. Field sampling, seismic monitoring and joint work with SERNAGEOMIN geologists in restricted-access zones.",
          highlight: "Access to active research zones",
        },
        {
          icon: "🌊",
          title: "Oceanography & Marine Biodiversity",
          subtitle: "Humboldt Current System",
          description: "Expeditions in one of the planet's most productive ocean systems. Collaboration with CEAZA, ESMOI and marine research centers in Patagonian fjords and the Humboldt Archipelago.",
          highlight: "Unique marine ecosystem in the world",
        },
        {
          icon: "🌿",
          title: "Ecosystems & Environment",
          subtitle: "From Atacama to Patagonia",
          description: "Field programs in the planet's most extreme and diverse ecosystems: Valdivian forest, blooming desert, Patagonian glaciers, araucaria forests and coastal ecosystems.",
          highlight: "4,300 km of ecological diversity",
        },
        {
          icon: "🏛️",
          title: "Taylor Made Programs",
          subtitle: "Total Custom Design",
          description: "For FIT groups (2 to 4 people), independent researchers or institutions with specific requirements. From Antarctic expeditions to interdisciplinary programs combining multiple scientific fields. Every program, designed from scratch.",
          highlight: "No limits in program design",
        },
      ],
    },
    destinations: {
      tag: "STUDY TERRITORY",
      title: "Chile: The Planet's Most Diverse Natural Laboratory",
      subtitle: "4,300 kilometers concentrating deserts, volcanoes, glaciers, fjords, temperate forests and world-class skies.",
      items: [
        { name: "Atacama Desert", desc: "Astronomy, extreme geology, salt flats and the world's cleanest sky.", emoji: "🌵" },
        { name: "Coquimbo Region", desc: "World observatories, semi-arid ecosystems, coastal fauna and CEAZA.", emoji: "⭐" },
        { name: "Central Chile", desc: "Andean geology, scientific vineyards, geomorphology and native forests.", emoji: "🍇" },
        { name: "Chiloé & Los Lagos", desc: "Endemic wildlife, humid ecosystems and the Darwin's Fox.", emoji: "🦊" },
        { name: "Patagonia", desc: "Glaciers, granite geology, steppe ecology and unique biodiversity.", emoji: "🏔️" },
        { name: "Antarctica", desc: "Scientific expeditions to the white continent. Exclusive Taylor Made program.", emoji: "🧊" },
      ],
    },
    partners: {
      tag: "SCIENTIFIC ALLIANCES",
      title: "Connected with World-Class Science",
      subtitle: "Our programs are backed by alliances with Chile's most important scientific institutions.",
      items: [
        { name: "NOIRLab / Cerro Tololo", desc: "Inter-American Observatory. Access to world-class telescopes in northern Chile.", status: "Advanced conversations" },
        { name: "ESO La Silla", desc: "European Southern Observatory. Astronomy programs with access to unique facilities.", status: "Initial conversations" },
        { name: "CEAZA", desc: "Center for Advanced Studies in Arid Zones. Regional environmental and climate research.", status: "Institutional approach" },
        { name: "CEDUC UCN", desc: "Continuing Education Center. Active Travesía program. CORFO sponsoring entity.", status: "Active alliance" },
      ],
    },
    model: {
      tag: "OUR MODEL",
      title: "Simple, Efficient and High Quality",
      steps: [
        { n: "01", title: "We Design", desc: "We create the custom academic program based on your institution's learning objectives." },
        { n: "02", title: "We Coordinate", desc: "We activate our network of providers with preferential rates and local scientific experts." },
        { n: "03", title: "We Guarantee", desc: "We supervise every detail of the operation to ensure an absolutely excellent experience." },
        { n: "04", title: "We Quote", desc: "Our AI system generates automatic quotes in minutes, precise and competitive." },
      ],
    },
    cta: {
      headline: "Your Next Academic Program Starts Here",
      paragraph: "Don't leave your next field program in the hands of a conventional operator. Let's talk about your academic goals and design together an experience your students, professors and researchers will remember for a lifetime.",
      button: "Contact a Specialist",
      trust: "Response within 24 hours. No-obligation quote.",
    },
    footer: {
      desc: "Connecting universities, researchers and academics worldwide with Chile's unique natural laboratories. Three generations of legacy in service of science.",
      email: "info@australisconnections.com",
      phone: "+56 9 9163 0884",
      address: "Ovalle, Coquimbo Region, Chile",
      rights: "© 2026 Australis Connections. All rights reserved.",
    },
    contact: {
      title: "Let's Design Your Program",
      subtitle: "Tell us about your institution and academic goals.",
      name: "First Name",
      lastname: "Last Name",
      email: "Institutional email",
      institution: "University / Institution",
      interest: "Area of interest",
      message: "Tell us about your program",
      send: "Send Request",
      thanks: "Thank you! We will contact you soon.",
      interests: ["Astronomy", "Darwin's Fox / Wildlife", "Geology & Volcanology", "Oceanography & Marine Biodiversity", "Ecosystems & Environment", "Taylor Made Program"],
    },
  },
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const t = content[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setContactOpen(false); setSent(false); }, 2000);
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: CREMA, color: "#1A1A1A", minHeight: "100vh" }}>
      <style>{globalStyles}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.3s ease",
        padding: scrolled ? "12px 0" : "20px 0",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img
              src="/logo.png"
              alt="Australis Connections"
              style={{
                height: scrolled ? 52 : 64,
                width: "auto",
                transition: "height 0.3s ease",
                filter: scrolled ? "none" : "brightness(0) invert(1)",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {["about","programs","destinations","partners","contact"].map(k => (
                <button key={k} onClick={() => scrollTo(k)} style={{
                  background: "none", border: "none", cursor: "pointer", fontSize: 12, fontFamily: "'Arial', sans-serif",
                  color: scrolled ? "#333" : "rgba(255,255,255,0.9)", letterSpacing: 1, fontWeight: 500,
                  textTransform: "uppercase", padding: 0,
                }}>{t.nav[k]}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 4, borderLeft: "1px solid rgba(128,128,128,0.3)", paddingLeft: 12, flexShrink: 0 }}>
              {["es","en"].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  background: lang === l ? TERRACOTA : "transparent",
                  color: lang === l ? BLANCO : (scrolled ? "#555" : "rgba(255,255,255,0.7)"),
                  border: lang === l ? "none" : `1px solid ${scrolled ? "#ccc" : "rgba(255,255,255,0.4)"}`,
                  cursor: "pointer", padding: "5px 12px", borderRadius: 4,
                  fontSize: 12, fontWeight: 700, fontFamily: "'Arial', sans-serif",
                  minWidth: 36,
                }}>{l.toUpperCase()}</button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: `linear-gradient(135deg, ${AZUL} 0%, #1a4a6e 50%, ${VERDE} 100%)`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(200,119,79,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(45,106,79,0.2) 0%, transparent 50%)",
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 780 }}>
            <div style={{
              display: "inline-block", background: "rgba(200,119,79,0.2)", border: "1px solid rgba(200,119,79,0.4)",
              color: TERRACOTA, padding: "6px 16px", borderRadius: 2, fontSize: 11,
              letterSpacing: 3, fontFamily: "'Arial', sans-serif", marginBottom: 32,
            }}>{t.hero.tag}</div>
            <h1 style={{
              fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 700, color: BLANCO,
              lineHeight: 1.1, marginBottom: 24, letterSpacing: -1,
            }}>{t.hero.headline}</h1>
            <p style={{
              fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.7,
              maxWidth: 600, marginBottom: 48, fontFamily: "'Arial', sans-serif", fontWeight: 300,
            }}>{t.hero.subheadline}</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => setContactOpen(true)} style={{
                background: TERRACOTA, color: BLANCO, border: "none", cursor: "pointer",
                padding: "16px 36px", fontSize: 15, fontFamily: "'Arial', sans-serif", fontWeight: 600,
                borderRadius: 4, letterSpacing: 0.5,
                boxShadow: "0 8px 32px rgba(200,119,79,0.4)",
              }}>{t.hero.cta}</button>
              <button onClick={() => scrollTo("programs")} style={{
                background: "transparent", color: BLANCO, border: "2px solid rgba(255,255,255,0.4)",
                cursor: "pointer", padding: "16px 36px", fontSize: 15,
                fontFamily: "'Arial', sans-serif", fontWeight: 600, borderRadius: 4, letterSpacing: 0.5,
              }}>{t.hero.ctaSecondary}</button>
            </div>
          </div>
        </div>
        {/* Stats bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
            {t.stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: TERRACOTA }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "'Arial', sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", background: BLANCO }}>
        <div className="grid-2" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ color: TERRACOTA, fontSize: 11, fontFamily: "'Arial', sans-serif", letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>{t.about.tag}</div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700, color: AZUL, lineHeight: 1.2, marginBottom: 24 }}>{t.about.title}</h2>
            <p style={{ color: "#555", lineHeight: 1.8, marginBottom: 16, fontFamily: "'Arial', sans-serif", fontSize: 15 }}>{t.about.p1}</p>
            <p style={{ color: "#555", lineHeight: 1.8, marginBottom: 16, fontFamily: "'Arial', sans-serif", fontSize: 15 }}>{t.about.p2}</p>
            <p style={{ color: "#555", lineHeight: 1.8, marginBottom: 32, fontFamily: "'Arial', sans-serif", fontSize: 15 }}>{t.about.p3}</p>
          </div>
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {t.about.features.map((f, i) => (
                <div key={i} style={{
                  background: CREMA, padding: "16px 20px", borderRadius: 8,
                  borderLeft: `3px solid ${TERRACOTA}`, fontSize: 13,
                  fontFamily: "'Arial', sans-serif", color: "#444", lineHeight: 1.5,
                }}>✓ {f}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" style={{ padding: "100px 24px", background: CREMA }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: TERRACOTA, fontSize: 11, fontFamily: "'Arial', sans-serif", letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>{t.programs.tag}</div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700, color: AZUL, marginBottom: 16 }}>{t.programs.title}</h2>
            <p style={{ color: "#666", maxWidth: 600, margin: "0 auto", fontFamily: "'Arial', sans-serif", lineHeight: 1.7 }}>{t.programs.subtitle}</p>
          </div>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {t.programs.items.map((p, i) => (
              <div key={i} style={{
                background: BLANCO, borderRadius: 12, padding: 32, position: "relative",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                borderTop: `4px solid ${i === 0 ? TERRACOTA : i === 1 ? AZUL : VERDE}`,
                transition: "transform 0.2s ease",
              }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{p.icon}</div>
                <div style={{ fontSize: 11, color: TERRACOTA, fontFamily: "'Arial', sans-serif", letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>{p.subtitle}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: AZUL, marginBottom: 12 }}>{p.title}</h3>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, fontFamily: "'Arial', sans-serif", marginBottom: 16 }}>{p.description}</p>
                <div style={{
                  background: `${TERRACOTA}15`, color: TERRACOTA, padding: "6px 12px",
                  borderRadius: 4, fontSize: 12, fontFamily: "'Arial', sans-serif", fontWeight: 600,
                  display: "inline-block",
                }}>★ {p.highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" style={{ padding: "100px 24px", background: AZUL }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: TERRACOTA, fontSize: 11, fontFamily: "'Arial', sans-serif", letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>{t.destinations.tag}</div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700, color: BLANCO, marginBottom: 16 }}>{t.destinations.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "0 auto", fontFamily: "'Arial', sans-serif", lineHeight: 1.7 }}>{t.destinations.subtitle}</p>
          </div>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {t.destinations.items.map((d, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: 28,
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{d.emoji}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: BLANCO, marginBottom: 8 }}>{d.name}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.6, fontFamily: "'Arial', sans-serif" }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODEL */}
      <section style={{ padding: "100px 24px", background: BLANCO }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: TERRACOTA, fontSize: 11, fontFamily: "'Arial', sans-serif", letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>{t.model.tag}</div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700, color: AZUL }}>{t.model.title}</h2>
          </div>
          <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {t.model.steps.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${TERRACOTA}, ${AZUL})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px", color: BLANCO, fontSize: 18, fontWeight: 700,
                  fontFamily: "'Arial', sans-serif",
                }}>{s.n}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: AZUL, marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, fontFamily: "'Arial', sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" style={{ padding: "100px 24px", background: CREMA }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: TERRACOTA, fontSize: 11, fontFamily: "'Arial', sans-serif", letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>{t.partners.tag}</div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700, color: AZUL, marginBottom: 16 }}>{t.partners.title}</h2>
            <p style={{ color: "#666", maxWidth: 600, margin: "0 auto", fontFamily: "'Arial', sans-serif", lineHeight: 1.7 }}>{t.partners.subtitle}</p>
          </div>
          <div className="grid-2-partners" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {t.partners.items.map((p, i) => (
              <div key={i} style={{
                background: BLANCO, borderRadius: 12, padding: 32,
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                display: "flex", gap: 24, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 8,
                  background: `linear-gradient(135deg, ${AZUL}, ${VERDE})`,
                  flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  color: BLANCO, fontSize: 20,
                }}>🔬</div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: AZUL, marginBottom: 8 }}>{p.name}</h3>
                  <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, fontFamily: "'Arial', sans-serif", marginBottom: 12 }}>{p.desc}</p>
                  <span style={{
                    background: `${VERDE}20`, color: VERDE, padding: "4px 12px",
                    borderRadius: 4, fontSize: 12, fontFamily: "'Arial', sans-serif", fontWeight: 600,
                  }}>● {p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{
        padding: "100px 24px", textAlign: "center",
        background: `linear-gradient(135deg, ${TERRACOTA} 0%, #a85a35 100%)`,
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: BLANCO, marginBottom: 20, lineHeight: 1.2 }}>{t.cta.headline}</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, lineHeight: 1.7, marginBottom: 40, fontFamily: "'Arial', sans-serif" }}>{t.cta.paragraph}</p>
          <button onClick={() => setContactOpen(true)} style={{
            background: BLANCO, color: TERRACOTA, border: "none", cursor: "pointer",
            padding: "18px 48px", fontSize: 16, fontFamily: "'Arial', sans-serif", fontWeight: 700,
            borderRadius: 4, marginBottom: 20, letterSpacing: 0.5,
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}>{t.cta.button}</button>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: "'Arial', sans-serif" }}>✓ {t.cta.trust}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a1f35", padding: "60px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid-footer" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: BLANCO, letterSpacing: 2, marginBottom: 4 }}>AUSTRALIS</div>
              <div style={{ fontSize: 11, color: TERRACOTA, letterSpacing: 4, marginBottom: 16 }}>CONNECTIONS</div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, fontFamily: "'Arial', sans-serif", maxWidth: 320 }}>{t.footer.desc}</p>
            </div>
            <div>
              <h4 style={{ color: BLANCO, fontSize: 14, fontWeight: 700, marginBottom: 16, fontFamily: "'Arial', sans-serif" }}>{lang === "es" ? "Contacto" : "Contact"}</h4>
              {[
                { icon: "✉", text: t.footer.email },
                { icon: "📞", text: t.footer.phone },
                { icon: "📍", text: t.footer.address },
              ].map((c, i) => (
                <div key={i} style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontFamily: "'Arial', sans-serif", marginBottom: 10 }}>
                  {c.icon} {c.text}
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ color: BLANCO, fontSize: 14, fontWeight: 700, marginBottom: 16, fontFamily: "'Arial', sans-serif" }}>{lang === "es" ? "Links" : "Links"}</h4>
              {["about","programs","destinations","partners","contact"].map(k => (
                <button key={k} onClick={() => scrollTo(k)} style={{
                  display: "block", background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.55)", fontSize: 13, fontFamily: "'Arial', sans-serif",
                  marginBottom: 8, padding: 0, textTransform: "capitalize",
                }}>{t.nav[k]}</button>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "'Arial', sans-serif" }}>{t.footer.rights}</p>
          </div>
        </div>
      </footer>

      {/* CONTACT MODAL */}
      {contactOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        }} onClick={() => setContactOpen(false)}>
          <div style={{
            background: BLANCO, borderRadius: 16, padding: 48, maxWidth: 520, width: "100%",
            maxHeight: "90vh", overflowY: "auto",
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: AZUL, marginBottom: 4 }}>{t.contact.title}</h3>
                <p style={{ color: "#888", fontSize: 14, fontFamily: "'Arial', sans-serif" }}>{t.contact.subtitle}</p>
              </div>
              <button onClick={() => setContactOpen(false)} style={{
                background: "none", border: "none", cursor: "pointer", fontSize: 24, color: "#aaa", lineHeight: 1,
              }}>×</button>
            </div>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: VERDE, fontSize: 18, fontWeight: 600 }}>
                ✓ {t.contact.thanks}
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[t.contact.name, t.contact.lastname].map((label, i) => (
                    <div key={i}>
                      <label style={{ fontSize: 12, color: "#555", fontFamily: "'Arial', sans-serif", fontWeight: 600, display: "block", marginBottom: 6 }}>{label}</label>
                      <input required style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, fontFamily: "'Arial', sans-serif", boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>
                {[t.contact.email, t.contact.institution].map((label, i) => (
                  <div key={i}>
                    <label style={{ fontSize: 12, color: "#555", fontFamily: "'Arial', sans-serif", fontWeight: 600, display: "block", marginBottom: 6 }}>{label}</label>
                    <input required type={i === 0 ? "email" : "text"} style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, fontFamily: "'Arial', sans-serif", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 12, color: "#555", fontFamily: "'Arial', sans-serif", fontWeight: 600, display: "block", marginBottom: 6 }}>{t.contact.interest}</label>
                  <select style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, fontFamily: "'Arial', sans-serif", boxSizing: "border-box" }}>
                    {t.contact.interests.map((opt, i) => <option key={i}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "#555", fontFamily: "'Arial', sans-serif", fontWeight: 600, display: "block", marginBottom: 6 }}>{t.contact.message}</label>
                  <textarea rows={4} style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, fontFamily: "'Arial', sans-serif", boxSizing: "border-box", resize: "vertical" }} />
                </div>
                <button type="submit" style={{
                  background: TERRACOTA, color: BLANCO, border: "none", cursor: "pointer",
                  padding: "14px", fontSize: 15, fontFamily: "'Arial', sans-serif", fontWeight: 700,
                  borderRadius: 6, marginTop: 8,
                }}>{t.contact.send}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
