import React from 'react';
import ChromaGrid from './ChromaGrid';

/**
 * ProjectGrid - selected builds shown with <ChromaGrid /> from React Bits.
 * AppLocker uses its real screenshot, the other cards use product mockups
 * drawn as SVG so the image says what the project actually does.
 */

const bar = (x, y, w, h, opacity = 0.14, radius = h / 2, fill = '#ffffff') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" fill-opacity="${opacity}"/>`;

// A dark app window so every mockup reads like a screenshot.
const shot = (accent, inner) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#101015"/>
      <stop offset="1" stop-color="#08080a"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.8" cy="0.05" r="0.9">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="900" height="560" fill="url(#bg)"/>
  <rect width="900" height="560" fill="url(#glow)"/>
  <rect x="30" y="26" width="840" height="508" rx="20" fill="#131318" stroke="rgba(255,255,255,0.10)"/>
  <path d="M30 74 H870" stroke="rgba(255,255,255,0.07)"/>
  <circle cx="58" cy="50" r="5" fill="rgba(255,255,255,0.22)"/>
  <circle cx="76" cy="50" r="5" fill="rgba(255,255,255,0.14)"/>
  <circle cx="94" cy="50" r="5" fill="rgba(255,255,255,0.09)"/>
  ${inner}
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

/* Berry - local AI chat window */
const berryArt = `
  <rect x="42" y="88" width="212" height="424" fill="rgba(255,255,255,0.035)"/>
  <rect x="42" y="88" width="212" height="424" fill="none" stroke="rgba(255,255,255,0.06)"/>
  ${bar(64, 112, 76, 9, 0.30)}
  <rect x="54" y="140" width="188" height="34" rx="10" fill="rgba(52,211,153,0.12)"/>
  ${bar(64, 151, 14, 14, 0.45, 4, '#34D399')}
  ${bar(88, 154, 96, 8, 0.34)}
  ${bar(64, 190, 14, 14, 0.14, 4)}
  ${bar(88, 193, 110, 8, 0.16)}
  ${bar(64, 226, 14, 14, 0.14, 4)}
  ${bar(88, 229, 84, 8, 0.16)}
  ${bar(64, 262, 14, 14, 0.14, 4)}
  ${bar(88, 265, 102, 8, 0.16)}
  ${bar(64, 298, 14, 14, 0.14, 4)}
  ${bar(88, 301, 72, 8, 0.16)}
  <path d="M42 470 H254" stroke="rgba(255,255,255,0.07)"/>
  ${bar(64, 486, 42, 8, 0.28, 4, '#34D399')}
  ${bar(114, 486, 88, 8, 0.16)}

  <rect x="282" y="92" width="120" height="24" rx="12" fill="rgba(52,211,153,0.14)" stroke="rgba(52,211,153,0.35)"/>
  ${bar(296, 101, 60, 7, 0.55, 3.5, '#34D399')}
  ${bar(414, 101, 130, 7, 0.10)}

  <rect x="596" y="140" width="248" height="62" rx="18" fill="rgba(52,211,153,0.16)" stroke="rgba(52,211,153,0.30)"/>
  ${bar(618, 158, 176, 8, 0.55)}
  ${bar(618, 176, 120, 8, 0.35)}

  <circle cx="308" cy="242" r="15" fill="rgba(52,211,153,0.22)" stroke="rgba(52,211,153,0.55)"/>
  <rect x="336" y="222" width="330" height="86" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.07)"/>
  ${bar(356, 242, 250, 8, 0.32)}
  ${bar(356, 260, 286, 8, 0.22)}
  ${bar(356, 278, 180, 8, 0.22)}

  <circle cx="308" cy="352" r="15" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)"/>
  <rect x="336" y="332" width="240" height="60" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.07)"/>
  ${bar(356, 350, 150, 8, 0.28)}
  ${bar(356, 368, 96, 8, 0.18)}

  <rect x="282" y="424" width="562" height="66" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)"/>
  ${bar(306, 452, 210, 9, 0.18)}
  <circle cx="812" cy="457" r="17" fill="rgba(52,211,153,0.55)"/>
  <path d="M806 457 H818 M812 451 V463" stroke="#0b0b0d" stroke-width="2" stroke-linecap="round"/>
`;

/* Autonomous Agents - run trace with tool steps */
const agentsArt = (() => {
  const rows = [
    { y: 104, accent: true, tag: 'PLAN' },
    { y: 222, accent: false, tag: 'TOOL' },
    { y: 340, accent: false, tag: 'DONE' },
  ];
  return `
  ${bar(58, 92, 96, 9, 0.28)}
  ${bar(742, 92, 102, 9, 0.14)}
  <path d="M96 178 V448" stroke="rgba(255,255,255,0.10)" stroke-dasharray="4 8"/>
  ${rows
    .map(
      (row, i) => `
    <rect x="128" y="${row.y}" width="714" height="94" rx="16" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)"/>
    <circle cx="160" cy="${row.y + 47}" r="16" fill="${row.accent ? 'rgba(233,32,99,0.22)' : 'rgba(255,255,255,0.05)'}" stroke="${row.accent ? 'rgba(233,32,99,0.7)' : 'rgba(255,255,255,0.18)'}"/>
    ${bar(160 - 4, row.y + 43, 8, 8, row.accent ? 0.9 : 0.3, 4, row.accent ? '#E92063' : '#ffffff')}
    ${bar(194, row.y + 26, 250 - i * 20, 10, 0.40)}
    ${bar(194, row.y + 48, 330 - i * 30, 8, 0.16)}
    ${bar(194, row.y + 66, 200 + i * 20, 8, 0.12)}
    <rect x="742" y="${row.y + 30}" width="76" height="24" rx="12" fill="${row.accent ? 'rgba(233,32,99,0.18)' : 'rgba(255,255,255,0.06)'}" stroke="${row.accent ? 'rgba(233,32,99,0.45)' : 'rgba(255,255,255,0.12)'}"/>
    ${bar(756, row.y + 39, 48, 6, row.accent ? 0.8 : 0.35, 3, row.accent ? '#E92063' : '#ffffff')}
  `
    )
    .join('')}
  <rect x="128" y="452" width="714" height="10" rx="5" fill="rgba(255,255,255,0.07)"/>
  <rect x="128" y="452" width="480" height="10" rx="5" fill="rgba(233,32,99,0.55)"/>
  ${bar(128, 480, 150, 7, 0.16)}
  ${bar(632, 480, 210, 7, 0.12)}
`;
})();

