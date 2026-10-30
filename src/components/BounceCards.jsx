import React, { useState } from 'react';
import { ExternalLink, Bot, Shield, Cpu, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import TouchIDSimulator from './TouchIDSimulator';

/**
 * BounceCards Component (React Bits inspired)
 * https://reactbits.dev/components/bounce-cards
 *
 * Interactive fanned-out cluster of project cards with elastic spring
 * spread and hover-straighten choreography.
 */
export default function BounceCards({ projects }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const defaultProjects = [
    {
      id: 'berry',
      title: 'Berry — AI Assistant',
      subtitle: 'Python · Ollama · PySide6',
      color: '#38bdf8',
      icon: Bot,
      rot: -5,
      offsetY: 6,
      desc: 'My personal local AI assistant built using Python, Ollama (Qwen3), and a custom desktop UI. Runs completely offline on my Mac, executes system tasks, and automates daily developer workflows.',
      tags: ['Python', 'Ollama', 'Qwen3', 'PySide6'],
      repo: 'https://github.com/mathely27/Berry',
    },
    {
      id: 'applocker',
      title: 'AppLocker (macapplock)',
      subtitle: 'Swift · SwiftUI · Touch ID',
      color: '#10b981',
      icon: Shield,
      rot: -1.5,
      offsetY: -8,
      desc: 'A lightweight native macOS app that locks protected applications behind Apple Touch ID biometric authentication or Mac password. Built with SwiftUI and follows clean MVVM architecture.',
      tags: ['Swift', 'SwiftUI', 'Touch ID', 'LocalAuth'],
      repo: 'https://github.com/mathely27/macapplock',
      hasTouchID: true,
    },
    {
      id: 'agent',
      title: 'Autonomous AI Agent',
      subtitle: 'Python · Pydantic-AI',
      color: '#a855f7',
      icon: Cpu,
      rot: 2,
      offsetY: -4,
      desc: 'An autonomous agent framework implemented with Pydantic-AI and local models. Features multi-step tool calling, file system inspection, time evaluation, and zero-latency local execution.',
      tags: ['Python', 'Pydantic-AI', 'Qwen3', 'Tools'],
      repo: 'https://github.com/mathely27/ai-agent-',
    },
    {
      id: 'clutch',
      title: 'Clutch Platform',
      subtitle: 'React · Node.js · Express',
      color: '#f59e0b',
      icon: Layers,
      rot: 5,
      offsetY: 8,
      desc: 'Full-stack responsive web application with React on the frontend and Node.js on the backend. Designed with modular components, dark aesthetic, and clean data modeling.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
      repo: 'https://github.com/mathely27/project-x',
    },
  ];

  const items = projects || defaultProjects;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Top Header / Instructions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-800/80 pb-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-sm text-zinc-400 mt-0.5">
            Hover or click cards to inspect real repositories I've built.
          </p>
        </div>

        <a
          href="https://github.com/mathely27?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <GithubIcon size={16} />
          <span>All Repositories (@mathely27) ↗</span>
        </a>
      </div>

      {/* Bounce Cards Cluster Deck */}
      <div className="relative py-6 px-2 flex items-center justify-center min-h-[380px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {items.map((proj, idx) => {
            const isSelected = activeIdx === idx;
            const Icon = proj.icon;

            return (
              <div
                key={proj.id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className={`group relative rounded-3xl border transition-all duration-300 cursor-pointer p-5 flex flex-col justify-between select-none ${
                  isSelected
                    ? 'z-20 bg-zinc-900 border-zinc-600 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] scale-105'
                    : 'z-10 bg-zinc-900/60 border-zinc-800/90 hover:bg-zinc-900/80 hover:border-zinc-700'
                }`}
                style={{
                  transform: isSelected
                    ? 'translateY(-14px) rotate(0deg) scale(1.04)'
                    : `translateY(${proj.offsetY}px) rotate(${proj.rot}deg)`,
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {/* Glowing subtle accent border top */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full transition-opacity duration-300"
                  style={{
                    backgroundColor: proj.color,
                    opacity: isSelected ? 0.9 : 0.25,
                  }}
                />

                <div className="space-y-3">
                  {/* Icon & Title */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${proj.color}18`,
                        borderColor: `${proj.color}40`,
                        color: proj.color,
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <a
                      href={proj.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <GithubIcon size={16} />
                    </a>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">
                      {proj.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-4">
                    {proj.desc}
                  </p>
                </div>

                {/* Bottom tags & optional demo */}
                <div className="pt-4 border-t border-zinc-800/80 mt-4 space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {proj.hasTouchID ? (
                      <div onClick={(e) => e.stopPropagation()}>
                        <TouchIDSimulator />
                      </div>
                    ) : (
                      <a
                        href={proj.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline font-medium"
                      >
                        <span>View Source</span>
                        <ExternalLink size={12} />
                      </a>
                    )}

                    <span
                      className="text-[11px] font-semibold transition-opacity duration-200"
                      style={{
                        color: proj.color,
                        opacity: isSelected ? 1 : 0.6,
                      }}
                    >
                      {isSelected ? '● Active' : 'Select'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

