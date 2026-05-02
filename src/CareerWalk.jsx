import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// ─── World constants ───────────────────────────────────────────────────────────
const WORLD_W      = 5400;
const PLAYER_SPEED = 310;   // px/s
const TRIGGER_DIST = 210;   // px to building centre → show info card

// ─── Career data ───────────────────────────────────────────────────────────────
const STOPS = [
  {
    id: 0,
    worldX: 650,
    company: 'United Airlines',
    location: 'Chicago, IL',
    period: '05/2016 – 08/2016',
    role: 'Software QA Intern',
    accent: '#3b82f6',
    buildW: 200,
    buildH: 130,
    bullets: [
      'Automated deployment pipelines with CA Technologies Release Automation',
      'Modernized united.com workflows with Agile automation strategies',
    ],
  },
  {
    id: 1,
    worldX: 1380,
    company: 'Abbott',
    location: 'San Diego, CA',
    period: '05/2018 – 06/2018',
    role: 'Software Test Engineer',
    accent: '#22c55e',
    buildW: 175,
    buildH: 165,
    bullets: [
      'Designed & executed test protocols for USB-connected drug-test devices',
      'Validated GUI components; triaged defects via JIRA',
    ],
  },
  {
    id: 2,
    worldX: 2160,
    company: 'Cognizant',
    location: 'Irving, TX',
    period: '06/2018 – 08/2019',
    role: 'QE & Assurance Analyst',
    accent: '#a855f7',
    buildW: 195,
    buildH: 200,
    bullets: [
      'Corporate training: Java, Oracle SQL, JUnit, Selenium',
      'Designed automated test scenarios; IBM AS/400 backend validation',
    ],
  },
  {
    id: 3,
    worldX: 2980,
    company: 'Green Dot Corporation',
    location: 'La Jolla, CA',
    period: '09/2019 – 07/2021',
    role: 'Software QA Engineer II',
    accent: '#4ade80',
    buildW: 215,
    buildH: 235,
    bullets: [
      'C#/.NET component-level & API automation in Azure DevOps',
      'TeamCity, Octopus Deploy pipeline management',
      'Pervasive SQL → MySQL data migration validation',
    ],
  },
  {
    id: 4,
    worldX: 3900,
    company: 'Generali Global Assistance',
    location: 'San Diego, CA',
    period: '07/2021 – Present',
    role: 'Lead Automation Engineer',
    accent: '#22d3ee',
    buildW: 260,
    buildH: 295,
    bullets: [
      '40% faster release cycles — Robot Framework + Jenkins CI/CD',
      'Datadog dashboards → 50% faster defect triage',
      'AWS DynamoDB, ECS, SNS, SQS microservices coverage',
    ],
  },
];

// ─── Drawing helpers ───────────────────────────────────────────────────────────
function drawSky(ctx, W, H) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0,   '#010b14');
  g.addColorStop(0.6, '#071828');
  g.addColorStop(1,   '#0c2233');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