/* Clutch - full-stack dashboard */
const clutchArt = `
  <rect x="42" y="88" width="158" height="424" fill="rgba(255,255,255,0.035)"/>
  <rect x="42" y="88" width="158" height="424" fill="none" stroke="rgba(255,255,255,0.06)"/>
  ${bar(62, 110, 58, 9, 0.34)}
  <rect x="54" y="138" width="134" height="30" rx="9" fill="rgba(97,218,251,0.14)"/>
  ${bar(66, 147, 10, 10, 0.55, 3, '#61DAFB')}
  ${bar(84, 148, 72, 8, 0.34)}
  ${bar(66, 182, 10, 10, 0.14, 3)}
  ${bar(84, 183, 84, 8, 0.16)}
  ${bar(66, 216, 10, 10, 0.14, 3)}
  ${bar(84, 217, 62, 8, 0.16)}
  ${bar(66, 250, 10, 10, 0.14, 3)}
  ${bar(84, 251, 92, 8, 0.16)}
  ${bar(66, 284, 10, 10, 0.14, 3)}
  ${bar(84, 285, 70, 8, 0.16)}
  ${bar(62, 470, 44, 8, 0.2)}
  ${bar(62, 488, 78, 8, 0.12)}

  ${bar(218, 100, 118, 10, 0.36)}
  ${bar(218, 120, 76, 7, 0.14)}
  <circle cx="828" cy="108" r="15" fill="rgba(97,218,251,0.22)" stroke="rgba(97,218,251,0.5)"/>

  <g>
    <rect x="218" y="148" width="158" height="92" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
    ${bar(236, 166, 52, 7, 0.18)}
    ${bar(236, 184, 74, 16, 0.44, 5)}
    ${bar(236, 210, 40, 6, 0.14, 3, '#61DAFB')}
    <rect x="392" y="148" width="158" height="92" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
    ${bar(410, 166, 62, 7, 0.18)}
    ${bar(410, 184, 58, 16, 0.44, 5)}
    ${bar(410, 210, 52, 6, 0.14, 3, '#61DAFB')}
    <rect x="566" y="148" width="158" height="92" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
    ${bar(584, 166, 46, 7, 0.18)}
    ${bar(584, 184, 86, 16, 0.44, 5)}
    ${bar(584, 210, 36, 6, 0.14, 3, '#61DAFB')}
  </g>

  <rect x="218" y="256" width="506" height="152" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
  <path d="M246 372 H700 M246 330 H700 M246 288 H700" stroke="rgba(255,255,255,0.06)"/>
  <path d="M246 368 L306 340 L366 352 L426 306 L486 318 L546 286 L606 300 L666 268" fill="none" stroke="#61DAFB" stroke-opacity="0.85" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M246 368 L306 340 L366 352 L426 306 L486 318 L546 286 L606 300 L666 268 L666 388 L246 388 Z" fill="rgba(97,218,251,0.10)"/>

  <rect x="740" y="256" width="126" height="152" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
  ${bar(756, 274, 58, 7, 0.2)}
  ${bar(756, 296, 94, 8, 0.12)}
  ${bar(756, 314, 78, 8, 0.12)}
  ${bar(756, 332, 90, 8, 0.12)}
  ${bar(756, 350, 64, 8, 0.12)}
  ${bar(756, 374, 40, 16, 0.3, 6, '#61DAFB')}

  <rect x="218" y="424" width="648" height="88" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
  ${bar(238, 442, 120, 7, 0.2)}
  ${bar(238, 464, 300, 8, 0.12)}
  ${bar(238, 482, 220, 8, 0.10)}
  <rect x="744" y="452" width="100" height="26" rx="13" fill="rgba(97,218,251,0.16)" stroke="rgba(97,218,251,0.4)"/>
  ${bar(762, 461, 62, 7, 0.6, 3.5, '#61DAFB')}
`;

