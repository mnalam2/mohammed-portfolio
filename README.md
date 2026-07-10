# Mohammed Alam — Portfolio

Personal portfolio site for Mohammed Alam, Software Engineer in Test — live at **[mohammednalam.com](https://mohammednalam.com/)**.

Built as a single-page React app with smooth-scrolling sections for skills, work history, projects, education, and contact, plus a couple of interactive extras that go beyond a static resume.

## Highlights

- **Career Walk** (`src/CareerWalk.jsx`) — a side-scrolling, keyboard/touch-controlled mini-game where you walk a character through a city skyline; each building is a stop on the career timeline (United Airlines → Abbott → Generali, and more) that opens a detail card as you approach.
- **Pipeline Simulator** (`src/PipelineSimulator.jsx`) — an animated CI/CD pipeline that plays through checkout → install → test → deploy stages with realistic streaming log output.
- **Contact form** wired to [EmailJS](https://www.emailjs.com/), with a hidden mirror form in `index.html` for Netlify Forms detection and a honeypot field for spam.
- **SEO & sharing** — Open Graph and Twitter cards, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`, and a web manifest.
- **Print stylesheet** for clean PDF/paper output of the page.
- **Security headers** via `public/_headers` (CSP, `X-Frame-Options`, `Referrer-Policy`, etc.).

## Tech stack

| Layer | Tool |
|---|---|
| UI | [React 18](https://react.dev/) |
| Build | [Vite 5](https://vitejs.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [react-icons](https://react-icons.github.io/react-icons/) |
| Email | [@emailjs/browser](https://www.emailjs.com/) |
| Hosting | [Netlify](https://www.netlify.com/) |

## Getting started

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install     # install dependencies
npm run dev     # start the Vite dev server (http://localhost:5173)
npm run build   # production build into dist/
npm run preview # serve the production build locally
```

## Project structure

```
├── index.html                # Entry HTML: meta tags, JSON-LD, Netlify form stub, print styles
├── public/                   # Static assets served as-is
│   ├── _headers              # Netlify security headers (CSP etc.)
│   ├── 404.html              # Custom not-found page
│   ├── MohammedAlamResume.pdf
│   ├── og.svg / icon.svg     # Social preview image and favicon
│   ├── robots.txt / sitemap.xml / site.webmanifest
│   └── headshot.jpg
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Main page: hero, skills, experience, projects, education, contact
│   ├── CareerWalk.jsx        # Interactive side-scrolling career timeline
│   ├── PipelineSimulator.jsx # Animated CI/CD pipeline demo
│   └── index.css             # Tailwind entry + global styles
├── tailwind.config.js
└── postcss.config.js
```

## Configuration notes

- **EmailJS** — the service ID, template ID, and public key are set in `handleSubmit` in `src/App.jsx`. To point the form at your own EmailJS account, replace those three values (the public key is safe to expose client-side).
- **Domain/SEO** — the canonical URL, Open Graph tags, and JSON-LD in `index.html` (plus `public/sitemap.xml`) are specific to `mohammednalam.com`; update them if you fork this for your own site.

## Deployment

The site deploys to Netlify: build command `npm run build`, publish directory `dist`. Netlify picks up `public/_headers` for HTTP headers and detects the hidden contact form in `index.html` for form handling.
