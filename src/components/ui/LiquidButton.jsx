'use client';

import * as React from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function GlassFilter() {
  return (
    <svg className="hidden" style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="2" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export function LiquidButton({
  children,
  className = '',
  onClick,
  style = {},
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '14px 28px',
        fontFamily: "'Space Mono', monospace",
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#ffffff',
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        borderRadius: '9999px',
        cursor: 'pointer',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: pressed
          ? '0 2px 8px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(0, 0, 0, 0.4)'
          : hovered
          ? '0 12px 28px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 0 24px rgba(255, 255, 255, 0.15)'
          : '0 8px 20px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
        transform: pressed ? 'scale(0.97)' : hovered ? 'scale(1.04) translateY(-1px)' : 'scale(1)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
      {...props}
    >
      {/* Liquid Glass Highlight Rim */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%)',
          borderRadius: '9999px 9999px 0 0',
          pointerEvents: 'none',
        }}
      />

      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
      <GlassFilter />
    </button>
  );
}

export function MetalButton({
  children,
  onClick,
  className = '',
  style = {},
  ...props
}) {
  const [pressed, setPressed] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        borderRadius: '9999px',
        padding: '1.5px',
        background: 'linear-gradient(180deg, #52525b 0%, #18181b 100%)',
        boxShadow: hovered ? '0 10px 25px rgba(0, 0, 0, 0.6)' : '0 4px 12px rgba(0, 0, 0, 0.4)',
        transform: pressed ? 'translateY(1.5px) scale(0.98)' : 'translateY(0) scale(1)',
        transition: 'all 200ms cubic-bezier(0.1, 0.4, 0.2, 1)',
      }}
    >
      <button
        onClick={onClick}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setPressed(false);
        }}
        style={{
          position: 'relative',
          padding: '12px 26px',
          background: 'linear-gradient(180deg, #27272a 0%, #121215 100%)',
          border: 'none',
          borderRadius: '9999px',
          color: '#ffffff',
          fontFamily: "'Space Mono', monospace",
          fontSize: '11.5px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          outline: 'none',
          filter: hovered ? 'brightness(1.15)' : 'none',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.25)',
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default LiquidButton;

