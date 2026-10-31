import React, { useEffect, useRef } from 'react';

/**
 * SmoothCursor - Ultra-thin, sleek trailing cursor with 3-second inactivity fade
 */
export default function SmoothCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let mouseX = -100;
    let mouseY = -100;
    let currX = -100;
    let currY = -100;
    let lastMoveTime = Date.now();
    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveTime = Date.now();
      if (el) {
        el.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Smooth lerp follow
      currX += (mouseX - currX) * 0.2;
      currY += (mouseY - currY) * 0.2;

      if (el) {
        el.style.transform = `translate3d(${currX - 12}px, ${currY - 12}px, 0)`;

        // Inactivity fade: after 1.5s of standing still, smoothly fade out by 3s
        const idleDuration = Date.now() - lastMoveTime;
        if (idleDuration > 1200) {
          const fadeProgress = Math.min(1, (idleDuration - 1200) / 1800);
          el.style.opacity = String(Math.max(0, 1 - fadeProgress));
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform, opacity',
        transition: 'opacity 0.2s ease',
      }}
    >
      {/* Tiny center dot */}
      <div
        style={{
          width: '2px',
          height: '2px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.75)',
        }}
      />
    </div>
  );
}

