import React, { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../components/Icons';

export default function SlideContact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mathely.mittal@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const techCategories = [
    { title: 'SYSTEMS & NATIVE', items: ['Swift', 'SwiftUI', 'Touch ID API', 'macOS'] },
    { title: 'LOCAL AI & AGENTS', items: ['Ollama', 'Qwen3', 'Pydantic-AI', 'Tool Calling'] },
    { title: 'WEB & FULL-STACK', items: ['React', 'Node.js', 'Express', 'MongoDB'] },
    { title: 'CORE', items: ['Python 3', 'Git', 'Linux / Zsh', 'DSA'] },
  ];

  return (
    <div className="contact-layout">
      {/* LEFT: Contact info */}
      <div className="contact-left">
        <div>
          <div className="contact-eyebrow">
            <span className="contact-eyebrow-line" />
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="contact-title">
            Let's build<br />
            something real<span style={{ color: 'var(--accent)' }}>.</span>
          </h2>

          <p className="contact-subtitle">
            2nd year CS student focused on practical software.
            Open to internships, collaborations, and interesting conversations.
          </p>

          <div className="contact-actions">
            {/* Email copy */}
            <button
              onClick={handleCopyEmail}
              className={`contact-copy-btn ${copied ? 'copied' : ''}`}
            >
              <span style={{
                width: 32, height: 32, borderRadius: 8,
                background: copied ? 'rgba(34,197,94,0.15)' : 'var(--accent-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {copied ? <Check size={14} /> : <Mail size={14} />}
              </span>
              <span>{copied ? 'Copied to clipboard!' : 'mathely.mittal@gmail.com'}</span>
            </button>

            {/* GitHub */}
            <a href="https://github.com/mathely27" target="_blank" rel="noopener noreferrer" className="contact-link-row">
              <span className="contact-link-icon"><GithubIcon size={14} /></span>
              <span>github.com/mathely27</span>
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com/in/mathely27" target="_blank" rel="noopener noreferrer" className="contact-link-row">
              <span className="contact-link-icon"><LinkedinIcon size={14} /></span>
              <span>linkedin.com/in/mathely27</span>
            </a>

            {/* LeetCode */}
            <a href="https://leetcode.com/mathely27" target="_blank" rel="noopener noreferrer" className="contact-link-row">
              <span className="contact-link-icon"><LeetCodeIcon size={14} /></span>
              <span>leetcode.com/mathely27</span>
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT: About + Stack */}
      <div className="contact-right">
        {/* About card */}
        <div className="about-card">
          <div className="about-card-label">ABOUT</div>
          <div className="about-card-tagline">Substance over wrappers.</div>
          <p className="about-card-body">
            I build high-performance local intelligence and native macOS utilities.
            Zero-latency local execution, clean architecture, and public code you can audit.
            Currently in my 2nd year of B.Tech Computer Science from India.
          </p>
        </div>

        {/* Stack grid card */}
        <div className="stack-card">
          <div className="stack-card-label">TOOLKIT & ARSENAL</div>
          <div className="stack-grid">
            {techCategories.map((cat, idx) => (
              <div key={idx} className="stack-group">
                <div className="stack-group-title">{cat.title}</div>
                <div className="stack-tags">
                  {cat.items.map((item) => (
                    <span key={item} className="stack-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
