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

          {/* Theme Toggle Button (Original Sleek Circular Button) */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} theme`}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} theme`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'var(--badge-bg)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(15deg) scale(1.08)';
                e.currentTarget.style.borderColor = 'var(--border2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              {isLight ? (
                <Moon size={15} strokeWidth={2.2} />
              ) : (
                <Sun size={15} strokeWidth={2.2} />
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
