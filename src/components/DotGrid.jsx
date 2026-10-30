import React, { useEffect, useRef } from 'react';

/**
 * DotGrid Component (React Bits inspired)
 * https://reactbits.dev/backgrounds/dot-grid
 *
 * Springy jelly dot grid reacting to mouse physics and click shockwaves.
 */
export default function DotGrid({
  dotColor = '#27272a',
  activeColor = '#38bdf8',
  spacing = 26,
  dotRadius = 1.3,
  activeRadius = 2.4,
  spring = 0.08,
  damping = 0.88,
  mouseRadius = 130,
  mousePower = 25,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    let dots = [];
    const shockwaves = [];
    let mouse = { x: -9999, y: -9999, vx: 0, vy: 0, lastX: -9999, lastY: -9999 };

    function initDots() {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      dots = [];
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = offsetX + c * spacing;
          const by = offsetY + r * spacing;
          dots.push({
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
            highlight: 0,
          });
        }
      }
    }

    initDots();
    window.addEventListener('resize', initDots);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      mouse.vx = currentX - (mouse.lastX === -9999 ? currentX : mouse.lastX);
      mouse.vy = currentY - (mouse.lastY === -9999 ? currentY : mouse.lastY);
      mouse.x = currentX;
      mouse.y = currentY;
      mouse.lastX = currentX;
      mouse.lastY = currentY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.lastX = -9999;
      mouse.lastY = -9999;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: Math.min(width, height) * 0.45,
        speed: 14,
        strength: 22,
        decay: 0.94,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Decay mouse movement velocity
      mouse.vx *= 0.8;
      mouse.vy *= 0.8;

      // Update shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += sw.speed;
        sw.strength *= sw.decay;

        if (sw.radius >= sw.maxRadius || sw.strength < 0.2) {
          shockwaves.splice(s, 1);
        }
      }

      // Update and draw dots
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // 1. Mouse physics
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < mouseRadius && distToMouse > 0) {
          const force = (1 - distToMouse / mouseRadius) * mousePower;
          const angle = Math.atan2(dy, dx);
          // Push away plus slight drag in mouse movement direction
          d.vx += Math.cos(angle) * force * 0.2 + mouse.vx * 0.08;
          d.vy += Math.sin(angle) * force * 0.2 + mouse.vy * 0.08;
          d.highlight = Math.min(1, d.highlight + 0.35);
        }

        // 2. Shockwave physics
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const sdx = d.x - sw.x;
          const sdy = d.y - sw.y;
          const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
          const ringDist = Math.abs(sdist - sw.radius);

          if (ringDist < 45 && sdist > 0) {
            const waveForce = (1 - ringDist / 45) * sw.strength * 0.35;
            const sAngle = Math.atan2(sdy, sdx);
            d.vx += Math.cos(sAngle) * waveForce;
            d.vy += Math.sin(sAngle) * waveForce;
            d.highlight = Math.min(1, d.highlight + 0.5);
          }
        }

        // 3. Spring back to base position
        const fx = (d.baseX - d.x) * spring;
        const fy = (d.baseY - d.y) * spring;
        d.vx = (d.vx + fx) * damping;
        d.vy = (d.vy + fy) * damping;

        d.x += d.vx;
        d.y += d.vy;

        // Highlight decay
        d.highlight *= 0.93;

        // Render dot
        const currentRadius = dotRadius + d.highlight * (activeRadius - dotRadius);

        ctx.beginPath();
        ctx.arc(d.x, d.y, Math.max(0.6, currentRadius), 0, Math.PI * 2);

        if (d.highlight > 0.08) {
          ctx.fillStyle = activeColor;
          ctx.globalAlpha = Math.min(1, 0.4 + d.highlight * 0.6);
        } else {
          ctx.fillStyle = dotColor;
          ctx.globalAlpha = 0.45;
        }
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initDots);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, [dotColor, activeColor, spacing, dotRadius, activeRadius, spring, damping, mouseRadius, mousePower]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

