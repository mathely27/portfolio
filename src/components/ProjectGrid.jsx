import React, { useEffect, useState } from 'react';
import ChromaGrid from './ChromaGrid';
import { GithubIcon, LinkedinIcon } from './Icons';

/**
 * ProjectGrid - selected builds shown with <ChromaGrid /> from React Bits.
 * All cards feature real screenshots from live deployed apps and projects.
 */

const PROJECTS = [
  {
    title: 'DailyForge',
    subtitle: 'MERN · fullstack productivity routine planner',
    accent: '#F97316',
    image: '/assets/dailyforge-preview.png',
    url: 'https://dailyforge-frontend-lhjq.onrender.com',
  },
  {
    title: 'Clutch',
    subtitle: 'React / Node.js · full-stack platform',
    accent: '#61DAFB',
    image: '/assets/clutch-preview.png',
    url: 'https://project-x-navy-eight.vercel.app',
  },
  {
    title: 'Feargon',
    subtitle: 'Next.js / React · modern deployed web app',
    accent: '#8B5CF6',
    image: '/assets/feargon-preview.png',
    url: 'https://feargon.vercel.app',
  },
  {
    title: 'Text Encryptor',
    subtitle: 'JavaScript / Crypto · text encryption utility',
    accent: '#10B981',
    image: '/assets/text-encryptor-preview.png',
    url: 'https://text-encryptor-one.vercel.app',
  },
  {
    title: 'AppLocker',
    subtitle: 'Swift / SwiftUI · Touch ID app lock for macOS',
    accent: '#37C5E0',
    image: '/assets/applocker-preview.jpg',
    url: 'https://github.com/mathely27/macapplock',
  },
  {
    title: 'Neumorphic Timer',
    subtitle: 'CSS / JS · Neumorphic design stopwatch',
    accent: '#EC4899',
    image: '/assets/stopwatch-preview.png',
    url: 'https://mathely27.github.io/neumorphic-stopwatch/',
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
