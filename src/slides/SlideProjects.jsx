import React, { useState } from 'react';
import { GithubIcon } from '../components/Icons';
import { ExternalLink } from 'lucide-react';

export default function SlideProjects() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const projects = [
    {
      id: '01',
      title: 'AppLocker',
      subtitle: 'Native macOS · Swift',
      typeLabel: 'Native utility / 2026',
      bannerHeadline: 'Security behind\nTouch ID.',
      bannerFooter: 'NATIVE / BIOMETRIC / SWIFTUI',
      desc: 'A lightweight native macOS utility that locks protected applications behind Apple Touch ID biometric authentication or Mac administrator password. Runs silently in the background.',
      role: 'Architecture · SwiftUI · Touch ID API',
      stack: ['Swift', 'SwiftUI', 'Touch ID', 'LocalAuth'],
      repo: 'https://github.com/mathely27/macapplock',
    },
    {
      id: '02',
      title: 'Berry AI',
      subtitle: 'Local assistant · Ollama',
      typeLabel: 'Local AI / 2026',
      bannerHeadline: 'Your personal\nAI. Offline.',
      bannerFooter: 'LOCAL / PRIVATE / FAST',
      desc: 'A personal offline AI assistant running locally on Mac via Ollama (Qwen3). Executes system tasks, inspects code workspaces, and handles daily developer automation without sending data to third parties.',
      role: 'Local LLM · Tool Calling · PySide6',
      stack: ['Python', 'Ollama', 'Qwen3', 'PySide6'],
      repo: 'https://github.com/mathely27/Berry',
    },
    {
      id: '03',
      title: 'Autonomous',
      subtitle: 'Tool agent · Pydantic-AI',
      typeLabel: 'Agent system / 2026',
      bannerHeadline: 'Reasoning\nwith tools.',
      bannerFooter: 'EVALUATE / PLAN / EXECUTE',
      desc: 'Autonomous agent system built with Pydantic-AI and local models. Features multi-step tool calling, file system inspection, time evaluation, and zero-latency local execution.',
      role: 'Agent Engine · Tool Bindings',
      stack: ['Python', 'Pydantic-AI', 'Qwen3', 'Ollama'],
      repo: 'https://github.com/mathely27/ai-agent-',
    },
    {
      id: '04',
      title: 'Clutch',
      subtitle: 'Full-stack · React',
      typeLabel: 'Web platform / 2026',
      bannerHeadline: 'Built for\nspeed & clarity.',
      bannerFooter: 'DESIGN / STATE / API',
      desc: 'A fast, responsive web application with React on the frontend and Node.js on the backend. Modular component hierarchy, calm dark theme, and clean state persistence.',
      role: 'Full-Stack Architecture · REST API',
      stack: ['React', 'Node.js', 'Express', 'MongoDB'],
      repo: 'https://github.com/mathely27/project-x',
    },
  ];

  const current = projects[selectedIdx];

  return (
    <div className="projects-layout">
      {/* LEFT: Sidebar */}
      <div className="project-sidebar">
        <div>
          <div className="sidebar-header-meta">
            <span>SELECTED BUILDS</span>
            <span>INDEX / 04</span>
          </div>

          <h2 className="sidebar-title">
            Project files<span className="sidebar-title-dot">.</span>
          </h2>

          <div className="project-list">
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setSelectedIdx(idx)}
                className={`project-row-item ${selectedIdx === idx ? 'active' : ''}`}
              >
                <div className="project-row-left">
                  <span className="project-row-num">{proj.id}</span>
                  <div>
                    <div className="project-row-name">{proj.title}</div>
                    <div className="project-row-sub">{proj.subtitle}</div>
                  </div>
                </div>
                <span className="project-row-arrow">›</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-hint">
          Select a file to preview the case study.
        </div>
      </div>

      {/* RIGHT: Detail cards */}
      <div className="project-detail" key={current.id}>
        {/* Preview card */}
        <div className="proj-preview-card" style={{ animation: 'fadeUp 0.35s cubic-bezier(0.16,1,0.3,1) both' }}>
          <div className="proj-preview-header">
            <div className="proj-preview-dots">
              <div className="proj-preview-dot red" />
              <div className="proj-preview-dot yellow" />
              <div className="proj-preview-dot green" />
            </div>
            <span className="proj-preview-label">PREVIEW · FIG/{current.id}</span>
          </div>

          <div className="proj-preview-body">
            <div className="proj-preview-glow" />
            <div className="proj-preview-headline">
              {current.bannerHeadline}
            </div>
          </div>

          <div className="proj-preview-footer">
            {current.bannerFooter}
          </div>
        </div>

        {/* Detail card */}
        <div className="proj-detail-card" style={{ animation: 'fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.06s both' }}>
          <div>
            <div className="proj-detail-meta">
              <span>{current.typeLabel}</span>
              <span className="proj-detail-num">{current.id}</span>
            </div>

            <h3 className="proj-detail-title">{current.title}</h3>

            <p className="proj-detail-desc">{current.desc}</p>

            <div className="proj-detail-role-label">MY ROLE & FOCUS</div>
            <div className="proj-detail-role-val">{current.role}</div>

            <div className="proj-chips">
              {current.stack.map((t) => (
                <span key={t} className="proj-chip">{t}</span>
              ))}
            </div>

            <div className="proj-detail-actions">
              <a
                href={current.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                <GithubIcon size={13} />
                <span>View Source</span>
              </a>
              <a
                href={current.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-surface"
              >
                <ExternalLink size={13} />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <div className="proj-detail-footnote">
            Real shipped code — inspect commit history on GitHub.
          </div>
        </div>
      </div>
    </div>
  );
}
