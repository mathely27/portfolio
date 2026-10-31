import { useEffect, useRef } from 'react';

/**
 * Ribbons Cursor Animation
 * Inspired by React Bits (reactbits.dev/animations/ribbons)
 * Monochrome Edition (Black, White, Grey)
 */
export default function Ribbons({
  colors = [
    'rgba(255, 255, 255, 0.35)',
    'rgba(220, 220, 220, 0.25)',
    'rgba(160, 160, 160, 0.18)',
    'rgba(100, 100, 100, 0.12)',
  ],
  pointCount = 28,
  maxWidth = 32,
  spring = 0.08,
  friction = 0.82,
  shape = 'comet',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animId;
    let mouse = { x: w / 2, y: h / 2, moved: false };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const ribbons = colors.map((color, index) => {
      const points = [];
      for (let i = 0; i < pointCount; i++) {
        points.push({ x: mouse.x, y: mouse.y, vx: 0, vy: 0 });
      }
      return {
        color,
        points,
        lag: 1 + index * 0.15,
        offset: (index - (colors.length - 1) / 2) * 2,
      };
    });

    const getWidth = (t) => {
      if (shape === 'lens') return Math.sin(t * Math.PI) * maxWidth;
      if (shape === 'even') return maxWidth * 0.6;
      return Math.pow(1 - t, 1.2) * maxWidth;
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      if (!mouse.moved) {
        animId = requestAnimationFrame(animate);
        return;
      }

      ribbons.forEach((ribbon) => {
        const pts = ribbon.points;
        const targetX = mouse.x + ribbon.offset;
        const targetY = mouse.y + ribbon.offset;

        const effectiveSpring = spring / ribbon.lag;
        pts[0].vx += (targetX - pts[0].x) * effectiveSpring;
        pts[0].vy += (targetY - pts[0].y) * effectiveSpring;
        pts[0].vx *= friction;
        pts[0].vy *= friction;
        pts[0].x += pts[0].vx;
        pts[0].y += pts[0].vy;

        for (let i = 1; i < pts.length; i++) {
          const prev = pts[i - 1];
          pts[i].vx += (prev.x - pts[i].x) * effectiveSpring;
          pts[i].vy += (prev.y - pts[i].y) * effectiveSpring;
          pts[i].vx *= friction;
          pts[i].vy *= friction;
          pts[i].x += pts[i].vx;
          pts[i].y += pts[i].vy;
        }

        if (pts.length < 3) return;

        const left = [];
        const right = [];

        for (let i = 0; i < pts.length; i++) {
          let dx, dy;
          if (i === 0) {
            dx = pts[1].x - pts[0].x;
            dy = pts[1].y - pts[0].y;
          } else if (i === pts.length - 1) {
            dx = pts[i].x - pts[i - 1].x;
            dy = pts[i].y - pts[i - 1].y;
          } else {
            dx = pts[i + 1].x - pts[i - 1].x;
            dy = pts[i + 1].y - pts[i - 1].y;
          }

          const len = Math.hypot(dx, dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const t = i / (pts.length - 1);
          const halfW = getWidth(t) / 2;

          left.push({ x: pts[i].x + nx * halfW, y: pts[i].y + ny * halfW });
          right.push({ x: pts[i].x - nx * halfW, y: pts[i].y - ny * halfW });
        }

        ctx.beginPath();
        ctx.moveTo(left[0].x, left[0].y);
        for (let i = 1; i < left.length; i++) {
          const mx = (left[i - 1].x + left[i].x) / 2;
          const my = (left[i - 1].y + left[i].y) / 2;
          ctx.quadraticCurveTo(left[i - 1].x, left[i - 1].y, mx, my);
        }
        ctx.lineTo(left[left.length - 1].x, left[left.length - 1].y);

        for (let i = right.length - 1; i >= 0; i--) {
          if (i === right.length - 1) {
            ctx.lineTo(right[i].x, right[i].y);
          } else {
            const next = right[i + 1];
            const mx = (next.x + right[i].x) / 2;
            const my = (next.y + right[i].y) / 2;
            ctx.quadraticCurveTo(next.x, next.y, mx, my);
          }
        }
        ctx.closePath();

        ctx.fillStyle = ribbon.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [colors, pointCount, maxWidth, spring, friction, shape]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}
