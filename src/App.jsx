
import React from 'react';

export default function App() {
  return (
    <main className="min-h-screen bg-white p-6 md:p-12 font-sans">
      <section className="max-w-3xl mx-auto space-y-6">
        <header>
          <h1 className="text-4xl font-bold text-blue-700">Mohammed Alam</h1>
          <p className="text-lg text-gray-700">Software Engineer in Test | Playwright | Azure DevOps | C# | JavaScript</p>
          <div className="mt-4 space-x-4">
            <a href="https://linkedin.com" className="text-blue-600 underline">LinkedIn</a>
            <a href="https://github.com" className="text-blue-600 underline">GitHub</a>
            <a href="/resume.pdf" download className="text-blue-600 underline">Download Resume</a>
          </div>
        </header>
        <section>
          <h2 className="text-2xl font-semibold">Work Experience</h2>
          <ul className="list-disc list-inside text-gray-800">
            <li><strong>Lead Automation Engineer</strong> – Generali Global Assistance</li>
            <li><strong>Software QA Engineer II</strong> – Green Dot Corporation</li>
            <li><strong>QA Analyst</strong> – Cognizant</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Skills</h2>
          <p>C#, JavaScript, Playwright, Selenium, Azure DevOps, JMeter, Robot Framework, SQL, AWS, Docker, CI/CD</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Education</h2>
          <p>B.S. in Computer Engineering – University of Illinois Urbana-Champaign, 2017</p>
        </section>
      </section>
    </main>
  );
}
