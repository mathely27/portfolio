import React, { useState } from 'react';
import OrbitImages from './OrbitImages';
import { ExternalLink } from 'lucide-react';

/**
 * ProjectShowcase - Featuring <OrbitImages /> from React Bits
 * Live deployed projects with real UI screenshots.
 */
export default function ProjectShowcase() {
  const projectList = [
    {
      id: 0,
      title: 'DailyForge',
      category: 'Full-Stack MERN App',
      desc: 'Open-source fullstack MERN productivity app to design, manage, and visualize weekly routines with drag-and-drop scheduling and overlap protection.',
      stack: ['MongoDB', 'Express', 'React', 'Node.js'],
      repo: 'https://dailyforge-frontend-lhjq.onrender.com',
      svgCard: '/assets/dailyforge-preview.png',
    },
    {
      id: 1,
      title: 'Clutch',
      category: 'Full-Stack Platform',
      desc: 'Fast, responsive web platform designed with React on the frontend and Node.js on the backend. Modular component architecture and RESTful API.',
      stack: ['React', 'Node.js', 'Express', 'Tailwind'],
      repo: 'https://project-x-navy-eight.vercel.app',
      svgCard: '/assets/clutch-preview.png',
    },
    {
      id: 2,
      title: 'Feargon',
      category: 'Web Application',
      desc: 'Modern responsive web application deployed live on Vercel with smooth interactivity and sleek interface.',
      stack: ['React', 'Vite', 'TailwindCSS'],
      repo: 'https://feargon.vercel.app',
      svgCard: '/assets/feargon-preview.png',
    },
    {
      id: 3,
      title: 'Text Encryptor',
      category: 'Security / Crypto Tool',
      desc: 'Interactive live client-side text encryption and decryption utility for secure message encoding.',
      stack: ['JavaScript', 'HTML5', 'CSS3', 'Web Crypto'],
      repo: 'https://text-encryptor-one.vercel.app',
      svgCard: '/assets/text-encryptor-preview.png',
    },
    {
      id: 4,
      title: 'AppLocker',
      category: 'Native macOS Utility',
      desc: 'Native macOS utility that locks protected applications behind Apple Touch ID biometric authentication or Mac admin password.',
      stack: ['Swift', 'SwiftUI', 'Touch ID', 'LocalAuth'],
      repo: 'https://github.com/mathely27/macapplock',
      svgCard: '/assets/applocker-preview.jpg',
    },
    {
      id: 5,
      title: 'Neumorphic Timer',
      category: 'Interactive UI',
      desc: 'Neumorphic soft-UI interactive stopwatch featuring tactile shadows, precision lap timing, and state control.',
      stack: ['HTML5', 'CSS3', 'JavaScript'],
      repo: 'https://mathely27.github.io/neumorphic-stopwatch/',
      svgCard: '/assets/stopwatch-preview.png',
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
      {/* 3D OrbitImages Canvas with responsive sizing */}
      <div
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
                <span>Live Project</span>
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
