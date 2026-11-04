import React, { useEffect, useRef, useState } from 'react';

/**
 * LabelOrbit - one label becomes the cursor. The label itself is a 3D stack
 * (copies extruded in Z), tilted by movement so the stack reads as depth.
 * A single pastel tone rotates every few seconds.
 */

const WORDS = ['builder', 'cs student', 'macos apps', 'local ai', 'react dev', 'ships daily'];

const PASTELS = [
  { bg: '#f6c9da', ink: '#26141b' },
  { bg: '#c2e8d4', ink: '#102019' },
  { bg: '#d5c8f7', ink: '#1a1630' },
  { bg: '#f6e5b6', ink: '#261f12' },
  { bg: '#c4e1f7', ink: '#12202a' },
];

const COPIES = 7;
const DEPTH = 3.4; // px between stacked copies
const IDLE_MS = 1400;
const BASE_TILT = { x: 12, y: -20 };

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function LabelOrbit({
  words = WORDS,
  palette = PASTELS,
  interval = 4500,
  offset = 14,
}) {
  const rootRef = useRef(null);
  const tiltRef = useRef(null);
  const [tick, setTick] = useState(0);
  const [active, setActive] = useState(false);

  const tone = palette[tick % palette.length];
  const word = words[tick % words.length];

  // only run on devices with a real pointing device
  useEffect(() => {
    const query = window.matchMedia?.('(hover: hover) and (pointer: fine)');
    setActive(query ? query.matches : true);
  }, []);

  // rotate word + pastel tone on a slow loop
  useEffect(() => {
    if (!active) return undefined;
    const id = window.setInterval(() => setTick((t) => t + 1), interval);
    return () => window.clearInterval(id);
  }, [active, interval]);

  useEffect(() => {
    if (!active) return undefined;
    const root = rootRef.current;
    const tilt = tiltRef.current;
    if (!root || !tilt) return undefined;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const pos = { x: -200, y: -200 };
    const target = { x: -200, y: -200 };
    const rot = { x: BASE_TILT.x, y: BASE_TILT.y };
    let primed = false;
    let raf = 0;
    let last = 0;
    let idle = 0;

    const frame = (now) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;

      const prevX = pos.x;
      const prevY = pos.y;
      const follow = reduce ? 1 : 1 - Math.exp(-dt / 0.045);
      pos.x += (target.x - pos.x) * follow;
      pos.y += (target.y - pos.y) * follow;

      const vx = reduce ? 0 : (pos.x - prevX) / Math.max(dt, 0.001);
      const vy = reduce ? 0 : (pos.y - prevY) / Math.max(dt, 0.001);

      // lean away from the direction of travel, then settle back to the base tilt
      const wantX = clamp(BASE_TILT.x - vy * 0.055, -34, 40);
      const wantY = clamp(BASE_TILT.y + vx * 0.055, -46, 34);
      const easeRot = reduce ? 1 : 1 - Math.exp(-dt / 0.12);
      rot.x += (wantX - rot.x) * easeRot;
      rot.y += (wantY - rot.y) * easeRot;

      root.style.transform = `translate3d(${pos.x + offset}px, ${pos.y + offset}px, 0)`;
      tilt.style.transform = `rotateX(${rot.x.toFixed(2)}deg) rotateY(${rot.y.toFixed(2)}deg)`;

      const moving = Math.abs(target.x - pos.x) > 0.1 || Math.abs(target.y - pos.y) > 0.1;
      const turning = Math.abs(wantX - rot.x) > 0.02 || Math.abs(wantY - rot.y) > 0.02;

      if (moving || turning) {
        raf = requestAnimationFrame(frame);
      } else {
        last = 0;
      }
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!primed) {
        pos.x = target.x;
        pos.y = target.y;
        primed = true;
      }
      root.style.opacity = '1';
      idle = performance.now();
      wake();
    };

    const onLeave = () => {
      root.style.opacity = '0';
    };

    const fadeWhenIdle = () => {
      if (!idle) return;
      const wait = performance.now() - idle;
      if (wait > IDLE_MS) {
        root.style.opacity = String(Math.max(0, 1 - (wait - IDLE_MS) / 1200));
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    const idleId = window.setInterval(fadeWhenIdle, 240);
    wake();

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(idleId);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
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
        perspective: '340px',
        perspectiveOrigin: '50% 50%',
        transition: 'opacity 0.25s ease',
        willChange: 'transform, opacity',
      }}
    >
      <div
        ref={tiltRef}
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${BASE_TILT.x}deg) rotateY(${BASE_TILT.y}deg)`,
          willChange: 'transform',
        }}
      >
        {Array.from({ length: COPIES }).map((_, i) => (
          <span
            key={i}
            style={{
              position: i === 0 ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              display: 'inline-block',
              padding: '3px 6px',
              borderRadius: '4px',
              background: tone.bg,
              color: tone.ink,
              border: '1px solid rgba(0, 0, 0, 0.10)',
              boxShadow: i === 0 ? '0 3px 12px rgba(0, 0, 0, 0.4)' : 'none',
              fontFamily: "'Space Mono', ui-monospace, monospace",
              fontSize: '9px',
              lineHeight: 1.2,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              transform: `translateZ(-${i * DEPTH}px)`,
              transformStyle: 'preserve-3d',
              transition: 'background 0.7s ease, color 0.7s ease',
              backfaceVisibility: 'hidden',
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
