import { useState, useEffect } from "react";

const AZUL = "#0D2B45";
const TERRACOTA = "#C8774F";
const VERDE = "#2D6A4F";
const CREMA = "#F7F5F0";
const BLANCO = "#FFFFFF";

const ICON_PATHS = {
  fox: (
    <>
      <path d="M4 8 L8 2 L9.5 8" />
      <path d="M20 8 L16 2 L14.5 8" />
      <path d="M4 8 C4 15 8 19 12 19 C16 19 20 15 20 8 C17 6.5 14 6 12 6 C10 6 7 6.5 4 8 Z" />
      <circle cx="9.3" cy="11.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="11.5" r="0.6" fill="currentColor" stroke="none" />
      <path d="M11 14 L13 14 L12 15.4 Z" fill="currentColor" stroke="none" />
    </>
  ),
  telescope: (
    <>
      <path d="M13.5 3 L15 6.4 L18.5 6.8 L16 9.1 L16.7 12.5 L13.5 10.7 L10.3 12.5 L11 9.1 L8.5 6.8 L12 6.4 Z" fill="currentColor" stroke="none" />
      <path d="M2 20 L8 11 L11 15 L14 9 L22 20 Z" />
    </>
  ),
  volcano: (
    <>
      <path d="M3 19 L8 9 L10 12 L13 6 L15 9 L13 12 L18 19 Z" />
      <circle cx="13" cy="3.4" r="1" />
    </>
  ),
  wave: (
    <>
      <path d="M2 9 C4 6 6 6 8 9 C10 12 12 12 14 9 C16 6 18 6 20 9 C21 10 22 10 22 10" />
      <path d="M2 15 C4 12 6 12 8 15 C10 18 12 18 14 15 C16 12 18 12 20 15" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20 C4 20 4 4 20 4 C20 4 20 20 4 20 Z" />
      <line x1="4" y1="20" x2="18" y2="6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="5" r="1.5" />
      <line x1="12" y1="6.5" x2="7" y2="20" />
      <line x1="12" y1="6.5" x2="17" y2="20" />
      <line x1="9.2" y1="13" x2="14.8" y2="13" />
    </>
  ),
  cactus: (
    <>
      <path d="M12 21 L12 5 Q12 3 14 3 Q16 3 16 5 L16 9" />
      <path d="M12 13 Q8 13 8 10 L8 6" />
    </>
  ),
  star: (
    <path d="M12 3 L14.2 9.4 L21 9.9 L15.7 14.1 L17.6 21 L12 17 L6.4 21 L8.3 14.1 L3 9.9 L9.8 9.4 Z" />
  ),
  grapes: (
    <>
      <circle cx="9" cy="14" r="2" />
      <circle cx="13" cy="14" r="2" />
      <circle cx="11" cy="17.2" r="2" />
      <circle cx="9" cy="10" r="2" />
      <circle cx="13" cy="10" r="2" />
      <circle cx="11" cy="6.8" r="2" />
      <path d="M11 5 L11 2.5" />
      <path d="M11 2.5 Q13 1 15 2.5" />
    </>
  ),
  mountain: (
    <>
      <path d="M3 19 L9 8 L12 13 L15 6 L21 19 Z" />
      <path d="M7.5 11 L10.5 11" />
      <path d="M13.5 8.5 L16.5 8.5" />
    </>
  ),
  snowflake: (
    <>
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="4.5" y1="7.5" x2="19.5" y2="16.5" />
      <line x1="4.5" y1="16.5" x2="19.5" y2="7.5" />
      <line x1="12" y1="3" x2="10" y2="5.4" />
      <line x1="12" y1="3" x2="14" y2="5.4" />
      <line x1="12" y1="21" x2="10" y2="18.6" />
      <line x1="12" y1="21" x2="14" y2="18.6" />
    </>
  ),
  institution: (
    <>
      <path d="M3 9 L12 4 L21 9 Z" />
      <line x1="6" y1="11.5" x2="6" y2="17.5" />
      <line x1="12" y1="11.5" x2="12" y2="17.5" />
      <line x1="18" y1="11.5" x2="18" y2="17.5" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </>
  ),
  microscope: (
    <>
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="21" x2="12" y2="17.5" />
      <line x1="7.5" y1="17.5" x2="16.5" y2="17.5" />
      <path d="M10.5 17.5 L10.5 11.5 Q10.5 9 13 9 L15 9" />
      <circle cx="15" cy="6.8" r="2.1" />
      <line x1="15" y1="8.9" x2="15" y2="10.6" />
    </>
  ),
};

