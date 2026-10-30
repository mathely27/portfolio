/**
 * MATHELY MITTAL - CYBER CANVAS BACKGROUND ENGINE
 * Interactive high-performance particle constellation with mouse gravity & floating tech glyphs
 */

(function () {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;

  // Particle configuration
  const particles = [];
  const glyphs = [];
  const particleCount = window.innerWidth < 768 ? 45 : 95;
  const connectionDistance = 140;

  const techSymbols = [
    '01', '10', '{ }', '=>', '<dev/>', '0x7F', 'sys.lock()',
    '802.11', 'macOS', 'Ubuntu', 'Swift', 'React', 'DSA', 'airgeddon'
  ];

  // Mouse state
  const mouse = {
    x: null,
    y: null,
    radius: 170
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle class
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1.2;
      this.baseColor = Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(0, 255, 157, ';
      this.alpha = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off screen edges
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactive push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dirX = dx / dist;
          const dirY = dy / dist;
          this.x -= dirX * force * 3;
          this.y -= dirY * force * 3;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.baseColor + this.alpha + ')';
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.baseColor + '0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Floating Glyph class
  class FloatingGlyph {
    constructor() {
      this.reset();
    }

    reset() {
      this.text = techSymbols[Math.floor(Math.random() * techSymbols.length)];
      this.x = Math.random() * width;
      this.y = height + Math.random() * 50;
      this.speed = Math.random() * 0.6 + 0.3;
      this.alpha = Math.random() * 0.25 + 0.1;
      this.size = Math.random() * 6 + 11;
      this.color = Math.random() > 0.5 ? '#00f0ff' : '#9d4edd';
    }

    update() {
      this.y -= this.speed;
      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.font = `${this.size}px "JetBrains Mono", monospace`;
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fillText(this.text, this.x, this.y);
      ctx.globalAlpha = 1.0;
    }
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    particles.length = 0;
    glyphs.length = 0;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const glyphCount = window.innerWidth < 768 ? 10 : 22;
    for (let i = 0; i < glyphCount; i++) {
      const g = new FloatingGlyph();
      g.y = Math.random() * height; // initial scatter
      glyphs.push(g);
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw connection to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < connectionDistance * 1.2) {
          const alpha = (1 - dist / (connectionDistance * 1.2)) * 0.45;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 255, 157, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw glyphs
    for (let i = 0; i < glyphs.length; i++) {
      glyphs[i].update();
      glyphs[i].draw();
    }

    // Connect & draw particles
    drawConnections();
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  window.addEventListener('resize', () => {
    resize();
  });

  init();
  render();
})();
