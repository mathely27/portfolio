import React from 'react';
import { TECH_STACK } from './techStack';

/**
 * TechStackGrid - the tech stack shown the same way as the GitHub README
 * (github.com/mathely27): a 5 × 3 grid of tiles with a number, a big mono
 * symbol that periodically flips to the brand icon, and the name underneath.
 */

const DURATIONS = TECH_STACK.map((_, i) => 8 + ((i * 3.7) % 7));
const DELAYS = TECH_STACK.map((_, i) => -((i * 5.3) % 11));

export default function TechStackGrid() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '432px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <style>{`
        @keyframes stackSym {
          0%, 82%   { opacity: 1; }
          85%, 96%  { opacity: 0; }
          99%, 100% { opacity: 1; }
        }
        @keyframes stackIco {
          0%, 82%   { opacity: 0; }
          85%, 96%  { opacity: 1; }
          99%, 100% { opacity: 0; }
        }
        @keyframes stackGlow {
          0%, 82%   { opacity: 0; }
          85%, 96%  { opacity: 1; }
          99%, 100% { opacity: 0; }
        }
        .stack-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 8px;
          width: 100%;
        }
        .stack-tile {
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: 14px;
          background: var(--card-bg, rgba(255, 255, 255, 0.035));
          border: 1.5px solid var(--border, rgba(255, 255, 255, 0.16));
          transition: border-color 0.2s ease, transform 0.2s ease, background 0.3s ease;
        }
        .stack-tile:hover {
          border-color: var(--border2, rgba(255, 255, 255, 0.42));
          transform: translateY(-2px);
        }
        .stack-glow {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          background: color-mix(in srgb, var(--brand) 14%, transparent);
          border: 1.5px solid var(--brand);
          pointer-events: none;
          opacity: 0;
        }
        .stack-sym, .stack-ico, .stack-glow {
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        .stack-sym { animation-name: stackSym; }
        .stack-ico { animation-name: stackIco; }
        .stack-glow { animation-name: stackGlow; }
        @media (prefers-reduced-motion: reduce) {
          .stack-sym, .stack-ico, .stack-glow { animation: none; }
          .stack-sym { opacity: 1; }
          .stack-ico, .stack-glow { opacity: 0; }
        }
        .stack-num {
          position: absolute;
          top: 6px;
          left: 8px;
          font-family: 'Space Mono', monospace;
          font-size: clamp(7.5px, 1.9vw, 11px);
          line-height: 1;
          color: #8b949e;
        }
        .stack-face {
          position: absolute;
          left: 0;
          right: 0;
          top: 12px;
          bottom: 18px;
          display: grid;
          place-items: center;
        }
        .stack-sym {
          grid-area: 1 / 1;
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: clamp(17px, 6vw, 30px);
          line-height: 1;
          color: var(--text, #ffffff);
        }
        .stack-ico {
          grid-area: 1 / 1;
          width: clamp(18px, 6.8vw, 32px);
          height: clamp(18px, 6.8vw, 32px);
        }
        .stack-name {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 6px;
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-size: clamp(8px, 2.1vw, 11.5px);
          line-height: 1;
          color: var(--text-3, #8b949e);
          padding: 0 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 640px) {
          .stack-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 6px;
          }
          .stack-sym {
            font-size: clamp(14px, 5vw, 22px);
          }
          .stack-ico {
            width: clamp(15px, 5.5vw, 24px);
            height: clamp(15px, 5.5vw, 24px);
          }
          .stack-name {
            font-size: clamp(7px, 2vw, 10px);
          }
          .stack-num {
            font-size: clamp(6.5px, 1.6vw, 9px);
            top: 4px;
            left: 6px;
          }
          .stack-face {
            top: 10px;
            bottom: 14px;
          }
        }
      `}</style>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '12px',
          fontFamily: "'Space Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ color: '#a1a1aa' }}>Stack</span>
        <span style={{ color: '#71717a', fontSize: '9.5px' }}>GitHub README · @mathely27</span>
      </div>

      <div className="stack-grid">
        {TECH_STACK.map((item, index) => {
          const timing = {
            animationDuration: `${DURATIONS[index].toFixed(1)}s`,
            animationDelay: `${DELAYS[index].toFixed(1)}s`,
          };
          return (
            <div key={item.key} className="stack-tile" title={item.name}>
              <span className="stack-glow" style={{ ...timing, '--brand': item.brand }} />
              <span className="stack-num">{String(index + 1).padStart(2, '0')}</span>
              <div className="stack-face">
                <span className="stack-sym" style={timing}>
                  {item.sym}
                </span>
                <svg
                  className="stack-ico"
                  style={timing}
                  viewBox="0 0 24 24"
                  fill={item.brand}
                  role="img"
                  aria-label={item.name}
                >
                  <path d={item.path} />
                </svg>
              </div>
              <span className="stack-name">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
