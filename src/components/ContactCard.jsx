import React from 'react';
import { LinkedInIcon, EmailIcon, LeetcodeIcon, GitHubIcon } from './Icons';
import './ContactCard.css';

export default function ContactCard({ linkedinUrl, emailAddress }) {
  return (
    <section
      id="connect"
      style={{
        width: '100%',
        maxWidth: '1040px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '48px',
        paddingBottom: '64px',
      }}
    >
      <div
        style={{
          width: '100%',
          fontFamily: "'Space Mono', monospace",
          fontSize: 'clamp(18px, 4vw, 28px)',
          color: '#ffffff',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '32px',
          textAlign: 'center',
          fontWeight: 700,
        }}
      >
        Connect
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '22px',
          width: '100%',
        }}
      >
        {[
          {
            label: 'LinkedIn',
            href: linkedinUrl,
            icon: LinkedInIcon,
            color: '#0a66c2',
          },
          {
            label: 'Message by Email',
            href: `mailto:${emailAddress}`,
            icon: EmailIcon,
            color: '#34d399',
          },
          {
            label: 'LeetCode',
            href: `https://leetcode.com/mathely27`,
            icon: LeetcodeIcon,
            color: '#f59e0b',
          },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              padding: '22px 18px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              transition: 'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.borderColor = `rgba(255,255,255,0.18)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: `radial-gradient(circle at 50% 50%, ${item.color}44, transparent 70%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <item.icon size={32} style={{ color: item.color, strokeWidth: 1.8 }} />
              </div>

              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: item.color,
                }}
              >
                {item.label}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
