import React from 'react';

/**
 * ContributionGraphs
 * Renders GitHub and LeetCode contribution heatmap cards
 * matching the user's exact specification.
 */
export default function ContributionGraphs() {
  return (
    <section
      id="activity"
      style={{
        width: '100%',
        maxWidth: '1040px',
        margin: '0 auto',
        padding: 'clamp(10px, 3vw, 20px) 0 clamp(30px, 5vw, 45px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(20px, 3vw, 32px)',
      }}
    >
      {/* 1. GITHUB CONTRIBUTIONS HEATMAP CARD */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <img
          src="/assets/github-contributions-exact.svg"
          alt="GitHub Contributions: 1,981 contributions in the last year"
          style={{
            width: '100%',
            maxWidth: '1000px',
            height: 'auto',
            display: 'block',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
          loading="lazy"
        />
      </div>

      {/* 2. LEETCODE PROBLEMS HEATMAP CARD (SAME FORMAT) */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <img
          src="/assets/leetcode-contributions-exact.svg"
          alt="LeetCode: 154 problems solved in the last year"
          style={{
            width: '100%',
            maxWidth: '1000px',
            height: 'auto',
            display: 'block',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
          loading="lazy"
        />
      </div>
    </section>
  );
}
