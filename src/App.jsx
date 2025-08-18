/*
  Mohammed Alam – Portfolio (Animated + Aesthetic)
  - Adds tasteful motion using Framer Motion (reduced-motion friendly)
  - Scroll-reveal, staggered lists, hover micro-interactions
  - Animated background accents + scroll progress bar

  Install (once):
    npm i framer-motion react-icons
*/

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaBars, FaTimes } from "react-icons/fa";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0 });
  }, []);

  const Section = ({ id, title, children }) => (
    <motion.section
      id={id}
      className="scroll-mt-24"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 border-b border-gray-800 pb-3 mb-6"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      {children}
    </motion.section>
  );

  const navItems = [
    ["Skills", "#skills"],
    ["Experience", "#experience"],
    ["Projects", "#projects"],
    ["Education", "#education"],
    ["Contact", "#contact"],
  ];

  const containerStagger = prefersReducedMotion
    ? {}
    : { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const fadeUp = prefersReducedMotion
    ? {}
    : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-sans p-4 sm:p-6 md:p-12 relative overflow-x-clip">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-cyan-400 to-blue-600 z-[60]"
      />

      {/* Subtle animated background accents */}
      <BackgroundFX />

      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {/* NAV */}
        <header className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur border-b border-gray-800 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
            <a href="#home" className="text-lg font-bold text-cyan-400 tracking-wide">
              Mohammed Alam
            </a>
            <nav aria-label="Primary" className="hidden md:block text-sm">
              <ul className="flex gap-5">
                {navItems.map(([label, href]) => (
                  <li key={href}>
                    <motion.a
                      className="relative inline-block focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
                      href={href}
                      whileHover={prefersReducedMotion ? {} : { y: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    >
                      <span className="hover:text-cyan-400">{label}</span>
                      <motion.span
                        layoutId={`underline-${label}`}
                        className="block h-[2px] bg-cyan-500/80 rounded mt-0.5"
                        initial={{ width: 0, opacity: 0 }}
                        whileHover={{ width: "100%", opacity: 1 }}
                        transition={{ duration: 0.25 }}
                      />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.button
              className="md:hidden text-2xl text-cyan-400"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          </div>
          {menuOpen && (
            <motion.div
              className="md:hidden bg-black/90 backdrop-blur absolute top-full inset-x-0 p-4"
              initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
            >
              <ul className="flex flex-col gap-4 text-lg">
                {navItems.map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="block hover:text-cyan-400"
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </header>

        {/* HERO */}
        <section id="home" className="pt-24 sm:pt-28 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Mohammed Alam
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 mt-3"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Software Engineer in Test — Automation, CI/CD, and reliable releases
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col items-center gap-4"
            variants={containerStagger}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? {} : "show"}
          >
            <div className="flex gap-6 text-2xl">
              {[{ I: FaLinkedin, href: "https://www.linkedin.com/in/mohammed-alam-8193009a/", label: "LinkedIn" }, { I: FaGithub, href: "https://github.com/mnalam2", label: "GitHub" }, { I: FaEnvelope, href: "mailto:mohammed.nafi.alam@gmail.com", label: "Email Mohammed" }].map(({ I, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="hover:text-cyan-400"
                  variants={fadeUp}
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                >
                  <I />
                </motion.a>
              ))}
            </div>

            <motion.a
              href="/MohammedAlamResume.pdf"
              download
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2 bg-white text-black font-medium rounded-full shadow hover:shadow-lg transition relative overflow-hidden"
              variants={fadeUp}
            >
              <span className="absolute inset-0 pointer-events-none">
                {/* subtle shine */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </span>
              <FaDownload className="text-black" /> Download Resume
            </motion.a>
          </motion.div>
        </section>

        {/* SKILLS */}
        <Section id="skills" title="Skills">
          <motion.div
            className="grid md:grid-cols-2 gap-6 text-gray-300 text-sm leading-relaxed"
            variants={containerStagger}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? {} : "show"}
            viewport={{ once: true, amount: 0.2 }}
          >
            {[0, 1].map((col) => (
              <motion.div key={col} className="space-y-3" variants={fadeUp}>
                {col === 0 ? (
                  <>
                    <p><strong>• Languages & Frameworks:</strong> C/C++/C#, Java, Python, JavaScript, Oracle SQL, MySQL</p>
                    <p><strong>• CI/CD & DevOps:</strong> Jenkins, TeamCity, Octopus Deploy, Azure DevOps, Docker</p>
                    <p><strong>• Testing Expertise:</strong> Component testing (C#), End-to-end testing (Playwright, JavaScript), REST API testing, CI/CD automation, Load testing</p>
                  </>
                ) : (
                  <>
                    <p><strong>• Test Automation Tools:</strong> Playwright, Robot Framework, Selenium, JMeter, Postman</p>
                    <p><strong>• Cloud & Monitoring:</strong> AWS (DynamoDB, ECS, SNS, SQS), Datadog</p>
                    <p><strong>• Version Control & Collaboration:</strong> Git, Bitbucket, SVN, Jira, Confluence, TestRail, SFDC</p>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title="Work History">
          <motion.div
            className="space-y-8 text-gray-300 text-sm"
            variants={containerStagger}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? {} : "show"}
            viewport={{ once: true, amount: 0.15 }}
          >
            <Exp
              role="Lead Automation Engineer"
              time="07/2021 – Current"
              org="Generali Global Assistance – San Diego, CA"
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
              org="Green Dot Corporation – La Jolla, CA"
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
              org="Cognizant – Irving, TX"
              bullets={[
                "Completed accelerated corporate training in consulting principles, Java, Oracle SQL, JDBC, JUnit, JSP, and Selenium.",
                "Analyzed client requirements, designed automated test scenarios, triaged defects through SFDC, and ensured seamless deliveries upon project specifications.",
                "Validated client backend coding through IBM AS/400 and query testing.",
              ]}
            />
            <Exp
              role="Software Test Engineer"
              time="05/2018 – 06/2018"
              org="Abbott – San Diego, CA"
              bullets={[
                "Designed and executed test protocols for USB-connected drug test devices using protocol analyzers.",
                "Validated GUI components and collaborated with developers to resolve issues via JIRA.",
              ]}
            />
            <Exp
              role="Software QA Intern"
              time="05/2016 – 08/2016"
              org="United Airlines – Chicago, IL"
              bullets={[
                "Automated deployment pipelines and testing using CA Technologies Release Automation.",
                "Helped modernize www.united.com deployment workflows with Agile automation strategies.",
              ]}
            />
          </motion.div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" title="Education">
          <motion.div
            className="rounded-lg border border-gray-800 bg-gray-900/40 p-5 text-sm text-gray-300"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-white font-semibold">Bachelor of Science: Computer Engineering, 2017</p>
            <p className="mt-1">University of Illinois At Urbana-Champaign - Champaign, IL</p>
            <p className="mt-2 text-gray-400">
              Applicable Coursework: Data Structures, Algorithms & Models of Computation, Virtual Reality, Artificial Intelligence
            </p>
          </motion.div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="Projects">
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={containerStagger}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? {} : "show"}
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                title: "Operating System Project ↗",
                href: "https://github.com/mnalam2/OperatingSystem/tree/master/student-distrib",
                desc: "Developed a full OS in x86/C with memory protection, file system, and I/O drivers.",
              },
              {
                title: "AI Projects ↗",
                href: "https://github.com/mnalam2/Artificial-Intelligence-Projects",
                desc: "Implemented search algorithms, game AI, and probabilistic reasoning.",
              },
            ].map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </motion.div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="Contact">
          <motion.div
            className="text-center space-y-2"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 text-sm">Reach me directly:</p>
            <p className="text-cyan-400 text-sm">
              <a href="mailto:mohammed.nafi.alam@gmail.com" className="hover:underline">mohammed.nafi.alam@gmail.com</a>
            </p>
            <p className="text-cyan-400 text-sm">
              <a href="https://www.linkedin.com/in/mohammed-alam-8193009a/" className="hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            </p>
          </motion.div>
        </Section>

        <footer className="text-center text-xs text-gray-500 pt-6 border-t border-gray-800">
          © {new Date().getFullYear()} Mohammed Alam. All rights reserved.
        </footer>
      </div>

      {/* Local keyframes for background FX (no Tailwind config needed) */}
      <style>{`
        @keyframes floaty { 0%{ transform: translateY(0px)} 50%{ transform: translateY(-12px)} 100%{ transform: translateY(0px)} }
        @keyframes slowspin { from{ transform: rotate(0deg)} to{ transform: rotate(360deg)} }
        .floaty { animation: floaty 12s ease-in-out infinite; }
        .slowspin { animation: slowspin 40s linear infinite; }
      `}</style>
    </main>
  );
}

function Exp({ role, time, org, bullets }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      className="rounded-lg border border-gray-800 bg-gray-900/40 p-5"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={prefersReducedMotion ? {} : { y: -2 }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold text-white">{role}</h3>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      <div className="text-sm text-gray-400 mt-0.5">{org}</div>
      <motion.ul
        className="list-disc list-inside mt-3 space-y-1 text-gray-300 text-sm"
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView={prefersReducedMotion ? {} : "show"}
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {bullets.map((b, i) => (
          <motion.li key={i} variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}>
            {b}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

function ProjectCard({ title, href, desc }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-gray-800 bg-gray-900/40 p-5 hover:border-cyan-400/80 transition relative overflow-hidden"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={prefersReducedMotion ? {} : { y: -2 }}
    >
      {/* corner light */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl"
        animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <h3 className="text-cyan-400 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-300">{desc}</p>
      <span className="mt-3 inline-flex items-center gap-2 text-xs text-gray-400">
        View on GitHub
        <motion.span
          className="inline-block"
          animate={prefersReducedMotion ? {} : { x: [0, 3, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          →
        </motion.span>
      </span>
    </motion.a>
  );
}

function BackgroundFX() {
  // Lightweight layered accents; respects reduced motion via CSS-only slow transforms
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px, 36px 36px",
        }}
      />
      {/* soft blobs */}
      <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl slowspin" />
      <div className="absolute bottom-[-4rem] right-[-3rem] h-72 w-72 rounded-full bg-blue-600/10 blur-3xl floaty" />
    </div>
  );
}
