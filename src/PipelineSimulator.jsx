import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const STAGES = [
  {
    id: 'checkout',
    label: 'Checkout',
    duration: 700,
    logs: [
      { text: '$ git fetch origin main', t: 'cmd' },
      { text: 'Fetching from git@github.com:mnalam2/payment-service', t: 'out' },
      { text: 'HEAD is now at 7f3a2b1  fix: payment timeout handling', t: 'out' },
      { text: '✓  Workspace ready', t: 'ok' },
    ],
  },
  {
    id: 'install',
    label: 'Install',
    duration: 1600,
    logs: [
      { text: '$ pip install -r requirements.txt', t: 'cmd' },
      { text: '  Installing robotframework==6.1.1', t: 'out' },
      { text: '  Installing robotframework-requests==0.9.6', t: 'out' },
      { text: '  Installing boto3==1.34.0', t: 'out' },
      { text: '  Installing datadog-api-client==2.22.0', t: 'out' },
      { text: '✓  31 packages installed', t: 'ok' },
    ],
  },
  {
    id: 'lint',
    label: 'Lint',
    duration: 900,
    logs: [
      { text: '$ robot --dryrun test_suite/', t: 'cmd' },
      { text: '$ pylint src/ --min-similarity-lines=10', t: 'cmd' },
      { text: '  Your code has been rated at 10.00/10', t: 'out' },
      { text: '✓  No syntax errors · 0 warnings', t: 'ok' },
    ],
  },
  {
    id: 'unit',
    label: 'Unit Tests',
    duration: 2000,
    logs: [
      { text: '$ pytest tests/unit/ -v --tb=short', t: 'cmd' },
      { text: '  PASSED  test_payment.py::test_validate_amount', t: 'pass' },
      { text: '  PASSED  test_payment.py::test_invalid_currency', t: 'pass' },
      { text: '  PASSED  test_auth.py::test_token_expiry', t: 'pass' },
      { text: '  PASSED  test_auth.py::test_refresh_flow', t: 'pass' },
      { text: '  PASSED  test_dynamodb.py::test_record_write', t: 'pass' },
      { text: '  PASSED  test_dynamodb.py::test_record_read', t: 'pass' },
      { text: '  PASSED  test_sns.py::test_event_published', t: 'pass' },
      { text: '✓  47 passed in 1.24s', t: 'ok' },
    ],
  },
  {
    id: 'integration',
    label: 'Integration',
    duration: 2800,
    logs: [
      { text: '$ robot --variable ENV:staging test_suite/', t: 'cmd' },
      { text: '  Running test_payment_api.robot ...', t: 'out' },
      { text: '  PASS  Validate Payment API Response', t: 'pass' },
      { text: '  PASS  Verify Token Refresh Flow', t: 'pass' },
      { text: '  PASS  Check DynamoDB Record Persistence', t: 'pass' },
      { text: '  Running test_notifications.robot ...', t: 'out' },
      { text: '  PASS  SNS Event Triggers Correctly', t: 'pass' },
      { text: '  PASS  SQS Queue Processes Message', t: 'pass' },
      { text: '✓  12 tests · 12 passed · 0 failed', t: 'ok' },
    ],
  },
  {
    id: 'build',
    label: 'Build',
    duration: 1300,
    logs: [
      { text: '$ docker build -t payment-service:7f3a2b1 .', t: 'cmd' },
      { text: '  [1/8] FROM python:3.11-slim', t: 'out' },
      { text: '  [4/8] COPY requirements.txt .', t: 'out' },
      { text: '  [7/8] RUN pip install -r requirements.txt', t: 'out' },
      { text: '  [8/8] CMD ["uvicorn", "main:app"]', t: 'out' },
      { text: '✓  Image: payment-service:7f3a2b1 (312 MB)', t: 'ok' },
    ],
  },
  {
    id: 'deploy',
    label: 'Deploy',
    duration: 1800,
    logs: [
      { text: '$ aws ecs update-service --cluster staging-cluster \\', t: 'cmd' },
      { text: '    --service payment-service --force-new-deployment', t: 'out' },
      { text: '  Draining connections from old tasks...', t: 'out' },
      { text: '  Waiting for service stability...', t: 'out' },
      { text: '  Service payment-service is stable', t: 'out' },
      { text: '✓  Deployed → staging.redion.internal', t: 'ok' },
    ],
  },
  {
    id: 'smoke',
    label: 'Smoke',
    duration: 1400,
    logs: [
      { text: '$ playwright test smoke/ --project=chromium', t: 'cmd' },
      { text: '  ✓ smoke/login.spec.ts (1.2s)', t: 'pass' },
      { text: '  ✓ smoke/dashboard.spec.ts (0.8s)', t: 'pass' },
      { text: '  ✓ smoke/payment-flow.spec.ts (2.1s)', t: 'pass' },
      { text: '✓  3 passed (4.1s)', t: 'ok' },
    ],
  },
];

