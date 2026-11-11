import React, { useState, useEffect, useRef } from 'react';
import { GITHUB_MONTHS, LEETCODE_MONTHS } from './contributionData';

const GREEN_SHADES = {
  0: 'transparent',
  1: '#9be9a8',
  2: '#40c463',
  3: '#30a14e',
  4: '#216e39',
};

function ContributionHeatmap({
  title,
  monthsData,
  isAnimated,
  legendTitle = 'Less',
}) {
  const [hoveredDay, setHoveredDay] = useState(null);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1000px',
        background: '#0d1117',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '24px 28px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {/* Top Header Row */}
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
        <span
          style={{
            fontSize: '13.5px',
            color: '#7d8590',
            fontWeight: 500,
            letterSpacing: '0.01em',
          }}
        >
          {title}
        </span>

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
          <span>{legendTitle}</span>
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

      {/* Heatmap Matrix with Month Gaps */}
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '4px',
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

        {/* Months Container with Distinct Spacing Between Each Month */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px', // Clear visual gap between months!
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
              {/* Month Header directly aligned with its week columns */}
              <span
                style={{
                  fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
                  fontSize: '11px',
                  color: '#7d8590',
                  height: '14px',
                  lineHeight: '14px',
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
                      const delay = isAnimated
                        ? `${mIdx * 45 + wIdx * 12 + dIdx * 8}ms`
                        : '0ms';

                      return (
                        <div
                          key={day.date}
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
                              : '1px solid rgba(255, 255, 255, 0.03)',
                            transform: isAnimated
                              ? 'scale(1) translateY(0)'
                              : 'scale(0.3) translateY(12px)',
                            opacity: isAnimated ? (isActive ? 1 : 0.3) : 0,
                            transition: `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, opacity 0.35s ease ${delay}, filter 0.15s ease`,
                            cursor: isActive ? 'pointer' : 'default',
                            boxShadow:
                              isActive && hoveredDay?.date === day.date
                                ? '0 0 8px rgba(155, 233, 168, 0.9)'
                                : 'none',
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

      {/* Floating Hover Tooltip */}
      {hoveredDay && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '24px',
            padding: '5px 12px',
            background: '#161b22',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '6px',
            fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
            fontSize: '11px',
            color: '#e6edf3',
            pointerEvents: 'none',
            boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
          }}
        >
          <span style={{ color: '#39d353', fontWeight: 600 }}>
            {hoveredDay.count > 0 ? `${hoveredDay.count} activities` : 'No activity'}
          </span>
          <span style={{ color: '#8b949e', marginLeft: '6px' }}>on {hoveredDay.date}</span>
        </div>
      )}
    </div>
  );
}

export default function ContributionGraphs() {
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
      {/* 1. GITHUB HEATMAP */}
      <ContributionHeatmap
        title="1,981 contributions in the last year"
        monthsData={GITHUB_MONTHS}
        isAnimated={isVisible}
        legendTitle="Less"
      />

      {/* 2. LEETCODE HEATMAP (Same Clean Spaced Format) */}
      <ContributionHeatmap
        title="154 problems solved in the last year"
        monthsData={LEETCODE_MONTHS}
        isAnimated={isVisible}
        legendTitle="Less"
      />
    </section>
  );
}
