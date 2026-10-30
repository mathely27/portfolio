import React, { useState } from 'react';
import { GithubIcon } from '../components/Icons';
import TouchIDSimulator from '../components/TouchIDSimulator';

export default function SlideProjects() {
  const [selectedIdx, setSelectedIdx] = useState(1); // Default to project 02 like the reference screenshot!

  const projects = [
    {
      id: '01',
      title: 'AppLocker',
      category: 'macOS Native Utility',
      typeLabel: 'Native utility / 2026',
      subtitle: 'Native macOS · Swift',
      bannerHeadline: 'Security behind Touch ID.',
      bannerFooter: 'NATIVE / BIOMETRIC / SWIFTUI',
      desc: 'A lightweight native macOS utility that locks protected applications behind Apple Touch ID biometric authentication or Mac administrator password. Runs silently in the background.',
      roleSummary: 'Architecture · SwiftUI · Touch ID API',
      stack: ['Swift', 'SwiftUI', 'Touch ID', 'LocalAuth'],
      repo: 'https://github.com/mathely27/macapplock',
      hasTouchIDDemo: true,
    },
    {
      id: '02',
      title: 'Berry AI',
      category: 'Personal AI Assistant',
      typeLabel: 'Local AI / 2026',
      subtitle: 'Local assistant · Ollama',
      bannerHeadline: 'Ideas worth keeping.',
      bannerFooter: 'WRITE / ORGANIZE / SHIP',
      desc: 'A personal offline AI assistant running locally on Mac via Ollama (Qwen3). Executes system tasks, inspects code workspaces, and handles daily developer automation without sending data to third parties.',
      roleSummary: 'Local LLM · Tool Calling · PySide6',
      stack: ['Python', 'Ollama', 'Qwen3', 'PySide6'],
      repo: 'https://github.com/mathely27/Berry',
      hasTouchIDDemo: false,
    },
    {
      id: '03',
      title: 'Autonomous',
      category: 'Agent Framework',
      typeLabel: 'Agent system / 2026',
      subtitle: 'Tool agent · Pydantic-AI',
      bannerHeadline: 'Reasoning with local tools.',
      bannerFooter: 'EVALUATE / PLAN / EXECUTE',
      desc: 'Autonomous agent system built with Pydantic-AI and local models. Features multi-step tool calling, file system inspection, time evaluation, and zero-latency local execution.',
      roleSummary: 'Agent Engine · Tool Bindings',
      stack: ['Python', 'Pydantic-AI', 'Qwen3', 'Ollama'],
      repo: 'https://github.com/mathely27/ai-agent-',
      hasTouchIDDemo: false,
    },
    {
      id: '04',
      title: 'Clutch',
      category: 'Full-Stack Web App',
      typeLabel: 'Frontend & backend / 2026',
      subtitle: 'Full-stack platform · React',
      bannerHeadline: 'Built for speed & clarity.',
      bannerFooter: 'DESIGN / STATE / API',
      desc: 'A fast, responsive web application with React on the frontend and Node.js on the backend. Designed with modular component hierarchy, calm dark theme, and clean state persistence.',
      roleSummary: 'Full-Stack Architecture · REST API',
      stack: ['React', 'Node.js', 'Express', 'MongoDB'],
      repo: 'https://github.com/mathely27/project-x',
      hasTouchIDDemo: false,
    },
  ];

  const current = projects[selectedIdx];

  return (
    <div className="stage-inner animate-slideIn">
      
      {/* ====================================================
          LEFT SIDEBAR: Project files list
      ==================================================== */}
      <div className="project-sidebar">
        <div>
          {/* Top metadata */}
          <div className="sidebar-header-meta">
            <span>SELECTED BUILDS</span>
            <span>INDEX / 04</span>
          </div>

          {/* Title */}
          <h2 className="sidebar-title">
            Project files<span className="sidebar-title-dot">.</span>
          </h2>

          {/* Project List */}
          <div className="project-list">
            {projects.map((proj, idx) => {
              const isActive = selectedIdx === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`project-row-item ${isActive ? 'active' : ''}`}
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
              );
            })}
          </div>
        </div>

        {/* Sidebar bottom hint */}
        <div className="sidebar-hint">
          Select a file to preview the case study.
        </div>
      </div>

      {/* ====================================================
          DOUBLE CARD: Center Dark Card + Right Cream Card
      ==================================================== */}
      <div className="project-double-card">
        
        {/* Center Dark Card with Offset Tilted Paper */}
        <div className="card-dark-section">
          <div className="card-dark-meta">
            <span>PREVIEW CANVAS</span>
            <span>FIG / {current.id}</span>
          </div>

          <div className="card-dark-center">
            <div className="paper-sheet">
              {/* Notebook clips */}
              <div className="paper-clips">
                <div className="paper-clip-dash" />
                <div className="paper-clip-dash" />
                <div className="paper-clip-dash" />
                <div className="paper-clip-dash" />
              </div>

              {/* Headline */}
              <div className="paper-content">
                <div className="paper-headline">
                  {current.bannerHeadline}
                </div>

                <div className="paper-ruled-lines">
                  <div className="paper-rule-line" style={{ width: '100%' }} />
                  <div className="paper-rule-line" style={{ width: '85%' }} />
                  <div className="paper-rule-line" style={{ width: '65%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="card-dark-footer">
            {current.bannerFooter}
          </div>
        </div>

        {/* Right Cream Stone Detail Panel */}
        <div className="card-cream-section">
          <div>
            <div className="card-cream-top-meta">
              <span className="card-cream-tag">{current.typeLabel}</span>
              <span className="card-cream-num">{current.id}</span>
            </div>

            <h3 className="card-cream-title">
              {current.title}
            </h3>

            <p className="card-cream-desc">
              {current.desc}
            </p>

            <div className="card-cream-role-block">
              <div className="card-cream-role-label">MY ROLE &amp; FOCUS</div>
              <div className="card-cream-role-title">{current.roleSummary}</div>

              <div className="card-cream-chips">
                {current.stack.map((item) => (
                  <span key={item} className="card-cream-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-cream-actions">
              {current.hasTouchIDDemo && (
                <TouchIDSimulator />
              )}
              <a
                href={current.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-blue"
              >
                <GithubIcon size={14} />
                <span>GitHub Repo ↗</span>
              </a>
            </div>
          </div>

          <div className="card-cream-footer-note">
            Real code shipped by Mathely Mittal — inspect source on GitHub.
          </div>
        </div>

      </div>

    </div>
  );
}
