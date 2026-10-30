import React from 'react';

export default function FooterRuler() {
  return (
    <footer className="footer-ruler-wrap">
      {/* Ruler Ticks Pattern */}
      <div className="ruler-ticks" />

      {/* Monospaced metadata row */}
      <div className="footer-meta-row">
        <div>MATHELY / CSE '28</div>
        <div className="hidden sm:block">STUDENT BY DAY — BUILDER BY NIGHT</div>
        <div>PORTFOLIO / V1.0</div>
      </div>
    </footer>
  );
}
