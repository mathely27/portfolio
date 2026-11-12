import React, { useState, useEffect, useRef } from 'react';
import { GITHUB_MONTHS, LEETCODE_MONTHS, REAL_GITHUB_COUNT, REAL_LEETCODE_COUNT } from './contributionData';
import { GithubIcon, LeetcodeIcon } from './Icons';
import { ExternalLink } from 'lucide-react';

const GREEN_SHADES = {
  0: 'transparent',
  1: '#9be9a8',
  2: '#40c463',
  3: '#30a14e',
  4: '#216e39',
};

// Interactive animated number counter on scroll
function AnimatedCounter({ endVal, isVisible, suffix = '' }) {
  const [val, setVal] = useState(0);
  const target = parseInt(String(endVal).replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    if (!isVisible) {
      setVal(0);
      return;
    }

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const frame = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setVal(current);
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setVal(target);
      }
    };

    requestAnimationFrame(frame);
  }, [isVisible, target]);

  return (
    <span>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

function ContributionHeatmap({
  platformTitle,
  platformUsername,
  platformUrl,
  platformIcon: PlatformIcon,
  countNumber,
  subjectLabel,
  monthsData,
  isVisible,
  accentColor = '#39d353',
  theme = 'dark',
}) {
  const [hoveredDay, setHoveredDay] = useState(null);
  const isLight = theme === 'light';

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* Brand & Platform Header Row - OUTSIDE/ABOVE the box */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          padding: '0 4px',
        }}
      >
        <a
          href={platformUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(2px)';
            const titleEl = e.currentTarget.querySelector('.platform-title-text');
            if (titleEl) titleEl.style.color = accentColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            const titleEl = e.currentTarget.querySelector('.platform-title-text');
            if (titleEl) titleEl.style.color = isLight ? '#0f172a' : '#ffffff';
          }}
        >
          {PlatformIcon && (
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: isLight ? 'rgba(15, 23, 42, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: accentColor,
              }}
            >
              <PlatformIcon size={16} strokeWidth={2.2} />
            </div>
          )}
          <span
            className="platform-title-text"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: isLight ? '#0f172a' : '#ffffff',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
            }}
          >
            {platformTitle}
          </span>
          {platformUsername && (
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px',
                color: isLight ? '#64748b' : '#8b949e',
              }}
            >
              @{platformUsername}
            </span>
          )}
        </a>

        {platformUrl && (
          <a
            href={platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px',
              color: isLight ? '#475569' : '#8b949e',
              padding: '4px 10px',
              borderRadius: '9999px',
              background: isLight ? 'rgba(15, 23, 42, 0.04)' : 'rgba(255, 255, 255, 0.04)',
              border: isLight ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = accentColor;
              e.currentTarget.style.borderColor = accentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isLight ? '#475569' : '#8b949e';
              e.currentTarget.style.borderColor = isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)';
            }}
          >
            <span>View Profile</span>
            <ExternalLink size={11} />
          </a>
        )}
      </div>

      {/* The Actual Heatmap Box (Exact original compact proportions) */}
      <div
        style={{
          width: '100%',
          background: isLight ? '#ffffff' : '#11141c',
          border: isLight ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '20px 24px',
          boxShadow: isLight ? '0 10px 30px rgba(0, 0, 0, 0.05)' : '0 14px 44px rgba(0, 0, 0, 0.45)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          position: 'relative',
          userSelect: 'none',
          transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = isLight ? 'rgba(15, 23, 42, 0.16)' : 'rgba(255, 255, 255, 0.16)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)';
        }}
      >
        <style>{`
          @keyframes subtleTilePulse {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.22); }
          }
          .active-contrib-tile:hover {
            transform: scale(1.48) !important;
            z-index: 20;
            box-shadow: 0 0 10px rgba(155, 233, 168, 0.95) !important;
            transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
          }
        `}</style>

        {/* Top Header inside Box: Real Animated Count + Legend (Just like GitHub README) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
          }}
        >
        <div
          style={{
            fontSize: '13.5px',
            color: isLight ? '#64748b' : '#7d8590',
            fontWeight: 500,
            letterSpacing: '0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: 700, fontSize: '15px' }}>
            <AnimatedCounter endVal={countNumber} isVisible={isVisible} />
          </span>
          <span>{subjectLabel}</span>
        </div>

        {/* Legend */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11.5px',
            color: '#7d8590',
          }}
        >
          <span>Less</span>
          {[1, 2, 3, 4].map((lvl) => (
            <span
              key={lvl}
              style={{
                width: '10.5px',
                height: '10.5px',
                borderRadius: '2.5px',
                background: GREEN_SHADES[lvl],
                display: 'inline-block',
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Heatmap Matrix with Clean Month Separation & Wave Animation */}
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '6px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        {/* Left Day Labels */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '92px',
            marginTop: '22px',
            paddingRight: '6px',
            fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
            fontSize: '10px',
            color: '#7d8590',
            lineHeight: 1,
          }}
        >
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        {/* Months Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '13px', // Distinct readable gap between months
            flex: 1,
          }}
        >
          {monthsData.map((mGroup, mIdx) => (
            <div
              key={`${mGroup.month}-${mIdx}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'flex-start',
              }}
            >
              {/* Month Header positioned directly on its week group */}
              <span
                style={{
                  fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
                  fontSize: '11px',
                  color: '#7d8590',
                  height: '14px',
                  lineHeight: '14px',
                  fontWeight: 500,
                }}
              >
                {mGroup.month}
              </span>

              {/* Weeks inside this month */}
              <div
                style={{
                  display: 'flex',
                  gap: '3.5px',
                }}
              >
                {mGroup.weeks.map((week, wIdx) => (
                  <div
                    key={wIdx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3.5px',
                    }}
                  >
                    {week.map((day, dIdx) => {
                      const isActive = day.level > 0;
                      // Dynamic Wave Calculation: diagonal wave sweeps across columns & rows
                      const waveIndex = mIdx * 4 + wIdx + dIdx * 0.4;
                      const delayMs = Math.round(waveIndex * 22);

                      return (
                        <div
                          key={day.date}
                          className={isActive ? 'active-contrib-tile' : ''}
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          style={{
                            width: '10.5px',
                            height: '10.5px',
                            borderRadius: '2.5px',
                            background: isActive
                              ? GREEN_SHADES[day.level]
                              : 'transparent',
                            outline: isActive
                              ? 'none'
                              : '1px solid rgba(255, 255, 255, 0.035)',
                            // Animation on scroll: Wave-in with scale & spring
                            transform: isVisible
                              ? 'scale(1) translateY(0) rotate(0deg)'
                              : 'scale(0.1) translateY(18px) rotate(-12deg)',
                            opacity: isVisible ? (isActive ? 1 : 0.25) : 0,
                            transition: `transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${delayMs}ms, opacity 0.3s ease ${delayMs}ms, filter 0.2s ease`,
                            cursor: isActive ? 'pointer' : 'default',
                            position: 'relative',
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Interactive Tooltip */}
        {hoveredDay && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '24px',
              padding: '5px 12px',
              background: isLight ? '#f1f5f9' : '#161b22',
              border: isLight ? '1px solid rgba(15, 23, 42, 0.16)' : '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: '6px',
              fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
              fontSize: '11px',
              color: isLight ? '#0f172a' : '#e6edf3',
              pointerEvents: 'none',
              boxShadow: isLight ? '0 4px 16px rgba(0,0,0,0.1)' : '0 4px 16px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 30,
              animation: 'fadeIn 0.15s ease both',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: hoveredDay.count > 0 ? accentColor : '#6e7681',
              }}
            />
            <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: 600 }}>
              {hoveredDay.count > 0
                ? `${hoveredDay.count} ${hoveredDay.count === 1 ? 'activity' : 'activities'}`
                : 'No activity'}
            </span>
            <span style={{ color: isLight ? '#64748b' : '#8b949e' }}>on {hoveredDay.date}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ContributionGraphs({ theme = 'dark' }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="activity"
      ref={sectionRef}
      style={{
        width: '100%',
        maxWidth: '1040px',
        margin: '0 auto',
        paddingTop: 'clamp(50px, 7vw, 90px)',
        paddingBottom: 'clamp(30px, 5vw, 60px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(24px, 3.5vw, 36px)',
      }}
    >
      {/* 1. GITHUB HEATMAP - Real Contributions */}
      <ContributionHeatmap
        platformTitle="GitHub"
        platformUsername="mathely27"
        platformUrl="https://github.com/mathely27"
        platformIcon={GithubIcon}
        countNumber={REAL_GITHUB_COUNT}
        subjectLabel="contributions in the last year"
        monthsData={GITHUB_MONTHS}
        isVisible={isVisible}
        accentColor="#39d353"
        theme={theme}
      />

      {/* 2. LEETCODE HEATMAP - Real Problems Solved */}
      <ContributionHeatmap
        platformTitle="LeetCode"
        platformUsername="mathely_27"
        platformUrl="https://leetcode.com/mathely_27"
        platformIcon={LeetcodeIcon}
        countNumber={REAL_LEETCODE_COUNT}
        subjectLabel="problems solved in the last year"
        monthsData={LEETCODE_MONTHS}
        isVisible={isVisible}
        accentColor="#ffa116"
        theme={theme}
      />
    </section>
  );
}