const TOTAL_MS = STAGES.reduce((a, s) => a + s.duration, 0);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function StageChip({ label, status }) {
  const running = status === 'running';
  const passed  = status === 'passed';
  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border transition-all duration-300 whitespace-nowrap ${
        running
          ? 'border-cyan-400/70 bg-cyan-400/10 text-cyan-300'
          : passed
          ? 'border-green-500/40 bg-green-500/10 text-green-400'
          : 'border-gray-800 bg-gray-900/30 text-gray-600'
      }`}
      style={running ? { boxShadow: '0 0 10px rgba(34,211,238,0.18)' } : {}}
    >
      {running ? (
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
      ) : passed ? (
        <span className="text-[10px] leading-none">✓</span>
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
      )}
      {label}
    </div>
  );
}

export default function PipelineSimulator({ onClose }) {
  const [phase,    setPhase]    = useState('idle');
  const [statuses, setStatuses] = useState(() => STAGES.map(() => 'idle'));
  const [logs,     setLogs]     = useState([]);
  const [elapsed,  setElapsed]  = useState(0);

  const mountedRef = useRef(true);
  const uidRef     = useRef(0);
  const startRef   = useRef(null);
  const timerRef   = useRef(null);
  const logEndRef  = useRef(null);

  useEffect(() => () => {
    mountedRef.current = false;
    clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    if (phase !== 'done') return;
    const t = setTimeout(() => {
      logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 480);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  const pushLog = useCallback((entry) => {
    if (!mountedRef.current) return;
    setLogs((prev) => [...prev, { ...entry, uid: uidRef.current++ }]);
  }, []);

  const run = useCallback(async () => {
    if (!mountedRef.current) return;
    clearInterval(timerRef.current);
    setPhase('running');
    setLogs([]);
    uidRef.current = 0;
    setStatuses(STAGES.map(() => 'idle'));
    setElapsed(0);

    startRef.current = Date.now();
    timerRef.current = setInterval(() => {
      if (mountedRef.current)
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 250);

    for (let i = 0; i < STAGES.length; i++) {
      if (!mountedRef.current) return;
      const stage = STAGES[i];

      setStatuses((prev) => {
        const next = [...prev];
        next[i] = 'running';
        return next;
      });

      pushLog({ t: 'head', text: `▶  [${i + 1}/${STAGES.length}]  ${stage.label.toUpperCase()}` });

      const lineDelay = Math.floor(stage.duration / (stage.logs.length + 1));
      for (const line of stage.logs) {
        if (!mountedRef.current) return;
        await sleep(lineDelay);
        pushLog(line);
      }
      await sleep(lineDelay);
      if (!mountedRef.current) return;

      setStatuses((prev) => {
        const next = [...prev];
        next[i] = 'passed';
        return next;
      });
      await sleep(100);
    }

    if (!mountedRef.current) return;
    clearInterval(timerRef.current);
    setPhase('done');
  }, [pushLog]);

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    setPhase('idle');
    setLogs([]);
    setElapsed(0);
    setStatuses(STAGES.map(() => 'idle'));
  }, []);

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const passedCount = statuses.filter((s) => s === 'passed').length;
  const estSec = Math.round(TOTAL_MS / 1000) + 1;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col bg-[#010b14] select-none"
      style={{ fontFamily: "'Fira Code','Cascadia Code','Consolas',monospace" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-cyan-900/30 bg-black/70 backdrop-blur">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-300 ${
              phase === 'running' ? 'bg-cyan-400 animate-pulse'
              : phase === 'done'  ? 'bg-green-400'
              :                     'bg-gray-600'
            }`}
            style={
              phase === 'running' ? { boxShadow: '0 0 6px #22d3ee' }
              : phase === 'done'  ? { boxShadow: '0 0 6px #4ade80' }
              : {}
            }
          />
          <span className="text-gray-300 text-sm truncate">
            payment-service{' '}
            <span className="text-gray-700">/</span>{' '}
            <span className="text-cyan-400">main</span>
          </span>
          <span className="text-gray-700 text-xs hidden sm:inline">7f3a2b1</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {phase !== 'idle' && (
            <span className="text-gray-500 text-xs tabular-nums">⏱ {fmt(elapsed)}</span>
          )}
          {phase === 'running' && (
            <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase animate-pulse">
              Running
            </span>
          )}
          {phase === 'done' && (
            <span className="text-green-400 text-[10px] font-bold tracking-widest uppercase">
              Passed
            </span>
          )}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-white transition-colors p-1.5 rounded hover:bg-white/10"
            aria-label="Close pipeline"
          >
            <FaTimes size={12} />
          </button>
        </div>
      </div>

      {/* ── Stage strip ────────────────────────────────────────────────────── */}
      <div
        className="shrink-0 px-4 py-2.5 border-b border-gray-900 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex items-center gap-1 w-max">
          {STAGES.map((s, i) => (
            <React.Fragment key={s.id}>
              <StageChip label={s.label} status={statuses[i]} />
              {i < STAGES.length - 1 && (
                <span
                  className={`text-xs px-0.5 transition-colors duration-500 ${
                    statuses[i] === 'passed' ? 'text-green-700/70' : 'text-gray-800'
                  }`}
                >
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Log terminal ───────────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-3 text-xs leading-[1.75]"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e293b transparent' }}
      >
        {phase === 'idle' ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
            <button
              onClick={run}
              className="w-16 h-16 rounded-full border border-gray-700 hover:border-cyan-500 flex items-center justify-center text-2xl text-gray-600 hover:text-cyan-400 transition-all active:scale-95"
              style={{ boxShadow: '0 0 30px rgba(34,211,238,0.04)' }}
              aria-label="Run pipeline"
            >
              ▶
            </button>
            <p className="text-gray-500 text-sm">Tap to run</p>
            <p className="text-gray-700 text-xs">
              {STAGES.length} stages · ~{estSec}s estimated
            </p>
          </div>
        ) : (
          <div>
            {logs.map((log) => (
              <motion.div
                key={log.uid}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                className={
                  log.t === 'head'
                    ? 'text-yellow-400/80 font-bold mt-3 mb-0.5 border-l-2 border-yellow-500/30 pl-2'
                    : log.t === 'cmd'
                    ? 'text-cyan-300'
                    : log.t === 'pass'
                    ? 'text-green-400'
                    : log.t === 'ok'
                    ? 'text-green-300 font-semibold'
                    : log.t === 'fail'
                    ? 'text-red-400'
                    : 'text-gray-500'
                }
              >
                {log.text}
              </motion.div>
            ))}

            {phase === 'running' && (
              <span className="inline-block w-[6px] h-[0.85em] bg-cyan-400 animate-pulse align-middle mt-0.5" />
            )}

            <AnimatePresence>
              {phase === 'done' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="mt-5 p-4 rounded-lg border border-green-500/25 bg-green-500/5"
                  style={{ boxShadow: '0 0 24px rgba(74,222,128,0.07)' }}
                >
                  <p className="text-green-400 font-bold text-sm">
                    ✓  Pipeline passed
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    {STAGES.length} stages · {fmt(elapsed)} · 59 tests green · deployed to staging
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={logEndRef} />
          </div>
        )}
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <div
        className="shrink-0 flex items-center justify-between px-4 py-2.5 border-t border-gray-900 bg-black/50"
        style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-24 sm:w-40 h-[3px] rounded-full bg-gray-800 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-green-400"
              animate={{ width: `${(passedCount / STAGES.length) * 100}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>
          <span className="text-[11px] text-gray-600 tabular-nums">
            {passedCount}/{STAGES.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {phase !== 'idle' && (
            <button
              onClick={reset}
              className="px-3 py-1.5 text-[11px] text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-600 rounded-lg transition-all"
            >
              Reset
            </button>
          )}
          <button
            onClick={phase === 'running' ? undefined : run}
            disabled={phase === 'running'}
            className={`px-4 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
              phase === 'running'
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black'
            }`}
          >
            {phase === 'running'
              ? '◉  Running…'
              : phase === 'done'
              ? '↺  Run Again'
              : '▶  Run Pipeline'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
