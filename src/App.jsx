import React, { useState, useEffect } from 'react';
import FluidGlass from './components/FluidGlass';
import LineNav from './components/LineNav';
import TextPressure from './components/TextPressure';
import BlurText from './components/BlurText';
import TechStackGrid from './components/TechStackGrid';
import ContributionGraphs from './components/ContributionGraphs';
import ProjectGrid from './components/ProjectGrid';
import ContactCard from './components/ContactCard';
import GlowCursor from './components/GlowCursor';
import { GithubIcon, LinkedinIcon, EmailIcon, LeetcodeIcon } from './components/Icons';
import { ArrowRight } from 'lucide-react';

/* ============================================================
   LANDING SCREEN WITH FLUID GLASS & LIQUID BUTTON
   ============================================================ */
function SplashScreen({ onEnter, fading, size }) {
  return (
    <div
      onClick={onEnter}
      title="Click anywhere to enter"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#000000',
        overflow: 'hidden',
        cursor: 'pointer',
        animation: fading ? 'portalSlideUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
      }}
    >
      <FluidGlass text="Mathely Mittal" size={size} />
    </div>
  );
}

/* ============================================================
   MAIN PORTFOLIO
   - TextPressure for MATHELY MITTAL (interactive variable font)
   - LineNav (single horizontal line, spread-out links)
   - ChromaGrid (React Bits) for Projects
   - TechStackGrid for Tech Stack (same format as GitHub README @mathely27)
   - LiquidButton for Landing Page
   - LabelOrbit cursor (tiny pastel word label with a 3D trail)
   - 100% Monochrome Black, White & Grey
   ============================================================ */
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'projects'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark';
    }
    return 'dark';
  });

  const [shockwave, setShockwave] = useState(null);

  const toggleTheme = (event) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Get origin coordinates from event button or default to top-right
    let x = window.innerWidth - 60;
    let y = 30;
    if (event?.clientX !== undefined && event?.clientY !== undefined) {
      x = event.clientX;
      y = event.clientY;
    }

    // Modern Chrome/Edge/Safari 18 View Transition API Circular Expand Animation
    if (typeof document !== 'undefined' && document.startViewTransition) {
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        setTheme(nextTheme);
        if (typeof window !== 'undefined') {
          localStorage.setItem('portfolio-theme', nextTheme);
        }
        document.documentElement.setAttribute('data-theme', nextTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
      return;
    }

    // Dynamic Shockwave Pulse Fallback
    const maxDim = Math.max(window.innerWidth, window.innerHeight) * 2.8;
    setShockwave({
      x,
      y,
      size: maxDim,
      color: nextTheme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(14, 16, 21, 0.95)',
      active: false,
    });

    requestAnimationFrame(() => {
      setShockwave((prev) => (prev ? { ...prev, active: true } : null));
      setTimeout(() => {
        setTheme(nextTheme);
        if (typeof window !== 'undefined') {
          localStorage.setItem('portfolio-theme', nextTheme);
        }
        document.documentElement.setAttribute('data-theme', nextTheme);
        setTimeout(() => setShockwave(null), 400);
      }, 350);
    });
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const handleScroll = (e) => {
    const el = e.currentTarget;
    const activityEl = document.getElementById('activity');
    const projectsEl = document.getElementById('projects');
    const connectEl = document.getElementById('connect');
    const mid = el.scrollTop + el.clientHeight * 0.5;
    if (connectEl && mid >= connectEl.offsetTop) {
      setActiveTab('connect');
    } else if (projectsEl && mid >= projectsEl.offsetTop) {
      setActiveTab('projects');
    } else if (activityEl && mid >= activityEl.offsetTop) {
      setActiveTab('activity');
    } else {
      setActiveTab('about');
    }
  };

  const handleScrollIntented = (e) => {
    const el = e.currentTarget;
    const aboutEl = document.getElementById('about');
    const projectsEl = document.getElementById('projects');
    const connectEl = document.getElementById('connect');
    if (!aboutEl || !projectsEl || !connectEl) return;
    const mid = el.scrollTop + el.clientHeight * 0.5;
    if (mid >= connectEl.offsetTop) {
      setActiveTab('projects');
    } else if (mid >= projectsEl.offsetTop) {
      setActiveTab('projects');
    } else {
      setActiveTab('about');
    }
  };

  const triggerEnter = () => {
    if (splashFading || !showSplash) return;
    setSplashFading(true);
    setTimeout(() => setShowSplash(false), 800);
  };

  // Determine FluidGlass size based on viewport width
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const glassSize = isMobile ? 180 : 260;

  // Re-evaluate size on resize (orientation change)
  useEffect(() => {
    if (!showSplash) return;
    const handleResize = () => {
      // Size is read inline during render; no state needed
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showSplash]);

  // Enter on scroll (wheel / touch) while the landing screen is visible
  useEffect(() => {
    if (!showSplash) return;
    const handleScrollIntent = () => triggerEnter();
    window.addEventListener('wheel', handleScrollIntent, { passive: true });
    window.addEventListener('touchmove', handleScrollIntent, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleScrollIntent);
      window.removeEventListener('touchmove', handleScrollIntent);
    };
  }, [showSplash, splashFading]);

  return (
    <div
      style={{
        width: '100%',
        height: 'var(--app-h)',
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        background: 'var(--bg-gradient, var(--bg))',
        color: 'var(--text)',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'background 0.35s ease, color 0.35s ease',
      }}
      onScroll={handleScroll}
    >
      {/* 1. Cinematic Landing Screen */}
      {showSplash && (
        <SplashScreen
          fading={splashFading}
          onEnter={triggerEnter}
          size={glassSize}
        />
      )}

      {/* Full-viewport Shockwave Ripple Overlay (Fallback) */}
      {shockwave && (
        <div
          className={`theme-shockwave-overlay ${shockwave.active ? 'active' : ''}`}
          style={{
            left: `${shockwave.x}px`,
            top: `${shockwave.y}px`,
            width: `${shockwave.size}px`,
            height: `${shockwave.size}px`,
            background: shockwave.color,
          }}
        />
      )}

      {!showSplash && (
        <GlowCursor
          color={theme === 'light' ? '#4f6ef7' : '#d4d4d8'}
          intensity={0.8}
          trailWidth={2}
          linger={1.2}
          glow={0.6}
          hotspot={0.5}
          followSpeed={0.8}
          grain={0.1}
          clickBurst
          theme={theme}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}
        />
      )}

      {/* 3. Single-line horizontal navbar with widely spaced links & theme toggle */}
      <LineNav
        items={[
          { label: 'About & Stack', href: '#about' },
          { label: 'Activity', href: '#activity' },
          { label: 'Projects', href: '#projects' },
          { label: 'Connect', href: '#connect', style: { cursor: 'pointer' } },
        ]}
        activeHref={activeTab === 'about' ? '#about' : activeTab === 'activity' ? '#activity' : activeTab === 'projects' ? '#projects' : '#connect'}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={(item, index, event) => {
          event?.preventDefault?.();
          const id = (item.href || '').replace('#', '');
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveTab(id);
        }}
      />

      {/* 4. Main Stage Content */}
      <main
        style={{
          width: '92%',
          maxWidth: '1160px',
          minHeight: 'calc(var(--app-h) - 120px)',
          paddingTop: 'calc(78px + env(safe-area-inset-top, 0px))',
          paddingBottom: '20px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation:
            showSplash && !splashFading
              ? 'none'
              : 'mainStageEnter 0.85s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      >
        {/* ====================================================
            VIEW 1: PARALLEL ABOUT (LEFT) + TECH STACK GRID (RIGHT)
        ==================================================== */}
        <section
          id="about"
          style={{
            width: '100%',
            minHeight: 'calc(var(--app-h) - 130px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(26px, 4vw, 40px)',
            flexWrap: 'wrap',
            padding: 'clamp(14px, 3vw, 24px) 0',
          }}
        >
            {/* LEFT COLUMN: Mathely Mittal with TextPressure */}
            <div
              style={{
                flex: '1 1 480px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                animation: 'slideInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    background: 'var(--badge-bg)',
                    border: '1px solid var(--border)',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '11px',
                    color: 'var(--text-2)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: theme === 'light' ? '#10b981' : '#ffffff',
                      boxShadow: theme === 'light' ? '0 0 8px #10b981' : '0 0 8px #ffffff',
                    }}
                  />
                  <span>Open to Internships</span>
                </div>
              </div>

              {/* TextPressure Component for MATHELY MITTAL */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '500px',
                  height: 'clamp(52px, 13vw, 75px)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <TextPressure
                  text="MATHELY MITTAL"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  radius={0.45}
                  smoothing={0.45}
                  idle="wave"
                  idleSpeed={0.8}
                  clickRipple={true}
                  textColor={theme === 'light' ? '#0f172a' : '#ffffff'}
                  minFontSize={22}
                />
              </div>

              {/* Concise Intro with BlurText */}
              <div
                style={{
                  fontSize: 'clamp(14px, 3.6vw, 17.5px)',
                  fontWeight: 400,
                  color: 'var(--text-2)',
                  lineHeight: 1.65,
                  maxWidth: '520px',
                }}
              >
                <BlurText
                  text="Student by day, builder by night. 2nd year CS student writing software that does real work — native macOS utilities, local AI agents, and full-stack platforms."
                  delay={35}
                  animateBy="words"
                />
              </div>

              {/* Quick Actions & Verified GitHub Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flexWrap: 'wrap',
                  marginTop: '6px',
                }}
              >
                <button
                  onClick={() => {
                    setActiveTab('projects');
                    document
                      .getElementById('projects')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '11px 22px',
                    background: theme === 'light' ? '#0f172a' : '#ffffff',
                    color: theme === 'light' ? '#ffffff' : '#000000',
                    fontWeight: 600,
                    fontSize: '13px',
                    borderRadius: '9999px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <span>View Projects</span>
                  <ArrowRight size={14} />
                </button>

                <a
                  href="https://github.com/mathely27"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '11px 18px',
                    background: 'var(--btn-secondary-bg)',
                    color: 'var(--text)',
                    fontSize: '13px',
                    fontWeight: 500,
                    borderRadius: '9999px',
                    border: '1px solid var(--border)',
                    boxShadow: theme === 'light' ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/mathely-mittal-b284143b9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '11px 18px',
                    background: 'var(--btn-secondary-bg)',
                    color: 'var(--text)',
                    fontSize: '13px',
                    fontWeight: 500,
                    borderRadius: '9999px',
                    border: '1px solid var(--border)',
                    boxShadow: theme === 'light' ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Tech Stack grid (GitHub README format) */}
            <div
              style={{
                flex: '1 1 440px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'scaleInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
                overflow: 'hidden',
              }}
            >
              <TechStackGrid />
            </div>
        </section>

        {/* ====================================================
            VIEW 1.5: GITHUB & LEETCODE ACTIVITY GRAPHS (SVG)
        ==================================================== */}
        <ContributionGraphs theme={theme} />

        {/* ====================================================
            VIEW 2: PROJECTS WITH REACT BITS <ChromaGrid />
        ==================================================== */}
        <section
          id="projects"
          style={{
            width: '100%',
            minHeight: 'calc(var(--app-h) - 130px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'clamp(60px, 8vw, 110px)',
            paddingTop: 'clamp(20px, 4vw, 40px)',
            paddingBottom: 'clamp(32px, 7vw, 60px)',
          }}
        >
            <div
              style={{
                width: '100%',
                maxWidth: '1040px',
                fontFamily: "'Space Mono', monospace",
                fontSize: 'clamp(18px, 4vw, 28px)',
                color: 'var(--text)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '28px',
                textAlign: 'left',
                fontWeight: 700,
                transition: 'color 0.3s ease',
              }}
            >
              Projects
            </div>

            <ProjectGrid theme={theme} />

            <ContactCard
              linkedinUrl="https://www.linkedin.com/in/mathely-mittal-b284143b9/"
              emailAddress="mathely27@gmail.com"
              githubUrl="https://github.com/mathely27"
            />
        </section>
      </main>
    </div>
  );
}
