import React from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../components/Icons';

export default function SlideHome({ onExploreProjects, onGoToContact }) {
  return (
    <div className="home-layout animate-slideIn">
      
      {/* ====================================================
          LEFT COLUMN: Bold Editorial Introduction
      ==================================================== */}
      <div className="home-left">
        <div>
          {/* Top metadata */}
          <div className="sidebar-header-meta">
            <span>INTRODUCTION</span>
            <span>INDIA 🇮🇳</span>
          </div>

          {/* Headline */}
          <h1 className="home-title" style={{ marginTop: '16px', marginBottom: '14px' }}>
            Student by day.<br />
            <span style={{ color: 'var(--accent-blue)' }}>Builder</span> by night.
          </h1>

          {/* Human bio */}
          <p className="home-desc">
            I'm <strong>Mathely Mittal</strong>, a 2nd year CS student from India who
            focuses on writing software that does real work — from native macOS biometric
            utilities to local LLM agents and full-stack web platforms.
          </p>

          {/* Action Buttons */}
          <div className="home-actions">
            <button onClick={onExploreProjects} className="btn-blue" style={{ padding: '12px 20px', fontSize: '13px' }}>
              <span>View Project Files</span>
              <ArrowRight size={15} />
            </button>

            <button onClick={onGoToContact} className="btn-outline" style={{ padding: '12px 20px', fontSize: '13px' }}>
              <Send size={13} style={{ color: 'var(--accent-blue)' }} />
              <span>Get in Touch</span>
            </button>
          </div>
        </div>

        {/* Social Badges */}
        <div className="home-social-row">
          <a
            href="https://github.com/mathely27"
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill-link"
          >
            <GithubIcon size={14} />
            <span>@mathely27</span>
          </a>
          <a
            href="https://linkedin.com/in/mathely27"
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill-link"
          >
            <LinkedinIcon size={14} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://leetcode.com/mathely27"
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill-link"
          >
            <LeetCodeIcon size={14} />
            <span>LeetCode</span>
          </a>
        </div>
      </div>

      {/* ====================================================
          RIGHT COLUMN: Double Card (Center Dark + Right Cream)
      ==================================================== */}
      <div className="home-right-card">
        
        {/* Dark visual side with angled paper card */}
        <div className="card-dark-section">
          <div className="card-dark-meta">
            <span>DEVELOPER CARD</span>
            <span>2026</span>
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

              {/* Card Headline */}
              <div className="paper-content">
                <div className="paper-headline" style={{ fontSize: '24px' }}>
                  Code that actually does something.
                </div>

                <div className="paper-ruled-lines">
                  <div className="paper-rule-line" style={{ width: '100%' }} />
                  <div className="paper-rule-line" style={{ width: '80%' }} />
                  <div className="paper-rule-line" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="card-dark-footer">
            BUILD / LEARN / ITERATE
          </div>
        </div>

        {/* Cream details side */}
        <div className="card-cream-section">
          <div>
            <div className="card-cream-top-meta">
              <span className="card-cream-tag">CREATOR PROFILE</span>
              <span className="card-cream-num">01</span>
            </div>

            <h3 className="card-cream-title" style={{ fontSize: '28px' }}>
              Mathely Mittal
            </h3>

            <p className="card-cream-desc" style={{ fontSize: '13.5px' }}>
              Currently in my 2nd year of B.Tech Computer Science. I focus heavily on writing
              clean, practical software: native macOS utilities in Swift, local LLM agents
              with Ollama, and full-stack React applications.
            </p>

            <div className="card-cream-role-block" style={{ fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>EDUCATION</span>
                <span style={{ fontWeight: 700 }}>2nd Year B.Tech CS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>CURRENT BUILD</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-blue)' }}>Berry AI Assistant</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>STATUS</span>
                <span style={{ fontWeight: 700, color: '#047857' }}>Open for Internships</span>
              </div>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(15,15,18,0.08)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
                PRIMARY STACK
              </div>
              <div className="card-cream-chips">
                {['Swift', 'Python', 'React', 'Ollama', 'Node.js', 'MongoDB'].map((tech) => (
                  <span key={tech} className="card-cream-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="card-cream-footer-note">
            Based in India · Open to remote &amp; on-site engineering roles
          </div>
        </div>

      </div>

    </div>
  );
}
