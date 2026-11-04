import React from 'react';

/**
 * LineNav - one horizontal line, links spread far apart.
 * Top hairline bar, monogram on the left, nav items on the right.
 */
export default function LineNav({ items = [], activeHref, onNavigate }) {
  const mono = "'Space Mono', monospace";

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        background: 'rgba(5, 5, 5, 0.72)',
        backdropFilter: 'blur(18px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
            color: '#ffffff',
            flexShrink: 0,
          }}
        >
          M/
        </a>

        {/* Links - all in a single line, kept far apart */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(20px, 8vw, 120px)',
            minWidth: 0,
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
                  if (!isActive) event.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(event) => {
                  if (!isActive) event.currentTarget.style.color = '#8a8a93';
                }}
                style={{
                  position: 'relative',
                  fontFamily: mono,
                  fontSize: 'clamp(9.5px, 2.8vw, 11.5px)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive ? '#ffffff' : '#8a8a93',
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
                    background: '#ffffff',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
