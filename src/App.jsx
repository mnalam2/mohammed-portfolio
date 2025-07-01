import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function App() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-sans p-6 md:p-12 scroll-smooth">
      <motion.section
        className="max-w-6xl mx-auto space-y-24"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur border-b border-gray-800 z-50 px-6 py-4 flex justify-between items-center shadow-md">
          <span className="text-lg font-bold text-cyan-400">Mohammed Alam</span>
          <div className="flex gap-6 text-sm">
            <a href="#skills" className="hover:text-cyan-400 transition">Skills</a>
            <a href="#experience" className="hover:text-cyan-400 transition">Experience</a>
            <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
            <a href="#education" className="hover:text-cyan-400 transition">Education</a>
            <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
          </div>
        </nav>

        <motion.section id="home" className="text-center pt-28" variants={fadeInUp}>
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 animate-fadeInUp">Mohammed Alam</h1>
          <p className="text-xl text-gray-300 mt-4">Software Engineer | Delivering Reliable Systems Through Automation & CI/CD</p>
          <div className="mt-6 flex justify-center gap-8">
            <a href="https://www.linkedin.com/in/mohammed-alam-8193009a/" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
            <a href="https://github.com/mnalam2" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a>
            <a href="/MohammedAlamResume.pdf" download className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full shadow hover:shadow-lg transition text-white font-semibold flex items-center gap-2">📄 Resume</a>
          </div>
        </motion.section>

        <motion.section id="skills" variants={fadeInUp}>
          <h2 className="text-4xl font-bold text-blue-400 border-b border-gray-700 pb-2 mb-6">Skills</h2>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-sm">
            <li><strong>Languages & Frameworks:</strong> C/C++/C#, Java, Python, JavaScript, Oracle SQL, MySQL</li>
            <li><strong>Test Automation Tools:</strong> Playwright, Robot Framework, Selenium, JMeter, Postman</li>
            <li><strong>CI/CD & DevOps:</strong> Jenkins, TeamCity, Octopus Deploy, Azure DevOps, Docker</li>
            <li><strong>Cloud & Monitoring:</strong> AWS (DynamoDB, ECS, SNS, SQS), Datadog</li>
            <li><strong>Testing Expertise:</strong> Component testing (C#), End-to-end testing (Playwright, JavaScript), REST API testing, CI/CD automation, Load testing</li>
            <li><strong>Version Control & Collaboration:</strong> Git, Bitbucket, SVN, Jira, Confluence, TestRail, SFDC</li>
          </ul>
        </motion.section>

        <motion.section id="experience" variants={fadeInUp}>
          <h2 className="text-4xl font-bold text-blue-400 border-b border-gray-700 pb-2 mb-6">Experience</h2>
          <div className="space-y-6 text-gray-300 text-sm">
            <div>
              <p className="font-bold">Lead Automation Engineer, 07/2021 – Current</p>
              <p className="italic">Generali Global Assistance – San Diego, CA</p>
              <ul className="list-disc list-inside">
                <li>Built scalable API test automation using Robot Framework (Python), fully integrated into Jenkins CI/CD, accelerating release cycles by 40%.</li>
                <li>Developed and maintained JavaScript-based Playwright tests for UI and end-to-end coverage.</li>
                <li>Built and optimized real-time observability dashboards in Datadog, enabling proactive defect detection and reducing triage time by 50%.</li>
                <li>Collaborated with DevOps teams to test complex AWS microservices: DynamoDB, ECS, SNS, SQS.</li>
                <li>As the SME for Integration & Payments, provided technical leadership on automation strategy — guided engineers on scalable framework design, streamlined test coverage, and reinforced best practices across teams.</li>
              </ul>
            </div>
            <div>
              <p className="font-bold">Software QA Engineer II, 09/2019 – 07/2021</p>
              <p className="italic">Green Dot Corporation – La Jolla, CA</p>
              <ul className="list-disc list-inside">
                <li>Deployed and managed environments through TeamCity, Octopus Deploy, and Azure DevOps.</li>
                <li>Developed and maintained C#/.NET automation including component-level testing and API verification.</li>
                <li>Conducted backend validations on data migrations from Pervasive SQL to MySQL.</li>
                <li>Collaborated with cross-functional teams on agile sprints, feature readiness, and regression scope.</li>
              </ul>
            </div>
            <div>
              <p className="font-bold">Quality Engineering & Assurance Analyst, 06/2018 – 08/2019</p>
              <p className="italic">Cognizant – Irving, TX</p>
              <ul className="list-disc list-inside">
                <li>Completed accelerated corporate training in consulting principles, Java, Oracle SQL, JDBC, JUnit, JSP, and Selenium.</li>
                <li>Analyzed client requirements, designed automated test scenarios, triaged defects through SFDC, and ensured seamless deliveries upon project specifications.</li>
                <li>Validated client backend coding through IBM AS/400 and query testing.</li>
              </ul>
            </div>
            <div>
              <p className="font-bold">Software Test Engineer, 05/2018 – 06/2018</p>
              <p className="italic">Abbott – San Diego, CA</p>
              <ul className="list-disc list-inside">
                <li>Designed and executed test protocols for USB-connected drug test devices using protocol analyzers.</li>
                <li>Validated GUI components and collaborated with developers to resolve issues via JIRA.</li>
              </ul>
            </div>
            <div>
              <p className="font-bold">Software QA Intern, 05/2016 – 08/2016</p>
              <p className="italic">United Airlines – Chicago, IL</p>
              <ul className="list-disc list-inside">
                <li>Automated deployment pipelines and testing using CA Technologies Release Automation.</li>
                <li>Helped modernize www.united.com deployment workflows with Agile automation strategies.</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section id="projects" variants={fadeInUp}>
          <h2 className="text-4xl font-bold text-blue-400 border-b border-gray-700 pb-2 mb-6">Projects</h2>
          <ul className="space-y-4 text-gray-300">
            <li>
              <strong>Operating System Project</strong> – <a href="https://github.com/mnalam2/OperatingSystem/tree/master/student-distrib" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">GitHub</a>
              <p>Developed a full OS in x86/C with memory protection, file system, and I/O drivers.</p>
            </li>
            <li>
              <strong>AI Projects</strong> – <a href="https://github.com/mnalam2/Artificial-Intelligence-Projects" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">GitHub</a>
              <p>Implemented search algorithms, game AI, and probabilistic reasoning.</p>
            </li>
          </ul>
        </motion.section>
      </motion.section>
    </main>
  );
}
