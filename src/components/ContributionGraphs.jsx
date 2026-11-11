import React from 'react';
import { GithubIcon, LeetcodeIcon } from './Icons';
import { ExternalLink } from 'lucide-react';

/**
 * ContributionGraphs
 * Displays GitHub contribution graph and LeetCode activity stats cards in SVG format.
 * Positioned right before the Projects section.
 */
export default function ContributionGraphs() {
  return (
    <section
      id="activity"
      style={{
        width: '100%',
        maxWidth: '1040px',
        margin: '0 auto',
        padding: ' clamp(10px, 3vw, 20px) 0 clamp(30px, 5vw, 45px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'left' }}>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            color: '#71717a',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}
        >
          Activity &amp; Metrics
        </div>
        <h2
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(20px, 4vw, 26px)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          Contributions &amp; Problem Solving
        </h2>
      </div>

      {/* Cards Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          width: '100%',
        }}
      >
        {/* 1. GITHUB CONTRIBUTION GRAPH CARD */}
        <div
          style={{
            background: 'linear-gradient(180deg, #121217 0%, #0d0d10 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '18px',
            padding: ' clamp(16px, 3vw, 24px)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Card Top Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
              paddingBottom: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GithubIcon size={16} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                  GitHub Contributions
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#a1a1aa' }}>
                  @mathely27
                </div>
              </div>
            </div>

            <a
              href="https://github.com/mathely27"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#d4d4d8',
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = '#d4d4d8';
              }}
            >
              <span>View Profile</span>
              <ExternalLink size={11} />
            </a>
          </div>

          {/* SVG Graph wrapper with horizontal scroll support */}
          <div
            style={{
              width: '100%',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: '6px 0',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src="/assets/github-contributions.svg"
              alt="GitHub Contributions for mathely27"
              style={{
                minWidth: '660px',
                width: '100%',
                maxWidth: '960px',
                height: 'auto',
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))',
              }}
              loading="lazy"
            />
          </div>
        </div>

        {/* 2. LEETCODE STATS CARD */}
        <div
          style={{
            background: 'linear-gradient(180deg, #121217 0%, #0d0d10 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '18px',
            padding: ' clamp(16px, 3vw, 24px)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Card Top Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
              paddingBottom: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(255, 161, 22, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LeetcodeIcon size={16} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                  LeetCode Problem Solving
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#a1a1aa' }}>
                  @mathely_27
                </div>
              </div>
            </div>

            <a
              href="https://leetcode.com/mathely_27"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#d4d4d8',
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = '#d4d4d8';
              }}
            >
              <span>View LeetCode</span>
              <ExternalLink size={11} />
            </a>
          </div>

          {/* SVG LeetCode Stats Card */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: '8px 0',
            }}
          >
            <img
              src="/assets/leetcode-stats.svg"
              alt="LeetCode Stats for mathely_27"
              style={{
                maxWidth: '520px',
                width: '100%',
                height: 'auto',
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))',
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

