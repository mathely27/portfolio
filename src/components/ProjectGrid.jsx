import React, { useEffect, useState } from 'react';
import ChromaGrid from './ChromaGrid';
import { GithubIcon, LinkedinIcon } from './Icons';

/**
 * ProjectGrid - selected builds shown with <ChromaGrid /> from React Bits.
 * Sequence:
 * 1. AppLocker (Mac App Lock) - Top
 * 2. Berry AI - PySide6 local LLM
 * 3. Autonomous - Live deployed AI persona on Vercel
 * 4. Clutch - Full-Stack React + Node.js (Dashboard view)
 * 5. GitStatCard - Live deployed stat card generator on Vercel
 * 6. Text Encryptor - Live deployed cryptography tool on Vercel
 */

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
    image: '/assets/berry-ui-preview.png',
    url: 'https://github.com/mathely27/Berry',
  },
  {
    title: 'Autonomous',
    subtitle: 'Next.js 14 / Groq · live autonomous AI persona',
    accent: '#E92063',
    image: '/assets/autonomous-live-preview.png',
    url: 'https://autonomous-ai-persona.vercel.app',
  },
  {
    title: 'Clutch',
    subtitle: 'React / Node.js · full-stack platform (Dashboard)',
    accent: '#61DAFB',
    image: '/assets/clutch-dashboard-preview.png',
    url: 'https://project-x-navy-eight.vercel.app',
  },
  {
    title: 'GitStatCard',
    subtitle: 'CSS / Python · live deployed card generator',
    accent: '#8957E5',
    image: '/assets/gitstatcard-live-preview.png',
    url: 'https://gitstatcard.vercel.app',
  },
  {
    title: 'Text Encryptor',
    subtitle: 'JavaScript / Crypto · live deployed text encryption',
    accent: '#10B981',
    image: '/assets/text-encryptor-preview.png',
    url: 'https://text-encryptor-one.vercel.app',
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
