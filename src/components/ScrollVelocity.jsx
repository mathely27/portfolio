'use client';

import React, { useEffect, useRef, useState } from 'react';
import './ScrollVelocity.css';

function VelocityText({
  children,
  baseVelocity = 100,
  numCopies = 6,
  separator = '·',
  gap = 24,
  fontSize,
  fontWeight,
  color,
  draggable = true,
  skewWithVelocity = 8,
}) {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let animId;
    let pos = 0;
    let lastTime = performance.now();
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let drag = { active: false, startX: 0, lastX: 0, velocity: 0 };

    const onScroll = () => {
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      scrollVelocity = dy * 2.5;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const animate = (now) => {
      const dt = Math.min(now - lastTime, 64) / 1000;
      lastTime = now;

      // Decay scroll velocity
      scrollVelocity *= 0.92;

      let speed = baseVelocity + scrollVelocity;
      if (!drag.active) {
        pos += speed * dt;
      }

      const scroller = scrollerRef.current;
      if (scroller) {
        const fullW = scroller.scrollWidth / 2 || 1000;
        const normalizedX = -((pos % fullW + fullW) % fullW);
        const skew = Math.max(-15, Math.min(15, (speed / 100) * skewWithVelocity));
        scroller.style.transform = `translate3d(${normalizedX}px, 0, 0) skewX(${skew}deg)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
    };
  }, [baseVelocity, skewWithVelocity]);

  const spans = [];
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', paddingRight: `${gap}px` }}>
        {children}&nbsp;
        {separator ? (
          <span style={{ opacity: 0.35, padding: '0 8px' }}>{separator}</span>
        ) : null}
      </span>
    );
  }

  const typeStyle = {
    fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
    fontWeight,
    color,
  };

  return (
    <div ref={containerRef} className="parallax" style={{ width: '100%', overflow: 'hidden' }}>
      <div ref={scrollerRef} className="scroller" style={typeStyle}>
        {spans}
      </div>
    </div>
  );
}

export function ScrollVelocity({
  texts = [],
  velocity = 60,
  className = '',
  numCopies = 8,
  separator = '·',
  fontSize = 32,
  fontWeight = 800,
  color = 'rgba(255, 255, 255, 0.4)',
  skewWithVelocity = 6,
  gap = 20,
}) {
  return (
    <section style={{ width: '100%', padding: '16px 0', overflow: 'hidden' }} className={className}>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          numCopies={numCopies}
          separator={separator}
          fontSize={fontSize}
          fontWeight={fontWeight}
          color={color}
          gap={gap}
          skewWithVelocity={skewWithVelocity}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
}

export default ScrollVelocity;