function drawStars(ctx, stars, camX, W, H, t) {
  for (const s of stars) {
    const sx = ((s.x - camX * 0.25) % W + W) % W;
    const alpha = 0.35 + 0.45 * Math.sin(t * s.speed + s.phase);
    ctx.beginPath();
    ctx.arc(sx, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
    ctx.fill();
  }
}

function drawClouds(ctx, clouds, camX, W) {
  for (const c of clouds) {
    const sx = ((c.x - camX * 0.45) % W + W) % W;
    ctx.beginPath();
    ctx.ellipse(sx, c.y, c.rx, c.ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(14,116,144,0.13)';
    ctx.fill();
  }
}

function drawGround(ctx, W, H, groundY) {
  // glow line
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(W, groundY);
  ctx.strokeStyle = 'rgba(34,211,238,0.55)';
  ctx.lineWidth = 1.5;
  ctx.shadowColor = '#22d3ee';
  ctx.shadowBlur = 10;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // ground fill
  const g = ctx.createLinearGradient(0, groundY, 0, H);
  g.addColorStop(0,    '#083344');
  g.addColorStop(0.08, '#051e2b');
  g.addColorStop(1,    '#010b14');
  ctx.fillStyle = g;
  ctx.fillRect(0, groundY, W, H - groundY);

  // grid lines on ground
  ctx.strokeStyle = 'rgba(34,211,238,0.06)';
  ctx.lineWidth = 1;
  ctx.shadowBlur = 0;
  for (let x = 0; x < W; x += 60) {
    ctx.beginPath(); ctx.moveTo(x, groundY); ctx.lineTo(x, H); ctx.stroke();
  }
}

function drawBuilding(ctx, stop, camX, groundY, t) {
  const bx = stop.worldX - camX - stop.buildW / 2;
  const by = groundY - stop.buildH;

  // Drop shadow
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(bx + 8, by + 8, stop.buildW, stop.buildH);

  // Building body gradient
  const bg = ctx.createLinearGradient(bx, by, bx + stop.buildW, by);
  bg.addColorStop(0,   '#0a1628');
  bg.addColorStop(0.5, '#112240');
  bg.addColorStop(1,   '#0a1628');
  ctx.fillStyle = bg;
  ctx.fillRect(bx, by, stop.buildW, stop.buildH);

  // Accent border + glow
  ctx.strokeStyle = stop.accent;
  ctx.lineWidth = 1.5;
  ctx.shadowColor = stop.accent;
  ctx.shadowBlur = 12;
  ctx.strokeRect(bx, by, stop.buildW, stop.buildH);
  ctx.shadowBlur = 0;

  // Windows
  const cols = Math.max(2, Math.floor(stop.buildW / 38));
  const rows = Math.max(2, Math.floor(stop.buildH / 36));
  const wW = 13, wH = 9;
  const padX = (stop.buildW - cols * wW) / (cols + 1);
  const padY = (stop.buildH - rows * wH) / (rows + 1);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = bx + padX + c * (wW + padX);
      const wy = by + padY + r * (wH + padY);
      const lit = (r * cols + c) % 3 !== 2;
      if (lit) {
        ctx.fillStyle = stop.accent + '38';
        ctx.fillRect(wx, wy, wW, wH);
        ctx.strokeStyle = stop.accent + '70';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(wx, wy, wW, wH);
      } else {
        ctx.fillStyle = '#0a1628';
        ctx.fillRect(wx, wy, wW, wH);
      }
    }
  }

  // Antenna
  const antennaX = bx + stop.buildW / 2;
  ctx.strokeStyle = stop.accent + 'aa';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(antennaX, by);
  ctx.lineTo(antennaX, by - 18);
  ctx.stroke();
  // Blinking tip
  const blink = Math.sin(t * 1.4 + stop.id) > 0.3;
  ctx.beginPath();
  ctx.arc(antennaX, by - 20, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = blink ? stop.accent : stop.accent + '30';
  ctx.shadowColor = stop.accent;
  ctx.shadowBlur = blink ? 10 : 0;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Door
  const dW = 22, dH = 30;
  const dx = bx + stop.buildW / 2 - dW / 2;
  ctx.fillStyle = stop.accent + '28';
  ctx.fillRect(dx, groundY - dH, dW, dH);
  ctx.strokeStyle = stop.accent + '90';
  ctx.lineWidth = 1;
  ctx.strokeRect(dx, groundY - dH, dW, dH);
  // Door knob
  ctx.beginPath();
  ctx.arc(dx + dW - 4, groundY - dH / 2, 2, 0, Math.PI * 2);
  ctx.fillStyle = stop.accent;
  ctx.fill();

  // Company label
  ctx.font = 'bold 11px "Fira Code", monospace';
  ctx.textAlign = 'center';
  ctx.shadowColor = stop.accent;
  ctx.shadowBlur = 16;
  ctx.fillStyle = stop.accent;
  ctx.fillText(stop.company, bx + stop.buildW / 2, by - 26);
  ctx.shadowBlur = 0;

  ctx.font = '9px monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  const startYear = stop.period.split(/[–-]/)[0].trim().split('/').pop();
  ctx.fillText(startYear, bx + stop.buildW / 2, by - 13);
  ctx.textAlign = 'left';
}

function drawPlayer(ctx, worldX, camX, groundY, walkPhase, facingRight) {
  const sx = Math.round(worldX - camX);
  const W = 26, H = 46;
  const baseY = groundY - H;
  const bob = Math.abs(Math.sin(walkPhase * 2)) * 2.5;

  ctx.save();
  if (!facingRight) {
    ctx.translate(sx + W / 2, 0);
    ctx.scale(-1, 1);
    ctx.translate(-(sx + W / 2), 0);
  }

  const px = sx - W / 2;
  const py = Math.round(baseY - bob);
  const leg = Math.sin(walkPhase) * 7;

  // Cyan glow
  ctx.shadowColor = '#22d3ee';
  ctx.shadowBlur = 14;

  // Head
  ctx.beginPath();
  ctx.arc(px + W / 2, py + 7, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#f1c27d';
  ctx.fill();

  // Hair
  ctx.beginPath();
  ctx.arc(px + W / 2, py + 5, 7, Math.PI, 0);
  ctx.fillStyle = '#1e293b';
  ctx.fill();

  ctx.shadowBlur = 0;

  // Eyes
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + W / 2 - 5, py + 7, 2, 2);
  ctx.fillRect(px + W / 2 + 2, py + 7, 2, 2);

  // Body
  ctx.fillStyle = '#0e7490';
  ctx.beginPath();
  ctx.roundRect(px + 4, py + 14, W - 8, 15, 3);
  ctx.fill();

  // ID badge
  ctx.fillStyle = '#ffffff22';
  ctx.fillRect(px + 7, py + 17, 6, 8);
  ctx.fillStyle = '#22d3ee88';
  ctx.fillRect(px + 8, py + 18, 4, 1);
  ctx.fillRect(px + 8, py + 21, 4, 1);

  // Arms (swing opposite to legs)
  ctx.fillStyle = '#0e7490';
  ctx.fillRect(px + 1,     py + 15 + leg * 0.5,  4, 10);
  ctx.fillRect(px + W - 5, py + 15 - leg * 0.5,  4, 10);

  // Legs
  ctx.fillStyle = '#1e3a5f';
  const lLeg = Math.max(0, leg);
  const rLeg = Math.max(0, -leg);
  ctx.fillRect(px + 4,          py + 29, 8, 13 + lLeg * 0.6);
  ctx.fillRect(px + W - 12,     py + 29, 8, 13 + rLeg * 0.6);

  // Shoes
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(px + 3, py + 42 + lLeg * 0.6, 10, 4, 2);
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(px + W - 13, py + 42 + rLeg * 0.6, 10, 4, 2);
  ctx.fill();

  ctx.restore();
}

function drawProgressBar(ctx, playerX, W, H, groundY) {
  const barX = 36, barY = H - 20, barW = W - 72, barH = 3;
  const t = Math.max(0, Math.min(1, (playerX - 200) / (WORLD_W - 900)));

  // Track
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.beginPath();
  ctx.roundRect(barX, barY, barW, barH, 2);
  ctx.fill();

  // Filled portion
  const fg = ctx.createLinearGradient(barX, 0, barX + barW, 0);
  fg.addColorStop(0, '#3b82f6');
  fg.addColorStop(1, '#22d3ee');
  ctx.fillStyle = fg;
  ctx.beginPath();
  ctx.roundRect(barX, barY, barW * t, barH, 2);
  ctx.fill();

  // Stop dots
  for (const s of STOPS) {
    const dx = barX + barW * ((s.worldX - 200) / (WORLD_W - 900));
    ctx.beginPath();
    ctx.arc(dx, barY + barH / 2, 4, 0, Math.PI * 2);
    ctx.fillStyle = s.accent;
    ctx.shadowColor = s.accent;
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Year labels
  ctx.font = '8px monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.28)';
  ctx.textAlign = 'left';
  ctx.fillText('2016', barX, barY - 5);
  ctx.textAlign = 'right';
  ctx.fillText('Present', barX + barW, barY - 5);
  ctx.textAlign = 'left';
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function CareerWalk({ onClose }) {
  const canvasRef  = useRef(null);
  const stateRef   = useRef({
    playerX:    150,
    camX:       0,
    walkPhase:  0,
    facingRight: true,
    keys:       new Set(),
    touchLeft:  false,
    touchRight: false,
    stars:      [],
    clouds:     [],
  });
  const rafRef     = useRef(null);
  const lastTRef   = useRef(null);

  const [nearStop,  setNearStop]  = useState(null);
  const [showHint,  setShowHint]  = useState(true);

  // Hide hint after 3.5 s
  useEffect(() => {
    const id = setTimeout(() => setShowHint(false), 3500);
    return () => clearTimeout(id);
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Main canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let cssW = 0, cssH = 0;

    const resize = () => {
      const dpr   = window.devicePixelRatio || 1;
      cssW        = canvas.offsetWidth;
      cssH        = canvas.offsetHeight;
      canvas.width  = cssW * dpr;
      canvas.height = cssH * dpr;
      ctx.scale(dpr, dpr);

      const g = stateRef.current;
      g.stars = Array.from({ length: 140 }, () => ({
        x:     Math.random() * WORLD_W,
        y:     Math.random() * cssH * 0.68,
        r:     Math.random() * 1.3 + 0.3,
        speed: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
      }));
      g.clouds = Array.from({ length: 10 }, () => ({
        x:  200 + Math.random() * (WORLD_W - 400),
        y:  30  + Math.random() * cssH * 0.28,
        rx: 55  + Math.random() * 90,
        ry: 18  + Math.random() * 20,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const groundY = () => cssH * 0.74;

    // ── Input ──────────────────────────────────────────────────────────────────
    const onKeyDown = (e) => {
      stateRef.current.keys.add(e.key);
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key))
        e.preventDefault();
    };
    const onKeyUp = (e) => stateRef.current.keys.delete(e.key);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup',   onKeyUp);

    // ── Game loop ──────────────────────────────────────────────────────────────
    const loop = (timestamp) => {
      const dt  = Math.min((timestamp - (lastTRef.current ?? timestamp)) / 1000, 0.05);
      lastTRef.current = timestamp;
      const t   = timestamp / 1000;

      const g   = stateRef.current;
      const gy  = groundY();
      const W   = cssW, H = cssH;

      // Movement
      const goLeft  = g.keys.has('ArrowLeft')  || g.keys.has('a') || g.keys.has('A') || g.touchLeft;
      const goRight = g.keys.has('ArrowRight') || g.keys.has('d') || g.keys.has('D') || g.touchRight;

      if (goRight) {
        g.playerX    = Math.min(g.playerX + PLAYER_SPEED * dt, WORLD_W - 300);
        g.facingRight = true;
      } else if (goLeft) {
        g.playerX    = Math.max(g.playerX - PLAYER_SPEED * dt, 80);
        g.facingRight = false;
      }

      if (goLeft || goRight) g.walkPhase += dt * 7;

      // Camera follows player
      const targetCam = g.playerX - W / 2;
      g.camX = Math.max(0, Math.min(targetCam, WORLD_W - W));

      // Nearest stop
      let near = null, nearDist = TRIGGER_DIST;
      for (const s of STOPS) {
        const d = Math.abs(g.playerX - s.worldX);
        if (d < nearDist) { nearDist = d; near = s; }
      }
      setNearStop(near);

      // ── Render ────────────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);

      drawSky(ctx, W, H);
      drawStars(ctx, g.stars, g.camX, W, H, t);
      drawClouds(ctx, g.clouds, g.camX, W);
      drawGround(ctx, W, H, gy);

      // Draw visible buildings
      for (const s of STOPS) {
        const screenX = s.worldX - g.camX;
        if (screenX > -s.buildW - 150 && screenX < W + s.buildW + 150) {
          drawBuilding(ctx, s, g.camX, gy, t);
        }
      }

      drawPlayer(ctx, g.playerX, g.camX, gy, g.walkPhase, g.facingRight);
      drawProgressBar(ctx, g.playerX, W, H, gy);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize',  resize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup',   onKeyUp);
    };
  }, []);

  // Touch/pointer D-pad
  const setLeft  = (v) => { stateRef.current.touchLeft  = v; };
  const setRight = (v) => { stateRef.current.touchRight = v; };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col bg-[#010b14]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header bar */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-cyan-900/50 bg-black/60 backdrop-blur z-10">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
            style={{ boxShadow: '0 0 6px #22d3ee' }}
          />
          <span className="font-mono text-cyan-400 text-sm tracking-widest">
            CAREER_WALK.exe
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-gray-500 text-xs font-mono">
            Walk through Mohammed's career → approach buildings to explore
          </span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-1.5 rounded hover:bg-white/10"
            aria-label="Close career walk"
          >
            <FaTimes size={13} />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Keyboard hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="bg-black/75 border border-cyan-500/30 rounded-xl px-7 py-5 text-center backdrop-blur-sm"
                style={{ boxShadow: '0 0 40px rgba(34,211,238,0.1)' }}
              >
                <p className="text-cyan-400 font-mono font-bold text-sm tracking-wide">
                  ← → &nbsp;/&nbsp; A D &nbsp;to walk
                </p>
                <p className="text-gray-400 text-xs mt-1.5">
                  Approach each building to view experience
                </p>
                <p className="text-gray-600 text-xs mt-1">ESC to exit</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Experience info card */}
        <AnimatePresence mode="wait">
          {nearStop && (
            <motion.div
              key={nearStop.id}
              className="absolute bottom-14 sm:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-3 sm:px-0 pointer-events-none"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.22 }}
            >
              <div
                className="rounded-xl border bg-black/88 backdrop-blur-sm p-4 sm:p-5"
                style={{
                  borderColor: nearStop.accent + '55',
                  boxShadow: `0 0 32px ${nearStop.accent}18, 0 4px 24px rgba(0,0,0,0.6)`,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="font-mono text-[10px] tracking-widest uppercase mb-1"
                      style={{ color: nearStop.accent }}
                    >
                      {nearStop.period}
                    </p>
                    <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
                      {nearStop.role}
                    </h3>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {nearStop.company} · {nearStop.location}
                    </p>
                  </div>
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 mt-1 animate-pulse"
                    style={{ background: nearStop.accent, boxShadow: `0 0 8px ${nearStop.accent}` }}
                  />
                </div>
                <ul className="mt-3 space-y-1.5">
                  {nearStop.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-300 leading-snug">
                      <span className="shrink-0 mt-0.5" style={{ color: nearStop.accent }}>›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile D-pad */}
      <div
        className="sm:hidden shrink-0 flex items-center justify-center gap-5 py-3 border-t bg-black/70 backdrop-blur"
        style={{ borderColor: 'rgba(34,211,238,0.15)' }}
      >
        <button
          className="w-16 h-16 rounded-2xl border flex items-center justify-center text-cyan-400 text-xl active:scale-95 transition-transform select-none touch-none"
          style={{ borderColor: 'rgba(34,211,238,0.35)', background: 'rgba(14,116,144,0.15)' }}
          onPointerDown={() => setLeft(true)}
          onPointerUp={() => setLeft(false)}
          onPointerLeave={() => setLeft(false)}
          aria-label="Walk left"
        >
          <FaArrowLeft />
        </button>
        <div className="text-gray-700 text-xs font-mono">D-PAD</div>
        <button
          className="w-16 h-16 rounded-2xl border flex items-center justify-center text-cyan-400 text-xl active:scale-95 transition-transform select-none touch-none"
          style={{ borderColor: 'rgba(34,211,238,0.35)', background: 'rgba(14,116,144,0.15)' }}
          onPointerDown={() => setRight(true)}
          onPointerUp={() => setRight(false)}
          onPointerLeave={() => setRight(false)}
          aria-label="Walk right"
        >
          <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
}
