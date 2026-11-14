import React, { useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

/* ─── keyframes ─────────────────────────────────────────── */
@keyframes idDrop {
  0%   { transform:translateY(-110vh) rotate(-6deg); opacity:0; }
  52%  { transform:translateY(10px)   rotate(2.5deg); opacity:1; }
  68%  { transform:translateY(-14px)  rotate(-2deg); }
  80%  { transform:translateY(7px)    rotate(1deg); }
  90%  { transform:translateY(-4px)   rotate(-0.4deg); }
  97%  { transform:translateY(2px)    rotate(0.15deg); }
  100% { transform:translateY(0)      rotate(0deg); opacity:1; }
}
@keyframes idExit {
  0%   { transform:translateY(0) rotate(0deg); opacity:1; }
  100% { transform:translateY(-120vh) rotate(-7deg); opacity:0; }
}
@keyframes cordUnfurl {
  0%   { transform:scaleY(0); opacity:0; transform-origin:top center; }
  60%  { opacity:1; }
  100% { transform:scaleY(1); opacity:1; transform-origin:top center; }
}
@keyframes clipDrop {
  0%   { transform:translateY(-110vh) rotate(-6deg); opacity:0; }
  52%  { transform:translateY(10px)   rotate(2.5deg); opacity:1; }
  68%  { transform:translateY(-14px)  rotate(-2deg); }
  80%  { transform:translateY(7px)    rotate(1deg); }
  90%  { transform:translateY(-4px)   rotate(-0.4deg); }
  97%  { transform:translateY(2px)    rotate(0.15deg); }
  100% { transform:translateY(0)      rotate(0deg); opacity:1; }
}
@keyframes glowPulse {
  0%,100% { opacity:0.7; }
  50%      { opacity:1; }
}
@keyframes ribbonSweep {
  0%   { stroke-dashoffset:1200; }
  100% { stroke-dashoffset:0; }
}
@keyframes handBloom {
  0%   { opacity:0; transform:scale(0.2) rotate(-20deg); }
  40%  { opacity:1; }
  75%  { transform:scale(1.05) rotate(8deg); }
  90%  { transform:scale(0.97) rotate(-3deg); }
  100% { opacity:1; transform:scale(1) rotate(0deg); }
}
@keyframes naturalWave {
  0%,100% { transform:rotate(0deg); }
  22%     { transform:rotate(12deg); }
  48%     { transform:rotate(-8deg); }
  74%     { transform:rotate(10deg); }
  90%     { transform:rotate(-2deg); }
}
@keyframes floatIdle {
  0%,100% { transform:translate3d(0,0,0); }
  50%      { transform:translate3d(-2px,5px,0); }
}
@keyframes letterIn {
  0%   { opacity:0; transform:translate3d(0,14px,0) rotate(-7deg) scale(0.6); filter:blur(3px); }
  65%  { opacity:1; transform:translate3d(0,-3px,0) rotate(2deg) scale(1.03); filter:blur(0); }
  100% { opacity:1; transform:translate3d(0,0,0) rotate(var(--rot,0deg)) scale(1); filter:blur(0); }
}
@keyframes floatChar {
  0%,100% { transform:translate3d(0,0,0) rotate(var(--rot,0deg)); }
  50%      { transform:translate3d(0,-3px,0) rotate(calc(var(--rot,0deg) + 1.5deg)); }
}
@keyframes hintIn {
  0%   { opacity:0; transform:translateY(8px); }
  100% { opacity:1; transform:translateY(0); }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

/* ─── shared animation classes ──────────────────────────── */
.wh-ribbon {
  stroke-dasharray:1200;
  stroke-dashoffset:1200;
  animation: ribbonSweep 0.9s cubic-bezier(0.22,1,0.36,1) 1.2s forwards;
}
.wh-hand {
  opacity:0;
  transform-origin:415px 225px;
  animation:
    handBloom  0.5s cubic-bezier(0.22,1,0.36,1) 1.75s forwards,
    naturalWave 2s ease-in-out 2.25s infinite;
}
.wh-arm {
  animation: floatIdle 5s ease-in-out 1.8s infinite;
}
.wh-char {
  display:inline-block;
  opacity:0;
  animation:
    letterIn  0.55s cubic-bezier(0.22,1,0.36,1) var(--din,0s) forwards,
    floatChar 3.5s ease-in-out var(--fdin,0.7s) infinite;
}

/* ─── splash wrapper ─────────────────────────────────────── */
.wh-splash {
  position:fixed; inset:0; z-index:200;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  overflow:hidden; cursor:pointer; user-select:none; -webkit-user-select:none;
}
.wh-splash.exiting .wh-id-wrap {
  animation: idExit 0.6s cubic-bezier(0.4,0,1,1) forwards !important;
}

/* ─── background ─────────────────────────────────────────── */
.wh-bg {
  position:absolute; inset:0; z-index:0;
  background: radial-gradient(ellipse 70% 60% at 50% 55%,
    rgba(0,81,255,0.09) 0%,
    rgba(0,40,120,0.04) 40%,
    #05070b 70%
  );
}
.wh-bg-noise {
  position:absolute; inset:0; z-index:1; opacity:0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
}

/* ─── id card wrap (clip + cord + card) ──────────────────── */
.wh-id-wrap {
  position:relative; z-index:2;
  display:flex; flex-direction:column; align-items:center;
  animation: idDrop 1.15s cubic-bezier(0.22,1,0.36,1) 0.05s both;
}

/* ─── lanyard clip SVG ───────────────────────────────────── */
.wh-clip-svg {
  display:block;
  width:48px;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
}

/* ─── lanyard cord ───────────────────────────────────────── */
.wh-cord {
  width:10px;
  height:clamp(50px, 8vh, 80px);
  transform-origin:top center;
  transform:scaleY(0);
  animation: cordUnfurl 0.5s ease-out 0.25s forwards;
  border-radius:5px;
  background: linear-gradient(to right, #2a2a3a 0%, #3a3a4e 40%, #4a4a60 50%, #3a3a4e 60%, #2a2a3a 100%);
  box-shadow: inset 0 0 4px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3);
}

/* ─── card itself ────────────────────────────────────────── */
.wh-card {
  position:relative;
  width:clamp(240px, 55vw, 310px);
  aspect-ratio:3/4.2;
  border-radius:18px;
  overflow:hidden;
  cursor:pointer;

  /* glowing border */
  border:1px solid rgba(0,81,255,0.28);
  box-shadow:
    0 0 0 1px rgba(0,81,255,0.1),
    0 0 20px rgba(0,81,255,0.18),
    0 0 50px rgba(0,81,255,0.09),
    0 24px 60px rgba(0,0,0,0.65),
    0 4px 12px rgba(0,0,0,0.4),
    inset 0 1px 0 rgba(255,255,255,0.08);
  animation: glowPulse 3s ease-in-out 2s infinite;

  background: linear-gradient(160deg, #0d1225 0%, #080c1a 60%, #060810 100%);
}

/* glow ring on card edge */
.wh-card::before {
  content:'';
  position:absolute; inset:0;
  border-radius:inherit;
  background: linear-gradient(135deg,
    rgba(0,81,255,0.08) 0%,
    transparent 40%,
    rgba(0,81,255,0.04) 100%
  );
  pointer-events:none; z-index:5;
}

/* ─── card top accent bar ────────────────────────────────── */
.wh-top-bar {
  position:absolute; top:0; left:0; right:0; height:38%;
  background: linear-gradient(145deg, #0032cc 0%, #0051ff 50%, #1a6bff 100%);
  border-radius:18px 18px 0 0;
  overflow:hidden;
}
.wh-top-bar::after {
  content:'';
  position:absolute; bottom:-40px; right:-30px;
  width:120px; height:120px;
  background:rgba(255,255,255,0.05);
  border-radius:50%;
}

/* ─── avatar circle ──────────────────────────────────────── */
.wh-avatar {
  position:absolute; top:28%; left:50%;
  transform:translateX(-50%);
  width:clamp(56px,16%,72px);
  aspect-ratio:1;
  border-radius:50%;
  background:linear-gradient(135deg, #1a2a6e, #0d1740);
  border:3px solid rgba(255,255,255,0.15);
  box-shadow:0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,81,255,0.3);
  display:flex; align-items:center; justify-content:center;
  z-index:3;
  font-family:'Space Mono',monospace;
  font-size:clamp(14px,4%,20px);
  font-weight:700;
  color:rgba(255,255,255,0.75);
  letter-spacing:1px;
}

/* ─── card logo area ─────────────────────────────────────── */
.wh-card-logo {
  position:absolute; top:10px; left:14px;
  display:flex; align-items:center; gap:5px;
  z-index:4;
}
.wh-card-logo-dot {
  width:8px; height:8px; border-radius:50%;
  background:rgba(255,255,255,0.9);
}
.wh-card-logo-text {
  font-family:'Space Mono',monospace;
  font-size:7px; font-weight:700;
  letter-spacing:0.18em;
  color:rgba(255,255,255,0.7);
  text-transform:uppercase;
}

/* ─── card body (bottom 60%) ─────────────────────────────── */
.wh-card-body {
  position:absolute; bottom:0; left:0; right:0;
  top:38%;
  display:flex; flex-direction:column; align-items:center;
  padding-top:36%; padding-bottom:12px; padding-left:12px; padding-right:12px;
  z-index:2;
}

/* ─── SVG waving hand (bg accent, smaller) ───────────────── */
.wh-svg-accent {
  position:absolute; inset:0; width:100%; height:100%;
  pointer-events:none; z-index:1; opacity:0.65;
}

/* ─── name ───────────────────────────────────────────────── */
.wh-name {
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:800;
  font-size:clamp(1.1rem,4.5vw,1.4rem);
  letter-spacing:-0.02em;
  color:#fff;
  text-align:center;
  line-height:1.15;
  position:relative; z-index:4;
  margin-bottom:3px;
  text-shadow:0 2px 12px rgba(0,81,255,0.3);
}
.wh-name .cav {
  font-family:'Caveat',cursive;
  font-size:clamp(1.5rem,6vw,2rem);
  color:#60a5fa;
  display:block;
  line-height:1;
}

/* ─── role tag ───────────────────────────────────────────── */
.wh-role {
  font-family:'Plus Jakarta Sans',sans-serif;
  font-size:clamp(0.6rem,2vw,0.72rem);
  font-weight:600;
  letter-spacing:0.14em;
  text-transform:uppercase;
  color:rgba(255,255,255,0.4);
  text-align:center;
  position:relative; z-index:4;
  margin-bottom:10px;
}

/* ─── divider ─────────────────────────────────────────────── */
.wh-divider {
  width:60%; height:1px;
  background:linear-gradient(to right,transparent,rgba(0,81,255,0.3),transparent);
  position:relative; z-index:4;
  margin-bottom:8px;
}

/* ─── card bottom info ────────────────────────────────────── */
.wh-card-info {
  display:flex; justify-content:space-between; align-items:flex-end;
  width:100%; position:relative; z-index:4; padding:0 4px;
  margin-top:auto;
}
.wh-info-col label {
  font-family:'Space Mono',monospace;
  font-size:5.5px; color:rgba(255,255,255,0.3);
  letter-spacing:0.12em; text-transform:uppercase; display:block; margin-bottom:2px;
}
.wh-info-col span {
  font-family:'Space Mono',monospace;
  font-size:7px; color:rgba(255,255,255,0.55);
  letter-spacing:0.08em;
}
/* barcode strip */
.wh-barcode {
  display:flex; gap:1.5px; align-items:flex-end;
}
.wh-barcode div {
  background:rgba(255,255,255,0.35);
  border-radius:1px;
}

/* ─── replay badge ────────────────────────────────────────── */
.wh-replay {
  position:absolute; bottom:10px; right:11px; z-index:10;
  font-family:'Plus Jakarta Sans',sans-serif;
  font-size:7.5px; font-weight:600;
  letter-spacing:0.12em; text-transform:uppercase;
  color:rgba(96,165,250,0.6);
  background:rgba(8,12,26,0.75);
  border:1px solid rgba(0,81,255,0.15);
  backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
  padding:3px 9px; border-radius:999px;
  transition:transform 0.2s, opacity 0.2s;
}
.wh-replay:hover { transform:scale(1.06); opacity:0.9; }

/* ─── hint ────────────────────────────────────────────────── */
.wh-hint {
  position:relative; z-index:2;
  margin-top:28px;
  font-family:'Plus Jakarta Sans',sans-serif;
  font-size:10px; font-weight:500;
  letter-spacing:0.22em; text-transform:uppercase;
  color:rgba(255,255,255,0.18);
  animation: hintIn 0.7s ease-out 2.8s both;
}

/* ─── light theme ─────────────────────────────────────────── */
.wh-splash.light .wh-bg {
  background: radial-gradient(ellipse 70% 60% at 50% 55%,
    rgba(0,81,255,0.07) 0%, rgba(0,40,180,0.03) 40%, #e8ecf4 70%);
}
.wh-splash.light .wh-hint { color:rgba(0,0,0,0.25); }
`;

/* ─── Barcode strips ─────────────────────────────────────── */
const BARS = [3,1,2,1,3,1,1,2,1,2,3,1,1,2,1,3,1,2,1,1,2,1,3];

function Barcode() {
  return (
    <div className="wh-barcode">
      {BARS.map((h,i) => (
        <div key={i} style={{ width: i%3===0?2:1, height: 12+h*2 }} />
      ))}
    </div>
  );
}

/* ─── Spring chars helper ────────────────────────────────── */
function Chars({ text, baseDelay=0, step=0.045, idleBase=0.6, rots }) {
  const def = ["-2deg","1.5deg","-1deg","2deg","-1.5deg","1deg"];
  const r = rots || def;
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} className="wh-char" style={{
          "--rot": r[i % r.length],
          "--din":  `${baseDelay + i*step}s`,
          "--fdin": `${baseDelay + idleBase + i*0.09}s`,
        }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </>
  );
}

/* ─── Lanyard clip SVG ───────────────────────────────────── */
function LanyardClip() {
  return (
    <svg className="wh-clip-svg" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* outer housing */}
      <rect x="6" y="0" width="36" height="22" rx="5" fill="url(#clipGrad)" />
      {/* slot opening */}
      <rect x="14" y="4" width="20" height="14" rx="3" fill="#1a1c26" />
      {/* inner notch detail */}
      <rect x="20" y="7" width="8" height="8" rx="2" fill="#23253a" />
      {/* bottom tongue */}
      <path d="M20 22 L24 36 L28 22 Z" fill="url(#clipGrad)" />
      {/* shine */}
      <rect x="8" y="1.5" width="16" height="3" rx="1.5" fill="rgba(255,255,255,0.18)" />
      <defs>
        <linearGradient id="clipGrad" x1="6" y1="0" x2="42" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4a4d6a"/>
          <stop offset="40%" stopColor="#3a3d58"/>
          <stop offset="100%" stopColor="#2a2d42"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function WavingHandPoster({ theme = "dark", onEnter }) {
  const [animKey, setAnimKey]   = useState(0);
  const [exiting, setExiting]   = useState(false);
  const [pointer, setPointer]   = useState({ x:0, y:0 });

  const replay = () => setAnimKey(k => k+1);

  const handleCardClick = (e) => { e.stopPropagation(); replay(); };

  const handlePointerMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((e.clientX-r.left)/r.width  - 0.5) * 2,
      y: ((e.clientY-r.top) /r.height - 0.5) * 2,
    });
  };

  const handleSplashClick = () => {
    if (!onEnter || exiting) return;
    setExiting(true);
    setTimeout(onEnter, 580);
  };

  const blue = "#3B82F6";

  return (
    <>
      <style>{css}</style>

      <div
        className={`wh-splash ${theme} ${exiting ? "exiting" : ""}`}
        onClick={handleSplashClick}
      >
        {/* subtle bg */}
        <div className="wh-bg" />
        <div className="wh-bg-noise" />

        {/* ── lanyard clip + cord + card ── */}
        <div
          className="wh-id-wrap"
          onClick={e => e.stopPropagation()}
        >
          {/* clip */}
          <LanyardClip />

          {/* cord */}
          <div className="wh-cord" />

          {/* card */}
          <div
            key={`card-${animKey}`}
            className="wh-card"
            onClick={handleCardClick}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setPointer({x:0,y:0})}
            role="button"
            tabIndex={0}
            aria-label="Mathely Mittal ID card — click to replay"
            onKeyDown={e => { if (e.key==="Enter"||e.key===" ") { e.preventDefault(); replay(); } }}
            style={{
              transform: `perspective(600px) rotateY(${pointer.x*4}deg) rotateX(${-pointer.y*3}deg)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* top blue bar */}
            <div className="wh-top-bar" />

            {/* logo */}
            <div className="wh-card-logo">
              <div className="wh-card-logo-dot" />
              <span className="wh-card-logo-text">Portfolio</span>
            </div>

            {/* waving hand SVG accent (background) */}
            <svg
              key={`svg-${animKey}`}
              viewBox="0 0 600 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="wh-svg-accent"
              preserveAspectRatio="xMidYMid slice"
              style={{
                transform: `translate3d(${pointer.x*5}px,${pointer.y*5}px,0)`,
                transition:"transform 0.3s ease-out",
              }}
            >
              <g className="wh-arm">
                <path
                  pathLength="1200"
                  d="M -70 468 L 430 318 C 530 288, 645 288, 655 395 C 665 510, 610 615, 515 572 C 435 536, 415 430, 415 315 L 415 225"
                  stroke={blue} strokeWidth="90" strokeLinecap="round" strokeLinejoin="round"
                  className="wh-ribbon"
                />
                <g className="wh-hand">
                  <path
                    d="M 371 225 L 371 96 A 8.5 8.5 0 0 1 388 96 L 388 136 A 3 3 0 0 0 394 136 L 394 74 A 9 9 0 0 1 412 74 L 412 134 A 3 3 0 0 0 418 134 L 418 62 A 9 9 0 0 1 436 62 L 436 136 A 3 3 0 0 0 442 136 L 442 76 A 8.5 8.5 0 0 1 459 76 L 459 148 C 459 152, 463 153, 466 149 C 473 139, 482 126, 490 120 C 499 113, 510 121, 504 134 C 495 156, 479 182, 466 205 C 461 213, 459 220, 459 228 A 44 44 0 0 1 371 225 Z"
                    fill={blue}
                  />
                  <path d="M 441 163 C 448 148, 458 143, 467 146" stroke="#080c1a" strokeWidth="6" strokeLinecap="round"/>
                </g>
              </g>
            </svg>

            {/* avatar */}
            <div className="wh-avatar" style={{ position:"absolute", top:"30%", left:"50%", transform:"translateX(-50%)", zIndex:3 }}>
              MM
            </div>

            {/* body text */}
            <div className="wh-card-body">
              <div className="wh-name" key={`name-${animKey}`}>
                <span className="cav">
                  <Chars text="Mathely Mittal" baseDelay={1.0} step={0.04} idleBase={0.55} />
                </span>
              </div>

              <div className="wh-role">
                <Chars text="CS Student  •  Developer" baseDelay={1.55} step={0.018} idleBase={0.5} rots={["0deg"]} />
              </div>

              <div className="wh-divider" />

              {/* bottom row */}
              <div className="wh-card-info">
                <div className="wh-info-col">
                  <label>ID</label>
                  <span>MM-2025</span>
                </div>
                <Barcode />
                <div className="wh-info-col" style={{textAlign:"right"}}>
                  <label>Batch</label>
                  <span>2027</span>
                </div>
              </div>
            </div>

            {/* replay badge */}
            <span className="wh-replay">Replay ↻</span>
          </div>
        </div>

        {/* hint */}
        <div className="wh-hint">click anywhere to enter</div>
      </div>
    </>
  );
}
