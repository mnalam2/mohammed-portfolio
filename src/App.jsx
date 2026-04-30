import React, { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaBars, FaTimes, FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

function GlitchName() {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const trigger = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    };
    const id = setInterval(trigger, 5000);
    return () => clearInterval(id);
  }, []);

  const name = "Mohammed Alam";
  const t = { duration: 0.2, ease: "linear" };
  const overlayCls = "absolute inset-0 text-4xl sm:text-5xl md:text-6xl font-extrabold select-none pointer-events-none";

  return (
    <div className="relative inline-block">
      <motion.span
        aria-hidden="true"
        className={`${overlayCls} text-cyan-300`}
        animate={glitch ? { x: [-3, -4, -2, -3, 0], opacity: [0.75, 0.6, 0.75, 0.5, 0] } : { x: 0, opacity: 0 }}
        transition={t}
      >
        {name}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className={`${overlayCls} text-pink-400`}
        animate={glitch ? { x: [3, 4, 2, 3, 0], opacity: [0.75, 0.6, 0.75, 0.5, 0] } : { x: 0, opacity: 0 }}
        transition={t}
      >
        {name}
      </motion.span>
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"
        animate={glitch ? { x: [0, 1, -1, 0] } : { x: 0 }}
        transition={t}
      >
        {name}
      </motion.h1>
    </div>
  );
}

function ScrambleText({ text, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    if (!inView) return;
    let iteration = 0;
    const totalFrames = 22;
    const timeout = setTimeout(() => {
      const id = setInterval(() => {
        setDisplayed(
          text.split("").map((char, i) => {
            if (char === " ") return " ";
            if (i < Math.floor((iteration / totalFrames) * text.length)) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }).join("")
        );
        iteration++;
        if (iteration > totalFrames) { clearInterval(id); setDisplayed(text); }
      }, 28);
      return () => clearInterval(id);
    }, 280);
    return () => clearTimeout(timeout);
  }, [inView, text]);

  return <span ref={ref} className={className}>{displayed}</span>;
}

function RevealWord({ word, scrollY, index, total }) {
  const start = 60 + (index / total) * 320;
  const end = 60 + ((index + 1) / total) * 320;
  const color = useTransform(scrollY, [start, end], ["#4b5563", "#d1d5db"]);
  return <motion.span style={{ color }} className="mr-1">{word}</motion.span>;
}

function WordReveal({ text }) {
  const { scrollY } = useScroll();
  const words = text.split(" ");
  return (
    <p className="text-sm sm:text-base mt-3 max-w-xl">
      {words.map((word, i) => (
        <RevealWord key={i} word={word} scrollY={scrollY} index={i} total={words.length} />
      ))}
    </p>
  );
}

function MarqueeRow({ skills, direction }) {
  const doubled = [...skills, ...skills];
  const duration = skills.length * 2.8;
  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-2.5 w-max"
        style={{ animation: `marquee-${direction} ${duration}s linear infinite` }}
      >
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1.5 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700 whitespace-nowrap hover:border-cyan-500 hover:text-cyan-400 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillsMarquee() {
  const all = SKILL_GROUPS.flatMap((g) => g.tags);
  const half = Math.ceil(all.length / 2);
  return (
    <div className="space-y-3 -mx-4 sm:-mx-6 md:-mx-12">
      <MarqueeRow skills={all.slice(0, half)} direction="left" />
      <MarqueeRow skills={all.slice(half)} direction="right" />
    </div>
  );
}

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
        <ScrambleText text={title} />
      </h2>
      {children}
    </motion.section>
  );
}

