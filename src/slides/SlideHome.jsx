import React from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../components/Icons';

export default function SlideHome({ onExploreProjects, onGoToContact }) {
  const stack = ['Swift', 'Python', 'React', 'Ollama', 'Pydantic-AI', 'SwiftUI', 'Node.js', 'MongoDB'];

  return (
    <div className="home-layout">
      {/* LEFT: Hero intro */}
      <div className="home-left">
        <div>
          <div className="home-eyebrow">
            <span className="home-eyebrow-line" />
            <span>DEVELOPER FROM INDIA</span>
          </div>

          <h1 className="home-title">
            Student by day.
            <br />
            <span className="home-title-accent">Builder</span> by night.
          </h1>

          <p className="home-subtitle">
            I'm Mathely Mittal — 2nd year CS student writing software that does real work.
            Native macOS utilities, local LLM agents, and full-stack web platforms.
          </p>

          <div className="home-actions">
            <button onClick={onExploreProjects} className="btn-primary">
              <span>View Projects</span>
              <ArrowRight size={14} />
            </button>
            <button onClick={onGoToContact} className="btn-ghost">
              <Send size={13} />
              <span>Get in Touch</span>
            </button>
          </div>
        </div>

        <div className="home-social-row">
          <a href="https://github.com/mathely27" target="_blank" rel="noopener noreferrer" className="social-pill-link">
            <GithubIcon size={13} />
            <span>@mathely27</span>
          </a>
          <a href="https://linkedin.com/in/mathely27" target="_blank" rel="noopener noreferrer" className="social-pill-link">
            <LinkedinIcon size={13} />
            <span>LinkedIn</span>
          </a>
          <a href="https://leetcode.com/mathely27" target="_blank" rel="noopener noreferrer" className="social-pill-link">
            <LeetCodeIcon size={13} />
            <span>LeetCode</span>
          </a>
        </div>
      </div>

      {/* RIGHT: Info cards + marquee */}
      <div className="home-right">
        {/* Profile card */}
        <div className="info-card">
          <div className="info-card-label">PROFILE</div>
          <div className="info-card-row">
            <span className="info-card-row-label">EDUCATION</span>
            <span className="info-card-row-val">2nd Year B.Tech CS</span>
          </div>
          <div className="info-card-row">
            <span className="info-card-row-label">CURRENT BUILD</span>
            <span className="info-card-row-val info-card-val-accent">Berry AI Assistant</span>
          </div>
          <div className="info-card-row">
            <span className="info-card-row-label">STATUS</span>
            <span className="info-card-row-val info-card-val-green">Open for Internships</span>
          </div>
          <div className="info-card-row">
            <span className="info-card-row-label">LOCATION</span>
            <span className="info-card-row-val">India (IST)</span>
          </div>
        </div>

        {/* Marquee tech strip */}
        <div className="marquee-strip">
          <div className="marquee-track">
            {[...stack, ...stack].map((t, i) => (
              <span className="marquee-item" key={i}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
