import React, { useRef } from 'react';
import './AestheticThemeToggle.css';

/**
 * AestheticThemeToggle
 *
 * A tactile, high-end Apple/Vercel-inspired pill toggle:
 * - Frosted dynamic glass capsule with inner bevel & specular edge
 * - Floating sliding magnetic puck with spring physics
 * - Dynamic Sun & Moon celestial glyphs that smoothly morph, orbit & scale
 * - Star speckles inside Dark Mode capsule, soft warm cloud/rays inside Light Mode
 * - Haptic click-spring compression feedback
 */
export default function AestheticThemeToggle({ theme = 'dark', onToggle }) {
  const isDark = theme === 'dark';
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    // Slight tactile compression trigger
    if (buttonRef.current) {
      buttonRef.current.classList.add('att-pressed');
      setTimeout(() => {
        buttonRef.current?.classList.remove('att-pressed');
      }, 220);
    }
    onToggle?.(e);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      role="switch"
      aria-checked={!isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`att-pill ${isDark ? 'is-dark' : 'is-light'}`}
      onClick={handleClick}
    >
      {/* Background ambient sky track */}
      <span className="att-track">
        {/* Dark sky stars */}
        <span className="att-stars">
          <span className="att-star att-star--1" />
          <span className="att-star att-star--2" />
          <span className="att-star att-star--3" />
        </span>
        {/* Light sky glow & soft warm ray */}
        <span className="att-sky-glow" />
      </span>

      {/* Sliding Floating Glass Puck */}
      <span className="att-puck">
        {/* Inner specular reflection & soft rim */}
        <span className="att-puck__rim" />

        {/* Sun Icon (Light Mode) */}
        <span className="att-icon att-icon--sun" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.15" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </span>

        {/* Moon Icon (Dark Mode) */}
        <span className="att-icon att-icon--moon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.2" />
          </svg>
        </span>
      </span>
    </button>
  );
}
