import React, { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaBars, FaTimes } from "react-icons/fa";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0 });
  }, []);

  const Section = ({ id, title, children }) => (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 border-b border-gray-800 pb-3 mb-6">
        {title}
      </h2>
      {children}
    </section>
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
            Engineer with deep experience in web, API, and backend validation. Trusted to lead strategy, own delivery, and ship high-quality software fast.
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
              <p><strong>• Languages & Frameworks:</strong> C/C++/C#, Java, Python, JavaScript, Oracle SQL, MySQL</p>
              <p><strong>• CI/CD & DevOps:</strong> Jenkins, TeamCity, Octopus Deploy, Azure DevOps, Docker</p>
              <p><strong>• Testing Expertise:</strong> Component testing (C#), End-to-end testing (Playwright, JavaScript), REST API testing, CI/CD automation, Load testing</p>
            </div>
            <div className="space-y-3">
              <p><strong>• Test Automation Tools:</strong> Playwright, Robot Framework, Selenium, JMeter, Postman</p>
              <p><strong>• Cloud & Monitoring:</strong> AWS (DynamoDB, ECS, SNS, SQS), Datadog</p>
              <p><strong>• Version Control & Collaboration:</strong> Git, Bitbucket, SVN, Jira, Confluence, TestRail, SFDC</p>
            </div>
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title="Work History">
          <div className="space-y-8 text-gray-300 text-sm">
            {/* Keep bullets exactly word for word as resume */}
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
          </div>
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
