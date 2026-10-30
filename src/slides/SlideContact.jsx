import React, { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export default function SlideContact() {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:mathely27@gmail.com?subject=${subject}&body=${body}`;

    setFormSent(true);
    triggerConfetti(0.7, 0.4);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="contact-layout animate-slideIn">
      
      {/* ====================================================
          LEFT COLUMN: Stack & Arsenal
      ==================================================== */}
      <div className="contact-left">
        <div>
          <div className="sidebar-header-meta">
            <span>TOOLKIT &amp; ARSENAL</span>
            <span>INDEX / 03</span>
          </div>

          <h2 className="sidebar-title">
            Tech stack<span className="sidebar-title-dot">.</span>
          </h2>

          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Technologies and frameworks I build software with on a regular basis.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(15,15,18,0.1)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
                LANGUAGES &amp; RUNTIMES
              </div>
              <div className="card-cream-chips">
                {['Python', 'Swift', 'JavaScript', 'TypeScript', 'Java', 'C Lang', 'SQL'].map((t) => (
                  <span key={t} className="card-cream-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(15,15,18,0.1)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
                FRAMEWORKS &amp; SYSTEMS
              </div>
              <div className="card-cream-chips">
                {['React', 'SwiftUI', 'Node.js', 'Express', 'MongoDB', 'Supabase', 'PySide6'].map((t) => (
                  <span key={t} className="card-cream-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(15,15,18,0.1)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
                AI AGENTS &amp; TOOLS
              </div>
              <div className="card-cream-chips">
                {['Ollama', 'Qwen3 Local', 'Pydantic-AI', 'Git & GitHub', 'Linux', 'VS Code'].map((t) => (
                  <span key={t} className="card-cream-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-hint">
          Always curious, always learning new architectures.
        </div>
      </div>

      {/* ====================================================
          RIGHT COLUMN: Double Card (Center Dark + Right Cream Contact)
      ==================================================== */}
      <div className="contact-right-card">
        
        {/* Dark visual side with angled paper card */}
        <div className="card-dark-section">
          <div className="card-dark-meta">
            <span>INQUIRY</span>
            <span>2026/27</span>
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
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '6px' }}>
                  ● DIRECT LINE
                </div>
                <div className="paper-headline" style={{ fontSize: '24px' }}>
                  Let's build something real.
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                  mathely27@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="card-dark-footer">
            REACH OUT / COLLABORATE
          </div>
        </div>

        {/* Cream Contact Form side */}
        <div className="card-cream-section">
          <div>
            <div className="card-cream-top-meta">
              <span className="card-cream-tag">TRANSMISSION</span>
              <span className="card-cream-num">03</span>
            </div>

            <h3 className="card-cream-title" style={{ fontSize: '28px' }}>
              Get In Touch
            </h3>

            <p className="card-cream-desc" style={{ fontSize: '13.5px' }}>
              Open to engineering internship roles, project collaborations, or tech discussions.
            </p>

            {/* Direct Email Click-to-Copy */}
            <div
              onClick={() => {
                navigator.clipboard.writeText('mathely27@gmail.com');
                triggerConfetti(0.7, 0.4);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(15,15,18,0.12)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                margin: '12px 0',
              }}
              title="Click to copy email address"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} style={{ color: 'var(--accent-blue)' }} />
                <span style={{ fontWeight: 700 }}>mathely27@gmail.com</span>
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>click to copy</span>
            </div>

            {/* Clean Form */}
            <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(15,15,18,0.15)',
                    background: 'rgba(255,255,255,0.9)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    outline: 'none',
                  }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(15,15,18,0.15)',
                    background: 'rgba(255,255,255,0.9)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    outline: 'none',
                  }}
                />
              </div>

              <textarea
                placeholder="Message (e.g. Internship opportunity, chat about projects...)"
                rows={2}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(15,15,18,0.15)',
                  background: 'rgba(255,255,255,0.9)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  outline: 'none',
                  resize: 'none',
                }}
              />

              <button
                type="submit"
                disabled={formSent}
                className="btn-blue"
                style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
              >
                {formSent ? (
                  <>
                    <Check size={14} />
                    <span>Opening Mail Client...</span>
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Send Message to Mathely</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', paddingTop: '10px', borderTop: '1px solid rgba(15,15,18,0.08)' }}>
            <a href="https://github.com/mathely27" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dark)' }}>GitHub</a>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <a href="https://linkedin.com/in/mathely27" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dark)' }}>LinkedIn</a>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <a href="https://leetcode.com/mathely27" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dark)' }}>LeetCode</a>
          </div>
        </div>

      </div>

    </div>
  );
}