/* GitStatCard - the generated stat card itself */
const statsArt = (() => {
  const cells = [];
  const levels = [0.12, 0.16, 0.28, 0.42, 0.62, 0.9];
  for (let col = 0; col < 18; col++) {
    for (let row = 0; row < 6; row++) {
      const seed = (col * 7 + row * 13) % 11;
      const level = seed > 8 ? 5 : seed > 6 ? 4 : seed > 4 ? 3 : seed > 2 ? 2 : seed > 1 ? 1 : 0;
      cells.push(
        `<rect x="${274 + col * 20}" y="${316 + row * 20}" width="14" height="14" rx="3.5" fill="#8957E5" fill-opacity="${levels[level]}"/>`
      );
    }
  }
  return `
  ${bar(58, 92, 104, 9, 0.26)}
  ${bar(742, 92, 102, 9, 0.12)}
  <rect x="228" y="126" width="444" height="376" rx="24" fill="#141419" stroke="rgba(255,255,255,0.11)"/>
  <rect x="228" y="126" width="444" height="376" rx="24" fill="none" stroke="rgba(139,87,229,0.35)"/>
  <circle cx="288" cy="182" r="32" fill="rgba(139,87,229,0.22)" stroke="rgba(139,87,229,0.6)"/>
  ${bar(336, 162, 132, 12, 0.62, 6)}
  ${bar(336, 186, 88, 9, 0.24, 4.5)}
  <rect x="600" y="160" width="44" height="22" rx="11" fill="rgba(139,87,229,0.2)" stroke="rgba(139,87,229,0.45)"/>
  ${bar(610, 168, 24, 6, 0.7, 3, '#8957E5')}

  ${bar(262, 246, 54, 8, 0.18, 4)}
  ${bar(262, 262, 92, 20, 0.5, 6)}
  ${bar(392, 246, 62, 8, 0.18, 4)}
  ${bar(392, 262, 74, 20, 0.5, 6)}
  ${bar(522, 246, 48, 8, 0.18, 4)}
  ${bar(522, 262, 108, 20, 0.5, 6)}

  <path d="M262 300 H638" stroke="rgba(255,255,255,0.08)"/>
  ${cells.join('')}

  <path d="M262 470 H638" stroke="rgba(255,255,255,0.08)"/>
  ${bar(262, 482, 118, 7, 0.16)}
  ${bar(560, 482, 78, 7, 0.16)}
  <circle cx="640" cy="485" r="4" fill="rgba(139,87,229,0.8)"/>
`;
})();