function Icon({ name, size = 24, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

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
    nav: { about: "Nosotros", programs: "Programas", destinations: "Destinos", partners: "Colaboraciones", contact: "Contacto" },
    hero: {
      tag: "TURISMO CIENTÍFICO INTERNACIONAL DE ALTO NIVEL",
      headline: "Donde la Ciencia Encuentra su Territorio",
      subheadline: "Conectamos científicos, investigadores y profesores de instituciones de clase mundial con los proyectos de investigación activos y los ecosistemas científicos únicos de Chile. Intercambio entre pares, no turismo convencional.",
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
      p1: "Australis Connections nace de una tradición familiar de más de 50 años en turismo receptivo chileno. Nuestro legado comenzó con Sergio Nin (Sergio Nin de Cardona), empleado-fundador de Turismo Cocha y Senior ejecutivo de Sportstour, uno de los operadores de turismo receptivo más importantes de Chile en su época.",
      p2: "Hoy, Alcides (hijo) y Sergio (nieto) lideran un proyecto que integra esa experiencia con una visión clara: posicionar a Chile como el destino de referencia mundial para expediciones científicas internacionales, conectando investigadores, científicos y profesores con los proyectos activos y ecosistemas únicos del país.",
      p3: "Nuestro modelo es simple y poderoso: diseñamos, coordinamos y supervisamos cada programa. Tercerizamos la operación con proveedores locales de confianza, con quienes mantenemos tarifas preferenciales construidas durante décadas de relación profesional.",
      features: [
        "Red de proveedores con tarifas preferenciales negociadas",
        "Visitas a observatorios del norte de Chile mediante sus programas públicos",
        "Programas de fauna silvestre con monitoreo científico activo",
        "Diseño de expediciones a medida para cada perfil científico",
        "Cotización detallada y transparente para cada programa",
        "Coordinación cuidadosa de cada detalle del programa",
      ],
    },
    programs: {
      tag: "EXPEDICIONES CIENTÍFICAS",
      title: "Ciencia Viva en Uno de los Territorios Más Diversos del Planeta",
      subtitle: "Cada expedición se diseña a medida para científicos, investigadores y profesores, y los conecta con proyectos de investigación, expertos locales y sitios de campo en Chile.",
      items: [
        {
          icon: "fox",
          title: "Zorro Chilote",
          subtitle: "Conservación y Fauna Silvestre",
          description: "Programa insignia de Australis Connections. Monitoreo activo del Zorro Chilote (Lycalopex fulvipes), un cánido en peligro de extinción. Trabajo de campo en Chiloé junto al equipo de monitoreo.",
          highlight: "Integrado a un proyecto de investigación activo",
        },
        {
          icon: "telescope",
          title: "Astronomía Austral",
          subtitle: "Observatorios de Clase Mundial",
          description: "Visitas a observatorios profesionales del norte de Chile a través de sus programas públicos de visita, y observación nocturna en observatorios privados abiertos a grupos educativos. Cada itinerario se diseña según los intereses del grupo y las políticas de visita de cada institución.",
          highlight: "Entre los mejores cielos del mundo para la astronomía",
        },
        {
          icon: "volcano",
          title: "Geología & Vulcanología",
          subtitle: "Laboratorios Naturales a Cielo Abierto",
          description: "Expediciones geológicas en algunos de los territorios más extraordinarios del planeta. Desierto de Atacama, cordillera andina y zonas volcánicas del sur de Chile, con guías especializados en geología y ciencias de la tierra.",
          highlight: "Sitios de campo elegidos según la disciplina del grupo",
        },
        {
          icon: "wave",
          title: "Oceanografía & Biodiversidad Marina",
          subtitle: "Corriente de Humboldt",
          description: "Expediciones en uno de los sistemas oceánicos más productivos del planeta, con componentes de campo en los fiordos patagónicos y el Archipiélago de Humboldt, diseñadas según los objetivos de investigación de cada grupo.",
          highlight: "Uno de los sistemas marinos más productivos del mundo",
        },
        {
          icon: "leaf",
          title: "Ecosistemas & Medio Ambiente",
          subtitle: "Desde Atacama hasta la Patagonia",
          description: "Programas de campo en los ecosistemas más extremos y diversos del planeta: bosque valdiviano, desierto florido, glaciares patagónicos, bosque de araucarias y ecosistemas costeros.",
          highlight: "4.300 km de diversidad ecológica",
        },
        {
          icon: "compass",
          title: "Programas a Medida",
          subtitle: "Diseño a Medida Total",
          description: "Para grupos FIT (2 a 4 personas), investigadores independientes o instituciones con requerimientos específicos. Desde expediciones a la Antártida hasta programas interdisciplinarios que combinan múltiples áreas científicas. Cada programa, diseñado desde cero.",
          highlight: "Diseño según los objetivos del grupo",
        },
      ],
    },
    destinations: {
      tag: "TERRITORIO DE ESTUDIO",
      title: "Chile: Un Laboratorio Natural de Diversidad Extraordinaria",
      subtitle: "4.300 kilómetros que concentran desiertos, volcanes, glaciares, fiordos, bosques templados y cielos de clase mundial.",
      items: [
        { name: "Desierto de Atacama", desc: "Astronomía, geología extrema, salares y cielos entre los mejores del mundo.", emoji: "cactus" },
        { name: "Región de Coquimbo", desc: "Observatorios, ecosistemas semiáridos y fauna costera.", emoji: "star" },
        { name: "Zona Central", desc: "Geología andina, geomorfología, viñedos y bosques nativos.", emoji: "grapes" },
        { name: "Chiloé & Los Lagos", desc: "Fauna silvestre endémica, ecosistemas húmedos y el Zorro Chilote.", emoji: "fox" },
        { name: "Patagonia", desc: "Glaciares, geología del granito, ecología de estepa y biodiversidad única.", emoji: "mountain" },
        { name: "Antártida", desc: "Expediciones científicas al continente blanco. Disponible solo como programa a medida.", emoji: "snowflake" },
      ],
    },
    partners: {
      tag: "RELACIONES INSTITUCIONALES",
      title: "Cómo Trabajamos con la Comunidad Científica",
      subtitle: "Construimos relaciones con investigadores, centros de investigación y programas de educación en Chile, y comunicamos su estado tal como es.",
      items: [
        { icon: "institution", name: "CEDUC UCN", desc: "Participamos en el programa Travesía del CEDUC de la Universidad Católica del Norte, orientado al desarrollo de emprendimientos.", status: "Participación en programa" },
        { icon: "fox", name: "Programa Zorro Chilote", desc: "Colaboración con Darío Moreira, investigador del Programa de Monitoreo del Zorro de Darwin, para nuestro programa insignia de trabajo de campo en Chiloé.", status: "Colaboración vigente" },
        { icon: "telescope", name: "Observatorios Astronómicos", desc: "Coordinamos visitas mediante los programas públicos de visita de observatorios profesionales del norte de Chile, sujetas a las políticas de cada institución.", status: "Programas públicos de visita" },
      ],
    },
    model: {
      tag: "NUESTRO MODELO",
      title: "Simple, Eficiente y de Alta Calidad",
      steps: [
        { n: "01", title: "Diseñamos", desc: "Creamos la expedición a medida según los objetivos científicos y el perfil del grupo visitante." },
        { n: "02", title: "Coordinamos", desc: "Activamos nuestra red de proveedores con tarifas preferenciales y expertos científicos locales." },
        { n: "03", title: "Supervisamos", desc: "Hacemos seguimiento de cada detalle de la operación antes y durante el programa." },
        { n: "04", title: "Cotizamos", desc: "Preparamos una cotización detallada y desglosada para tu programa." },
      ],
    },
    cta: {
      headline: "Tu Próxima Expedición Científica Comienza Aquí",
      paragraph: "Cuéntanos tus objetivos científicos y diseñaremos un programa a la medida de tu grupo.",
      button: "Contactar un Especialista",
      trust: "Respondemos personalmente cada consulta. Propuesta sin compromiso.",
    },
    footer: {
      desc: "Conectando universidades, investigadores y académicos de todo el mundo con los laboratorios naturales únicos de Chile. Tres generaciones de legado al servicio de la ciencia.",
      email: "info@australisconnections.com",
      phone: "+56 9 9163 0884",
      address: "Ovalle, Región de Coquimbo, Chile",
      rights: "© 2026 Australis Connections. Servicios Arauco SpA, RUT 76.443.777-2. Todos los derechos reservados.",
    },
    contact: {
      title: "Diseñemos Tu Expedición",
      subtitle: "Cuéntanos sobre tu institución, tu área de investigación y lo que buscas en Chile.",
      name: "Nombre",
      lastname: "Apellido",
      email: "Email institucional",
      institution: "Universidad / Institución",
      interest: "Área de interés",
      message: "Cuéntanos sobre tu programa",
      send: "Enviar Solicitud",
      thanks: "¡Gracias! Nos contactaremos pronto.",
      error: "No pudimos enviar tu mensaje. Por favor intenta de nuevo o escríbenos directamente a info@australisconnections.com",
      sending: "Enviando...",
      requiredNote: "* Todos los campos son obligatorios",
      privacy: "Usamos tus datos solo para responder tu consulta.",
      interests: ["Astronomía", "Zorro Chilote / Fauna Silvestre", "Geología & Vulcanología", "Oceanografía & Biodiversidad Marina", "Ecosistemas & Medio Ambiente", "Programa a Medida"],
    },
  },
  en: {
    nav: { about: "About", programs: "Programs", destinations: "Destinations", partners: "Collaborations", contact: "Contact" },
    hero: {
      tag: "HIGH-LEVEL INTERNATIONAL SCIENTIFIC TRAVEL",
      headline: "Where Science Meets Its Territory",
      subheadline: "We connect scientists, researchers and professors from world-class institutions with active research projects and unique scientific ecosystems in Chile. Peer-to-peer exchange, not conventional tourism.",
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
      p1: "Australis Connections was born from a family tradition of more than 50 years in Chilean incoming tourism. Our legacy began with Sergio Nin (Sergio Nin de Cardona), founding employee of Turismo Cocha and Senior Executive of Sportstour, one of Chile's most important incoming tourism operators of its era.",
      p2: "Today, Alcides (son) and Sergio (grandson) lead a project with a clear vision: positioning Chile as the world reference destination for international scientific expeditions, connecting researchers, scientists and professors with the country's active projects and unique ecosystems.",
      p3: "Our model is simple and powerful: we design, coordinate and oversee every program. We outsource operations to trusted local providers, with whom we hold preferential rates built over decades of professional relationships.",
      features: [
        "Provider network with negotiated preferential rates",
        "Visits to northern Chile observatories through their public programs",
        "Wildlife programs with active scientific monitoring",
        "Custom expedition design for each scientific profile",
        "Detailed, transparent quotation for every program",
        "Careful coordination of every program detail",
      ],
    },
    programs: {
      tag: "SCIENTIFIC EXPEDITIONS",
      title: "Living Science in One of the Planet's Most Diverse Territories",
      subtitle: "Every expedition is tailor-made for scientists, researchers and professors, connecting them with research projects, local experts and field sites in Chile.",
      items: [
        {
          icon: "fox",
          title: "Darwin's Fox",
          subtitle: "Conservation & Wildlife",
          description: "Australis Connections' flagship program. Active monitoring of the Darwin's Fox (Lycalopex fulvipes), an endangered canid. Fieldwork in Chiloé alongside the monitoring team.",
          highlight: "Integrated with an active research project",
        },
        {
          icon: "telescope",
          title: "Austral Astronomy",
          subtitle: "World-Class Observatories",
          description: "Visits to professional observatories in northern Chile through their public visit programs, plus night observation at private observatories open to educational groups. Each itinerary is designed around the group's interests and each institution's visit policies.",
          highlight: "Among the best skies in the world for astronomy",
        },
        {
          icon: "volcano",
          title: "Geology & Volcanology",
          subtitle: "Open-Air Natural Laboratories",
          description: "Geological expeditions across some of the most extraordinary territories on the planet. Atacama Desert, Andean mountain range and volcanic zones in southern Chile, with guides specialized in geology and earth sciences.",
          highlight: "Field sites chosen for the group's discipline",
        },
        {
          icon: "wave",
          title: "Oceanography & Marine Biodiversity",
          subtitle: "Humboldt Current System",
          description: "Expeditions in one of the planet's most productive ocean systems, with field components in Patagonian fjords and the Humboldt Archipelago, designed around each group's research objectives.",
          highlight: "One of the world's most productive marine systems",
        },
        {
          icon: "leaf",
          title: "Ecosystems & Environment",
          subtitle: "From Atacama to Patagonia",
          description: "Field programs in the planet's most extreme and diverse ecosystems: Valdivian forest, blooming desert, Patagonian glaciers, araucaria forests and coastal ecosystems.",
          highlight: "4,300 km of ecological diversity",
        },
        {
          icon: "compass",
          title: "Tailor-Made Programs",
          subtitle: "Total Custom Design",
          description: "For FIT groups (2 to 4 people), independent researchers or institutions with specific requirements. From Antarctic expeditions to interdisciplinary programs combining multiple scientific fields. Every program, designed from scratch.",
          highlight: "Designed around the group's objectives",
        },
      ],
    },
    destinations: {
      tag: "STUDY TERRITORY",
      title: "Chile: A Natural Laboratory of Extraordinary Diversity",
      subtitle: "4,300 kilometers concentrating deserts, volcanoes, glaciers, fjords, temperate forests and world-class skies.",
      items: [
        { name: "Atacama Desert", desc: "Astronomy, extreme geology, salt flats and some of the world's best skies.", emoji: "cactus" },
        { name: "Coquimbo Region", desc: "Observatories, semi-arid ecosystems and coastal fauna.", emoji: "star" },
        { name: "Central Chile", desc: "Andean geology, geomorphology, vineyards and native forests.", emoji: "grapes" },
        { name: "Chiloé & Los Lagos", desc: "Endemic wildlife, humid ecosystems and the Darwin's Fox.", emoji: "fox" },
        { name: "Patagonia", desc: "Glaciers, granite geology, steppe ecology and unique biodiversity.", emoji: "mountain" },
        { name: "Antarctica", desc: "Scientific expeditions to the white continent. Available only as a tailor-made program.", emoji: "snowflake" },
      ],
    },
    partners: {
      tag: "INSTITUTIONAL RELATIONSHIPS",
      title: "How We Work with the Scientific Community",
      subtitle: "We build relationships with researchers, research centers and education programs in Chile, and we report their status as it stands.",
      items: [
        { icon: "institution", name: "CEDUC UCN", desc: "We take part in the Travesía program of CEDUC at the Universidad Católica del Norte, which supports early-stage ventures.", status: "Program participant" },
        { icon: "fox", name: "Darwin's Fox Program", desc: "Collaboration with Darío Moreira, researcher on the Darwin's Fox Monitoring Program, for our flagship fieldwork program in Chiloé.", status: "Active collaboration" },
        { icon: "telescope", name: "Astronomical Observatories", desc: "We arrange visits through the public visit programs of professional observatories in northern Chile, subject to each institution's policies.", status: "Public visit programs" },
      ],
    },
    model: {
      tag: "OUR MODEL",
      title: "Simple, Efficient and High Quality",
      steps: [
        { n: "01", title: "We Design", desc: "We create the custom expedition based on your scientific objectives and the profile of your group." },
        { n: "02", title: "We Coordinate", desc: "We activate our network of providers with preferential rates and local scientific experts." },
        { n: "03", title: "We Oversee", desc: "We follow every operational detail before and during the program." },
        { n: "04", title: "We Quote", desc: "We prepare a detailed, itemized quotation for your program." },
      ],
    },
    cta: {
      headline: "Your Next Scientific Expedition Starts Here",
      paragraph: "Tell us about your scientific objectives and we will design a program around your group.",
      button: "Contact a Specialist",
      trust: "We reply to every inquiry personally. No-obligation proposal.",
    },
    footer: {
      desc: "Connecting universities, researchers and academics worldwide with Chile's unique natural laboratories. Three generations of legacy in service of science.",
      email: "info@australisconnections.com",
      phone: "+56 9 9163 0884",
      address: "Ovalle, Coquimbo Region, Chile",
      rights: "© 2026 Australis Connections. Servicios Arauco SpA, Chilean tax ID (RUT) 76.443.777-2. All rights reserved.",
    },
    contact: {
      title: "Let's Design Your Expedition",
      subtitle: "Tell us about your institution, your research area and what you are looking for in Chile.",
      name: "First Name",
      lastname: "Last Name",
      email: "Institutional email",
      institution: "University / Institution",
      interest: "Area of interest",
      message: "Tell us about your program",
      send: "Send Request",
      thanks: "Thank you! We will contact you soon.",
      error: "We couldn't send your message. Please try again or email us directly at info@australisconnections.com",
      sending: "Sending...",
      requiredNote: "* All fields are required",
      privacy: "We use your details only to respond to your inquiry.",
      interests: ["Astronomy", "Darwin's Fox / Wildlife", "Geology & Volcanology", "Oceanography & Marine Biodiversity", "Ecosystems & Environment", "Tailor-Made Program"],
    },
  },
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const senderEmail = data.get("email");
    if (senderEmail) data.append("_cc", senderEmail);
    setSending(true);
    setSendError(false);
    try {
      const response = await fetch("https://formspree.io/f/xaqrkvnz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });
      if (response.ok) {
        setSent(true);
        form.reset();
        setTimeout(() => { setContactOpen(false); setSent(false); }, 3000);
      } else {
        setSendError(true);
      }
    } catch (error) {
      console.error("Error sending form:", error);
      setSendError(true);
    } finally {
      setSending(false);
    }
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
                height: scrolled ? 100 : 130,
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
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  border: `1.5px solid ${i === 0 ? TERRACOTA : i === 1 ? AZUL : VERDE}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20, color: i === 0 ? TERRACOTA : i === 1 ? AZUL : VERDE,
                }}>
                  <Icon name={p.icon} size={26} />
                </div>
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
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  border: `1.5px solid ${TERRACOTA}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16, color: TERRACOTA,
                }}>
                  <Icon name={d.emoji} size={22} />
                </div>
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
                gridColumn: (t.partners.items.length % 2 === 1 && i === t.partners.items.length - 1) ? "1 / -1" : "auto",
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 8,
                  background: AZUL,
                  flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  color: BLANCO, fontSize: 20,
                }}><Icon name={p.icon} size={30} color={BLANCO} /></div>
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
                <input type="hidden" name="_subject" value={`Nueva consulta - Australis Connections (${lang})`} />
                <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { label: t.contact.name, name: "firstName" },
                    { label: t.contact.lastname, name: "lastName" },
                  ].map((f, i) => (
                    <div key={i}>
                      <label style={{ fontSize: 12, color: "#555", fontFamily: "'Arial', sans-serif", fontWeight: 600, display: "block", marginBottom: 6 }}>{f.label} *</label>
                      <input required name={f.name} style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, fontFamily: "'Arial', sans-serif", boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>
                {[
                  { label: t.contact.email, name: "email", type: "email" },
                  { label: t.contact.institution, name: "institution", type: "text" },
                ].map((f, i) => (
                  <div key={i}>
                    <label style={{ fontSize: 12, color: "#555", fontFamily: "'Arial', sans-serif", fontWeight: 600, display: "block", marginBottom: 6 }}>{f.label} *</label>
                    <input required name={f.name} type={f.type} style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, fontFamily: "'Arial', sans-serif", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 12, color: "#555", fontFamily: "'Arial', sans-serif", fontWeight: 600, display: "block", marginBottom: 6 }}>{t.contact.interest} *</label>
                  <select required name="interest" style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, fontFamily: "'Arial', sans-serif", boxSizing: "border-box" }}>
                    {t.contact.interests.map((opt, i) => <option key={i}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "#555", fontFamily: "'Arial', sans-serif", fontWeight: 600, display: "block", marginBottom: 6 }}>{t.contact.message} *</label>
                  <textarea required rows={4} name="message" style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, fontFamily: "'Arial', sans-serif", boxSizing: "border-box", resize: "vertical" }} />
                </div>
                <p style={{ fontSize: 12, color: "#999", fontFamily: "'Arial', sans-serif", margin: 0 }}>{t.contact.requiredNote} {t.contact.privacy}</p>
                {sendError && (
                  <div style={{ background: "#FCEBEB", color: "#A32D2D", padding: "10px 14px", borderRadius: 6, fontSize: 13, fontFamily: "'Arial', sans-serif" }}>
                    {t.contact.error}
                  </div>
                )}
                <button type="submit" disabled={sending} style={{
                  background: TERRACOTA, color: BLANCO, border: "none", cursor: sending ? "default" : "pointer",
                  padding: "14px", fontSize: 15, fontFamily: "'Arial', sans-serif", fontWeight: 700,
                  borderRadius: 6, marginTop: 8, opacity: sending ? 0.7 : 1,
                }}>{sending ? t.contact.sending : t.contact.send}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
