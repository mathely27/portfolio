import React from 'react';

/**
 * OrbitingCircles - Fast, High-Energy Tech Stack Orbit
 * Verified directly from GitHub @mathely27:
 * - Swift, SwiftUI, Touch ID (macapplock)
 * - Python, Ollama, PySide6, Qwen3 (Berry)
 * - Pydantic-AI, Tool Calling (ai-agent-)
 * - React, Node.js, MongoDB (project-x)
 * - Git, macOS APIs, Linux
 */
export default function OrbitingCircles() {
  const innerOrbit = [
    { name: 'Swift', icon: '', desc: 'macOS Native / AppLocker' },
    { name: 'Python', icon: 'Py', desc: 'Core Backend & AI' },
    { name: 'React', icon: '⚛', desc: 'Full-Stack UI / Clutch' },
    { name: 'Ollama', icon: '🦙', desc: 'Local LLM Engine / Berry' },
  ];

  const outerOrbit = [
    { name: 'SwiftUI', icon: 'UI', desc: 'Declarative macOS Interface' },
    { name: 'Pydantic-AI', icon: 'AI', desc: 'Autonomous Agent Framework' },
    { name: 'PySide6', icon: 'Qt', desc: 'Local Desktop Client' },
    { name: 'Touch ID', icon: 'ID', desc: 'LocalAuthentication API' },
    { name: 'Node.js', icon: 'Node', desc: 'REST API & Services' },
    { name: 'MongoDB', icon: 'DB', desc: 'NoSQL Document Store' },
    { name: 'macOS', icon: 'Mac', desc: 'Darwin / System Daemons' },
    { name: 'Git', icon: 'Git', desc: 'Distributed Version Control' },
  ];

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
              key={item.name}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div style={{ animation: 'counterRotateFastCW 18s linear infinite' }}>
                <div
                  title={`${item.name} — ${item.desc}`}
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
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#e4e4e7',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1.22)';
                    e.currentTarget.style.background = '#222226';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = '#141416';
                  }}
                >
                  {item.icon}
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
              key={item.name}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div style={{ animation: 'counterRotateFastCCW 12s linear infinite' }}>
                <div
                  title={`${item.name} — ${item.desc}`}
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
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
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
                  {item.icon}
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
        Live Orbit · Verified from GitHub @mathely27
      </div>
    </div>
  );
}
