import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaBars, FaTimes, FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence, useInView, useMotionValue, animate, useTransform } from "framer-motion";
import CareerWalk from "./CareerWalk";
import PipelineSimulator from "./PipelineSimulator";

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
    lang: "robot",
    filename: "test_payment_api.robot",
    code: `*** Settings ***
Library    RequestsLibrary

*** Test Cases ***
Validate Payment API Response
    [Tags]    integration    payments
    Create Session    api    \${BASE_URL}
    \${resp}=    POST On Session    api    /payments
    ...    json={"amount": 99.99}
    Should Be Equal As Integers
    ...    \${resp.status_code}    200
    \${body}=    Set Variable    \${resp.json()}
    Should Be Equal    \${body}[status]    APPROVED`,
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
    lang: "csharp",
    filename: "AccountMigrationTests.cs",
    code: `[TestClass]
public class AccountMigrationTests
{
    [TestMethod]
    public void VerifyBalanceMigration()
    {
        var legacy = LegacyDb.GetAccount("ACC-8821");
        var mysql  = MySqlDb.GetAccount("ACC-8821");

        Assert.AreEqual(
            legacy.Balance, mysql.Balance);
        Assert.AreEqual("ACTIVE", mysql.Status);
        Console.WriteLine("Verified: " + mysql.Id);
    }
}`,
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
    lang: "java",
    filename: "DashboardTest.java",
    code: `@Test
public void verifyDashboardLoad() {
    driver.get(BASE_URL + "/dashboard");
    WebElement table = wait.until(
        visibilityOfElementLocated(
            By.id("client-data-table")
        )
    );
    assertTrue(table.isDisplayed());
    assertEquals("10",
        driver.findElement(
            By.cssSelector(".row-count")
        ).getText());
}`,
  },
  {
    role: "Software Test Engineer",
    time: "05/2018 – 06/2018",
    org: "Abbott – San Diego, CA",
    bullets: [
      "Designed and executed test protocols for USB-connected drug test devices using protocol analyzers.",
      "Validated GUI components and collaborated with developers to resolve issues via JIRA.",
    ],
    lang: "python",
    filename: "test_usb_device.py",
    code: `def test_usb_enumeration():
    analyzer = ProtocolAnalyzer(port="COM3")
    device = analyzer.connect()

    assert device.vendor_id == 0x05AC
    assert device.product_id == 0x1234
    assert device.status == "READY"

    result = device.send_command(CMD_SELF_TEST)
    assert result.code == STATUS_OK`,
  },
  {
    role: "Software QA Intern",
    time: "05/2016 – 08/2016",
    org: "United Airlines – Chicago, IL",
    bullets: [
      "Automated deployment pipelines and testing using CA Technologies Release Automation.",
      "Helped modernize www.united.com deployment workflows with Agile automation strategies.",
    ],
    lang: "javascript",
    filename: "deploy-pipeline.js",
    code: `const pipeline = new DeployPipeline({
  app: "united-web",
  env: "staging",
  version: process.env.BUILD_VERSION,
});

await pipeline
  .validate()
  .runSmokeTests()
  .deploy()
  .verify();

console.log("Deploy complete ✓");`,
  },
];

