import React, { useEffect, useRef, useState } from 'react';

/**
 * LabelOrbit - a tiny label that becomes the cursor and trails a 3D stack
 * of the words before it. Pastel colour cycles every few seconds.
 */

const WORDS = ['builder', 'cs student', 'macos apps', 'local ai', 'react dev', 'ships daily'];

const PASTELS = [
  { bg: '#f6c9da', ink: '#26141b' },
  { bg: '#c2e8d4', ink: '#102019' },
  { bg: '#d5c8f7', ink: '#1a1630' },
  { bg: '#f6e5b6', ink: '#261f12' },
  { bg: '#c4e1f7', ink: '#12202a' },
];

const LAYERS = 3;
const TAU = [0.035, 0.09, 0.16];
const IDLE_MS = 1400;

export default function LabelOrbit({
  words = WORDS,
  palette = PASTELS,
  interval = 4500,
  offset = 14,
}) {
  const rootRef = useRef(null);
  const layerRefs = useRef([]);
  const [tick, setTick] = useState(0);
  const [active, setActive] = useState(false);

  const tone = palette[tick % palette.length];

  // only run on devices with a real pointing device
  useEffect(() => {
    const query = window.matchMedia?.('(hover: hover) and (pointer: fine)');
    setActive(query ? query.matches : true);
  }, []);

  // rotate the word + pastel colour on a slow loop
  useEffect(() => {
    if (!active) return undefined;
    const id = window.setInterval(() => setTick((t) => t + 1), interval);
    return () => window.clearInterval(id);
  }, [active, interval]);

  useEffect(() => {
    if (!active) return undefined;
    const root = rootRef.current;
    const nodes = layerRefs.current.filter(Boolean);
    if (!root || !nodes.length) return undefined;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const positions = nodes.map(() => ({ x: -200, y: -200 }));
    const target = { x: -200, y: -200 };
    let last = 0;
    let raf = 0;
    let idle = 0;
    let primed = false;

    const draw = (now) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      let settled = true;

      nodes.forEach((node, i) => {
        const pos = positions[i];
        const ease = reduce ? 1 : 1 - Math.exp(-dt / TAU[i]);
        pos.x += (target.x - pos.x) * ease;
        pos.y += (target.y - pos.y) * ease;
        if (Math.abs(target.x - pos.x) > 0.15 || Math.abs(target.y - pos.y) > 0.15) settled = false;
        node.style.transform = `translate3d(${pos.x + offset}px, ${pos.y + offset}px, -${i * 26}px) scale(${
          1 - i * 0.04
        })`;
      });

      if (settled) {
        last = 0;
      } else {
        raf = requestAnimationFrame(draw);
      }
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!primed) {
        positions.forEach((p) => {
          p.x = target.x;
          p.y = target.y;
        });
        primed = true;
      }
      root.style.opacity = '1';
      idle = performance.now();
      wake();
    };

    const tickIdle = () => {
      const wait = performance.now() - idle;
      if (idle && wait > IDLE_MS) {
        root.style.opacity = String(Math.max(0, 1 - (wait - IDLE_MS) / 1200));
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    const idleId = window.setInterval(tickIdle, 240);
    wake();

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(idleId);
      window.removeEventListener('pointermove', onMove);
    };
  }, [active, offset]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10000,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        opacity: 0,
        perspective: '620px',
        transition: 'opacity 0.25s ease',
        willChange: 'opacity',
      }}
    >
      {Array.from({ length: LAYERS }).map((_, i) => {
        const word = words[(tick - i + words.length * 4) % words.length];
        return (
          <span
            key={i}
            ref={(node) => {
              layerRefs.current[i] = node;
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'inline-block',
              padding: '3px 6px',
              borderRadius: '4px',
              background: tone.bg,
              color: tone.ink,
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
              fontFamily: "'Space Mono', ui-monospace, monospace",
              fontSize: '9px',
              lineHeight: 1.2,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              opacity: i === 0 ? 0.95 : i === 1 ? 0.4 : 0.18,
              transformStyle: 'preserve-3d',
              transition:
                'background 0.7s ease, color 0.7s ease, opacity 0.4s ease, box-shadow 0.3s ease',
              willChange: 'transform',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