/* Portfolio - browser preview of this site */
const portfolioArt = `
  <rect x="620" y="42" width="180" height="22" rx="11" fill="rgba(255,255,255,0.06)"/>
  ${bar(636, 50, 96, 6, 0.22, 3)}
  ${bar(64, 104, 54, 22, 0.7, 6)}
  ${bar(126, 108, 34, 14, 0.14, 4)}
  <circle cx="816" cy="112" r="14" fill="rgba(255,255,255,0.1)"/>
  ${bar(64, 168, 300, 30, 0.62, 4)}
  ${bar(64, 208, 214, 30, 0.45, 4)}
  ${bar(64, 268, 268, 8, 0.18, 4)}
  ${bar(64, 286, 236, 8, 0.14, 4)}
  ${bar(64, 304, 190, 8, 0.14, 4)}
  <rect x="64" y="342" width="132" height="36" rx="18" fill="rgba(255,255,255,0.85)"/>
  ${bar(84, 355, 72, 8, 0.9, 4, '#0b0b0d')}
  <rect x="212" y="342" width="112" height="36" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)"/>
  ${bar(238, 355, 60, 8, 0.3, 4)}

  <rect x="444" y="132" width="180" height="112" rx="12" fill="rgba(255,255,255,0.07)"/>
  <rect x="444" y="132" width="180" height="112" rx="12" fill="none" stroke="rgba(255,255,255,0.1)"/>
  <rect x="640" y="132" width="198" height="112" rx="12" fill="rgba(255,255,255,0.05)"/>
  <rect x="640" y="132" width="198" height="112" rx="12" fill="none" stroke="rgba(255,255,255,0.09)"/>
  <rect x="444" y="260" width="180" height="112" rx="12" fill="rgba(255,255,255,0.05)"/>
  <rect x="444" y="260" width="180" height="112" rx="12" fill="none" stroke="rgba(255,255,255,0.09)"/>
  <rect x="640" y="260" width="198" height="112" rx="12" fill="rgba(255,255,255,0.07)"/>
  <rect x="640" y="260" width="198" height="112" rx="12" fill="none" stroke="rgba(255,255,255,0.1)"/>
  <rect x="444" y="388" width="394" height="86" rx="12" fill="rgba(255,255,255,0.04)"/>
  <rect x="444" y="388" width="394" height="86" rx="12" fill="none" stroke="rgba(255,255,255,0.08)"/>
  ${bar(466, 410, 92, 8, 0.2)}
  ${bar(466, 430, 150, 8, 0.12)}
  <path d="M64 160 H340" stroke="rgba(255,255,255,0.12)"/>
`;

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
    image: shot('#34D399', berryArt),
    url: 'https://github.com/mathely27/Berry',
  },
  {
    title: 'Autonomous Agents',
    subtitle: 'Pydantic-AI · multi-step tool calling',
    accent: '#E92063',
    image: shot('#E92063', agentsArt),
    url: 'https://github.com/mathely27/ai-agent-',
  },
  {
    title: 'Clutch',
    subtitle: 'React / Node.js · full-stack platform',
    accent: '#61DAFB',
    image: shot('#61DAFB', clutchArt),
    url: 'https://github.com/mathely27/project-x',
  },
  {
    title: 'GitStatCard',
    subtitle: 'CSS · live GitHub stat card generator',
    accent: '#8957E5',
    image: shot('#8957E5', statsArt),
    url: 'https://github.com/mathely27/gitstatcard',
  },
  {
    title: 'Portfolio',
    subtitle: 'React / Vite · this monochrome site',
    accent: '#A1A1AA',
    image: shot('#A1A1AA', portfolioArt),
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
        dim={0.15}
        glow={0.5}
        borderGlow={1}
        aspectRatio="16 / 10"
        cardRadius={18}
        theme="dark"
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