const STATS = [
  { end: 40, suffix: "%", label: "Faster Release Cycles",    sublabel: "CI/CD automation at Generali" },
  { end: 50, suffix: "%", label: "Faster Defect Triage",     sublabel: "Datadog observability dashboards" },
  { end: 10, suffix: "+", label: "Years Leading Automation", sublabel: "Across finance, health & travel" },
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

const SYNTAX_RULES = {
  robot: [
    { re: /^\*{3}[^*\n]+\*{3}/, cls: "text-yellow-300 font-bold" },
    { re: /^\[(?:Tags|Documentation|Setup|Teardown)\]/, cls: "text-cyan-300" },
    { re: /^#[^\n]*/, cls: "text-gray-500 italic" },
    { re: /\$\{[^}]+\}/, cls: "text-orange-300" },
    { re: /"[^"]*"/, cls: "text-yellow-200" },
    { re: /\b(?:Library|Resource|Create Session|POST On Session|Should Be Equal(?: As Integers)?|Set Variable|Log)\b/, cls: "text-blue-300" },
    { re: /\b\d+(?:\.\d+)?\b/, cls: "text-orange-300" },
  ],
  csharp: [
    { re: /\/\/[^\n]*/, cls: "text-gray-500 italic" },
    { re: /\$?"[^"]*"/, cls: "text-yellow-200" },
    { re: /\[(?:TestMethod|TestClass|Test)\]/, cls: "text-yellow-300" },
    { re: /\b(?:public|private|protected|void|var|new|class|using|return|string|int|bool|static|async|await|this|null|true|false)\b/, cls: "text-purple-400" },
    { re: /\b(?:Assert|Console)\b/, cls: "text-cyan-300" },
    { re: /\b\d+(?:\.\d+)?\b/, cls: "text-orange-300" },
  ],
  java: [
    { re: /\/\/[^\n]*/, cls: "text-gray-500 italic" },
    { re: /"[^"]*"/, cls: "text-yellow-200" },
    { re: /@\w+/, cls: "text-yellow-300" },
    { re: /\b(?:public|private|void|class|import|return|String|int|boolean|new|static|final|null|true|false)\b/, cls: "text-purple-400" },
    { re: /\b(?:assertTrue|assertEquals|driver|wait|By|WebElement)\b/, cls: "text-cyan-300" },
    { re: /\b\d+\b/, cls: "text-orange-300" },
  ],
  python: [
    { re: /#[^\n]*/, cls: "text-gray-500 italic" },
    { re: /"[^"]*"|'[^']*'/, cls: "text-yellow-200" },
    { re: /\b(?:def|class|import|from|return|assert|if|elif|else|for|in|not|and|or|True|False|None|await|async)\b/, cls: "text-purple-400" },
    { re: /0x[0-9A-Fa-f]+/, cls: "text-orange-300" },
    { re: /\b\d+(?:\.\d+)?\b/, cls: "text-orange-300" },
    { re: /\b(?:self|print|len|range)\b/, cls: "text-blue-300" },
  ],
  javascript: [
    { re: /\/\/[^\n]*/, cls: "text-gray-500 italic" },
    { re: /"[^"]*"|'[^']*'/, cls: "text-yellow-200" },
    { re: /\b(?:const|let|var|async|await|function|return|new|class|import|export|from|if|else|for|of|in|null|undefined|true|false)\b/, cls: "text-purple-400" },
    { re: /\b(?:console|process|Promise)\b/, cls: "text-cyan-300" },
    { re: /\b\d+(?:\.\d+)?\b/, cls: "text-orange-300" },
  ],
};

function tokenizeLine(line, lang) {
  const rules = SYNTAX_RULES[lang] || [];
  const tokens = [];
  let pos = 0;
  while (pos < line.length) {
    let matched = false;
    for (const { re, cls } of rules) {
      const m = line.slice(pos).match(re);
      if (m && m.index === 0) {
        tokens.push({ text: m[0], cls });
        pos += m[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      if (tokens.length && tokens[tokens.length - 1].cls === "plain") {
        tokens[tokens.length - 1].text += line[pos];
      } else {
        tokens.push({ text: line[pos], cls: "plain" });
      }
      pos++;
    }
  }
  return tokens;
}

function TokenizedLine({ line, lang }) {
  return (
    <>
      {tokenizeLine(line, lang).map((tok, i) => (
        <span key={i} className={tok.cls === "plain" ? "text-gray-300" : tok.cls}>{tok.text}</span>
      ))}
    </>
  );
}

function CodeWindow({ snippet, lang, filename }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    let t;
    const tick = () => {
      i++;
      setDisplayed(snippet.slice(0, i));
      if (i < snippet.length) t = setTimeout(tick, 13);
    };
    t = setTimeout(tick, 150);
    return () => clearTimeout(t);
  }, [snippet]);

  const lines = displayed.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-lg border border-gray-700/60 bg-gray-950 overflow-hidden"
      style={{ boxShadow: "0 0 40px rgba(34,211,238,0.07)" }}
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-900/80 border-b border-gray-800">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-3 text-gray-500 text-[11px] tracking-wide">{filename}</span>
      </div>
      <div
        className="overflow-auto p-4"
        style={{ maxHeight: "340px", fontFamily: "'Fira Code','Cascadia Code','Consolas',monospace" }}
      >
        <div className="text-xs leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className="flex min-h-[1.5em]">
              <span className="text-gray-700 select-none text-right mr-4 shrink-0" style={{ minWidth: "1.5rem" }}>
                {i + 1}
              </span>
              <span className="whitespace-pre">
                <TokenizedLine line={line} lang={lang} />
                {i === lines.length - 1 && displayed.length < snippet.length && (
                  <span className="inline-block w-[6px] h-[0.9em] bg-cyan-400/80 animate-pulse ml-0.5 align-middle" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

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

function BeamReveal({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    let obs;
    // Delay until loader + fade-in are fully done so the beam isn't
    // consumed invisibly while the matrix screen is still showing.
    const timer = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      obs = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const beam = document.createElement('div');
        // Start above the section (clipped by overflow:hidden)
        beam.style.cssText = 'position:absolute;left:0;right:0;top:0;height:80px;z-index:10;pointer-events:none;background:linear-gradient(to bottom,transparent,rgba(34,211,238,0.6) 45%,rgba(34,211,238,0.2) 60%,transparent);transform:translateY(-80px)';
        el.appendChild(beam);
        // Force reflow so the browser commits the start position before transitioning
        beam.getBoundingClientRect();
        beam.style.transition = 'transform 0.9s cubic-bezier(0.4,0,0.2,1)';
        beam.style.transform = `translateY(${el.offsetHeight}px)`;
        setTimeout(() => { if (beam.parentNode) beam.remove(); }, 1000);
      }, { threshold: 0.1 });
      obs.observe(el);
    }, LOADER_DONE_AT + 800);

    return () => { clearTimeout(timer); obs?.disconnect(); };
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden">
      {children}
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <BeamReveal>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 border-b border-gray-800 pb-3 mb-6">
          {title}
        </h2>
        {children}
      </BeamReveal>
    </section>
  );
}

function Timeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIdx(i); },
        { rootMargin: "-10% 0px -50% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div>
      {/* ── Left: timeline ── */}
      <div className="relative">
        <div className="absolute left-[13px] top-5 bottom-5 w-px bg-gray-800" />
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
              ref={(el) => { cardRefs.current[i] = el; }}
              className="flex gap-5"
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            >
              <div className="relative flex-shrink-0 w-7 flex justify-center pt-[1.35rem]">
                <div className={`w-3.5 h-3.5 rounded-full bg-gray-950 border-2 z-10 transition-all duration-300 ${
                  activeIdx === i
                    ? "border-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.8)]"
                    : "border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.45)]"
                }`} />
              </div>
              <div className={`flex-1 rounded-lg border bg-gray-900/40 p-5 mb-1 transition-all duration-300 ${
                activeIdx === i
                  ? "border-cyan-500/40 shadow-[0_0_24px_rgba(34,211,238,0.07)]"
                  : "border-gray-800"
              }`}>
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

    </div>
  );
}

