import React, { useEffect, useState, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaBars, FaTimes, FaArrowUp } from "react-icons/fa";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
  useMotionValueEvent,
} from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const NAV_ITEMS = [
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Education", "education"],
  ["Contact", "contact"],
];

const SKILL_GROUPS = [
  {
    label: "Languages & Frameworks",
    tags: ["C", "C++", "C#", "Java", "Python", "JavaScript", "Oracle SQL", "MySQL"],
  },
  {
    label: "CI/CD & DevOps",
    tags: ["Jenkins", "TeamCity", "Octopus Deploy", "Azure DevOps", "Docker"],
  },
  {
    label: "Testing Expertise",
    tags: ["Component Testing (C#)", "Playwright E2E", "REST API Testing", "CI/CD Automation", "Load Testing"],
  },
  {
    label: "Test Automation Tools",
    tags: ["Playwright", "Robot Framework", "Selenium", "JMeter", "Postman"],
  },
  {
    label: "Cloud & Monitoring",
    tags: ["AWS DynamoDB", "ECS", "SNS", "SQS", "Datadog"],
  },
  {
    label: "Version Control & Collaboration",
    tags: ["Git", "Bitbucket", "SVN", "Jira", "Confluence", "TestRail", "SFDC"],
  },
];

const EXPERIENCES = [
  {
    role: "Lead Automation Engineer",
    time: "07/2021 – Current",
    org: "Generali Global Assistance – San Diego, CA",
    bullets: [
      "Built scalable API test automation using Robot Framework (Python), fully integrated into Jenkins CI/CD, accelerating release cycles by 40%.",
      "Developed and maintained JavaScript-based Playwright tests for UI end-to-end coverage.",
      "Built and optimized real-time observability dashboards in Datadog, enabling proactive defect detection and reducing triage time by 50%.",
      "Collaborated with DevOps teams to test complex AWS microservices: DynamoDB, ECS, SNS, SQS.",
      "As the SME for Integration & Payments, provided technical leadership on automation strategy — guided engineers on scalable framework design, streamlined test coverage, and reinforced best practices across teams.",
    ],
  },
  {
    role: "Software QA Engineer II",
    time: "09/2019 – 07/2021",
    org: "Green Dot Corporation – La Jolla, CA",
    bullets: [
      "Deployed and managed environments through TeamCity, Octopus Deploy, and Azure DevOps.",
      "Developed and maintained C#/.NET automation including component-level testing and API verification.",
      "Conducted backend validations on data migrations from Pervasive SQL to MySQL.",
      "Collaborated with cross-functional teams on agile sprints, feature readiness, and regression scope.",
    ],
  },
  {
    role: "Quality Engineering & Assurance Analyst",
    time: "06/2018 – 08/2019",
    org: "Cognizant – Irving, TX",
    bullets: [
      "Completed accelerated corporate training in consulting principles, Java, Oracle SQL, JDBC, JUnit, JSP, and Selenium.",
      "Analyzed client requirements, designed automated test scenarios, triaged defects through SFDC, and ensured seamless deliveries upon project specifications.",
      "Validated client backend coding through IBM AS/400 and query testing.",
    ],
  },
  {
    role: "Software Test Engineer",
    time: "05/2018 – 06/2018",
    org: "Abbott – San Diego, CA",
    bullets: [
      "Designed and executed test protocols for USB-connected drug test devices using protocol analyzers.",
      "Validated GUI components and collaborated with developers to resolve issues via JIRA.",
    ],
  },
  {
    role: "Software QA Intern",
    time: "05/2016 – 08/2016",
    org: "United Airlines – Chicago, IL",
    bullets: [
      "Automated deployment pipelines and testing using CA Technologies Release Automation.",
      "Helped modernize www.united.com deployment workflows with Agile automation strategies.",
    ],
  },
];

const PHRASES = [
  "Lead Automation Engineer",
  "Playwright & Robot Framework",
  "CI/CD · Jenkins · Azure DevOps",
  "AWS · DynamoDB · Datadog",
  "Shipping quality software",
];

const STATS = [
  { end: 40, suffix: "%", label: "Faster Release Cycles", sublabel: "CI/CD automation at Generali" },
  { end: 50, suffix: "%", label: "Faster Defect Triage", sublabel: "Datadog observability dashboards" },
  { end: 5, suffix: "+", label: "Years Leading Automation", sublabel: "Across finance, health & travel" },
];

function useTypewriter(phrases) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    const delay = deleting ? 35 : text === phrase ? 2000 : 65;
    const t = setTimeout(() => {
      if (!deleting && text === phrase) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % phrases.length);
      } else {
        setText(deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, phraseIdx, phrases]);

  return text;
}

// ─── Scroll-Driven Hero ───────────────────────────────────────────────────────

