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
          <span className="text-lg font-bold text-cyan-400">Mohammed N Alam</span>
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
          <div className="mt-6 flex flex-col items-center gap-4">
  <div className="flex gap-8">
    <a href="https://www.linkedin.com/in/mohammed-alam-8193009a/" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
    <a href="https://github.com/mnalam2" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a>
  </div>
  <a href="/MohammedAlamResume.pdf" download className="flex items-center gap-2 px-6 py-2 bg-white text-black font-medium rounded-full shadow hover:shadow-lg transition duration-300 hover:bg-gray-200">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4H4zm4 8h8m-4-4v8" />
    </svg>
    Download Resume
  </a>
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
              <strong>Lead Automation Engineer</strong>, 07/2021 - Current<br/>
              <em>Generali Global Assistance – San Diego, CA</em>
              <ul className="list-disc list-inside mt-2">
                <li>Built scalable API test automation using Robot Framework (Python), fully integrated into Jenkins CI/CD, accelerating release cycles by 40%.</li>
                <li>Developed and maintained JavaScript-based Playwright tests for UI and end-to-end coverage.</li>
                <li>Built and optimized real-time observability dashboards in Datadog, enabling proactive defect detection and reducing triage time by 50%.</li>
                <li>Collaborated with DevOps teams to test complex AWS microservices: DynamoDB, ECS, SNS, SQS.</li>
                <li>As the SME for Integration & Payments, provided technical leadership on automation strategy — guided engineers on scalable framework design, streamlined test coverage, and reinforced best practices across teams.</li>
              </ul>
            </div>
            <div>
              <strong>Software QA Engineer II</strong>, 09/2019 - 07/2021<br/>
              <em>Green Dot Corporation – La Jolla, CA</em>
              <ul className="list-disc list-inside mt-2">
                <li>Deployed and managed environments through TeamCity, Octopus Deploy, and Azure DevOps.</li>
                <li>Developed and maintained C#/.NET automation including component-level testing and API verification.</li>
                <li>Conducted backend validations on data migrations from Pervasive SQL to MySQL.</li>
                <li>Collaborated with cross-functional teams on agile sprints, feature readiness, and regression scope.</li>
              </ul>
            </div>
            <div>
              <strong>Quality Engineering & Assurance Analyst</strong>, 06/2018 - 08/2019<br/>
              <em>Cognizant – Irving, TX</em>
              <ul className="list-disc list-inside mt-2">
                <li>Completed accelerated corporate training in consulting principles, Java, Oracle SQL, JDBC, JUnit, JSP, and Selenium.</li>
                <li>Analyzed client requirements, designed automated test scenarios, triaged defects through SFDC, and ensured seamless deliveries upon project specifications.</li>
                <li>Validated client backend coding through IBM AS/400 and query testing.</li>
              </ul>
            </div>
            <div>
              <strong>Software Test Engineer</strong>, 05/2018 - 06/2018<br/>
              <em>Abbott – San Diego, CA</em>
              <ul className="list-disc list-inside mt-2">
                <li>Designed and executed test protocols for USB-connected drug test devices using protocol analyzers.</li>
                <li>Validated GUI components and collaborated with developers to resolve issues via JIRA.</li>
              </ul>
            </div>
            <div>
              <strong>Software QA Intern</strong>, 05/2016 - 08/2016<br/>
              <em>United Airlines – Chicago, IL</em>
              <ul className="list-disc list-inside mt-2">
                <li>Automated deployment pipelines and testing using CA Technologies Release Automation.</li>
                <li>Helped modernize www.united.com deployment workflows with Agile automation strategies.</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section id="projects" variants={fadeInUp}>
          <h2 className="text-4xl font-bold text-blue-400 border-b border-gray-700 pb-2 mb-6">Projects</h2>
          <div className="text-gray-300 text-sm space-y-4">
            <div>
              <strong>Operating System Project – </strong>
              <a href="https://github.com/mnalam2/OperatingSystem/tree/master/student-distrb" className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">
                GitHub Repo
              </a>
              <p>Developed a full OS in x86/C with memory protection, file system, and I/O drivers.</p>
            </div>
            <div>
              <strong>AI Projects – </strong>
              <a href="https://github.com/mnalam2/Artificial-Intelligence-Projects" className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">
                GitHub Repo
              </a>
              <p>Implemented search algorithms, game AI, and probabilistic reasoning.</p>
            </div>
          </div>
        </motion.section>

        <motion.section id="education" variants={fadeInUp}>
          <h2 className="text-4xl font-bold text-blue-400 border-b border-gray-700 pb-2 mb-6">Education</h2>
          <p className="text-gray-300 text-sm">
            <strong>Bachelor of Science:</strong> Computer Engineering, 2017<br />
            <strong>University of Illinois At Urbana-Champaign</strong> – Champaign, IL<br />
            <strong>Applicable Coursework:</strong> Data Structures, Algorithms & Models of Computation, Virtual Reality, Artificial Intelligence
          </p>
        </motion.section>

        <motion.section id="contact" className="text-center" variants={fadeInUp}>
  <h2 className="text-4xl font-bold text-blue-400 border-b border-gray-700 pb-2 mb-6">Contact</h2>
  <p className="text-gray-300 text-sm">Feel free to reach out directly at:</p>
  <p className="text-cyan-400 mt-2">
    <a href="mailto:mohammed.nafi.alam@gmail.com" className="hover:underline">mohammed.nafi.alam@gmail.com</a>
  </p>
  <p className="text-cyan-400 mt-2">
    <a href="https://www.linkedin.com/in/mohammed-alam-8193009a/" className="hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
  </p>
</motion.section>
      </motion.section>
    </main>
  );
}
