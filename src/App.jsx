import React, { useState, useEffect } from 'react';
import FluidGlass from './components/FluidGlass';
import LineNav from './components/LineNav';
import TextPressure from './components/TextPressure';
import BlurText from './components/BlurText';
import TechStackGrid from './components/TechStackGrid';
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

  const handleScroll = (e) => {
    const el = e.currentTarget;
    const projectsEl = document.getElementById('projects');
    if (!projectsEl) return;
    const mid = el.scrollTop + el.clientHeight * 0.5;
    setActiveTab(mid >= projectsEl.offsetTop ? 'projects' : 'about');
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
        background: '#050505',
        color: '#ffffff',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

      {!showSplash && (
        <GlowCursor
          color="#d4d4d8"
          intensity={0.8}
          trailWidth={2}
          linger={1.2}
          glow={0.6}
          hotspot={0.5}
          followSpeed={0.8}
          grain={0.1}
          clickBurst
          theme="dark"
          style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}
        />        )}

      {/* 3. Single-line horizontal navbar with widely spaced links */}
      <LineNav
        items={[
          { label: 'About & Stack', href: '#about' },
          { label: 'Projects', href: '#projects' },
          { label: 'Connect', href: '#connect', style: { cursor: 'pointer' } },
        ]}
        activeHref={activeTab === 'about' ? '#about' : activeTab === 'projects' ? '#projects' : '#connect'}
        onNavigate={(item, index, event) => {
          event?.preventDefault?.();
          const id = (item.href || '').replace('#', '');
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveTab(id === 'projects' ? 'projects' : 'about');
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
                    background: '#121215',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '11px',
                    color: '#a1a1aa',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      boxShadow: '0 0 8px #ffffff',
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
                  textColor="#ffffff"
                  minFontSize={22}
                />
              </div>

              {/* Concise Intro with BlurText */}
              <div
                style={{
                  fontSize: 'clamp(14px, 3.6vw, 17.5px)',
                  fontWeight: 400,
                  color: '#a1a1aa',
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
                    background: '#ffffff',
                    color: '#000000',
                    fontWeight: 600,
                    fontSize: '13px',
                    borderRadius: '9999px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
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
                    background: '#141416',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 500,
                    borderRadius: '9999px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
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
                    background: '#141416',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 500,
                    borderRadius: '9999px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
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
            padding: 'clamp(18px, 4vw, 24px) 0 clamp(28px, 6vw, 40px)',
          }}
        >
            <div
              style={{
                width: '100%',
                maxWidth: '1040px',
                fontFamily: "'Space Mono', monospace",
                fontSize: 'clamp(18px, 4vw, 28px)',
                color: '#ffffff',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '22px',
                textAlign: 'left',
                fontWeight: 700,
              }}
            >
              Projects
            </div>

            <ProjectGrid />

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