function ScrollHero({ typed }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.65], [1, 1.45]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.65], [0, -55]);
  const overlayOpacity = useTransform(scrollYProgress, [0.15, 0.6], [0, 0.75]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={heroRef} id="home" style={{ height: "185vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Darkening overlay deepens as you scroll */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none z-10"
          style={{ opacity: overlayOpacity }}
        />

        <motion.div
          className="relative z-0 flex flex-col-reverse sm:flex-row items-center justify-center gap-8 sm:gap-12 w-full max-w-6xl px-4 sm:px-6 pt-16"
          style={{ scale, opacity, y }}
        >
          {/* Text */}
          <div className="text-center sm:text-left flex-1 max-w-lg">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Mohammed Alam
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-4 h-7">
              <span className="text-white">{typed}</span>
              <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 align-middle animate-pulse" />
            </p>
            <p className="text-sm sm:text-base text-gray-400 mt-3 max-w-xl">
              Engineer with deep experience in web, API, and backend validation. Trusted to lead
              strategy, own delivery, and ship high-quality software fast.
            </p>
            <div className="mt-6 flex flex-col items-center sm:items-start gap-4">
              <div className="flex gap-6 text-2xl">
                <a
                  href="https://www.linkedin.com/in/mohammed-alam-8193009a/"
                  className="hover:text-cyan-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/mnalam2"
                  className="hover:text-cyan-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="mailto:mohammed.nafi.alam@gmail.com"
                  className="hover:text-cyan-400 transition-colors"
                  aria-label="Email Mohammed"
                >
                  <FaEnvelope />
                </a>
              </div>
              <a
                href="/MohammedAlamResume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 bg-white text-black font-medium rounded-full shadow hover:shadow-lg transition hover:bg-gray-200"
              >
                <FaDownload className="text-black" /> Download Resume
              </a>
            </div>
          </div>

          {/* Headshot */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 blur-lg opacity-30 scale-110" />
            <div className="relative p-1 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600">
              <img
                src="/headshot.jpg"
                alt="Mohammed Alam"
                className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full object-cover object-top bg-gray-800"
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs pointer-events-none z-20"
          style={{ opacity: scrollCueOpacity }}
        >
          <span className="tracking-widest uppercase text-[10px]">scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent"
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// ─── Animated Stat Counter ────────────────────────────────────────────────────

function StatCounter({ end, suffix, label, sublabel, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, end, {
      duration: 2.2,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, count, end, delay]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <div className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tabular-nums leading-none">
        <motion.span>{display}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-white font-semibold mt-3 text-base sm:text-lg">{label}</p>
      <p className="text-gray-500 text-sm mt-1">{sublabel}</p>
    </motion.div>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 sm:py-28 border-t border-gray-800/60">
      <motion.p
        className="text-xs text-gray-500 uppercase tracking-[0.25em] text-center mb-12"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        By the Numbers
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-14 sm:gap-8">
        {STATS.map((s, i) => (
          <StatCounter key={s.label} {...s} delay={i * 0.15} />
        ))}
      </div>
    </section>
  );
}

// ─── Pinned Experience Reveal ─────────────────────────────────────────────────

function PinnedExperience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIdx, setActiveIdx] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const raw = Math.floor(v * EXPERIENCES.length);
    setActiveIdx(Math.min(Math.max(raw, 0), EXPERIENCES.length - 1));
  });

  return (
    <div ref={containerRef} style={{ height: `${EXPERIENCES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pt-16">

        {/* Progress dots */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {EXPERIENCES.map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              animate={{
                scale: i === activeIdx ? 1.5 : 1,
                backgroundColor:
                  i === activeIdx ? "rgb(34,211,238)" : "rgb(55,65,81)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Card stage */}
        <div className="w-full max-w-3xl px-4 sm:px-8 lg:px-0">
          {/* Counter label */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIdx}
              className="text-[11px] text-gray-500 uppercase tracking-[0.25em] text-center mb-5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {activeIdx + 1} / {EXPERIENCES.length}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 72, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -72, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-gray-800 bg-gray-900/70 backdrop-blur-sm p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {EXPERIENCES[activeIdx].role}
                </h3>
                <span className="text-xs text-gray-400 shrink-0">
                  {EXPERIENCES[activeIdx].time}
                </span>
              </div>
              <p className="text-cyan-400 text-sm mb-5">{EXPERIENCES[activeIdx].org}</p>
              <ul className="space-y-2.5">
                {EXPERIENCES[activeIdx].bullets.map((b, j) => (
                  <motion.li
                    key={j}
                    className="flex gap-3 text-gray-300 text-sm leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + j * 0.07, duration: 0.35, ease: "easeOut" }}
                  >
                    <span className="text-cyan-400 shrink-0 mt-0.5">→</span>
                    <span>{b}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* Scroll hint */}
          <motion.p
            className="text-center text-[11px] text-gray-600 mt-6 uppercase tracking-widest"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {activeIdx < EXPERIENCES.length - 1 ? "scroll to continue" : "end of history"}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

// ─── Generic Section ──────────────────────────────────────────────────────────

function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-24"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 border-b border-gray-800 pb-3 mb-6">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");

  const typed = useTypewriter(PHRASES);

  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  useEffect(() => {
    const ids = ["home", "skills", "experience", "projects", "education", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(e.target)).toString(),
      });
      setFormStatus(res.ok ? "success" : "error");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-sans">

      {/* Gradient mesh */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: `
            radial-gradient(ellipse 65% 45% at 12% 20%, rgba(6,182,212,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 55% 55% at 88% 65%, rgba(37,99,235,0.09) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 48% 88%, rgba(99,102,241,0.07) 0%, transparent 60%)
          `,
        }}
      />

      {/* NAV */}
      <header className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <a
            href="/"
            onClick={(e) => scrollTo(e, "home")}
            className="text-lg font-bold text-cyan-400 tracking-wide"
          >
            Mohammed Alam
          </a>
          <nav aria-label="Primary" className="hidden md:block text-sm">
            <ul className="flex gap-5">
              {NAV_ITEMS.map(([label, id]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => scrollTo(e, id)}
                    className={`transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 rounded ${
                      activeSection === id ? "text-cyan-400 font-medium" : "hover:text-cyan-400"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="md:hidden text-2xl text-cyan-400"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden bg-black/90 backdrop-blur absolute top-full inset-x-0 p-4"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              <ul className="flex flex-col gap-4 text-lg">
                {NAV_ITEMS.map(([label, id]) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => { scrollTo(e, id); setMenuOpen(false); }}
                      className={`block hover:text-cyan-400 ${activeSection === id ? "text-cyan-400" : ""}`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <ScrollHero typed={typed} />

      {/* ── CONTAINED SECTIONS ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">

        {/* SKILLS */}
        <div className="pt-16 sm:pt-24">
          <Section id="skills" title="Skills">
            <div className="grid md:grid-cols-2 gap-4">
              {SKILL_GROUPS.map(({ label, tags }) => (
                <div key={label} className="rounded-lg border border-gray-800 bg-gray-900/40 p-5">
                  <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">{label}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700 hover:border-cyan-500 hover:text-cyan-400 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* STATS */}
        <StatsSection />

      </div>

      {/* ── EXPERIENCE (full-bleed pinned) ── */}
      <div id="experience" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-4 pb-0">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 border-b border-gray-800 pb-3"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            Work History
          </motion.h2>
        </div>
        <PinnedExperience />
      </div>

      {/* ── REMAINING SECTIONS ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 space-y-16 sm:space-y-24 pb-16">

        {/* PROJECTS */}
        <Section id="projects" title="Projects">
          <div className="grid gap-6 md:grid-cols-2">
            <a
              href="https://github.com/mnalam2/OperatingSystem/tree/master/student-distrib"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-gray-800 bg-gray-900/40 p-5 hover:border-cyan-400 hover:shadow-lg transition"
            >
              <h3 className="text-cyan-400 font-semibold">Operating System Project ↗</h3>
              <p className="mt-2 text-sm text-gray-300">
                Developed a full OS in x86/C with memory protection, file system, and I/O drivers.
              </p>
            </a>
            <a
              href="https://github.com/mnalam2/Artificial-Intelligence-Projects"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-gray-800 bg-gray-900/40 p-5 hover:border-cyan-400 hover:shadow-lg transition"
            >
              <h3 className="text-cyan-400 font-semibold">AI Projects ↗</h3>
              <p className="mt-2 text-sm text-gray-300">
                Implemented search algorithms, game AI, and probabilistic reasoning.
              </p>
            </a>
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" title="Education">
          <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-5 text-sm text-gray-300">
            <p className="text-white font-semibold">Bachelor of Science: Computer Engineering, 2017</p>
            <p className="mt-1">University of Illinois At Urbana-Champaign - Champaign, IL</p>
            <p className="mt-2 text-gray-400">
              Applicable Coursework: Data Structures, Algorithms & Models of Computation, Virtual Reality,
              Artificial Intelligence
            </p>
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="Contact">
          <div className="max-w-lg mx-auto">
            {formStatus === "success" ? (
              <div className="text-center py-10">
                <p className="text-cyan-400 font-medium text-lg">Message sent!</p>
                <p className="text-gray-400 text-sm mt-1">I'll be in touch soon.</p>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 text-sm transition-colors resize-none"
                />
                {formStatus === "error" && (
                  <p className="text-red-400 text-xs">Something went wrong — try emailing directly.</p>
                )}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-colors text-sm"
                >
                  Send Message
                </button>
              </form>
            )}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-cyan-400 mt-6">
              <a href="mailto:mohammed.nafi.alam@gmail.com" className="hover:underline">
                mohammed.nafi.alam@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-alam-8193009a/"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </Section>

        <footer className="text-center text-xs text-gray-500 pt-6 border-t border-gray-800">
          © {new Date().getFullYear()} Mohammed Alam. All rights reserved.
        </footer>

      </div>

      {/* SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 p-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full shadow-lg transition-colors z-50"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
