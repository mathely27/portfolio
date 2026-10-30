// Lightweight zero-dependency canvas confetti burst
export function triggerConfetti(originX = 0.5, originY = 0.6) {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = (canvas.width = window.innerWidth * dpr);
  const height = (canvas.height = window.innerHeight * dpr);

  const colors = ['#10b981', '#38bdf8', '#818cf8', '#f59e0b', '#ec4899', '#f4f4f5'];
  const particles = [];
  const count = 70;

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = (Math.random() * 8 + 4) * dpr;
    particles.push({
      x: originX * width,
      y: originY * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 5 * dpr,
      size: (Math.random() * 6 + 4) * dpr,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      gravity: 0.25 * dpr,
      drag: 0.98,
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, width, height);
    let alive = false;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.rotation += p.vRot;
      p.alpha -= 0.014;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      }
    }

    if (alive) {
      animationFrame = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(animationFrame);
      canvas.remove();
    }
  }

  animationFrame = requestAnimationFrame(update);
}

