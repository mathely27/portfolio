import React from 'react';
import { LinkedinIcon, EmailIcon, LeetcodeIcon, GithubIcon } from './Icons';
import './ContactCard.css';

export default function ContactCard({
  linkedinUrl,
  emailAddress,
  githubUrl,
  shorturl
}) {  return (
    <section
      id="connect"
      style={{
        width: '100%',
        maxWidth: '1040px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '56px',
        paddingBottom: '72px',
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
          marginBottom: '40px',
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
          gap: '28px',
          width: '100%',
        }}
      >
        {[
          {
            href: linkedinUrl,
            label: 'LinkedIn',
            icon: LinkedinIcon,
            desc: 'Work, projects & updates',
          },
          {
            href: `mailto:${emailAddress}`,
            label: 'Message by Email',
            icon: EmailIcon,
            desc: `Reach me at ${emailAddress}`,
          },
          {
            href: `https://leetcode.com/${shorturl || 'mathely27'}`,
            label: 'LeetCode',
            icon: LeetcodeIcon,
            desc: 'Coding & interview prep',
          },
          {
            href: githubUrl,
            label: 'GitHub',
            icon: GithubIcon,
            desc: 'Code, repos & contributions',
          },
        ].map((item, index) => (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'relative',
              display: 'block',
              padding: '18px 18px',
              background: 'linear-gradient(145deg, #17171a, #111113)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '14px',
              color: '#e5e5ea',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease',
              boxShadow: '0 10px 24px -14px rgba(0, 0, 0, 0.8)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(-3px)';
              el.style.borderColor = 'rgba(255, 255, 255, 0.18)';
              el.style.background = 'linear-gradient(145deg, #1c1c1f, #141416)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(0)';
              el.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              el.style.background = 'linear-gradient(145deg, #17171a, #111113)';
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <item.icon
                  size={18}
                  className="contact-card-icon"
                  style={{
                    display: 'inline-block',
                    color: '#94a3b8',
                    width: '18px',
                    height: '18px',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </span>
              </div>

              {/* cat */}
              <img
                src="https://media.giphy.com/media/3o6Zt6M8t5q4qjQJ5O/giphy.gif"
                alt="cat"
                width={92}
                height={92}
                style={{
                  width: '92px',
                  height: '92px',
                  borderRadius: '10px',
                  opacity: 0.95,
                  display: 'block',
                }}
              />
            </div>

            <div
              style={{
                marginTop: '8px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '11.5px',
                lineHeight: '1.4',
                color: '#a1a1aa',
                letterSpacing: '0.02em',
              }}
            >
              {item.desc}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