function Timeline() {
  return (
    <div className="relative">
      {/* Track */}
      <div className="absolute left-[13px] top-5 bottom-5 w-px bg-gray-800" />
      {/* Animated fill */}
      <motion.div
        className="absolute w-px bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 origin-top"
        style={{ left: "13px", top: "1.25rem", bottom: "1.25rem" }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="space-y-6">
        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={exp.role}
            className="flex gap-5"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
          >
            {/* Dot column */}
            <div className="relative flex-shrink-0 w-7 flex justify-center pt-[1.35rem]">
              <div className="w-3.5 h-3.5 rounded-full bg-gray-950 border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.45)] z-10" />
            </div>

            {/* Card */}
            <div className="flex-1 rounded-lg border border-gray-800 bg-gray-900/40 p-5 mb-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-white">{exp.role}</h3>
                <span className="text-xs text-gray-400 shrink-0">{exp.time}</span>
              </div>
              <div className="text-sm text-cyan-400/80 mt-0.5">{exp.org}</div>
              <ul className="list-disc list-inside mt-3 space-y-1 text-gray-300 text-sm">
                {exp.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

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
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-sans p-4 sm:p-6 md:p-12">

      {/* Gradient mesh — radial-gradient, no filter:blur, renders natively on GPU */}
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

      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">

        {/* NAV */}
        <header className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur border-b border-gray-800 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
            <a href="/" onClick={(e) => scrollTo(e, "home")} className="text-lg font-bold text-cyan-400 tracking-wide">
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

        {/* HERO */}
        <motion.section
          id="home"
          className="pt-24 sm:pt-28"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-8 sm:gap-12">

            {/* Text side */}
            <div className="text-center sm:text-left flex-1 max-w-lg">
              <GlitchName />
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-4 h-7">
                <span className="text-white">{typed}</span>
                <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 align-middle animate-pulse" />
              </p>
              <WordReveal text="Engineer with deep experience in web, API, and backend validation. Trusted to lead strategy, own delivery, and ship high-quality software fast." />
              <div className="mt-6 flex flex-col items-center sm:items-start gap-4">
                <div className="flex gap-6 text-2xl">
                  <a href="https://www.linkedin.com/in/mohammed-alam-8193009a/" className="hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com/mnalam2" className="hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub />
                  </a>
                  <a href="mailto:mohammed.nafi.alam@gmail.com" className="hover:text-cyan-400 transition-colors" aria-label="Email Mohammed">
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
            <motion.div
              className="relative flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 blur-lg opacity-30 scale-110" />
              {/* Border ring */}
              <div className="relative p-1 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600">
                <img
                  src="/headshot.jpg"
                  alt="Mohammed Alam"
                  className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full object-cover object-top bg-gray-800"
                />
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* SKILLS */}
        <Section id="skills" title="Skills">
          <SkillsMarquee />
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title="Work History">
          <Timeline />
        </Section>

        {/* EDUCATION */}
        <Section id="education" title="Education">
          <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-5 text-sm text-gray-300">
            <p className="text-white font-semibold">Bachelor of Science: Computer Engineering, 2017</p>
            <p className="mt-1">University of Illinois At Urbana-Champaign - Champaign, IL</p>
            <p className="mt-2 text-gray-400">
              Applicable Coursework: Data Structures, Algorithms & Models of Computation, Virtual Reality, Artificial Intelligence
            </p>
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="Projects">
          <div className="grid gap-6 md:grid-cols-2">
            <a href="https://github.com/mnalam2/OperatingSystem/tree/master/student-distrib" target="_blank" rel="noopener noreferrer" className="block rounded-lg border border-gray-800 bg-gray-900/40 p-5 hover:border-cyan-400 hover:shadow-lg transition">
              <h3 className="text-cyan-400 font-semibold">Operating System Project ↗</h3>
              <p className="mt-2 text-sm text-gray-300">Developed a full OS in x86/C with memory protection, file system, and I/O drivers.</p>
            </a>
            <a href="https://github.com/mnalam2/Artificial-Intelligence-Projects" target="_blank" rel="noopener noreferrer" className="block rounded-lg border border-gray-800 bg-gray-900/40 p-5 hover:border-cyan-400 hover:shadow-lg transition">
              <h3 className="text-cyan-400 font-semibold">AI Projects ↗</h3>
              <p className="mt-2 text-sm text-gray-300">Implemented search algorithms, game AI, and probabilistic reasoning.</p>
            </a>
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
              <a href="mailto:mohammed.nafi.alam@gmail.com" className="hover:underline">mohammed.nafi.alam@gmail.com</a>
              <a href="https://www.linkedin.com/in/mohammed-alam-8193009a/" className="hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
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
    </main>
  );
}
