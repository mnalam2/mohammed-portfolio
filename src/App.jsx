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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-sans p-6 md:p-12 scroll-smooth">
      <motion.section
        className="max-w-6xl mx-auto space-y-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Sticky Header Navigation */}
        <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur border-b border-gray-800 z-50 px-6 py-4 flex justify-between items-center shadow-md">
          <span className="text-lg font-bold text-cyan-400">Mohammed Alam</span>
          <div className="flex gap-6 text-sm">
            <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
            <a href="#experience" className="hover:text-cyan-400 transition">Experience</a>
            <a href="#skills" className="hover:text-cyan-400 transition">Skills</a>
            <a href="#education" className="hover:text-cyan-400 transition">Education</a>
            <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
          </div>
        </nav>

        {/* Hero Section */}
        <motion.section
          id="home"
          className="text-center pt-28"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 animate-fadeInUp">
            Mohammed Alam
          </h1>
          <p className="text-xl text-gray-300 mt-4">
            Software Engineer in Test | Playwright | Azure DevOps | C# | JavaScript
          </p>
          <div className="mt-6 flex justify-center gap-8">
            <a href="https://www.linkedin.com/in/mohammed-alam-8193009a/" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/mnalam2" className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
            <a
              href="/MohammedAlamResume.pdf"
              download
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full shadow hover:shadow-lg transition text-white font-semibold flex items-center gap-2"
            >
              📄 Resume
            </a>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section id="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}>
          <h2 className="text-4xl font-bold text-blue-400 border-b border-gray-700 pb-2 mb-4">Contact</h2>
          <form
            action="https://formspree.io/f/mnqebpnj"
            method="POST"
            className="space-y-4 text-gray-300"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            ></textarea>
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-2 rounded-full transition"
            >
              Send Message
            </button>
          </form>
        </motion.section>
      </motion.section>
    </main>
  );
}
