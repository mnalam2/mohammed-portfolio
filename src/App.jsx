import React, { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaBars, FaTimes } from "react-icons/fa";

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0 });
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const Section = ({ id, title, children }) => {
    const [seen, setSeen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !seen) {
            setSeen(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [seen]);

    if (prefersReducedMotion || seen) {
      return (
        <section id={id} ref={ref} className="scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 border-b border-gray-800 pb-3 mb-6">
            {title}
          </h2>
          {children}
        </section>
      );
    }

    return (
      <motion.section
        id={id}
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="scroll-mt-24 will-change-transform"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 border-b border-gray-800 pb-3 mb-6">
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-sans p-4 sm:p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {/* NAV */}
        <header className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur border-b border-gray-800 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
            <a href="#home" className="text-lg font-bold text-cyan-400 tracking-wide">
              Mohammed Alam
            </a>
            <nav aria-label="Primary" className="hidden md:block text-sm">
              <ul className="flex gap-5">
                {navItems.map(([label, href]) => (
                  <li key={href}>
                    <a className="hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-500 rounded" href={href}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              className="md:hidden text-2xl text-cyan-400"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden bg-black/90 backdrop-blur absolute top-full inset-x-0 p-4">
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
            </div>
          )}
        </header>

        {/* HERO */}
        <section id="home" className="pt-24 sm:pt-28 text-center">
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
        </section>

        {/* SKILLS */}
        <Section id="skills" title="Skills">
          <div className="grid md:grid-cols-2 gap-6 text-gray-300 text-sm leading-relaxed">
            <div className="space-y-3">
              <p>
                C/C++/C#, Java, Python, JavaScript, Oracle SQL, MySQL, Robot Framework, Playwright, Selenium, JMeter, Postman, Jenkins, TeamCity, Octopus Deploy, Azure DevOps, Docker, AWS (DynamoDB, ECS, SNS, SQS), Git, Bitbucket, SVN, Datadog, Jira, Confluence, TestRail, SFDC
              </p>
            </div>
            <div className="space-y-3">
              <p>
                Component testing (C#), End-to-end testing (Playwright, JavaScript), REST API testing, CI/CD automation, Load testing
              </p>
            </div>
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title="Experience">
          <div className="space-y-8 text-gray-300 text-sm">
            <Exp
              role="Lead Automation Engineer"
              time="07/2021 – Present"
              org="Generali Global Assistance"
              bullets={[
                "Lead API automation development in Robot Framework integrated with Jenkins, increasing release efficiency.",
                "Developed Playwright JavaScript E2E/UI automation suite for web and mobile flows.",
                "Implemented monitoring and alerting with Datadog dashboards to detect issues and reduce triage time.",
                "Collaborated with DevOps on AWS microservices: DynamoDB, ECS, SNS, SQS.",
                "Integration and Payments SME, providing automation framework support across teams.",
              ]}
            />
            <Exp
              role="Software QA Engineer II"
              time="09/2019 – 07/2021"
              org="Green Dot Corporation"
              bullets={[
                "Managed deployments with TeamCity, Octopus, and Azure DevOps.",
                "Built automation in C#/.NET including component tests and API validation.",
                "Verified data migrations from Pervasive SQL to MySQL with backend validation.",
              ]}
            />
            <Exp
              role="QA Analyst"
              time="06/2018 – 08/2019"
              org="Cognizant"
              bullets={[
                "Completed training in consulting, Java, Oracle SQL, JDBC, JUnit, JSP, Selenium.",
                "Created automated test cases and managed defects in SFDC.",
              ]}
            />
            <Exp
              role="Test Engineer"
              time="05/2018 – 06/2018"
              org="Abbott"
              bullets={["Authored test protocols for USB‑connected drug test devices and validated GUI components."]}
            />
            <Exp
              role="QA Intern"
              time="05/2016 – 08/2016"
              org="United Airlines"
              bullets={["Built deployment pipelines and automated testing with CA Release Automation."]}
            />
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="Projects">
          <div className="grid sm:grid-cols-2 gap-6">
            <ProjectCard
              title="Operating System"
              href="https://github.com/mnalam2/OperatingSystem/tree/master/student-distrib"
              desc="Developed an operating system in C with x86 architecture, including memory protection, file system, and I/O drivers."
              tags={["C", "x86", "OS"]}
            />
            <ProjectCard
              title="AI Projects"
              href="https://github.com/mnalam2/Artificial-Intelligence-Projects"
              desc="Implemented search algorithms, game AI, and probabilistic reasoning in Python."
              tags={["Python", "AI"]}
            />
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" title="Education">
          <p className="text-gray-300 text-sm">
            <strong>B.S. in Computer Engineering</strong> — University of Illinois Urbana‑Champaign (2017)
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

function Exp({ role, time, org, bullets }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold text-white">{role}</h3>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      <div className="text-sm text-gray-400 mt-0.5">{org}</div>
      <ul className="list-disc list-inside mt-3 space-y-1 text-gray-300 text-sm">
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
      className="group block rounded-lg border border-gray-800 bg-gray-900/40 p-5 hover:border-cyan-700/50 hover:shadow-lg transition"
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
