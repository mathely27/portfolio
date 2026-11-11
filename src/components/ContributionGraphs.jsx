import React from 'react';

/**
 * ContributionGraphs
 * Renders GitHub and LeetCode transparent SVG cards in the exact same format
 * as Mathely's GitHub README profile card (card-dark.svg).
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
        gap: 'clamp(28px, 4vw, 44px)',
      }}
    >
      {/* 1. GITHUB ACTIVITY SVG CARD (Exact same format as README card) */}
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
          src="/assets/github-card-dark.svg"
          alt="GitHub Activity & Contributions @mathely27"
          style={{
            width: '100%',
            maxWidth: '1000px',
            height: 'auto',
            display: 'block',
          }}
          loading="lazy"
        />
      </div>

      {/* 2. LEETCODE STATS SVG CARD (Exact same boxes & format as README card) */}
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
          src="/assets/leetcode-card-dark.svg"
          alt="LeetCode Problem Solving Stats @mathely_27"
          style={{
            width: '100%',
            maxWidth: '1000px',
            height: 'auto',
            display: 'block',
          }}
          loading="lazy"
        />
      </div>
    </section>
  );
}
