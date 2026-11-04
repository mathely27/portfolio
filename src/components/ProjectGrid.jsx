import React from 'react';
import ChromaGrid from './ChromaGrid';

/**
 * ProjectGrid - selected builds shown with <ChromaGrid /> from React Bits.
 * The images start monochrome and reveal in colour under the cursor.
 */

// Abstract cover art for repos that don't have a screenshot yet.
const cover = (index, label, accent) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1c1c21"/>
      <stop offset="1" stop-color="#0a0a0c"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.2" cy="0.15" r="0.9">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
      <path d="M36 0H0V36" fill="none" stroke="rgba(255,255,255,0.06)"/>
    </pattern>
  </defs>
  <rect width="900" height="560" fill="url(#bg)"/>
  <rect width="900" height="560" fill="url(#grid)"/>
  <rect width="900" height="560" fill="url(#glow)"/>
  <text x="48" y="100" font-family="ui-monospace,Menlo,monospace" font-size="42" font-weight="700" fill="rgba(255,255,255,0.16)">${String(
    index + 1
  ).padStart(2, '0')}</text>
  <text x="48" y="482" font-family="ui-monospace,Menlo,monospace" font-size="20" letter-spacing="6" fill="rgba(255,255,255,0.6)">${label}</text>
  <text x="48" y="516" font-family="ui-monospace,Menlo,monospace" font-size="13" letter-spacing="3" fill="rgba(255,255,255,0.32)">GITHUB / MATHELY27</text>
  <circle cx="720" cy="150" r="86" fill="none" stroke="${accent}" stroke-opacity="0.45" stroke-width="2"/>
  <circle cx="720" cy="150" r="44" fill="${accent}" fill-opacity="0.18"/>
  <path d="M640 420 L800 420 M640 452 L740 452" stroke="${accent}" stroke-opacity="0.35" stroke-width="2"/>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const PROJECTS = [
  {
    title: 'AppLocker',
    subtitle: 'Swift / SwiftUI · Touch ID app lock for macOS',
    accent: '#37C5E0',
    image: '/assets/applocker-preview.jpg',
    url: 'https://github.com/mathely27/macapplock',
  },
  {
    title: 'Berry',
    subtitle: 'Python / Ollama · offline AI assistant',
    accent: '#34D399',
    image: cover(1, 'PYTHON · OLLAMA', '#34D399'),
    url: 'https://github.com/mathely27/Berry',
  },
  {
    title: 'Autonomous Agents',
    subtitle: 'Pydantic-AI · multi-step tool calling',
    accent: '#E92063',
    image: cover(2, 'PYDANTIC-AI', '#E92063'),
    url: 'https://github.com/mathely27/ai-agent-',
  },
  {
    title: 'Clutch',
    subtitle: 'React / Node.js · full-stack platform',
    accent: '#61DAFB',
    image: cover(3, 'REACT · NODE.JS', '#61DAFB'),
    url: 'https://github.com/mathely27/project-x',
  },
  {
    title: 'GitStatCard',
    subtitle: 'CSS · live GitHub stat card generator',
    accent: '#8957E5',
    image: cover(4, 'GITHUB API · CSS', '#8957E5'),
    url: 'https://github.com/mathely27/gitstatcard',
  },
  {
    title: 'Portfolio',
    subtitle: 'React / Vite · this monochrome site',
    accent: '#F4F4F5',
    image: cover(5, 'REACT · VITE', '#F4F4F5'),
    url: 'https://github.com/mathely27/portfolio',
  },
];

export default function ProjectGrid() {
  return (
    <div style={{ width: '100%', maxWidth: '1040px', margin: '0 auto' }}>
      <ChromaGrid
        items={PROJECTS}
        columns={3}
        minCardWidth={200}
        gap={14}
        radius={280}
        softness={0.65}
        damping={0.45}
        fadeOut={0.6}
        grayscale={1}
        dim={0.18}
        glow={0.55}
        borderGlow={1}
        aspectRatio="16 / 10"
        cardRadius={18}
      />

      <div
        style={{
          marginTop: '14px',
          fontFamily: "'Space Mono', monospace",
          fontSize: '10.5px',
          color: '#71717a',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        <span>Move cursor to reveal colour</span>
        <span>·</span>
        <span>Click a card to open the repo</span>
      </div>
    </div>
  );
}
