import React, { useState, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

/* ── ID-card drop from top ─────────────────────────── */
@keyframes lanyardDrop {
  0%   { transform: translateY(-120vh) rotate(-8deg); opacity: 0; }
  55%  { transform: translateY(8px)    rotate(2deg);  opacity: 1; }
  70%  { transform: translateY(-18px)  rotate(-3deg); }
  82%  { transform: translateY(10px)   rotate(1.5deg); }
  91%  { transform: translateY(-6px)   rotate(-0.8deg); }
  97%  { transform: translateY(3px)    rotate(0.3deg); }
  100% { transform: translateY(0px)    rotate(0deg); opacity: 1; }
}

@keyframes lanyardDrop-out {
  0%   { transform: translateY(0)   rotate(0deg); opacity: 1; }
  100% { transform: translateY(-130vh) rotate(-6deg); opacity: 0; }
}

@keyframes stringDrop {
  0%   { transform: scaleY(0); opacity: 0; }
  40%  { opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
}

@keyframes hintFade {
  0%   { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0px); }
}

/* ── Ribbon sweep ─────────────────────────── */
@keyframes ribbonSweep {
  0%   { stroke-dashoffset: 1000; }
  100% { stroke-dashoffset: 0; }
}

/* ── Hand bloom + wave ─────────────────────────── */
@keyframes handBloom {
  0%   { opacity:0; transform: scale(0.25) rotate(-18deg); }
  35%  { opacity:1; }
  72%  { opacity:1; transform: scale(1.06) rotate(9deg); }
  88%  { transform: scale(0.98) rotate(-4deg); }
  100% { opacity:1; transform: scale(1) rotate(0deg); }
}

@keyframes naturalWave {
  0%,100% { transform: rotate(0deg); }
  22%     { transform: rotate(10deg); }
  48%     { transform: rotate(-7deg); }
  74%     { transform: rotate(8deg); }
  90%     { transform: rotate(-2deg); }
}

@keyframes unifiedFloat {
  0%,100% { transform: translate3d(0px, 0px, 0px); }
  50%      { transform: translate3d(-3px, 5px, 0px); }
}

/* ── Letter spring in ─────────────────────────── */
@keyframes letterSpring {
  0%   { opacity:0; transform:translate3d(0,15px,0) rotate(-8deg) scale(0.65); filter:blur(3px); }
  68%  { opacity:1; transform:translate3d(0,-3px,0) rotate(2.5deg) scale(1.04); filter:blur(0px); }
  100% { opacity:1; transform:translate3d(0,0px,0) rotate(var(--rot,0deg)) scale(1); filter:blur(0px); }
}

@keyframes floatIdle {
  0%,100% { transform:translate3d(0,0px,0) rotate(var(--rot,0deg)); }
  50%      { transform:translate3d(0,-3px,0) rotate(calc(var(--rot,0deg) + 1.8deg)); }
}

/* ── Shared classes ─────────────────────────── */
.wh-arm-assembly { will-change:transform; animation: unifiedFloat 5s ease-in-out 1.6s infinite; }

.wh-ribbon-stroke {
  stroke-dasharray:1000;
  stroke-dashoffset:1000;
  will-change:stroke-dashoffset;
  animation: ribbonSweep 0.82s cubic-bezier(0.22,1,0.36,1) 1.1s forwards;
}

.wh-hand-pivot {
  opacity:0;
  transform-origin:415px 225px;
  will-change:transform,opacity;
  animation:
    handBloom  0.52s cubic-bezier(0.22,1,0.36,1) 1.65s forwards,
    naturalWave 1.85s ease-in-out 2.17s infinite;
}

.wh-spring-char {
  display:inline-block;
  opacity:0;
  will-change:transform,opacity;
  animation:
    letterSpring 0.55s cubic-bezier(0.22,1,0.36,1) forwards,
    floatIdle 3.2s ease-in-out infinite;
}

/* ── Splash wrapper ─────────────────────────── */
.wh-splash {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}

.wh-splash.dark  { background: #05070b; }
.wh-splash.light { background: #ECECEC; }

.wh-splash.exiting {
  animation: lanyardDrop-out 0.65s cubic-bezier(0.4,0,1,1) forwards;
}

/* ── Lanyard string ─────────────────────────── */
.wh-string-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-origin: top center;
}

.wh-string {
  width: 3px;
  height: clamp(60px, 10vh, 100px);
  transform-origin: top center;
  transform: scaleY(0);
  opacity: 0;
  animation: stringDrop 0.4s ease-out 0.3s forwards;
  border-radius: 2px;
}
.wh-splash.dark  .wh-string { background: rgba(255,255,255,0.25); }
.wh-splash.light .wh-string { background: rgba(0,0,0,0.2); }

/* ── Card shell ─────────────────────────── */
.wh-card {
  position: relative;
  width: clamp(230px, 60vw, 300px);
  aspect-ratio: 4/5;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.3);
  animation: lanyardDrop 1.1s cubic-bezier(0.22,1,0.36,1) 0.08s both;
}

.wh-card.dark  { background: #0B1120; border: 1px solid rgba(255,255,255,0.08); }
.wh-card.light { background: #F1F3F6; border: 1px solid rgba(0,0,0,0.05); }

/* ── Lanyard hole ─────────────────────────── */
.wh-hole {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  z-index: 15;
}
.wh-splash.dark  .wh-hole { background: #05070b; border: 2px solid rgba(255,255,255,0.15); }
.wh-splash.light .wh-hole { background: #ECECEC; border: 2px solid rgba(0,0,0,0.1); }

/* ── Grain overlay ─────────────────────────── */
.wh-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
  background-image:
    radial-gradient(#0051FF 0.75px, transparent 0.75px),
    radial-gradient(#090D16 0.5px, #F1F3F6 0.5px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}
.wh-card.dark  .wh-grain { opacity: 0.06; }
.wh-card.light .wh-grain { opacity: 0.09; }

/* ── Replay badge ─────────────────────────── */
.wh-replay {
  position: absolute;
  bottom: 10px;
  right: 12px;
  z-index: 20;
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  padding: 3px 10px;
  border-radius: 999px;
  transition: transform 0.2s;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}
.wh-replay:hover { transform: scale(1.06); }
.wh-card.dark  .wh-replay { color: rgba(147,197,253,0.7); background: rgba(11,17,32,0.8); border: 1px solid rgba(0,81,255,0.1); }
.wh-card.light .wh-replay { color: rgba(0,81,255,0.7);   background: rgba(241,243,246,0.8); border: 1px solid rgba(0,81,255,0.1); }

/* ── Click hint ─────────────────────────── */
.wh-hint {
  margin-top: 24px;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  animation: hintFade 0.6s ease-out 2.4s both;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}
.wh-splash.dark  .wh-hint { color: rgba(255,255,255,0.3); }
.wh-splash.light .wh-hint { color: rgba(0,0,0,0.3); }
`;

function SpringChars({ text, baseDelay = 0, stepDelay = 0.05, idleDelay = 0.6, rotations, style = {} }) {
  const defaultRots = ["-2deg","1.5deg","-1deg","3deg","2deg","-1.5deg","1deg"];
  const rots = rotations || defaultRots;
  return text.split("").map((char, idx) => (
    <span
      key={idx}
      className="wh-spring-char"
      style={{
        "--rot": rots[idx % rots.length],
        animationDelay: `${baseDelay + idx * stepDelay}s, ${baseDelay + idleDelay + idx * 0.09}s`,
        ...style,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export default function WavingHandPoster({ theme = "dark", onEnter }) {
  const [animKey, setAnimKey] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [exiting, setExiting] = useState(false);

  const replayAnimation = () => {
    setAnimKey(prev => prev + 1);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    replayAnimation();
  };

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointer({ x: normX, y: normY });
  };

  const handlePointerLeave = () => setPointer({ x: 0, y: 0 });

  // Enter portfolio on splash bg click (not on card itself)
  const handleSplashClick = () => {
    if (onEnter) {
      setExiting(true);
      setTimeout(onEnter, 600);
    }
  };

  const t = theme; // "dark" | "light"
  const fg       = t === "dark" ? "#F8FAFC"             : "#090D16";
  const fgSoft   = t === "dark" ? "rgba(248,250,252,0.68)" : "rgba(9,13,22,0.68)";
  const blue     = t === "dark" ? "#3B82F6"             : "#0051FF";
  const nameCl   = t === "dark" ? "#60A5FA"             : "#0051FF";
  const strokeBg = t === "dark" ? "#0B1120"             : "#F1F3F6";

  return (
    <>
      <style>{css}</style>

      {/* Full-screen splash — click bg to enter portfolio */}
      <div
        className={`wh-splash ${t} ${exiting ? "exiting" : ""}`}
        onClick={handleSplashClick}
      >
        {/* Lanyard string + card */}
        <div className="wh-string-wrap" onClick={e => e.stopPropagation()}>
          <div className={`wh-string ${t}`} />

          {/* Card */}
          <div
            key={`card-${animKey}`}
            className={`wh-card ${t}`}
            onClick={handleClick}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            role="button"
            tabIndex={0}
            aria-label="Hey! I'm Mathely Mittal. Click to replay animation."
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); replayAnimation(); } }}
          >
            {/* Lanyard hole cutout */}
            <div className={`wh-hole ${t}`} />

            {/* SVG: ribbon + hand */}
            <svg
              key={`svg-${animKey}`}
              viewBox="0 0 600 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                transition: "transform 0.3s ease-out",
                transform: `translate3d(${pointer.x * 6}px, ${pointer.y * 6}px, 0)`,
              }}
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <filter id="wh-grain-filter" x="-5%" y="-5%" width="110%" height="110%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="noise"/>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.1" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
              </defs>

              <g filter="url(#wh-grain-filter)" className="wh-arm-assembly">
                {/* Ribbon path */}
                <path
                  pathLength="1000"
                  d="M -70 468 L 430 318 C 530 288, 645 288, 655 395 C 665 510, 610 615, 515 572 C 435 536, 415 430, 415 315 L 415 225"
                  strokeWidth="88"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="wh-ribbon-stroke"
                  stroke={blue}
                />

                {/* Hand */}
                <g className="wh-hand-pivot">
                  <path
                    d="M 371 225 L 371 96 A 8.5 8.5 0 0 1 388 96 L 388 136 A 3 3 0 0 0 394 136 L 394 74 A 9 9 0 0 1 412 74 L 412 134 A 3 3 0 0 0 418 134 L 418 62 A 9 9 0 0 1 436 62 L 436 136 A 3 3 0 0 0 442 136 L 442 76 A 8.5 8.5 0 0 1 459 76 L 459 148 C 459 152, 463 153, 466 149 C 473 139, 482 126, 490 120 C 499 113, 510 121, 504 134 C 495 156, 479 182, 466 205 C 461 213, 459 220, 459 228 A 44 44 0 0 1 371 225 Z"
                    fill={blue}
                  />
                  <path
                    d="M 441 163 C 448 148, 458 143, 467 146"
                    strokeWidth="6"
                    strokeLinecap="round"
                    stroke={strokeBg}
                    style={{ transition: "stroke 0.5s" }}
                  />
                </g>
              </g>
            </svg>

            {/* Grain overlay */}
            <div className={`wh-grain ${t}`} />

            {/* Text layer */}
            <div
              key={`text-${animKey}`}
              style={{
                position: "relative",
                zIndex: 10,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "clamp(16px,4vw,24px)",
                pointerEvents: "none",
                transform: `translate3d(${pointer.x * -3}px, ${pointer.y * -3}px, 0)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              {/* "Hey!" greeting */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "clamp(2.4rem,9vw,3.1rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: fg,
                  marginTop: "24px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <SpringChars text="Hey!" baseDelay={1.1} stepDelay={0.05} idleDelay={0.6}
                  rotations={["-2deg","1.5deg","-1deg","3deg"]} />
              </div>

              {/* Bio block: I'm + Mathely Mittal */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "4px" }}>
                {/* "I'm" */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "clamp(1rem,3vw,1.3rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: fg,
                  lineHeight: 1.2,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  <SpringChars text="I'm" baseDelay={1.35} stepDelay={0.045} idleDelay={0.6}
                    rotations={["0deg","0deg","0deg"]} />
                </div>

                {/* Name in Caveat */}
                <div style={{ marginTop: "-2px" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    fontSize: "clamp(2.6rem,9vw,3.4rem)",
                    fontWeight: 700,
                    color: nameCl,
                    lineHeight: 1,
                    paddingTop: "2px",
                    paddingBottom: "4px",
                    fontFamily: "'Caveat', cursive",
                  }}>
                    <SpringChars
                      text="Mathely"
                      baseDelay={1.5}
                      stepDelay={0.045}
                      idleDelay={0.65}
                      rotations={["-2deg","1.5deg","-1deg","2deg","-1.5deg","1deg","-2deg"]}
                    />
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    fontSize: "clamp(2.6rem,9vw,3.4rem)",
                    fontWeight: 700,
                    color: nameCl,
                    lineHeight: 1,
                    fontFamily: "'Caveat', cursive",
                  }}>
                    <SpringChars
                      text="Mittal"
                      baseDelay={1.85}
                      stepDelay={0.045}
                      idleDelay={0.65}
                      rotations={["1.5deg","-1deg","2deg","-1.5deg","1deg","-2deg"]}
                    />
                  </div>
                </div>

                {/* Subtitle */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "clamp(0.7rem,2vw,0.82rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: fgSoft,
                  marginTop: "4px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  <SpringChars
                    text="CS Student • Developer"
                    baseDelay={2.1}
                    stepDelay={0.018}
                    idleDelay={0.6}
                    rotations={["0deg"]}
                  />
                </div>
              </div>
            </div>

            {/* Replay badge */}
            <span className={`wh-replay ${t}`}>Click to replay ↻</span>
          </div>
        </div>

        {/* Click hint */}
        <div className={`wh-hint ${t}`}>click anywhere to enter</div>
      </div>
    </>
  );
}
