import React from 'react';
import ChromaGrid from './ChromaGrid';

/**
 * ProjectGrid - selected builds shown with <ChromaGrid /> from React Bits.
 * Sits inside a white gallery band. Artwork is light and gets its colour
 * revealed under the cursor.
 */

// Light, editorial cover art for repos without a screenshot.
const cover = (index, label, accent, art) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560">
  <defs>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fdfdfc"/>
      <stop offset="1" stop-color="#eceae6"/>
    </linearGradient>
    <radialGradient id="tint" cx="0.78" cy="0.14" r="0.85">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.34"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1.4" cy="1.4" r="1.1" fill="rgba(24,24,27,0.10)"/>
    </pattern>
  </defs>
  <rect width="900" height="560" fill="url(#paper)"/>
  <rect width="900" height="560" fill="url(#dots)"/>
  <rect width="900" height="560" fill="url(#tint)"/>
  ${art}
  <text x="46" y="84" font-family="ui-monospace,Menlo,monospace" font-size="15" letter-spacing="4" fill="rgba(24,24,27,0.42)">${String(
    index + 1
  ).padStart(2, '0')}</text>
  <text x="46" y="504" font-family="ui-monospace,Menlo,monospace" font-size="17" letter-spacing="6" fill="rgba(24,24,27,0.5)">${label}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const art = {
  // Berry - soft overlapping circles, like ripe fruit
  berry: `
    <circle cx="690" cy="150" r="196" fill="#34D399" fill-opacity="0.10"/>
    <circle cx="690" cy="150" r="132" fill="none" stroke="#34D399" stroke-opacity="0.42" stroke-width="1.6"/>
    <circle cx="690" cy="150" r="86" fill="#34D399" fill-opacity="0.14"/>
    <circle cx="806" cy="330" r="40" fill="#34D399" fill-opacity="0.30"/>
    <circle cx="612" cy="366" r="20" fill="#34D399" fill-opacity="0.46"/>
    <path d="M46 420 H300" stroke="rgba(24,24,27,0.18)" stroke-width="1.5"/>
  `,
  // Autonomous Agents - node graph
  agents: `
    <g stroke="#E92063" stroke-opacity="0.34" stroke-width="1.4">
      <path d="M300 300 L470 200 L660 262 L742 138"/>
      <path d="M470 200 L520 372 L660 262"/>
      <path d="M300 300 L520 372"/>
    </g>
    <g fill="#E92063">
      <circle cx="300" cy="300" r="9" fill-opacity="0.8"/>
      <circle cx="470" cy="200" r="13" fill-opacity="0.32"/>
      <circle cx="660" cy="262" r="7" fill-opacity="0.75"/>
      <circle cx="742" cy="138" r="20" fill-opacity="0.16"/>
      <circle cx="520" cy="372" r="5" fill-opacity="0.9"/>
    </g>
    <circle cx="742" cy="138" r="34" fill="none" stroke="#E92063" stroke-opacity="0.4"/>
    <circle cx="470" cy="200" r="26" fill="none" stroke="#E92063" stroke-opacity="0.28"/>
  `,
  // Clutch - interlocking geometry
  clutch: `
    <rect x="486" y="126" width="250" height="170" rx="34" fill="none" stroke="#61DAFB" stroke-opacity="0.5" stroke-width="1.6"/>
    <rect x="572" y="222" width="250" height="170" rx="34" fill="#61DAFB" fill-opacity="0.10"/>
    <path d="M546 320 A120 120 0 0 1 786 320" fill="none" stroke="#61DAFB" stroke-opacity="0.55" stroke-width="2"/>
    <circle cx="666" cy="200" r="12" fill="#61DAFB" fill-opacity="0.55"/>
  `,
  // GitStatCard - contribution bars
  stats: `
    <g fill="#8957E5">
      <rect x="500" y="316" width="34" height="118" rx="10" fill-opacity="0.20"/>
      <rect x="552" y="262" width="34" height="172" rx="10" fill-opacity="0.34"/>
      <rect x="604" y="196" width="34" height="238" rx="10" fill-opacity="0.52"/>
      <rect x="656" y="286" width="34" height="148" rx="10" fill-opacity="0.28"/>
      <rect x="708" y="230" width="34" height="204" rx="10" fill-opacity="0.44"/>
    </g>
    <path d="M486 452 H806" stroke="rgba(24,24,27,0.22)" stroke-width="1.6"/>
  `,
  // Portfolio - concentric monochrome rings
  rings: `
    <g fill="none" stroke="rgba(24,24,27,0.16)" stroke-width="1.5">
      <circle cx="700" cy="220" r="56"/>
      <circle cx="700" cy="220" r="108"/>
      <circle cx="700" cy="220" r="164"/>
    </g>
    <circle cx="700" cy="220" r="14" fill="rgba(24,24,27,0.5)"/>
    <rect x="592" y="112" width="216" height="216" rx="44" fill="none" stroke="rgba(24,24,27,0.14)" stroke-width="1.5"/>
  `,
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
    image: cover(1, 'PYTHON · OLLAMA', '#34D399', art.berry),
    url: 'https://github.com/mathely27/Berry',
  },
  {
    title: 'Autonomous Agents',
    subtitle: 'Pydantic-AI · multi-step tool calling',
    accent: '#E92063',
    image: cover(2, 'PYDANTIC-AI', '#E92063', art.agents),
    url: 'https://github.com/mathely27/ai-agent-',
  },
  {
    title: 'Clutch',
    subtitle: 'React / Node.js · full-stack platform',
    accent: '#61DAFB',
    image: cover(3, 'REACT · NODE.JS', '#61DAFB', art.clutch),
    url: 'https://github.com/mathely27/project-x',
  },
  {
    title: 'GitStatCard',
    subtitle: 'CSS · live GitHub stat card generator',
    accent: '#8957E5',
    image: cover(4, 'GITHUB API · CSS', '#8957E5', art.stats),
    url: 'https://github.com/mathely27/gitstatcard',
  },
  {
    title: 'Portfolio',
    subtitle: 'React / Vite · this monochrome site',
    accent: '#8A8A93',
    image: cover(5, 'REACT · VITE', '#8A8A93', art.rings),
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
        gap={16}
        radius={300}
        softness={0.62}
        damping={0.45}
        fadeOut={0.6}
        grayscale={1}
        dim={0.1}
        glow={0.45}
        borderGlow={0.9}
        aspectRatio="16 / 10"
        cardRadius={18}
        theme="light"
      />

      <div
        style={{
          marginTop: '16px',
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
