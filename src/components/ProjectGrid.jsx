import React, { useEffect, useState } from 'react';
import ChromaGrid from './ChromaGrid';
import { GithubIcon, LinkedinIcon } from './Icons';

/**
 * ProjectGrid - selected builds shown with <ChromaGrid /> from React Bits.
 * All cards now use real screenshots taken from deployed sites / GitHub repos.
 */

const PROJECTS = [
  {
    title: 'AppLocker',
    subtitle: 'Swift / SwiftUI · Touch ID app lock for macOS',
    accent: '#37C5E0',
    image: '/assets/applocker-preview-new.png',
    url: 'https://github.com/mathely27/macapplock',
  },
  {
    title: 'Berry',
    subtitle: 'Python / Ollama · offline AI assistant',
    accent: '#34D399',
    image: '/assets/berry-preview.png',
    url: 'https://github.com/mathely27/Berry',
  },
  {
    title: 'Autonomous Agents',
    subtitle: 'Pydantic-AI · multi-step tool calling',
    accent: '#E92063',
    image: '/assets/autonomous-preview.png',
    url: 'https://github.com/mathely27/ai-agent-',
  },
  {
    title: 'Clutch',
    subtitle: 'React / Node.js · full-stack platform',
    accent: '#61DAFB',
    image: '/assets/clutch-preview.png',
    url: 'https://github.com/mathely27/project-x',
  },
  {
    title: 'GitStatCard',
    subtitle: 'CSS · live GitHub stat card generator',
    accent: '#8957E5',
    image: '/assets/gitstatcard-preview.png',
    url: 'https://github.com/mathely27/gitstatcard',
  },
  {
    title: 'Portfolio',
    subtitle: 'React / Vite · this monochrome site',
    accent: '#A1A1AA',
    image: '/assets/portfolio-preview.png',
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
        showInfo={true}
      />
    </div>
  );
}
