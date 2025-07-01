import React from 'react';

export default function App() {
  return (
    <main className="min-h-screen bg-gray-900 text-white font-sans p-6 md:p-12">
      <section className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-400">Mohammed Alam</h1>
          <p className="text-lg text-gray-300 mt-2">
            Software Engineer in Test | Playwright | Azure DevOps | C# | JavaScript
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="https://www.linkedin.com/in/mnalam2" className="hover:underline text-blue-300" target="_blank">LinkedIn</a>
            <a href="https://github.com/mnalam2" className="hover:underline text-blue-300" target="_blank">GitHub</a>
            <a href="/MohammedAlamResume.pdf" download className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
              📄 Download Resume
            </a>
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-blue-400">Projects</h2>
          <ul className="list-disc list-inside text-gray-200">
            <li>
              <strong>Playwright E2E Test Framework</strong> – Developed JavaScript-based UI tests for regression & feature coverage across multiple CI/CD pipelines.
            </li>
            <li>
              <strong>API Automation Suite (Robot Framework)</strong> – Automated high-volume REST API testing in Jenkins, reducing QA cycle time by 40%.
            </li>
            <li>
              <strong>Datadog Observability Dashboards</strong> – Built real-time defect tracking dashboards to detect anomalies and cut triage time by 50%.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-400">Work Experience</h2>
          <ul className="space-y-4 text-gray-200">
            <li>
              <strong>Lead Automation Engineer</strong> – Generali Global Assistance (2021–Present)<br/>
              Built scalable API automation, led test strategy for integration & payments, collaborated with DevOps on AWS microservices.
            </li>
            <li>
              <strong>Software QA Engineer II</strong> – Green Dot Corp (2019–2021)<br/>
              Maintained C# automation, validated backend data migration, contributed to CI/CD deployments.
            </li>
            <li>
              <strong>QA Analyst</strong> – Cognizant (2018–2019)<br/>
              Delivered Selenium test cases, Oracle SQL validations, and defect triage through SFDC.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-400">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-300">
            <div><strong>Languages:</strong> C#, Java, Python, JavaScript, SQL</div>
            <div><strong>Automation:</strong> Playwright, Robot Framework, Selenium, JMeter</div>
            <div><strong>DevOps:</strong> Jenkins, Azure DevOps, TeamCity, Docker, Octopus</div>
            <div><strong>Cloud:</strong> AWS (DynamoDB, ECS, SNS, SQS)</div>
            <div><strong>Monitoring:</strong> Datadog</div>
            <div><strong>Tools:</strong> Git, Bitbucket, Jira, Confluence, TestRail</div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-400">Education</h2>
          <p className="text-gray-300">
            B.S. in Computer Engineering – University of Illinois Urbana-Champaign, 2017
          </p>
        </section>
      </section>
    </main>
  );
}
