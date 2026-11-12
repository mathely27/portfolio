import React from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * LineNav - one horizontal line, links spread far apart with theme switch.
 * Top hairline bar, monogram on the left, nav items and theme toggle on the right.
 */
export default function LineNav({ items = [], activeHref, onNavigate, theme = 'dark', onToggleTheme }) {
  const mono = "'Space Mono', monospace";
  const isLight = theme === 'light';

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(18px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      <div
        style={{
          width: '92%',
          maxWidth: '1160px',
          margin: '0 auto',
          height: 'clamp(54px, 13vw, 62px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Brand / monogram */}
        <a
          href="#about"
          aria-label="Mathely Mittal"
          onClick={(event) => onNavigate?.({ label: 'Mathely Mittal', href: '#about' }, 0, event)}
          style={{
            fontFamily: mono,
            fontSize: 'clamp(11.5px, 3.2vw, 13px)',
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: 'var(--text)',
            flexShrink: 0,
            transition: 'color 0.2s ease',
          }}
        >
          M/
        </a>

        {/* Links & Theme Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(16px, 5vw, 64px)',
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(14px, 4vw, 42px)',
            }}
          >
            {items.map((item, index) => {
              const isActive = item.href === activeHref;
              return (
                <a
                  key={`${item.label}-${index}`}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(event) => onNavigate?.(item, index, event)}
                  onMouseEnter={(event) => {
                    if (!isActive) event.currentTarget.style.color = 'var(--text)';
                  }}
                  onMouseLeave={(event) => {
                    if (!isActive) event.currentTarget.style.color = 'var(--text-3)';
                  }}
                  style={{
                    position: 'relative',
                    fontFamily: mono,
                    fontSize: 'clamp(9.5px, 2.8vw, 11.5px)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--text)' : 'var(--text-3)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: '-7px',
                      height: '1px',
                      width: '100%',
                      background: 'var(--text)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease',
                    }}
                  />
                </a>
              );
            })}
          </div>

          {/* Theme Toggle Button - Interactive Celestial Morph Animation */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} theme`}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} theme`}
              className="theme-toggle-btn"
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: isLight
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 243, 250, 0.9))'
                  : 'linear-gradient(135deg, #181c26, #10131a)',
                border: isLight
                  ? '1.5px solid rgba(220, 160, 50, 0.35)'
                  : '1.5px solid rgba(130, 160, 240, 0.25)',
                color: isLight ? '#f59e0b' : '#e2e8f0',
                cursor: 'pointer',
                flexShrink: 0,
                outline: 'none',
                overflow: 'hidden',
                boxShadow: isLight
                  ? '0 0 16px rgba(245, 158, 11, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.8)'
                  : '0 0 16px rgba(120, 160, 255, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.12)';
                e.currentTarget.style.boxShadow = isLight
                  ? '0 0 22px rgba(245, 158, 11, 0.45), inset 0 1px 2px rgba(255, 255, 255, 1)'
                  : '0 0 22px rgba(120, 160, 255, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = isLight
                  ? '0 0 16px rgba(245, 158, 11, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.8)'
                  : '0 0 16px rgba(120, 160, 255, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.08)';
              }}
            >
              {/* Sun Icon with Rays & Orbital Spring Entrance */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isLight
                    ? 'rotate(0deg) scale(1)'
                    : 'rotate(-90deg) scale(0.2)',
                  opacity: isLight ? 1 : 0,
                  transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease',
                  pointerEvents: 'none',
                }}
              >
                <Sun size={17} strokeWidth={2.4} />
              </div>

              {/* Moon Icon with Celestial Tilt & Stars Aura */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: !isLight
                    ? 'rotate(0deg) scale(1)'
                    : 'rotate(90deg) scale(0.2)',
                  opacity: !isLight ? 1 : 0,
                  transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease',
                  pointerEvents: 'none',
                }}
              >
                <Moon size={16} strokeWidth={2.2} />
              </div>

              {/* Subtle Ambient Ring Flash Ripple */}
              <span
                key={theme}
                style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  border: isLight ? '2px solid rgba(245, 158, 11, 0.6)' : '2px solid rgba(130, 160, 240, 0.6)',
                  animation: 'themeRipple 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  pointerEvents: 'none',
                }}
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
