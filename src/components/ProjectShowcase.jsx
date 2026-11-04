import React, { useState } from 'react';
import OrbitImages from './OrbitImages';
import { ExternalLink } from 'lucide-react';

/**
 * ProjectShowcase - Featuring <OrbitImages /> from React Bits
 * Verified public projects from GitHub @mathely27.
 */
export default function ProjectShowcase() {
  const projectList = [
    {
      id: 0,
      title: 'AppLocker',
      category: 'Native macOS Utility',
      desc: 'Native macOS utility that locks protected applications behind Apple Touch ID biometric authentication or Mac admin password. Runs silently with zero battery overhead.',
      stack: ['Swift', 'SwiftUI', 'Touch ID', 'LocalAuth'],
      repo: 'https://github.com/mathely27/macapplock',
      svgCard: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" rx="28" fill="%23121215" stroke="%232a2a30" stroke-width="2"/><text x="24" y="48" fill="%2371717a" font-family="monospace" font-size="11" letter-spacing="1">01 / MACOS UTILITY</text><text x="24" y="104" fill="%23ffffff" font-family="sans-serif" font-weight="900" font-size="28">AppLocker</text><text x="24" y="142" fill="%23a1a1aa" font-family="sans-serif" font-size="13">Touch ID Biometric Lock</text><rect x="24" y="220" width="75" height="26" rx="6" fill="%23222226"/><text x="36" y="237" fill="%23ffffff" font-family="monospace" font-size="11">SWIFT</text><rect x="109" y="220" width="85" height="26" rx="6" fill="%23222226"/><text x="121" y="237" fill="%23ffffff" font-family="monospace" font-size="11">SWIFTUI</text></svg>`,
    },
    {
      id: 1,
      title: 'Berry AI',
      category: 'Local AI Assistant',
      desc: 'Offline personal AI assistant running locally on Mac via Ollama (Qwen3). Executes system tasks, inspects workspaces, and runs without sending data to third parties.',
      stack: ['Python', 'Ollama', 'Qwen3', 'PySide6'],
      repo: 'https://github.com/mathely27/Berry',
      svgCard: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" rx="28" fill="%23121215" stroke="%232a2a30" stroke-width="2"/><text x="24" y="48" fill="%2371717a" font-family="monospace" font-size="11" letter-spacing="1">02 / LOCAL AI</text><text x="24" y="104" fill="%23ffffff" font-family="sans-serif" font-weight="900" font-size="28">Berry AI</text><text x="24" y="142" fill="%23a1a1aa" font-family="sans-serif" font-size="13">Offline Assistant / Qwen3</text><rect x="24" y="220" width="85" height="26" rx="6" fill="%23222226"/><text x="36" y="237" fill="%23ffffff" font-family="monospace" font-size="11">PYTHON</text><rect x="119" y="220" width="80" height="26" rx="6" fill="%23222226"/><text x="131" y="237" fill="%23ffffff" font-family="monospace" font-size="11">OLLAMA</text></svg>`,
    },
    {
      id: 2,
      title: 'Autonomous',
      category: 'Agent Framework',
      desc: 'Autonomous agent system built with Pydantic-AI and local models. Features multi-step tool calling, file system inspection, and zero-latency local execution.',
      stack: ['Python', 'Pydantic-AI', 'Qwen3'],
      repo: 'https://github.com/mathely27/ai-agent-',
      svgCard: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" rx="28" fill="%23121215" stroke="%232a2a30" stroke-width="2"/><text x="24" y="48" fill="%2371717a" font-family="monospace" font-size="11" letter-spacing="1">03 / TOOL AGENTS</text><text x="24" y="104" fill="%23ffffff" font-family="sans-serif" font-weight="900" font-size="28">Autonomous</text><text x="24" y="142" fill="%23a1a1aa" font-family="sans-serif" font-size="13">Pydantic-AI Tool Runner</text><rect x="24" y="220" width="115" height="26" rx="6" fill="%23222226"/><text x="36" y="237" fill="%23ffffff" font-family="monospace" font-size="11">PYDANTIC-AI</text></svg>`,
    },
    {
      id: 3,
      title: 'Clutch',
      category: 'Full-Stack Web App',
      desc: 'Fast, responsive web platform designed with React on the frontend and Node.js on the backend. Modular component architecture, calm dark mode, and RESTful API.',
      stack: ['React', 'Node.js', 'Express', 'MongoDB'],
      repo: 'https://github.com/mathely27/project-x',
      svgCard: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" rx="28" fill="%23121215" stroke="%232a2a30" stroke-width="2"/><text x="24" y="48" fill="%2371717a" font-family="monospace" font-size="11" letter-spacing="1">04 / FULL-STACK</text><text x="24" y="104" fill="%23ffffff" font-family="sans-serif" font-weight="900" font-size="28">Clutch</text><text x="24" y="142" fill="%23a1a1aa" font-family="sans-serif" font-size="13">React + Node.js Platform</text><rect x="24" y="220" width="75" height="26" rx="6" fill="%23222226"/><text x="36" y="237" fill="%23ffffff" font-family="monospace" font-size="11">REACT</text><rect x="109" y="220" width="85" height="26" rx="6" fill="%23222226"/><text x="121" y="237" fill="%23ffffff" font-family="monospace" font-size="11">NODE.JS</text></svg>`,
    },
    {
      id: 4,
      title: 'Native Biometrics',
      category: 'Security Architecture',
      desc: 'Swift LocalAuthentication integration for daemon security and macOS app sandboxing.',
      stack: ['Swift', 'Security', 'macOS'],
      repo: 'https://github.com/mathely27/macapplock',
      svgCard: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" rx="28" fill="%23121215" stroke="%232a2a30" stroke-width="2"/><text x="24" y="48" fill="%2371717a" font-family="monospace" font-size="11" letter-spacing="1">SYSTEM / API</text><text x="24" y="104" fill="%23ffffff" font-family="sans-serif" font-weight="900" font-size="26">Biometrics</text><text x="24" y="142" fill="%23a1a1aa" font-family="sans-serif" font-size="13">Apple Touch ID & Pam</text><rect x="24" y="220" width="95" height="26" rx="6" fill="%23222226"/><text x="36" y="237" fill="%23ffffff" font-family="monospace" font-size="11">MACOS API</text></svg>`,
    },
    {
      id: 5,
      title: 'Local Reasoning',
      category: 'AI Pipeline',
      desc: 'Zero-cloud local inference running Qwen3 with low-memory footprint and high-speed token generation.',
      stack: ['Python', 'Ollama', 'Qwen3'],
      repo: 'https://github.com/mathely27/Berry',
      svgCard: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" rx="28" fill="%23121215" stroke="%232a2a30" stroke-width="2"/><text x="24" y="48" fill="%2371717a" font-family="monospace" font-size="11" letter-spacing="1">PIPELINE</text><text x="24" y="104" fill="%23ffffff" font-family="sans-serif" font-weight="900" font-size="26">Inference</text><text x="24" y="142" fill="%23a1a1aa" font-family="sans-serif" font-size="13">Zero-Cloud Local LLM</text><rect x="24" y="220" width="85" height="26" rx="6" fill="%23222226"/><text x="36" y="237" fill="%23ffffff" font-family="monospace" font-size="11">OLLAMA</text></svg>`,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const current = projectList[activeIndex % projectList.length];

  const images = projectList.map((p) => ({
    src: p.svgCard,
    alt: p.title,
  }));

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        userSelect: 'none',
      }}
    >
      {/* 3D OrbitImages Canvas with responsive sizing */}      <div
         style={{
           width: '100%',
           maxWidth: '920px',
           position: 'relative',

          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <OrbitImages
          images={images}
          shape="ellipse"
          radiusX={460}
          radiusY={120}
          rotation={-6}
          duration={24}
          itemSize={130}
          depth={0.65}
          showPath={true}
          pathColor="rgba(255, 255, 255, 0.12)"
          pathWidth={1.5}
          pathDash={4}
          draggable={true}
          clickToFront={true}
          onItemClick={(idx) => setActiveIndex(idx)}
          centerContent={
            /* Active Project Spotlight in Center */
            <div
              style={{
                width: '320px',
                background: 'rgba(18, 18, 22, 0.92)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '20px',
                padding: '22px 24px',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.75)',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  color: '#71717a',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {current.category}
              </div>

              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.03em',
                  margin: 0,
                }}
              >
                {current.title}
              </h3>

              <p
                style={{
                  fontSize: '12.5px',
                  lineHeight: 1.5,
                  color: '#a1a1aa',
                  margin: 0,
                }}
              >
                {current.desc}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '5px',
                  marginTop: '4px',
                }}
              >
                {current.stack.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: '2px 8px',
                      background: '#222226',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '5px',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '10px',
                      color: '#d4d4d8',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={current.repo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '8px',
                  padding: '8px 16px',
                  background: '#ffffff',
                  color: '#000000',
                  borderRadius: '9999px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  alignSelf: 'flex-start',
                  transition: 'transform 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <span>Inspect Code</span>
                <ExternalLink size={12} />
              </a>
            </div>
          }
        />
      </div>

      {/* Orbit Helper Instruction */}
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '11px',
          color: '#71717a',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span>Drag or swipe to spin orbit</span>
        <span>·</span>
        <span>Click card to bring to front</span>
      </div>
    </div>
  );
}