const MATRIX_CHARS = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF<>{}[]|/\\';

const HACK_LINES = [
  { text: '> INITIALIZING SECURE CONNECTION...', delay: 600 },
  { text: '> IDENTITY CONFIRMED: MOHAMMED ALAM', delay: 1100 },
  { text: '> ROLE: LEAD AUTOMATION ENGINEER', delay: 1550 },
  { text: '> SYSTEMS: PLAYWRIGHT · JENKINS · AWS', delay: 1950 },
  { text: '> ALL SYSTEMS ONLINE', delay: 2300 },
  { text: '> LAUNCHING PORTFOLIO...', delay: 2650, bright: true },
];

const LOADER_DONE_AT = 3400;

function MatrixLoader({ onDone }) {
  const canvasRef = useRef(null);
  const [visibleLines, setVisibleLines] = useState(0);

  // Matrix rain on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const fontSize = 15;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      return Array.from(
        { length: Math.floor(canvas.width / fontSize) },
        () => Math.floor(Math.random() * -(canvas.height / fontSize))
      );
    };

    let drops = setup();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        ctx.fillStyle = '#00ff41';
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 35);
    const onResize = () => { drops = setup(); };
    window.addEventListener('resize', onResize);
    return () => { clearInterval(interval); window.removeEventListener('resize', onResize); };
  }, []);

  // Terminal line reveals
  useEffect(() => {
    const timers = HACK_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    const done = setTimeout(onDone, LOADER_DONE_AT);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const allDone = visibleLines >= HACK_LINES.length;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Rain canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Terminal card */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-lg font-mono text-sm rounded-lg border border-green-500/30 bg-black/80 p-6 backdrop-blur-sm"
          style={{ boxShadow: '0 0 40px rgba(0,255,65,0.12), 0 0 80px rgba(0,255,65,0.06)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          {/* Header row */}
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
              style={{ boxShadow: '0 0 6px #00ff41' }} />
            <span className="text-green-500/50 text-xs tracking-[0.2em] uppercase">Secure Terminal v1.0</span>
          </div>

          {/* Lines */}
          <div className="space-y-2">
            {HACK_LINES.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className={line.bright
                  ? 'text-green-300 font-bold tracking-wide'
                  : 'text-green-500'}
                style={line.bright ? { textShadow: '0 0 8px #00ff41' } : undefined}
              >
                {line.text}
              </div>
            ))}
            {visibleLines > 0 && !allDone && (
              <span
                className="inline-block w-[9px] h-[1.1em] bg-green-400 align-middle animate-pulse"
                style={{ boxShadow: '0 0 6px #00ff41' }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function DotGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const SPACING   = 34;
    const DOT_R     = 1.1;
    const BASE_OP   = 0.18;
    const WAVE_BAND = 30;   // px width of the illuminated ring
    const WAVE_SPD  = 110;  // px per second
    // Dot base: white. Wave peak: cyan-400
    const BASE_RGB  = [255, 255, 255];
    const WAVE_RGB  = [34,  211, 238];

    let dots = [], waves = [], rafId, lastTime;

    const init = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols   = Math.ceil(canvas.width  / SPACING) + 1;
      const rows   = Math.ceil(canvas.height / SPACING) + 1;
      const offX   = (canvas.width  % SPACING) / 2;
      const offY   = (canvas.height % SPACING) / 2;
      dots = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          dots.push({ x: offX + c * SPACING, y: offY + r * SPACING });
      waves = [];
    };

    const spawnWave = () => waves.push({
      x: canvas.width  * (0.15 + Math.random() * 0.7),
      y: canvas.height * (0.15 + Math.random() * 0.7),
      radius: 0,
    });

    init();
    setTimeout(spawnWave, 400);
    const waveTimer = setInterval(spawnWave, 3800);

    const maxR = () => Math.hypot(canvas.width, canvas.height);

    const loop = (now) => {
      const dt  = Math.min((now - (lastTime ?? now)) / 1000, 0.05);
      lastTime  = now;

      const max = maxR();
      waves     = waves.filter(w => w.radius < max + WAVE_BAND);
      for (const w of waves) w.radius += WAVE_SPD * dt;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const d of dots) {
        let peak = 0;
        for (const w of waves) {
          const dist = Math.hypot(d.x - w.x, d.y - w.y);
          const diff = Math.abs(dist - w.radius);
          if (diff < WAVE_BAND) {
            // smooth bell curve across the band
            const t = 1 - diff / WAVE_BAND;
            // fade wave out as it expands
            const fade = Math.max(0, 1 - w.radius / max);
            peak = Math.max(peak, t * t * fade);
          }
        }

        const r  = Math.round(BASE_RGB[0] + (WAVE_RGB[0] - BASE_RGB[0]) * peak);
        const g  = Math.round(BASE_RGB[1] + (WAVE_RGB[1] - BASE_RGB[1]) * peak);
        const b  = Math.round(BASE_RGB[2] + (WAVE_RGB[2] - BASE_RGB[2]) * peak);
        const op = BASE_OP + peak * 0.62;
        const r2 = DOT_R  + peak * 0.7;

        ctx.beginPath();
        ctx.arc(d.x, d.y, r2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${op})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(waveTimer);
      window.removeEventListener('resize', init);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollBarRef = useRef(null);
  const [formStatus, setFormStatus] = useState("idle");
  const [careerWalkOpen, setCareerWalkOpen] = useState(false);
  const [pipelineOpen, setPipelineOpen] = useState(false);

  const typed = useTypewriter(PHRASES);

  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollBarRef.current) {
        scrollBarRef.current.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;
      }
    };
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
      await emailjs.sendForm(
        "service_8jo6k7h",
        "template_0uweoxf",
        e.target,
        "-aQbtf3t-VTPboaHm"
      );
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={scrollBarRef}
        className="fixed top-0 left-0 z-[60] h-[2px] pointer-events-none"
        style={{
          width: '0%',
          background: 'linear-gradient(to right, #22d3ee, #3b82f6)',
          boxShadow: '0 0 8px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.4)',
        }}
      />

      <AnimatePresence>
        {!loaderDone && <MatrixLoader key="loader" onDone={() => setLoaderDone(true)} />}
        {careerWalkOpen && (
          <CareerWalk key="career-walk" onClose={() => setCareerWalkOpen(false)} />
        )}
        {pipelineOpen && (
          <PipelineSimulator key="pipeline" onClose={() => setPipelineOpen(false)} />
        )}
      </AnimatePresence>

    <DotGrid />

    {/* Orbs live outside motion.main so opacity animation on main doesn't trap them in its stacking context */}
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div style={{
        position: 'absolute', left: '-22%', top: '-12%', width: '80%', height: '72%',
        background: 'radial-gradient(ellipse 65% 45% at 50% 50%, rgba(6,182,212,0.11) 0%, transparent 70%)',
        animation: 'orb-drift-1 22s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', right: '-22%', top: '30%', width: '76%', height: '80%',
        background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(37,99,235,0.10) 0%, transparent 70%)',
        animation: 'orb-drift-2 28s ease-in-out infinite',
        animationDelay: '-11s',
      }} />
      <div style={{
        position: 'absolute', left: '8%', bottom: '-22%', width: '70%', height: '66%',
        background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)',
        animation: 'orb-drift-3 19s ease-in-out infinite',
        animationDelay: '-7s',
      }} />
    </div>

    <motion.main
      className="min-h-screen text-white font-sans p-4 sm:p-6 md:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: loaderDone ? 1 : 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ position: 'relative', zIndex: 1 }}
    >

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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Mohammed Alam
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-4 h-7">
                <span className="text-white">{typed}</span>
                <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 align-middle animate-pulse" />
              </p>
              <p className="text-sm sm:text-base text-gray-400 mt-3 max-w-xl">
                Engineer with deep experience in web, API, and backend validation. Trusted to lead strategy, own delivery, and ship high-quality software fast.
              </p>
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

        {/* STATS */}
        <StatsSection />

        {/* EXPERIENCE */}
        <Section id="experience" title="Work History">
          <div className="mb-6">
            <button
              onClick={() => setCareerWalkOpen(true)}
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 text-sm font-mono hover:bg-cyan-500/20 hover:border-cyan-400 transition-all"
              style={{ boxShadow: '0 0 20px rgba(34,211,238,0.08)' }}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping" />
              Enter Career Walk
              <span className="text-xs text-cyan-600 group-hover:text-cyan-400 transition-colors">▶</span>
            </button>
            <p className="text-gray-600 text-xs mt-2 ml-1 font-mono">
              Interactive side-scroller — walk through each role
            </p>
          </div>
          <Timeline />
        </Section>

        {/* EDUCATION */}
        <Section id="education" title="Education">
          <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-5 text-sm text-gray-300">
            <p className="text-white font-semibold">Bachelor of Science: Computer Engineering, 2017</p>
            <p className="mt-1">University of Illinois At Urbana-Champaign - <span className="whitespace-nowrap">Champaign, IL</span></p>
            <p className="mt-2 text-gray-400">
              Applicable Coursework: Data Structures, Algorithms & Models of Computation, Virtual Reality, Artificial Intelligence
            </p>
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="Projects">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Pipeline demo — featured interactive card */}
            <button
              onClick={() => setPipelineOpen(true)}
              className="md:col-span-2 rounded-lg border border-gray-800 bg-gray-900/40 p-5 hover:border-cyan-400 hover:shadow-lg transition text-left w-full group relative overflow-hidden"
            >
              {/* subtle glow sweep on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34,211,238,0.06) 0%, transparent 70%)' }} />
              <div className="relative">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
                    Live CI/CD Pipeline Demo
                  </h3>
                  <span className="shrink-0 text-[10px] font-mono text-cyan-500 border border-cyan-500/30 rounded-full px-2.5 py-0.5 bg-cyan-500/5">
                    ▶ Interactive
                  </span>
                </div>
                <p className="text-sm text-gray-300">
                  Watch a full pipeline execute live — 8 stages from checkout to smoke tests, with streaming logs and real tooling.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['Robot Framework', 'Jenkins', 'AWS ECS', 'Docker', 'Playwright', 'Datadog'].map((t) => (
                    <span key={t} className="text-[10px] font-mono text-gray-600 border border-gray-800 rounded px-1.5 py-0.5 bg-gray-900">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>

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
                onSubmit={handleSubmit}
                className="space-y-4"
              >
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
    </motion.main>
    </>
  );
}
