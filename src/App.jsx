import React, { useState, useEffect } from 'react';
import FluidGlass from './components/FluidGlass';
import PillNav from './components/PillNav';
import TextPressure from './components/TextPressure';
import BlurText from './components/BlurText';
import OrbitingCircles from './components/OrbitingCircles';
import ProjectShowcase from './components/ProjectShowcase';
import ScrollVelocity from './components/ScrollVelocity';
import SmoothCursor from './components/SmoothCursor';
import { GithubIcon, LinkedinIcon } from './components/Icons';
import { ArrowRight } from 'lucide-react';

/* ============================================================
   LANDING SCREEN WITH FLUID GLASS & LIQUID BUTTON
   ============================================================ */
function SplashScreen({ onEnter, fading }) {
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
        animation: fading ? 'portalZoomOut 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
      }}
    >
      <FluidGlass text="Mathely Mittal" />

      {fading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 70,
            animation: 'lightFlash 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        />
      )}
    </div>
  );
}

/* ============================================================
   MAIN PORTFOLIO
   - TextPressure for MATHELY MITTAL (interactive variable font)
   - PillNav (Official React Bits)
   - OrbitImages for Projects (Official React Bits)
   - OrbitingCircles for Tech Stack (Fast + GitHub @mathely27)
   - ScrollVelocity marquee
   - LiquidButton for Landing Page
   - Ultra-thin 3s fading cursor
   - 100% Monochrome Black, White & Grey
   ============================================================ */
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'projects'

  const triggerEnter = () => {
    if (splashFading || !showSplash) return;
    setSplashFading(true);
    setTimeout(() => setShowSplash(false), 800);
  };

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
        width: '100vw',
        height: '100vh',
        overflowX: 'hidden',
        overflowY: 'auto',
        background: '#050505',
        color: '#ffffff',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* 1. Cinematic Landing Screen */}
      {showSplash && <SplashScreen fading={splashFading} onEnter={triggerEnter} />}

      {/* 2. Ultra-thin smooth cursor with 3-second inactivity fade */}
      {!showSplash && <SmoothCursor />}

      {/* 3. Official React Bits <PillNav /> at top-center */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 60,
          animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      >
        <PillNav
          items={[
            { label: 'About & Stack', href: '#about' },
            { label: 'Projects', href: '#projects' },
          ]}
          activeHref={activeTab === 'about' ? '#about' : '#projects'}
          onItemClick={(item) => setActiveTab(item.href === '#about' ? 'about' : 'projects')}
          theme="dark"
          layout="joined"
          itemStyle="pill"
          hoverEffect="fill"
          indicator="dot"
          size="md"
        />
      </div>

      {/* 4. Main Stage Content */}
      <main
        style={{
          width: '92%',
          maxWidth: '1160px',
          minHeight: 'calc(100vh - 120px)',
          paddingTop: '86px',
          paddingBottom: '20px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          animation: !showSplash
            ? 'mainStageEnter 0.75s cubic-bezier(0.16, 1, 0.3, 1) both'
            : 'none',
        }}
      >
        {/* ====================================================
            VIEW 1: PARALLEL ABOUT (LEFT) + FAST TECH STACK (RIGHT)
        ==================================================== */}
        {activeTab === 'about' && (
          <div
            key="about"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '40px',
              flexWrap: 'wrap',
              margin: 'auto 0',
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
                  height: '75px',
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
                  minFontSize={34}
                />
              </div>

              {/* Concise Intro with BlurText */}
              <div
                style={{
                  fontSize: 'clamp(14.5px, 1.6vw, 17.5px)',
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
                  onClick={() => setActiveTab('projects')}
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
                  <span>View Orbit Projects</span>
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
                  href="https://linkedin.com/in/mathely27"
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

            {/* RIGHT COLUMN: Fast Tech Stack Orbit */}
            <div
              style={{
                flex: '1 1 440px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'scaleInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
              }}
            >
              <OrbitingCircles />
            </div>
          </div>
        )}

        {/* ====================================================
            VIEW 2: PROJECTS WITH REACT BITS <OrbitImages />
        ==================================================== */}
        {activeTab === 'projects' && (
          <div
            key="projects"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: 'fadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both',
              margin: 'auto 0',
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                color: '#71717a',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '10px',
                textAlign: 'center',
              }}
            >
              Selected Builds · GitHub / @mathely27 · 3D Orbit
            </div>

            <ProjectShowcase />
          </div>
        )}
      </main>

      {/* 5. ScrollVelocity Marquee Strip */}
      <div style={{ width: '100%', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <ScrollVelocity
          texts={['MATHELY MITTAL', 'SYSTEMS BUILDER · LOCAL AI · NATIVE MACOS · 2026']}
          velocity={40}
          fontSize={20}
          fontWeight={800}
          color="rgba(255, 255, 255, 0.22)"
          skewWithVelocity={6}
        />
      </div>

      {/* 6. Minimal Monochrome Footer */}
      <footer
        style={{
          padding: '10px 0 16px',
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          color: '#52525b',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        Mathely Mittal · CSE '28 · Built for substance
      </footer>
    </div>
  );
}
