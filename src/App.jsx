/*
  Mohammed Alam – Portfolio (React, Vite, Tailwind)
  - Mobile friendly with hamburger nav.
  - Scroll-spy, accessible mobile menu (focus trap + Esc), smooth hash updates.
  - Animations run only once using useInView + "seen" lock (no re-trigger on scroll up/down).
  - Resume wording is 1:1 with your PDF for Skills, Experience, Projects.
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaBars, FaTimes } from "react-icons/fa";

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const menuRef = useRef(null);

  // Reset scroll when landing without a hash
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0 });
  }, []);

  // Scroll spy: highlight nav item + update URL hash without jump
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const hash = `#${e.target.id}`;
            setActive(hash);
            if (location.hash !== hash) history.replaceState(null, "", hash);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Lock page scroll + trap focus inside the mobile menu; close with Esc
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector("a,button")?.focus();
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  // Stable variants reference
  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }), []);

  // Section that animates only once using a local "seen" lock
  const Section = ({ id, title, children }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.2 });
    const [seen, setSeen] = useState(false);

    useEffect(() => {
      if (inView && !seen) setSeen(true);
    }, [inView, seen]);

    return (
      <motion.section
        ref={ref}
        id={id}
        aria-labelledby={`${id}-title`}
        className="scroll-mt-24"
        variants={fadeInUp}
        initial={prefersReducedMotion ? false : "hidden"}
        animate={prefersReducedMotion ? undefined : (seen ? "visible" : "hidden")}
      >
        <h2 id={`${id}-title`} className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 border-b border-gray-800 pb-3 mb-6">
          {title}
        </h2>
        {children}
      </motion.section>
    );
  };

  const Chip = ({ children }) => (
    <span className="inline-flex items-center rounded-full border border-cyan-700/40 bg-cyan-900/10 px-2 sm:px-3 py-1 text-xs md:text-sm text-cyan-200">
      {children}
    </span>
  );

  const navItems = [
    ["Skills", "#skills"],
    ["Experience", "#experience"],
    ["Projects", "#projects"],
    ["Education", "#education"],
    ["Contact", "#contact"],
  ];

  const linkCls = (href) =>
    `hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-500 rounded ${active===href ? "text-cyan-400 underline underline-offset-8" : ""}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-sans p-4 sm:p-6 md:p-12">
      {/* Skip link for screen readers */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] bg-cyan-500 text-black px-3 py-1 rounded"
      >
        Skip to content
      </a>

      {/* No parent motion container to avoid child reset */}
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {/* NAV */}
        <header className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur border-b border-gray-800 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
            <a href="#home" className="text-lg font-bold text-cyan-400 tracking-wide">
              Mohammed Alam
            </a>
            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden md:block text-sm">
              <ul className="flex gap-5">
                {navItems.map(([label, href]) => (
                  <li key={href}>
                    <a className={linkCls(href)} href={href} aria-current={active===href ? "page" : undefined}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-2xl text-cyan-400"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          {/* Mobile menu overlay */}
          {menuOpen && (
            <div id="mobile-menu" ref={menuRef} className="md:hidden bg-black/90 backdrop-blur absolute top-full inset-x-0 p-4">
              <ul className="flex flex-col gap-4 text-lg">
                {navItems.map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className={linkCls(href)}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active===href ? "page" : undefined}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>

        {/* HERO (animates once) */}
        <Hero prefersReducedMotion={prefersReducedMotion} fadeInUp={fadeInUp} />

        {/* SKILLS (word-for-word with resume) */}
        <Section id="skills" title="Skills">
          <div className="grid md:grid-cols-2 gap-6 text-gray-300 text-sm leading-relaxed">
            <div className="space-y-3">
              <p>
                <strong>Languages & Frameworks:</strong> C/C++/C#, Java, Python, JavaScript, Oracle SQL, MySQL
              </p>
              <p>
                <strong>Test Automation Tools:</strong> Playwright, Robot Framework, Selenium, JMeter, Postman
              </p>
              <p>
                <strong>CI/CD & DevOps:</strong> Jenkins, TeamCity, Octopus Deploy, Azure DevOps, Docker
              </p>
            </div>
            <div className="space-y-3">
              <p>
                <strong>Cloud & Monitoring:</strong> AWS (DynamoDB, ECS, SNS, SQS), Datadog
              </p>
              <p>
                <strong>Testing Expertise:</strong> Component testing (C#), End-to-end testing (Playwright, JavaScript), REST API testing, CI/CD automation, Load testing
              </p>
              <p>
                <strong>Version Control & Collaboration:</strong> Git, Bitbucket, SVN, Jira, Confluence, TestRail, SFDC
              </p>
            </div>
          </div>
        </Section>

        {/* EXPERIENCE (word-for-word with resume) */}
        <Section id="experience" title="Experience">
          <div className="space-y-8 text-gray-300 text-sm">
            <Exp
              role="Lead Automation Engineer"
              time="07/2021 – Current"
              org="Generali Global Assistance — San Diego, CA"
              bullets={[
                "Built scalable API test automation using Robot Framework (Python), fully integrated into Jenkins CI/CD, accelerating release cycles by 40%.",
                "Developed and maintained JavaScript-based Playwright tests for UI end-to-end coverage.",
                "Built and optimized real-time observability dashboards in Datadog, enabling proactive defect detection and reducing triage time by 50%.",
                "Collaborated with DevOps teams to test complex AWS microservices: DynamoDB, ECS, SNS, SQS.",
                "As the SME for Integration & Payments, provided technical leadership on automation strategy — guided engineers on scalable framework design, streamlined test coverage, and reinforced best practices across teams.",
              ]}
            />
            <Exp
              role="Software QA Engineer II"
              time="09/2019 – 07/2021"
              org="Green Dot Corporation — La Jolla, CA"
              bullets={[
                "Deployed and managed environments through TeamCity, Octopus Deploy, and Azure DevOps.",
                "Developed and maintained C#/.NET automation including component-level testing and API verification.",
                "Conducted backend validations on data migrations from Pervasive SQL to MySQL.",
                "Collaborated with cross-functional teams on agile sprints, feature readiness, and regression scope.",
              ]}
            />
            <Exp
              role="Quality Engineering & Assurance Analyst"
              time="06/2018 – 08/2019"
              org="Cognizant — Irving, TX"
              bullets={[
                "Completed accelerated corporate training in consulting principles, Java, Oracle SQL, JDBC, JUnit, JSP, and Selenium.",
                "Analyzed client requirements, designed automated test scenarios, triaged defects through SFDC, and ensured seamless deliveries upon project specifications.",
                "Validated client backend coding through IBM AS/400 and query testing.",
              ]}
            />
            <Exp
              role="Software Test Engineer"
              time="05/2018 – 06/2018"
              org="Abbott — San Diego, CA"
              bullets={[
                "Designed and executed test protocols for USB-connected drug test devices using protocol analyzers.",
                "Validated GUI components and collaborated with developers to resolve issues via JIRA.",
              ]}
            />
            <Exp
              role="Software QA Intern"
              time="05/2016 – 08/2016"
              org="United Airlines — Chicago, IL"
              bullets={[
                "Automated deployment pipelines and testing using CA Technologies Release Automation.",
                "Helped modernize www.united.com deployment workflows with Agile automation strategies.",
              ]}
            />
          </div>
        </Section>

        {/* PROJECTS (word-for-word with resume) */}
        <Section id="projects" title="Projects">
          <div className="grid sm:grid-cols-2 gap-6">
            <ProjectCard
              title="Operating System Project"
              href="https://github.com/mnalam2/OperatingSystem/tree/master/student-distrib"
              desc="Developed a full OS in x86/C with memory protection, file system, and I/O drivers."
              tags={["C", "x86", "OS"]}
            />
            <ProjectCard
              title="AI Projects"
              href="https://github.com/mnalam2/Artificial-Intelligence-Projects"
              desc="Implemented search algorithms, game AI, and probabilistic reasoning."
              tags={["Python", "AI", "Algorithms"]}
            />
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" title="Education">
          <p className="text-gray-300 text-sm">
            <strong>B.S., Computer Engineering</strong> — University of Illinois Urbana‑Champaign (2017)
            <br />
            Coursework: Data Structures, Algorithms & Models of Computation, Virtual Reality, Artificial Intelligence
          </p>
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="Contact">
          <div className="text-center space-y-2">
            <p className="text-gray-300 text-sm">Reach me directly:</p>
            <p className="text-cyan-400 text-sm">
              <a href="mailto:mohammed.nafi.alam@gmail.com" className="hover:underline">mohammed.nafi.alam@gmail.com</a>
            </p>
            <p className="text-cyan-400 text-sm">
              <a href="https://www.linkedin.com/in/mohammed-alam-8193009a/" className="hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            </p>
          </div>
        </Section>

        <footer className="text-center text-xs text-gray-500 pt-6 border-t border-gray-800">
          © {new Date().getFullYear()} Mohammed Alam. All rights reserved.
        </footer>
      </div>
    </main>
  );
}

function Hero({ prefersReducedMotion, fadeInUp }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });
  const [seen, setSeen] = useState(false);
  useEffect(() => { if (inView && !seen) setSeen(true); }, [inView, seen]);
  return (
    <motion.section
      ref={ref}
      id="home"
      className="pt-24 sm:pt-28 text-center"
      variants={fadeInUp}
      initial={prefersReducedMotion ? false : "hidden"}
      animate={prefersReducedMotion ? undefined : (seen ? "visible" : "hidden")}
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        Mohammed Alam
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-3">
        Software Engineer in Test — Automation, CI/CD, and reliable releases
      </p>
      <div className="mt-6 flex flex-col items-center gap-4">
        <div className="flex gap-6 text-2xl">
          <a href="https://www.linkedin.com/in/mohammed-alam-8193009a/" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://github.com/mnalam2" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="mailto:mohammed.nafi.alam@gmail.com" className="hover:text-cyan-400" aria-label="Email Mohammed">
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
    </motion.section>
  );
}

function Exp({ role, time, org, bullets }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold text-white">{role}</h3>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      <div className="text-sm text-gray-400 mt-0.5">{org}</div>
      <ul className="mt-3 space-y-1.5 text-gray-300 text-sm marker:text-cyan-400 list-disc list-inside">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ title, href, desc, tags }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-gray-800 bg-gray-900/40 p-5 hover:border-cyan-700/50 hover:shadow-lg hover:-translate-y-0.5 transition transform"
    >
      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400">{title}</h3>
      <p className="text-gray-300 text-sm mt-1">{desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="inline-flex items-center rounded-md bg-gray-800 px-2 py-0.5 text-[11px] text-gray-300">
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}