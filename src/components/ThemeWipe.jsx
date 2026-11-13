import React, { useMemo } from 'react';

const SPARK_COUNT = 18;

/**
 * ThemeWipe — full-screen theme transition overlay.
 *
 * Layers, all anchored on the click origin:
 *   1. flare      short light bloom at the pointer
 *   2. iris       giant destination-coloured orb that blooms to the corners
 *   3. rings      three staggered shockwave rings trailing the bloom
 *   4. orbit      slowly spinning segmented prism ring
 *   5. sparks     radial particle burst
 */
export default function ThemeWipe({ wipe }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: SPARK_COUNT }, (_, i) => ({
        angle: (360 / SPARK_COUNT) * i + (i % 3) * 7,
        distance: 70 + (i % 5) * 46,
        delay: (i % 6) * 38,
      })),
    []
  );

  if (!wipe) return null;
  const { x, y, radius, next } = wipe;

  return (
    <div
      key={`${x}-${y}-${next}`}
      className={`theme-wipe is-${next}`}
      style={{ '--x': `${x}px`, '--y': `${y}px`, '--r': `${radius}px` }}
      aria-hidden="true"
    >
      <span className="theme-wipe__iris" />
      <span className="theme-wipe__flare" />
      <span className="theme-wipe__ring theme-wipe__ring--1" />
      <span className="theme-wipe__ring theme-wipe__ring--2" />
      <span className="theme-wipe__ring theme-wipe__ring--3" />
      <span className="theme-wipe__orbit" />
      {sparks.map((spark, index) => (
        <span
          key={index}
          className="theme-wipe__spark"
          style={{
            '--angle': `${spark.angle}deg`,
            '--dist': `${spark.distance}px`,
            '--delay': `${spark.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}
