/**
 * MATHELY MITTAL - MAIN APPLICATION CONTROLLER
 * Orchestrates 3D Card Physics, Typewriter Engine, OS Switcher, Touch ID Demo,
 * Sound Effects, Scroll Reveals & Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Cyber Cursor Movement
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');

  if (cursor && follower) {
    let mouseX = -100, mouseY = -100;
    let followerX = -100, followerY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    function renderFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderFollower);
    }
    renderFollower();

    // Hover effect on interactive elements
    const interactives = document.querySelectorAll('a, button, .bento-card, .project-card, .filter-btn, .os-tab-btn, input, textarea');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        follower.classList.add('cursor-follower-hover');
        if (window.cyberAudio) window.cyberAudio.playHover();
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        follower.classList.remove('cursor-follower-hover');
      });
      el.addEventListener('click', () => {
        if (window.cyberAudio) window.cyberAudio.playClick();
      });
    });
  }

  // 2. Audio SFX Mute Toggle
  const btnSfxToggle = document.getElementById('btn-sfx-toggle');
  if (btnSfxToggle) {
    if (localStorage.getItem('mm_audio_muted') === 'true') {
      btnSfxToggle.classList.add('sfx-muted');
      const text = btnSfxToggle.querySelector('.sfx-text');
      if (text) text.textContent = 'SFX: OFF';
    }

    btnSfxToggle.addEventListener('click', () => {
      const isUnmuted = window.cyberAudio.toggleMute();
      btnSfxToggle.classList.toggle('sfx-muted', !isUnmuted);
      const text = btnSfxToggle.querySelector('.sfx-text');
      if (text) text.textContent = isUnmuted ? 'SFX: ON' : 'SFX: OFF';
      if (isUnmuted) window.cyberAudio.playClick();
    });
  }

  // 3. Theme Switcher (Cyber -> Matrix -> Violet)
  const btnTheme = document.getElementById('btn-theme');
  const themes = ['default', 'matrix', 'violet'];
  let currentThemeIdx = 0;

  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      currentThemeIdx = (currentThemeIdx + 1) % themes.length;
      const selected = themes[currentThemeIdx];
      if (selected === 'default') {
        document.documentElement.removeAttribute('data-theme');
        btnTheme.innerHTML = '🎨';
      } else if (selected === 'matrix') {
        document.documentElement.setAttribute('data-theme', 'matrix');
        btnTheme.innerHTML = '🟩';
      } else {
        document.documentElement.setAttribute('data-theme', 'violet');
        btnTheme.innerHTML = '🔮';
      }
      showToast(`Theme switched to: ${selected.toUpperCase()}`);
    });
  }

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // 5. Dynamic Typewriter Effect in Hero
  const typewriterElement = document.getElementById('typewriter');
  const roles = [
    'Full-Stack Developer',
    'Native macOS & Systems Engineer',
    'Cybersecurity & Network Explorer',
    '2nd Year CS Undergrad & Relentless Builder',
    'LeetCode & DSA Practitioner'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeRole() {
    if (!typewriterElement) return;

    const currentRole = roles[roleIdx];
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingDelay = 50;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingDelay = 110;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingDelay = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingDelay = 400; // Pause before typing next
    }

    setTimeout(typeRole, typingDelay);
  }
  typeRole();

  // 6. 3D Card Physics Tilt
  const card3D = document.querySelector('.cyber-card-3d');
  if (card3D) {
    const cardGlare = card3D.querySelector('.card-glare');

    card3D.addEventListener('mousemove', (e) => {
      const rect = card3D.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card3D.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      if (cardGlare) {
        cardGlare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.18) 0%, transparent 60%)`;
      }
    });

    card3D.addEventListener('mouseleave', () => {
      card3D.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  }

  // 7. OS Switcher Widget in Bento Grid
  const osTabs = document.querySelectorAll('.os-tab-btn');
  const osTerminalView = document.getElementById('os-terminal-view');

  const osData = {
    macos: `
<span class="term-cyan">mathely@macbook-pro ~ %</span> sw_vers
ProductName:    macOS Sonoma 14.x
Build:          Swift 5.9, SwiftUI, Xcode 15
Focus:          Native App Architecture & LocalAuthentication
Status:         Active development on AppLocker (Touch ID protected)
`,
    linux: `
<span class="term-green">mathely@ubuntu-dev:~$</span> uname -a
Linux 6.8.0-generic x86_64 GNU/Linux
Packages:      airgeddon, aircrack-ng, wireshark, iptables
Research:      802.11 monitor mode, wireless frame analysis, rogue APs
Command:       sudo airgeddon --interface wlan0mon
`,
    windows: `
<span class="term-yellow">PS C:\\Users\\Mathely&gt;</span> wsl --status
Default Distribution: Ubuntu
WSL 2 active. Cross-platform engineering environment.
Tools: VS Code, Git CLI, Java JDK, Python 3.12, C/C++ Compiler
`
  };

  osTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      osTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const os = tab.getAttribute('data-os');
      if (osTerminalView && osData[os]) {
        osTerminalView.innerHTML = osData[os];
      }
    });
  });

  // 8. Projects Filter Engine
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 9. Interactive Touch ID Simulator Modal (AppLocker Demo)
  const touchIdModal = document.getElementById('touchid-modal');
  const btnOpenTouchId = document.getElementById('btn-open-touchid');
  const btnCloseTouchId = document.getElementById('btn-touchid-cancel');
  const fingerprintSensor = document.getElementById('fingerprint-sensor');
  const touchIdPromptText = document.getElementById('touchid-prompt-text');

  if (touchIdModal && btnOpenTouchId) {
    btnOpenTouchId.addEventListener('click', () => {
      touchIdModal.classList.add('active');
      touchIdPromptText.textContent = 'Touch the fingerprint sensor or enter your system password to unlock.';
      fingerprintSensor.classList.remove('active');
    });

    if (btnCloseTouchId) {
      btnCloseTouchId.addEventListener('click', () => {
        touchIdModal.classList.remove('active');
      });
    }

    touchIdModal.addEventListener('click', (e) => {
      if (e.target === touchIdModal) touchIdModal.classList.remove('active');
    });

    if (fingerprintSensor) {
      fingerprintSensor.addEventListener('click', () => {
        fingerprintSensor.classList.add('active');
        touchIdPromptText.textContent = 'Verifying biometrics with macOS LocalAuthentication...';

        setTimeout(() => {
          if (window.cyberAudio) window.cyberAudio.playSuccess();
          touchIdPromptText.innerHTML = '<span style="color: var(--accent-green); font-weight: 700;">✓ Biometric Verified! Application Unlocked.</span>';
          triggerConfetti();

          setTimeout(() => {
            touchIdModal.classList.remove('active');
          }, 1500);
        }, 800);
      });
    }
  }

  // 10. Scroll Reveal Animations (IntersectionObserver)
  const animatedElements = document.querySelectorAll('.bento-card, .project-card, .skill-category-card, .timeline-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        // Animate skill progress bars if inside
        const bars = entry.target.querySelectorAll('.skill-progress-fill');
        bars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          if (width) bar.style.width = width;
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // 11. Copy Email to Clipboard
  const quickCopy = document.getElementById('quick-copy-email');
  if (quickCopy) {
    quickCopy.addEventListener('click', () => {
      const email = 'mathelymittal@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email);
        if (window.cyberAudio) window.cyberAudio.playSuccess();
      });
    });
  }

  // 12. Contact Form Interactive Submit
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML = '⚡ Transmitting Message...';
      btn.disabled = true;

      setTimeout(() => {
        if (window.cyberAudio) window.cyberAudio.playSuccess();
        showToast('Message transmitted successfully to Mathely Mittal!');
        triggerConfetti();
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 1200);
    });
  }

  // 13. Dynamic IST Clock in Footer
  const istClock = document.getElementById('ist-clock');
  function updateClock() {
    if (!istClock) return;
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const timeStr = now.toLocaleTimeString('en-US', options);
    istClock.textContent = `NEW DELHI ${timeStr} IST // SYSTEM OPTIMAL`;
  }
  setInterval(updateClock, 1000);
  updateClock();
});

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById('cyber-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cyber-toast';
    toast.className = 'cyber-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Confetti Particle Burst Engine
window.triggerConfetti = function () {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiPieces = [];
  const colors = ['#00f0ff', '#00ff9d', '#9d4edd', '#ff007f', '#ffaa00', '#ffffff'];

  for (let i = 0; i < 90; i++) {
    confettiPieces.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.5) * 16 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      alpha: 1
    });
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    confettiPieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28; // gravity
      p.rotation += p.rotationSpeed;
      p.alpha -= 0.012;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive) {
      requestAnimationFrame(animateConfetti);
    } else {
      canvas.remove();
    }
  }
  animateConfetti();
};
