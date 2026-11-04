import React from 'react';
import { TECH_STACK } from './techStack';

/**
 * OrbitingCircles - Tech Stack, exactly as listed in the GitHub README
 * (github.com/mathely27 · STACK list in generate.py, icons from icons.py)
 *
 * Python · HTML · CSS · Java · JavaScript · C · Git · GitHub · Linux ·
 * VS Code · Ollama · Supabase · SQL · React · Vercel
 */

const byKey = Object.fromEntries(TECH_STACK.map((item) => [item.key, item]));

const INNER_KEYS = ['Py', 'Js', 'Re', 'Sq', 'Ol', 'Gi'];
const OUTER_KEYS = ['Ht', 'Cs', 'Jv', 'C', 'Gh', 'Li', 'Vs', 'Su', 'Ve'];

const innerOrbit = INNER_KEYS.map((key) => byKey[key]);
const outerOrbit = OUTER_KEYS.map((key) => byKey[key]);

function TechIcon({ item, size }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      role="img"
      aria-label={item.name}
    >
      <path d={item.path} />
    </svg>
  );
}

export default function OrbitingCircles() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
        height: '420px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <style>{`
        /* High-energy, fluid, fast orbit loops */
        @keyframes orbitRotateFastCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitRotateFastCCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes counterRotateFastCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes counterRotateFastCCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* Outer Orbit Track - 18s fast loop */}
      <div
        style={{
          position: 'absolute',
          width: '370px',
          height: '370px',
          borderRadius: '50%',
          border: '1px dashed rgba(255, 255, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'orbitRotateFastCW 18s linear infinite',
        }}
      >
        {outerOrbit.map((item, idx) => {
          const angle = (idx / outerOrbit.length) * 2 * Math.PI;
          const radius = 185;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={item.key}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div style={{ animation: 'counterRotateFastCW 18s linear infinite' }}>
                <div
                  title={item.name}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#141416',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#e4e4e7',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1.22)';
                    e.currentTarget.style.background = '#222226';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = '#141416';
                    e.currentTarget.style.color = '#e4e4e7';
                  }}
                >
                  <TechIcon item={item} size={16} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inner Orbit Track - 12s fast loop */}
      <div
        style={{
          position: 'absolute',
          width: '230px',
          height: '230px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'orbitRotateFastCCW 12s linear infinite',
        }}
      >
        {innerOrbit.map((item, idx) => {
          const angle = (idx / innerOrbit.length) * 2 * Math.PI;
          const radius = 115;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={item.key}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div style={{ animation: 'counterRotateFastCCW 12s linear infinite' }}>
                <div
                  title={item.name}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#1a1a1e',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1.24)';
                    e.currentTarget.style.background = '#27272a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = '#1a1a1e';
                  }}
                >
                  <TechIcon item={item} size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Central Core Monogram */}
      <div
        style={{
          position: 'relative',
          width: '64px',
          height: '64px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          boxShadow: '0 0 35px rgba(255, 255, 255, 0.15), inset 0 0 14px rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Space Mono', monospace",
          fontSize: '18px',
          fontWeight: 900,
          color: '#ffffff',
          zIndex: 5,
        }}
      >
        M/
      </div>

      {/* Subtle indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          fontFamily: "'Space Mono', monospace",
          fontSize: '9.5px',
          color: '#71717a',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        Stack · Same as GitHub README @mathely27
      </div>
    </div>
  );
}
