import React, { useEffect, useRef, useState } from 'react';

/**
 * FluidGlass - Interactive 3D Liquid Glass Component
 * Inspired by React Bits (reactbits.dev/components/fluid-glass)
 * Monochrome Black & White / Grey edition.
 */
export default function FluidGlass({ word = 'WELCOME', onSkip }) {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // 4.5s countdown progress
  useEffect(() => {
    const start = Date.now();
    const duration = 4200;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let mouse = { x: w / 2, y: h / 2, targetX: w / 2, targetY: h / 2, vx: 0, vy: 0 };
    let time = 0;

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Offscreen canvas for crisp background typography
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');

    const updateOffscreen = () => {
      offCanvas.width = w;
      offCanvas.height = h;

      // Pure solid black
      offCtx.fillStyle = '#000000';
      offCtx.fillRect(0, 0, w, h);

      // Subtle monochrome radial highlight behind text
      const grad = offCtx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, Math.max(w, h) * 0.55);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      offCtx.fillStyle = grad;
      offCtx.fillRect(0, 0, w, h);

      // Render the single bold word in monochrome white
      const fontSize = Math.min(w * 0.16, 160);
      offCtx.font = `900 ${fontSize}px 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.letterSpacing = '-0.05em';

      offCtx.shadowColor = 'rgba(255, 255, 255, 0.35)';
      offCtx.shadowBlur = 24;
      offCtx.fillStyle = '#ffffff';
      offCtx.fillText(word, w / 2, h / 2);

      // Monochrome dot accent
      const metrics = offCtx.measureText(word);
      const dotX = w / 2 + metrics.width / 2 + fontSize * 0.06;
      const dotY = h / 2 + fontSize * 0.28;
      offCtx.beginPath();
      offCtx.arc(dotX, dotY, fontSize * 0.075, 0, Math.PI * 2);
      offCtx.fillStyle = '#ffffff';
      offCtx.shadowColor = 'rgba(255, 255, 255, 0.7)';
      offCtx.shadowBlur = 16;
      offCtx.fill();

      offCtx.shadowBlur = 0;
    };

    updateOffscreen();

    const render = () => {
      time += 0.024;

      const dx = mouse.targetX - mouse.x;
      const dy = mouse.targetY - mouse.y;
      mouse.vx = mouse.vx * 0.85 + dx * 0.06;
      mouse.vy = mouse.vy * 0.85 + dy * 0.06;
      mouse.x += mouse.vx;
      mouse.y += mouse.vy;

      const speed = Math.hypot(mouse.vx, mouse.vy);

      ctx.drawImage(offCanvas, 0, 0);

      const baseRadius = Math.min(w, h) * 0.17;
      const stretch = Math.min(speed * 0.015, 0.4);
      const angle = Math.atan2(mouse.vy, mouse.vx);

      const numPoints = 64;
      const points = [];
      for (let i = 0; i < numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        const wave1 = Math.sin(theta * 3 + time * 1.5) * 8;
        const wave2 = Math.cos(theta * 5 - time * 2.0) * 5;
        const wave3 = Math.sin(theta * 2 + time * 0.8) * 10;
        const dirDiff = Math.cos(theta - angle);
        const velocityMorph = dirDiff * stretch * baseRadius;

        const r = baseRadius + wave1 + wave2 + wave3 + velocityMorph;
        const px = mouse.x + Math.cos(theta) * r;
        const py = mouse.y + Math.sin(theta) * r;
        points.push({ x: px, y: py, r, theta });
      }

      // Draw glass refraction with clipping
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < numPoints; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const midX = (prev.x + curr.x) / 2;
        const midY = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
      }
      ctx.closePath();
      ctx.clip();

      const displaceX = (mouse.x - w / 2) * 0.18;
      const displaceY = (mouse.y - h / 2) * 0.18;
      const zoom = 1.18 + Math.sin(time) * 0.02;

      // Monochrome refraction
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.85;
      ctx.translate(mouse.x, mouse.y);
      ctx.scale(zoom, zoom);
      ctx.translate(-mouse.x - displaceX + 2, -mouse.y - displaceY + 1);
      ctx.drawImage(offCanvas, 0, 0);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.75;
      ctx.translate(mouse.x, mouse.y);
      ctx.scale(zoom * 0.99, zoom * 0.99);
      ctx.translate(-mouse.x - displaceX - 2, -mouse.y - displaceY - 1);
      ctx.drawImage(offCanvas, 0, 0);
      ctx.restore();

      // Monochrome frosted tint
      const glassGradient = ctx.createRadialGradient(
        mouse.x - baseRadius * 0.35,
        mouse.y - baseRadius * 0.35,
        10,
        mouse.x,
        mouse.y,
        baseRadius * 1.2
      );
      glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
      glassGradient.addColorStop(0.4, 'rgba(200, 200, 200, 0.08)');
      glassGradient.addColorStop(1, 'rgba(0, 0, 0, 0.55)');

      ctx.fillStyle = glassGradient;
      ctx.fillRect(mouse.x - baseRadius * 2, mouse.y - baseRadius * 2, baseRadius * 4, baseRadius * 4);
      ctx.restore();

      // Rim reflection & highlights
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < numPoints; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const midX = (prev.x + curr.x) / 2;
        const midY = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
      }
      ctx.closePath();

      const rimGrad = ctx.createLinearGradient(
        mouse.x - baseRadius,
        mouse.y - baseRadius,
        mouse.x + baseRadius,
        mouse.y + baseRadius
      );
      rimGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      rimGrad.addColorStop(0.5, 'rgba(180, 180, 180, 0.35)');
      rimGrad.addColorStop(1, 'rgba(255, 255, 255, 0.5)');

      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
      ctx.shadowBlur = 16;
      ctx.stroke();

      // Top-left specular crescent
      ctx.beginPath();
      const specX = mouse.x - baseRadius * 0.42;
      const specY = mouse.y - baseRadius * 0.42;
      const specR = baseRadius * 0.38;
      ctx.ellipse(specX, specY, specR, specR * 0.45, -Math.PI / 4, 0, Math.PI * 2);
      const specGrad = ctx.createRadialGradient(specX, specY, 2, specX, specY, specR);
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      specGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = specGrad;
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [word]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000000' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: 'default',
          zIndex: 10,
        }}
      />

      {/* Sleek Minimal Loading Indicator at the bottom */}
      <div
        style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {/* Progress bar line */}
        <div
          style={{
            width: '180px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#ffffff',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              transition: 'width 0.08s linear',
            }}
          />
        </div>

        {/* Loading status text */}
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            color: '#888888',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>INITIALIZING</span>
          <span style={{ color: '#ffffff', fontWeight: 700 }}>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
